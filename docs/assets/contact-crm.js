(() => {
  'use strict';
  const form = document.getElementById('contact-form');
  const send = document.getElementById('send-crm-inquiry');
  const status = document.getElementById('form-status');
  if (!form || !send || !status) return;
  const emailDraft = document.getElementById('prepare-inquiry');
  send.addEventListener('click', async () => {
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const payload = {
      name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      interest: String(data.get('interest') || '').trim(),
      message: String(data.get('message') || '').trim(),
      company_website: String(data.get('company_website') || ''),
      consent: data.get('contact_consent') === 'on'
    };
    if (!payload.consent) { status.textContent = 'Please agree to the contact data notice before sending.'; return; }
    send.disabled = true;
    status.textContent = 'Sending inquiry securely…';
    try {
      const response = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error('submission_failed');
      const result = await response.json();
      if (!result.ok) throw new Error('submission_failed');
      status.textContent = 'Your inquiry was submitted. Thank you.';
      form.reset();
    } catch {
      status.textContent = 'Online submission is unavailable. Use Prepare your inquiry to send it through your email application instead.';
      if (emailDraft) emailDraft.hidden = false;
    } finally {
      send.disabled = false;
    }
  });
})();