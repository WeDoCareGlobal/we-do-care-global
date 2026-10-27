/* Reliable, user-initiated controls for the public brand film. */
(() => {
  'use strict';
  const initialize = () => {
    const video = document.getElementById('brand-video');
    const frame = video?.closest('.film-frame');
    if (!video || !frame || frame.querySelector('.film-video-play')) return;
    video.preload = 'metadata';
    // Keep browser-native controls available even if autoplay or the custom UI fails.
    video.controls = true;
    video.playsInline = true;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'film-video-play';
    button.textContent = '▶ Play video';
    button.setAttribute('aria-label', 'Play We Do Care Global brand film');
    frame.append(button);
    const status = () => {
      const isPlaying = !video.paused && !video.ended;
      button.hidden = isPlaying;
      button.disabled = false;
      if (!isPlaying && button.textContent !== 'Retry video') button.textContent = '▶ Play video';
    };
    button.addEventListener('click', async () => {
      button.disabled = true;
      button.textContent = 'Loading video…';
      try {
        if (video.error) video.load();
        await video.play();
        status();
      } catch (error) {
        button.hidden = false;
        button.textContent = 'Retry video';
        button.disabled = false;
        console.warn('Brand film playback failed:', error?.name || 'unknown error');
      }
    });
    video.addEventListener('playing', status);
    video.addEventListener('pause', status);
    video.addEventListener('error', () => {
      button.hidden = false;
      button.disabled = false;
      button.textContent = 'Retry video';
    });
    video.querySelector('source')?.addEventListener('error', () => {
      button.hidden = false;
      button.disabled = false;
      button.textContent = 'Retry video';
    });
    status();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, {once: true});
  else initialize();
})();
