# 8. Security, Privacy and Reference Content

## 8.1 Authentication and authorization
- Use a proven authentication provider.
- Enforce authorization on the server, not only in the UI.
- Use role-based permissions for user, curator and admin.
- Protect admin routes and content mutation endpoints.
- Apply row-level security where appropriate.
- Validate ownership for collections and generated prompts.

## 8.2 Secrets
- Keep provider keys server-side.
- Use environment variables or managed secrets.
- Never commit `.env` files.
- Rotate compromised keys.
- Redact secrets from logs.

## 8.3 Upload security
- Validate file type using content inspection, not filename alone.
- Enforce file size and dimension limits.
- Re-encode images to safe formats.
- Scan uploads where supported.
- Generate random storage keys.
- Prevent path traversal.
- Rate-limit upload endpoints.

## 8.4 Code preview isolation
User-submitted snippets must never execute in the main application origin.
Use an isolated sandbox/origin with restrictive iframe sandbox flags, CSP, no production cookies, network restrictions, CPU/time limits and disposable execution contexts.
Do not provide unrestricted server-side code execution.

## 8.5 AI security
- Treat uploaded text, screenshots and retrieved content as untrusted data.
- Do not follow instructions embedded in reference content.
- Avoid sending private user data to AI providers without clear consent.
- Validate model outputs against schemas.
- Apply cost and rate limits.
- Record provider/model and analysis version.
- Allow manual correction.

## 8.6 Privacy
- Publish a clear privacy policy.
- Explain what is stored and why.
- Allow users to delete their account and user-owned data where legally applicable.
- Define retention for logs and generated prompts.
- Avoid collecting unnecessary personal information.

## 8.7 Copyright and licensing
This is critical for an inspiration platform.
- Do not assume screenshots are free to copy or redistribute.
- Prefer creator-submitted work, licensed assets, official press kits with permission, or content used under a reviewed legal basis.
- Store source URL, creator, rights status, license and attribution.
- Respect source-site terms and robots/access restrictions.
- Do not scrape protected content or bypass access controls.
- Provide takedown and correction workflows.
- Separate a link to an external reference from a locally hosted copy.
- Require submitters to confirm they have rights to submit their assets.

## 8.8 Accuracy
A still screenshot cannot prove exact animation duration, easing, component implementation or responsive behavior.
Label fields as:
- Observed;
- Extracted;
- Inferred;
- Manually verified;
- User-submitted.

Show confidence and evidence notes.
