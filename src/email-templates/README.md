# Irasah Events Email Templates

This module contains two table-based, inline-style email templates optimized for broad client compatibility.

- `inquiry-admin.html` - internal notification for new enquiries
- `inquiry-customer.html` - customer acknowledgement after submission

## Recommended Subject Lines

- Admin/Internal: `New Decoration Inquiry - {{decorationType}} | {{city}} | {{eventDate}}`
- Customer: `We Received Your Decoration Inquiry - Irasah Events`

## Token Contract

Use `{{token}}` placeholders exactly as shown.

Required tokens:

- `{{name}}`
- `{{mobileNumber}}`
- `{{email}}`
- `{{eventDate}}`
- `{{city}}`
- `{{eventAddress}}`
- `{{decorationType}}`
- `{{additionalNotes}}`

Optional tokens:

- `{{inquiryId}}`
- `{{submittedAt}}`
- `{{servicePageUrl}}`

## Fallback Rules

Apply fallback values in your template-rendering layer before sending:

- `additionalNotes` -> `"No additional notes provided"` when empty
- `inquiryId`, `submittedAt`, `servicePageUrl` -> `"-"` when unavailable

If `servicePageUrl` is not available, keep the link text as `-` and set href to your home page.

## Suggested Sending Flow

1. Receive enquiry payload from form.
2. Normalize data and inject fallback values.
3. Render `inquiry-admin.html` and send to internal team inbox.
4. Render `inquiry-customer.html` and send to customer email.

## Rendering Checklist

- Gmail web + mobile
- Outlook desktop/web
- Apple Mail

Verify:

- Placeholders are replaced correctly.
- `tel:` links and support links open correctly.
- Long address/notes wrap without layout break.
- Mobile width under `480px` remains readable.

## Text-Only Fallback (recommended)

Use this plain-text structure when HTML is not supported:

### Admin

New Decoration Inquiry

- Name: {{name}}
- Mobile: {{mobileNumber}}
- Email: {{email}}
- Decoration Type: {{decorationType}}
- Event Date: {{eventDate}}
- City: {{city}}
- Event Address: {{eventAddress}}
- Additional Notes: {{additionalNotes}}
- Inquiry ID: {{inquiryId}}
- Submitted At: {{submittedAt}}

### Customer

Hi {{name}},

We received your inquiry for `{{decorationType}}` on `{{eventDate}}` in `{{city}}`.
Our team will contact you shortly on `{{mobileNumber}}`.

Support:
- Phone: +91 8904502073, +91 7892047354
- Email: irasah.events@gmail.com
