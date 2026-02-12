# Kommo CRM Integration Guide

This document describes how to send lead data to Kommo CRM using their Incoming Leads API.

## Overview

We use Kommo's **Incoming Leads API** (`/api/v4/leads/unsorted/forms`) to create leads that appear in the "НЕРАЗОБРАННОЕ" (Incoming/Unsorted) stage of the funnel.

## Authentication

**Method:** Bearer Token

```
Authorization: Bearer YOUR_API_TOKEN
```

## API Endpoint

```
POST https://{SUBDOMAIN}.kommo.com/api/v4/leads/unsorted/forms
```

**Our subdomain:** `intermigro`

**Full endpoint:** `https://intermigro.kommo.com/api/v4/leads/unsorted/forms`

## Environment Variables Required

```bash
# Kommo CRM Configuration
KOMMO_SUBDOMAIN=intermigro
KOMMO_API_TOKEN=your-api-token-here
KOMMO_PIPELINE_ID=12984871
KOMMO_PHONE_FIELD_ID=467700
KOMMO_EMAIL_FIELD_ID=467702

# UTM tracking field IDs (optional but recommended)
KOMMO_UTM_SOURCE_FIELD_ID=467714
KOMMO_UTM_MEDIUM_FIELD_ID=467710
KOMMO_UTM_CAMPAIGN_FIELD_ID=467712
KOMMO_UTM_CONTENT_FIELD_ID=467708
KOMMO_UTM_TERM_FIELD_ID=467716
```

## Request Payload Structure

The payload is an **array** of incoming lead objects:

```typescript
[
  {
    source_name: string,           // Required: Integration name
    source_uid: string,             // Required: Unique identifier for this lead
    pipeline_id: number,            // Required: Target pipeline ID
    created_at: number,             // Required: Unix timestamp
    metadata: {
      form_id: string,              // Form identifier
      form_name: string,            // Human-readable form name
      form_page: string,            // URL where form was submitted
      form_sent_at: number,         // Required: Unix timestamp
      referer?: string,             // Optional: Referrer URL
    },
    _embedded: {
      contacts: [                   // Array of contacts (usually 1)
        {
          name: string,             // Full name
          first_name?: string,      // Optional: First name
          last_name?: string,       // Optional: Last name
          custom_fields_values: [   // Contact custom fields
            {
              field_id: number,
              values: [{ value: string }]
            }
          ]
        }
      ],
      leads: [                      // Array of leads (usually 1)
        {
          name: string,             // Lead name/title
          price: number,            // Lead value (0 if unknown)
          custom_fields_values: [   // Lead custom fields
            {
              field_id: number,
              values: [{ value: string | number }]
            }
          ]
        }
      ]
    }
  }
]
```

## Field IDs Reference

### Contact Fields
- **Phone:** `467700` (field_code: `PHONE`)
- **Email:** `467702` (field_code: `EMAIL`)
- **Telegram:** `1709360`

### Lead Custom Fields
- **Career/Profession:** `488804`
- **Education:** `1711074`
- **Income:** `1709444`

### UTM Tracking Fields (Lead)
- **utm_source:** `467714` (field_code: `UTM_SOURCE`)
- **utm_medium:** `467710` (field_code: `UTM_MEDIUM`)
- **utm_campaign:** `467712` (field_code: `UTM_CAMPAIGN`)
- **utm_content:** `467708` (field_code: `UTM_CONTENT`)
- **utm_term:** `467716` (field_code: `UTM_TERM`)
- **utm_referrer:** `467718` (field_code: `UTM_REFERRER`)

## Complete Example

