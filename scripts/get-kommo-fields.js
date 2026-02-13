#!/usr/bin/env node
/**
 * Helper script to fetch Kommo field IDs
 * This will show all contact fields with their IDs
 */

const KOMMO_SUBDOMAIN = "intermigro";
const KOMMO_API_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImQzMzczNzBmMjA2ZTc2ZGE0NWNiZDJjMDFkZmI3NmYzMTY4OTMyNTAwOGE1ZmE1NTViMDU2YjljMWQ3MjdkOTU5MGI4NjRhNjY0NWY0MGViIn0.eyJhdWQiOiI1ZGY4NmE5OC0xYjE0LTQwOWYtOWRiYy04YzY4MDY1ZWQ5OTkiLCJqdGkiOiJkMzM3MzcwZjIwNmU3NmRhNDVjYmQyYzAxZGZiNzZmMzE2ODkzMjUwMDhhNWZhNTU1YjA1NmI5YzFkNzI3ZDk1OTBiODY0YTY2NDVmNDBlYiIsImlhdCI6MTc3MDc0NDQwOSwibmJmIjoxNzcwNzQ0NDA5LCJleHAiOjE4ODAyMzY4MDAsInN1YiI6IjE0NjcwNjQ3IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjM1OTYxOTM5LCJiYXNlX2RvbWFpbiI6ImtvbW1vLmNvbSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiOTI3ODFjMmUtZDU4Ni00NmRjLWJhOTAtMDVlNDA3ZTYwODhiIiwiYXBpX2RvbWFpbiI6ImFwaS1jLmtvbW1vLmNvbSJ9.HSe1cA3vg4qsClKpYhOLDxpz_ysAjRjY1HSozvj4efm1ovjZlHzO9oA-EFa_wc1Ls--K9OKiOWy8R8zY0lHyOOI67Y0oTkT93TuBCd_uY6GaxLk8ADnWo7OvMDuW5E2_PgjHiXfbpXIiusQSTQHWmtsX-DM7uxblYouPLh9mMt8zFk5naGW38wwEgDcjTPhGo7l51TqI-AMyTfVq5dsmLCoI9ZOZz3GL5L6ES-PSPzPRcpOsE1NnAPDdyC0GovQhb84EA1oiUUTdGzwzQiFzzHKMlh2BVckNQsqJgbDI8zRahIwVd7BOweczb4nZ_oy_Cg_Kq9Y4m5s3Os1JNKkwIg";

async function fetchKommoFields() {
  try {
    console.log("Fetching contact fields from Kommo...\n");

    const response = await fetch(
      `https://${KOMMO_SUBDOMAIN}.kommo.com/api/v4/contacts/custom_fields`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${KOMMO_API_TOKEN}`,
        },
      },
    );

    if (!response.ok) {
      console.error(`Error: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.error(errorText);
      return;
    }

    const data = await response.json();

    console.log("=== CONTACT FIELDS ===\n");

    if (data._embedded && data._embedded.custom_fields) {
      const fields = data._embedded.custom_fields;

      // Find phone and email fields
      const phoneField = fields.find((f) => f.code === "PHONE");
      const emailField = fields.find((f) => f.code === "EMAIL");

      console.log("📱 PHONE FIELD:");
      if (phoneField) {
        console.log(`   ID: ${phoneField.id}`);
        console.log(`   Name: ${phoneField.name}`);
        console.log(`   Code: ${phoneField.code}`);
      } else {
        console.log("   ❌ Not found");
      }

      console.log("\n📧 EMAIL FIELD:");
      if (emailField) {
        console.log(`   ID: ${emailField.id}`);
        console.log(`   Name: ${emailField.name}`);
        console.log(`   Code: ${emailField.code}`);
      } else {
        console.log("   ❌ Not found");
      }

      console.log("\n=== ALL CONTACT FIELDS ===\n");
      fields.forEach((field) => {
        console.log(`${field.name}:`);
        console.log(`  ID: ${field.id}`);
        console.log(`  Code: ${field.code || "N/A"}`);
        console.log(`  Type: ${field.type}`);
        console.log("");
      });

      // Generate .env values
      console.log("\n=== COPY THESE TO YOUR .env.local ===\n");
      if (phoneField) {
        console.log(`KOMMO_PHONE_FIELD_ID=${phoneField.id}`);
      }
      if (emailField) {
        console.log(`KOMMO_EMAIL_FIELD_ID=${emailField.id}`);
      }
    } else {
      console.log("No fields found");
    }
  } catch (error) {
    console.error("Error fetching fields:", error);
  }
}

// Also fetch pipelines
async function fetchPipelines() {
  try {
    console.log("\n\n=== PIPELINES ===\n");

    const response = await fetch(`https://${KOMMO_SUBDOMAIN}.kommo.com/api/v4/leads/pipelines`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${KOMMO_API_TOKEN}`,
      },
    });

    if (!response.ok) {
      console.error(`Error: ${response.status} ${response.statusText}`);
      return;
    }

    const data = await response.json();

    if (data._embedded && data._embedded.pipelines) {
      const pipelines = data._embedded.pipelines;

      pipelines.forEach((pipeline) => {
        console.log(`\n📊 ${pipeline.name}:`);
        console.log(`   Pipeline ID: ${pipeline.id}`);
        console.log(`   Statuses:`);

        if (pipeline._embedded && pipeline._embedded.statuses) {
          pipeline._embedded.statuses.forEach((status) => {
            console.log(`      - ${status.name} (ID: ${status.id})`);
          });
        }
      });

      console.log("\n=== SUGGESTED VALUES FOR .env.local ===\n");
      if (pipelines[0]) {
        console.log(`KOMMO_PIPELINE_ID=${pipelines[0].id}`);
        if (pipelines[0]._embedded?.statuses?.[0]) {
          console.log(
            `KOMMO_STATUS_ID=${pipelines[0]._embedded.statuses[0].id} # Optional - first stage`,
          );
        }
      }
    }
  } catch (error) {
    console.error("Error fetching pipelines:", error);
  }
}

// Run both
(async () => {
  await fetchKommoFields();
  await fetchPipelines();
})();
