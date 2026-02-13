#!/usr/bin/env node
/**
 * Helper script to fetch Kommo lead custom field IDs
 */

const KOMMO_SUBDOMAIN = "intermigro";
const KOMMO_API_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImQzMzczNzBmMjA2ZTc2ZGE0NWNiZDJjMDFkZmI3NmYzMTY4OTMyNTAwOGE1ZmE1NTViMDU2YjljMWQ3MjdkOTU5MGI4NjRhNjY0NWY0MGViIn0.eyJhdWQiOiI1ZGY4NmE5OC0xYjE0LTQwOWYtOWRiYy04YzY4MDY1ZWQ5OTkiLCJqdGkiOiJkMzM3MzcwZjIwNmU3NmRhNDVjYmQyYzAxZGZiNzZmMzE2ODkzMjUwMDhhNWZhNTU1YjA1NmI5YzFkNzI3ZDk1OTBiODY0YTY2NDVmNDBlYiIsImlhdCI6MTc3MDc0NDQwOSwibmJmIjoxNzcwNzQ0NDA5LCJleHAiOjE4ODAyMzY4MDAsInN1YiI6IjE0NjcwNjQ3IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjM1OTYxOTM5LCJiYXNlX2RvbWFpbiI6ImtvbW1vLmNvbSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiOTI3ODFjMmUtZDU4Ni00NmRjLWJhOTAtMDVlNDA3ZTYwODhiIiwiYXBpX2RvbWFpbiI6ImFwaS1jLmtvbW1vLmNvbSJ9.HSe1cA3vg4qsClKpYhOLDxpz_ysAjRjY1HSozvj4efm1ovjZlHzO9oA-EFa_wc1Ls--K9OKiOWy8R8zY0lHyOOI67Y0oTkT93TuBCd_uY6GaxLk8ADnWo7OvMDuW5E2_PgjHiXfbpXIiusQSTQHWmtsX-DM7uxblYouPLh9mMt8zFk5naGW38wwEgDcjTPhGo7l51TqI-AMyTfVq5dsmLCoI9ZOZz3GL5L6ES-PSPzPRcpOsE1NnAPDdyC0GovQhb84EA1oiUUTdGzwzQiFzzHKMlh2BVckNQsqJgbDI8zRahIwVd7BOweczb4nZ_oy_Cg_Kq9Y4m5s3Os1JNKkwIg";

async function fetchLeadFields() {
  try {
    console.log("Fetching lead custom fields from Kommo...\n");

    const response = await fetch(
      `https://${KOMMO_SUBDOMAIN}.kommo.com/api/v4/leads/custom_fields`,
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

    console.log("=== LEAD CUSTOM FIELDS ===\n");

    if (data._embedded && data._embedded.custom_fields) {
      const fields = data._embedded.custom_fields;

      fields.forEach((field) => {
        console.log(`${field.name}:`);
        console.log(`  ID: ${field.id}`);
        console.log(`  Code: ${field.code || "N/A"}`);
        console.log(`  Type: ${field.type}`);
        if (field.enums && field.enums.length > 0) {
          console.log(`  Options:`);
          field.enums.forEach((option) => {
            console.log(`    - ${option.value} (ID: ${option.id})`);
          });
        }
        console.log("");
      });
    } else {
      console.log("No lead custom fields found");
    }
  } catch (error) {
    console.error("Error fetching lead fields:", error);
  }
}

fetchLeadFields();
