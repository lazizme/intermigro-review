import { NextResponse } from "next/server";

export async function GET() {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  // Check if env vars are set
  if (!botToken || !chatId) {
    return NextResponse.json({
      success: false,
      error: "Environment variables not set",
      hasToken: !!botToken,
      hasChatId: !!chatId,
    });
  }

  // Try to send a test message
  try {
    const message = `🧪 Test message from production server\n\n⏰ ${new Date().toISOString()}`;

    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        error: "Telegram API error",
        status: response.status,
        details: result,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Test message sent successfully!",
      telegramResponse: result,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Exception thrown",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
