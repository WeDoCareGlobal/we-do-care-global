/* Reliable playback controls for the public brand video. */
(() => {
  'use strict';
  function initialize() {
    const video = document.getElementById('brand-video');
    const frame = video?.closest('.film-frame');
    if (!video || !frame || frame.querySelector('.film-video-play')) return;

    // Browser-native controls remain usable if autoplay or JavaScript fails.
    video.controls = true;
    video.playsInline = true;
    video.preload = 'metadata';

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'film-video-play';
    button.setAttribute('aria-label', 'Play We Do Care Global brand video');
    frame.appendChild(button);

    const setButton = (label) => {
      button.hidden = false;
      button.disabled = false;
      button.textContent = label;
      button.setAttribute('aria-label', label.replace(/^▶ /, ''));
    };
    const sync = () => {
      if (!video.paused && !video.ended) {
        button.hidden = true;
        button.disabled = false;
      } else {
        setButton(video.ended ? '▶ Replay video' : '▶ Play video');
      }
    };
    const fail = () => {
      setButton('Retry video');
      console.warn('Brand video failed to play:', video.error?.code || 'play-rejected');
    };
    button.addEventListener('click', async () => {
      button.disabled = true;
      button.textContent = 'Loading video…';
      try {
        if (video.error) video.load();
        if (video.ended) video.currentTime = 0;
        await video.play();
        sync();
      } catch {
        fail();
      }
    });

    video.addEventListener('playing', sync);
    video.addEventListener('pause', sync);
    video.addEventListener('ended', sync);
    video.addEventListener('error', fail);
    video.querySelector('source')?.addEventListener('error', fail);
    video.addEventListener('stalled', () => {
      if (video.paused) setButton('▶ Play video');
    });
    sync();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();
