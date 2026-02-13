import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

interface LeadData {
  name: string;
  lastName: string;
  phone: string;
  email: string;
  career: string;
  careerOther?: string;
  telegram: string;
  education: string;
  income: number;
  country?: string; // Auto-detected from phone number
  // UTM parameters (optional)
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

export async function POST(request: NextRequest) {
  try {
    const leadData: LeadData = await request.json();
    console.log("Lead submission received:", {
      name: leadData.name,
      utm_source: leadData.utm_source,
      utm_medium: leadData.utm_medium,
      utm_campaign: leadData.utm_campaign,
    });

    const KOMMO_SUBDOMAIN = process.env.KOMMO_SUBDOMAIN;
    const KOMMO_API_TOKEN = process.env.KOMMO_API_TOKEN;
    const KOMMO_PIPELINE_ID = process.env.KOMMO_PIPELINE_ID;
    const KOMMO_PHONE_FIELD_ID = process.env.KOMMO_PHONE_FIELD_ID;
    const KOMMO_EMAIL_FIELD_ID = process.env.KOMMO_EMAIL_FIELD_ID;
    const KOMMO_COUNTRY_FIELD_ID = process.env.KOMMO_COUNTRY_FIELD_ID;

    // UTM field IDs
    const KOMMO_UTM_SOURCE_FIELD_ID = process.env.KOMMO_UTM_SOURCE_FIELD_ID;
    const KOMMO_UTM_MEDIUM_FIELD_ID = process.env.KOMMO_UTM_MEDIUM_FIELD_ID;
    const KOMMO_UTM_CAMPAIGN_FIELD_ID = process.env.KOMMO_UTM_CAMPAIGN_FIELD_ID;
    const KOMMO_UTM_CONTENT_FIELD_ID = process.env.KOMMO_UTM_CONTENT_FIELD_ID;
    const KOMMO_UTM_TERM_FIELD_ID = process.env.KOMMO_UTM_TERM_FIELD_ID;

    // Validate required environment variables
    if (
      !KOMMO_SUBDOMAIN ||
      !KOMMO_API_TOKEN ||
      !KOMMO_PIPELINE_ID ||
      !KOMMO_PHONE_FIELD_ID ||
      !KOMMO_EMAIL_FIELD_ID
    ) {
      console.error("Missing required Kommo environment variables");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    // Prepare contact custom fields (only existing fields in Kommo)
    const contactFields: any[] = [
      {
        field_id: parseInt(KOMMO_EMAIL_FIELD_ID),
        values: [{ value: leadData.email }],
      },
      {
        field_id: parseInt(KOMMO_PHONE_FIELD_ID),
        values: [{ value: leadData.phone }],
      },
    ];

    // Add Telegram if provided (Field ID: 1709360)
    if (leadData.telegram) {
      contactFields.push({
        field_id: 1709360,
        values: [{ value: leadData.telegram }],
      });
    }

    // Add Career/Position (Field ID: 467698 - Должность)
    // Use careerOther value if career is "other", otherwise use career
    const careerValue = leadData.career === "other" && leadData.careerOther
      ? leadData.careerOther
      : leadData.career;
    contactFields.push({
      field_id: 467698,
      values: [{ value: careerValue }],
    });

    // Add Education (Field ID: 1750744 - Образование)
    contactFields.push({
      field_id: 1750744,
      values: [{ value: leadData.education }],
    });

    // Add Income (Field ID: 1750748 - Доход)
    contactFields.push({
      field_id: 1750748,
      values: [{ value: leadData.income.toString() }],
    });

    // Add Surname (Field ID: 1767888 - Фамилия)
    if (leadData.lastName) {
      contactFields.push({
        field_id: 1767888,
        values: [{ value: leadData.lastName }],
      });
    }

    // Add Country (auto-detected from phone number)
    if (leadData.country && KOMMO_COUNTRY_FIELD_ID) {
      contactFields.push({
        field_id: parseInt(KOMMO_COUNTRY_FIELD_ID),
        values: [{ value: leadData.country }],
      });
    }

    // Prepare lead custom fields (only UTM tracking data)
    const leadCustomFields: any[] = [];

    // Add UTM parameters if provided
    if (leadData.utm_source && KOMMO_UTM_SOURCE_FIELD_ID) {
      leadCustomFields.push({
        field_id: parseInt(KOMMO_UTM_SOURCE_FIELD_ID),
        values: [{ value: leadData.utm_source }],
      });
    }
    if (leadData.utm_medium && KOMMO_UTM_MEDIUM_FIELD_ID) {
      leadCustomFields.push({
        field_id: parseInt(KOMMO_UTM_MEDIUM_FIELD_ID),
        values: [{ value: leadData.utm_medium }],
      });
    }
    if (leadData.utm_campaign && KOMMO_UTM_CAMPAIGN_FIELD_ID) {
      leadCustomFields.push({
        field_id: parseInt(KOMMO_UTM_CAMPAIGN_FIELD_ID),
        values: [{ value: leadData.utm_campaign }],
      });
    }
    if (leadData.utm_content && KOMMO_UTM_CONTENT_FIELD_ID) {
      leadCustomFields.push({
        field_id: parseInt(KOMMO_UTM_CONTENT_FIELD_ID),
        values: [{ value: leadData.utm_content }],
      });
    }
    if (leadData.utm_term && KOMMO_UTM_TERM_FIELD_ID) {
      leadCustomFields.push({
        field_id: parseInt(KOMMO_UTM_TERM_FIELD_ID),
        values: [{ value: leadData.utm_term }],
      });
    }

    // Generate unique source_uid for this lead
    const source_uid = crypto
      .createHash("md5")
      .update(`${leadData.email}-${Date.now()}`)
      .digest("hex");

    // Prepare the payload for Kommo Incoming Leads API
    const currentTimestamp = Math.floor(Date.now() / 1000); // Unix timestamp
    const refererUrl = request.headers.get("referer") || "https://intermigro.com";

    const incomingLeadPayload: any = {
      source_name: "Intermigro Website",
      source_uid: source_uid,
      pipeline_id: parseInt(KOMMO_PIPELINE_ID),
      created_at: currentTimestamp,
      metadata: {
        form_id: "hero-form",
        form_name: "Consultation Request",
        form_page: refererUrl,
        form_sent_at: currentTimestamp,
        referer: refererUrl,
      },
      _embedded: {
        contacts: [
          {
            name: leadData.name,
            first_name: leadData.name,
            custom_fields_values: contactFields,
          },
        ],
        leads: [
          {
            name: `Заявка: ${leadData.name} ${leadData.lastName}`,
            price: 0, // Service price - will be filled manually
            custom_fields_values: leadCustomFields,
          },
        ],
      },
    };

    const kommoPayload = [incomingLeadPayload];

    // Send to Kommo Incoming Leads API
    const response = await fetch(
      `https://${KOMMO_SUBDOMAIN}.kommo.com/api/v4/leads/unsorted/forms`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${KOMMO_API_TOKEN}`,
        },
        body: JSON.stringify(kommoPayload),
      },
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("=== KOMMO API ERROR ===");
      console.error("Status:", response.status);
      console.error("Response:", errorData);
      console.error("Payload sent:", JSON.stringify(kommoPayload, null, 2));
      return NextResponse.json({ error: "Failed to create lead in CRM" }, { status: response.status });
    }

    const result = await response.json();
    console.log("Incoming lead created in Kommo:", result);

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error submitting lead:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