```typescript
import crypto from "crypto";

interface LeadSubmission {
  name: string;
  lastName: string;
  phone: string;
  email?: string;
  telegram?: string;
  career?: string;
  education?: string;
  income?: number;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

async function submitLeadToKommo(leadData: LeadSubmission) {
  const KOMMO_SUBDOMAIN = process.env.KOMMO_SUBDOMAIN; // "intermigro"
  const KOMMO_API_TOKEN = process.env.KOMMO_API_TOKEN;
  const KOMMO_PIPELINE_ID = process.env.KOMMO_PIPELINE_ID; // 12984871

  // Generate unique source_uid for this lead
  const source_uid = crypto
    .createHash("md5")
    .update(`${leadData.email || leadData.phone}-${Date.now()}`)
    .digest("hex");

  const currentTimestamp = Math.floor(Date.now() / 1000);

  // Prepare contact custom fields
  const contactFields: any[] = [];

  if (leadData.phone) {
    contactFields.push({
      field_id: 467700, // PHONE
      values: [{ value: leadData.phone }],
    });
  }

  if (leadData.email) {
    contactFields.push({
      field_id: 467702, // EMAIL
      values: [{ value: leadData.email }],
    });
  }

  if (leadData.telegram) {
    contactFields.push({
      field_id: 1709360, // TELEGRAM
      values: [{ value: leadData.telegram }],
    });
  }

  // Prepare lead custom fields
  const leadCustomFields: any[] = [];

  if (leadData.career) {
    leadCustomFields.push({
      field_id: 488804, // Career
      values: [{ value: leadData.career }],
    });
  }

  if (leadData.education) {
    leadCustomFields.push({
      field_id: 1711074, // Education
      values: [{ value: leadData.education }],
    });
  }

  if (leadData.income !== undefined) {
    leadCustomFields.push({
      field_id: 1709444, // Income
      values: [{ value: leadData.income }],
    });
  }

  // Add UTM parameters
  if (leadData.utm_source) {
    leadCustomFields.push({
      field_id: 467714, // utm_source
      values: [{ value: leadData.utm_source }],
    });
  }

  if (leadData.utm_medium) {
    leadCustomFields.push({
      field_id: 467710, // utm_medium
      values: [{ value: leadData.utm_medium }],
    });
  }

  if (leadData.utm_campaign) {
    leadCustomFields.push({
      field_id: 467712, // utm_campaign
      values: [{ value: leadData.utm_campaign }],
    });
  }

  if (leadData.utm_content) {
    leadCustomFields.push({
      field_id: 467708, // utm_content
      values: [{ value: leadData.utm_content }],
    });
  }

  if (leadData.utm_term) {
    leadCustomFields.push({
      field_id: 467716, // utm_term
      values: [{ value: leadData.utm_term }],
    });
  }

  // Build the payload
  const payload = [
    {
      source_name: "Internal Lead Form", // Change to your form name
      source_uid: source_uid,
      pipeline_id: parseInt(KOMMO_PIPELINE_ID),
      created_at: currentTimestamp,
      metadata: {
        form_id: "internal-form",
        form_name: "Internal Lead Submission",
        form_page: "https://yourapp.com/form",
        form_sent_at: currentTimestamp,
      },
      _embedded: {
        contacts: [
          {
            name: `${leadData.name} ${leadData.lastName}`,
            first_name: leadData.name,
            last_name: leadData.lastName,
            custom_fields_values: contactFields,
          },
        ],
        leads: [
          {
            name: `Заявка: ${leadData.name} ${leadData.lastName}`,
            price: 0,
            custom_fields_values: leadCustomFields,
          },
        ],
      },
    },
  ];

  // Send to Kommo
  const response = await fetch(
    `https://${KOMMO_SUBDOMAIN}.kommo.com/api/v4/leads/unsorted/forms`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${KOMMO_API_TOKEN}`,
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Kommo API error: ${errorData}`);
  }

  const result = await response.json();
  return result;
}
```

## Simplified Example (Minimal Fields)

For your internal tool with just Name, Surname, Phone, Telegram, and Source:

