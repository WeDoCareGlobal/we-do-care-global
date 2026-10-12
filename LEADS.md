# Lead Pipeline — wedocare-global.com

## Flow

```
Visitor submits contact form (docs/index.html)
    → FormSubmit (formsubmit.co/emir@wedocare-global.com)
        → Email to: emir@wedocare-global.com   [PRIMARY LEAD STORE]
        → Auto-reply to submitter: "received, 24h response"
        → Redirect to: wedocare-global.com/thanks.html
```

## Setup status

- [x] Form posts to FormSubmit with table template + autoresponse + redirect
- [x] `thanks.html` confirmation page live
- [ ] **FormSubmit email verification** — first submission triggers a verification email to emir@wedocare-global.com. Click the link in that email to activate delivery. Until then, submissions are NOT delivered.
- [ ] (Optional) Gmail filter: from `formsubmit.co` → label "WDCG Leads" + skip inbox, so leads never get lost
- [ ] (Optional) FormSubmit dashboard → Google Sheets integration for structured lead log

## Lead handling

1. Lead arrives at emir@wedocare-global.com with subject "WDCG Enterprise Inquiry"
2. Reply within 24h (autoresponse promises this)
3. Log outcome manually in project_os (`log_lead` tool) or a local CRM

## Anti-spam

- Honeypot field (`_honey`) — bots that fill hidden fields are dropped
- reCAPTCHA enabled (`_captcha=true`)
- FormSubmit rate limiting on the endpoint
