/**
 * Telegram Bot Notification Utility
 * Sends real-time notifications for lead submissions and API errors
 */

interface FormData {
  name: string;
  lastName: string;
  phone: string;
  email: string;
  career: string;
  careerOther?: string;
  telegram?: string;
  education: string;
  income: number;
  country?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

interface SubmissionData {
  leadData: FormData;
  isQualified: boolean;
  kommoSuccess?: boolean;
}

interface ApiErrorData {
  error: string;
  leadName?: string;
  leadEmail?: string;
  statusCode?: number;
  endpoint?: string;
  timestamp: string;
}

// Telegram configuration
const config = {
  botToken: process.env.TELEGRAM_BOT_TOKEN,
  chatId: process.env.TELEGRAM_CHAT_ID,
};

/**
 * Base function to send a message to Telegram
 */
async function sendTelegramMessage(message: string): Promise<void> {
  // Check if Telegram is configured
  if (!config.botToken || !config.chatId) {
    console.warn("Telegram not configured - skipping notification");
    return;
  }

  try {
    const url = `https://api.telegram.org/bot${config.botToken}/sendMessage`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: config.chatId,
        text: message,
        parse_mode: "HTML",
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Telegram API error:", response.status, errorData);
    }
  } catch (error) {
    // Silent failure - never break the main flow
    console.error("Failed to send Telegram message:", error);
  }
}

/**
 * Format and send form submission notification
 */
export async function logFormSubmission(data: SubmissionData): Promise<void> {
  const { leadData, isQualified, kommoSuccess } = data;

  // Format timestamp
  const timestamp = new Date().toLocaleString("ru-RU", {
    timeZone: "Europe/Berlin",
    dateStyle: "short",
    timeStyle: "short",
  });

  // Format career with "Other" handling
  const careerDisplay = leadData.careerOther
    ? `${leadData.career} (${leadData.careerOther})`
    : leadData.career;

  if (isQualified) {
    // Qualified lead message
    const message = `🎯 <b>Новый квалифицированный лид!</b>

👤 <b>Клиент:</b>
   • Имя: ${leadData.name} ${leadData.lastName}
   • Телефон: ${leadData.phone}
   • Email: ${leadData.email}${leadData.telegram ? `\n   • Telegram: @${leadData.telegram}` : ""}

💼 <b>Квалификация:</b>
   • Профессия: ${careerDisplay}
   • Образование: ${leadData.education}
   • Доход: ${leadData.income}€${leadData.country ? `\n   • Страна: ${leadData.country}` : ""}

${leadData.utm_source || leadData.utm_medium || leadData.utm_campaign ? `📊 <b>UTM:</b>
   • Source: ${leadData.utm_source || "—"}
   • Medium: ${leadData.utm_medium || "—"}
   • Campaign: ${leadData.utm_campaign || "—"}${leadData.utm_content ? `\n   • Content: ${leadData.utm_content}` : ""}${leadData.utm_term ? `\n   • Term: ${leadData.utm_term}` : ""}

` : ""}${kommoSuccess ? "✅ Отправлено в Kommo" : "⚠️ Не отправлено в Kommo"}

⏰ ${timestamp}`;

    await sendTelegramMessage(message);
  } else {
    // Non-qualified lead message
    const message = `📝 <b>Новая анкета (не квалифицирован)</b>

👤 <b>Клиент:</b>
   • Имя: ${leadData.name} ${leadData.lastName}
   • Телефон: ${leadData.phone}
   • Email: ${leadData.email}${leadData.telegram ? `\n   • Telegram: @${leadData.telegram}` : ""}

💼 <b>Данные:</b>
   • Профессия: ${careerDisplay}
   • Образование: ${leadData.education}
   • Доход: ${leadData.income}€${leadData.country ? `\n   • Страна: ${leadData.country}` : ""}

${leadData.utm_source || leadData.utm_medium || leadData.utm_campaign ? `📊 <b>UTM:</b>
   • Source: ${leadData.utm_source || "—"}
   • Medium: ${leadData.utm_medium || "—"}
   • Campaign: ${leadData.utm_campaign || "—"}${leadData.utm_content ? `\n   • Content: ${leadData.utm_content}` : ""}${leadData.utm_term ? `\n   • Term: ${leadData.utm_term}` : ""}

` : ""}❌ Не отправлено в Kommo (не соответствует критериям)

⏰ ${timestamp}`;

    await sendTelegramMessage(message);
  }
}

/**
 * Format and send API error notification
 */
export async function logApiError(data: ApiErrorData): Promise<void> {
  // Format timestamp
  const timestamp = new Date().toLocaleString("ru-RU", {
    timeZone: "Europe/Berlin",
    dateStyle: "short",
    timeStyle: "short",
  });

  const message = `🚨 <b>Ошибка API</b>

❌ Тип: ${data.error}
📍 Endpoint: ${data.endpoint || "Unknown"}
📊 Статус: ${data.statusCode || "N/A"}

${data.leadName || data.leadEmail ? `👤 Контекст: ${data.leadName || "—"} (${data.leadEmail || "—"})

` : ""}⏰ ${timestamp}`;

  await sendTelegramMessage(message);
}
