import { NextRequest, NextResponse } from "next/server";

interface LeadData {
  name: string;
  lastName: string;
  phone: string;
  email: string;
  career: string;
  telegram: string;
  education: string;
  income: number;
}

export async function POST(request: NextRequest) {
  try {
    const leadData: LeadData = await request.json();

    const KOMMO_SUBDOMAIN = process.env.KOMMO_SUBDOMAIN;
    const KOMMO_API_TOKEN = process.env.KOMMO_API_TOKEN;
    const KOMMO_PIPELINE_ID = process.env.KOMMO_PIPELINE_ID;
    const KOMMO_STATUS_ID = process.env.KOMMO_STATUS_ID; // Optional - will use pipeline's first stage if not provided
    const KOMMO_PHONE_FIELD_ID = process.env.KOMMO_PHONE_FIELD_ID;
    const KOMMO_EMAIL_FIELD_ID = process.env.KOMMO_EMAIL_FIELD_ID;

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

    // Prepare lead custom fields
    const leadCustomFields: any[] = [
      {
        field_id: 488804, // Career/Work
        values: [{ value: leadData.career }],
      },
      {
        field_id: 1711074, // Education
        values: [{ value: leadData.education }],
      },
      {
        field_id: 1709444, // Income
        values: [{ value: leadData.income }],
      },
    ];

    // Prepare the payload for Kommo API
    const leadPayload: any = {
      name: `Заявка: ${leadData.name} ${leadData.lastName}`,
      price: 0, // Service price - will be filled manually
      pipeline_id: parseInt(KOMMO_PIPELINE_ID),
      custom_fields_values: leadCustomFields,
      _embedded: {
        contacts: [
          {
            name: `${leadData.name} ${leadData.lastName}`,
            first_name: leadData.name,
            last_name: leadData.lastName,
            custom_fields_values: contactFields,
          },
        ],
      },
    };

    // Add status_id if provided (otherwise Kommo uses the first stage in the pipeline)
    if (KOMMO_STATUS_ID) {
      leadPayload.status_id = parseInt(KOMMO_STATUS_ID);
    }

    const kommoPayload = [leadPayload];

    // Send to Kommo API
    const response = await fetch(`https://${KOMMO_SUBDOMAIN}.kommo.com/api/v4/leads/complex`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${KOMMO_API_TOKEN}`,
      },
      body: JSON.stringify(kommoPayload),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Kommo API error:", errorData);
      return NextResponse.json({ error: "Failed to create lead in CRM" }, { status: response.status });
    }

    const result = await response.json();
    console.log("Lead created in Kommo:", result);

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error submitting lead:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