```typescript
async function submitInternalLead(data: {
  name: string;
  surname: string;
  phone: string;
  telegram: string;
  source: string; // Will be used as utm_source
}) {
  const source_uid = crypto
    .createHash("md5")
    .update(`${data.phone}-${Date.now()}`)
    .digest("hex");

  const currentTimestamp = Math.floor(Date.now() / 1000);

  const payload = [
    {
      source_name: "Internal Team Form",
      source_uid: source_uid,
      pipeline_id: 12984871,
      created_at: currentTimestamp,
      metadata: {
        form_id: "internal-team-form",
        form_name: "Team Lead Submission",
        form_page: "https://internal.intermigro.com",
        form_sent_at: currentTimestamp,
      },
      _embedded: {
        contacts: [
          {
            name: `${data.name} ${data.surname}`,
            first_name: data.name,
            last_name: data.surname,
            custom_fields_values: [
              {
                field_id: 467700, // Phone
                values: [{ value: data.phone }],
              },
              {
                field_id: 1709360, // Telegram
                values: [{ value: data.telegram }],
              },
            ],
          },
        ],
        leads: [
          {
            name: `Заявка: ${data.name} ${data.surname}`,
            price: 0,
            custom_fields_values: [
              {
                field_id: 467714, // utm_source
                values: [{ value: data.source }],
              },
            ],
          },
        ],
      },
    },
  ];

  const response = await fetch(
    "https://intermigro.kommo.com/api/v4/leads/unsorted/forms",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.KOMMO_API_TOKEN}`,
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to create lead: ${response.status}`);
  }

  return await response.json();
}
```

## Response Format

**Success (200):**
```json
{
  "_total_items": 1,
  "_embedded": {
    "unsorted": [
      {
        "id": 123456,
        "request_id": "unique-id",
        "_embedded": {
          "leads": [
            {
              "id": 8876820,
              "_links": {
                "self": {
                  "href": "https://intermigro.kommo.com/api/v4/leads/8876820"
                }
              }
            }
          ],
          "contacts": [
            {
              "id": 7654321,
              "_links": {
                "self": {
                  "href": "https://intermigro.kommo.com/api/v4/contacts/7654321"
                }
              }
            }
          ]
        }
      }
    ]
  }
}
```

## Important Notes

1. **Always use the Incoming Leads API** (`/api/v4/leads/unsorted/forms`) to create leads in the incoming stage
2. **Do NOT use** `/api/v4/leads` or `/api/v4/leads/complex` - these bypass the incoming stage
3. **Do NOT update leads after creation** with PATCH - this triggers automations that move leads to wrong stages
4. **Include UTM fields in the initial creation payload** - they will persist correctly
5. **Generate unique source_uid** for each lead to prevent duplicates
6. **Always include form_sent_at** in metadata - it's required by Kommo
7. **Use Unix timestamps** (seconds, not milliseconds)

## Testing

To test your integration:

1. Create a lead with test data
2. Check Kommo CRM at `https://intermigro.kommo.com`
3. Lead should appear in "НЕРАЗОБРАННОЕ" (Incoming) section
4. All custom fields should be populated correctly
5. UTM fields should be visible in lead details

## Error Handling

Common errors:

- **400 Bad Request:** Missing required fields (check form_sent_at, source_name, source_uid)
- **401 Unauthorized:** Invalid API token
- **404 Not Found:** Wrong subdomain or endpoint
- **422 Unprocessable Entity:** Invalid field_id or malformed data

Always log the full error response from Kommo for debugging.

## API Token

The current API token expires on: **2029-11-11**

To get a new token or check field IDs, use the helper script:
```bash
node scripts/get-kommo-fields.js
```

## Additional Resources

- Kommo API Documentation: https://developers.kommo.com/reference/incoming-leads
- Field IDs can be fetched via: `GET https://intermigro.kommo.com/api/v4/leads/custom_fields`
- Pipeline IDs: `GET https://intermigro.kommo.com/api/v4/leads/pipelines`
