# Telegram Bot Setup & Testing Guide

## Implementation Complete ✅

The following files have been created/modified:

1. **Created:** `lib/telegram.ts` - Telegram notification utility
2. **Modified:** `app/api/submit-lead/route.ts` - Added Telegram logging
3. **Modified:** `app/components/HeroForm.tsx` - Send all submissions to API
4. **Modified:** `.env.local` - Added Telegram configuration placeholders

## Setup Instructions

### Step 1: Create Telegram Bot

1. Open Telegram and find [@BotFather](https://t.me/botfather)
2. Send `/newbot` command
3. Follow the instructions to name your bot (e.g., "Intermigro Leads Bot")
4. **Copy the bot token** (looks like: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

### Step 2: Get Chat ID

1. Create a new group chat (or use existing one)
2. Add the bot to your group chat
3. Send a test message to the group (e.g., "Hello bot!")
4. Open this URL in your browser (replace `<YOUR_TOKEN>` with your actual bot token):
   ```
   https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates
   ```
5. Look for the `"chat":{"id":-123456789}` field in the JSON response
6. **Copy the chat ID** (it will be a negative number for groups)

### Step 3: Configure Environment Variables

Edit `.env.local` and replace the placeholders:

```bash
TELEGRAM_BOT_TOKEN=<paste_your_bot_token_here>
TELEGRAM_CHAT_ID=<paste_your_chat_id_here>
```

### Step 4: Restart Development Server

```bash
pnpm dev
```

## What's Implemented

### Features

- ✅ **Real-time notifications** for all form submissions
- ✅ **Qualified leads** - Full data sent to Kommo + Telegram notification
- ✅ **Non-qualified leads** - Only Telegram notification (not sent to Kommo)
- ✅ **Error logging** - API errors logged to Telegram
- ✅ **Full data visibility** - No masking of contact information
- ✅ **Single chat** - All notifications in one group
- ✅ **Graceful degradation** - Form works even if Telegram fails

### Message Types

#### 1. Qualified Lead
```
🎯 Новый квалифицированный лид!

👤 Клиент:
   • Имя: [Name] [LastName]
   • Телефон: [Phone]
   • Email: [Email]
   • Telegram: [@username]

💼 Квалификация:
   • Профессия: [Career]
   • Образование: [Education]
   • Доход: [Income]€
   • Страна: [Country]

📊 UTM:
   • Source: [utm_source]
   • Medium: [utm_medium]
   • Campaign: [utm_campaign]

✅ Отправлено в Kommo

⏰ [Timestamp]
```

#### 2. Non-Qualified Lead
```
📝 Новая анкета (не квалифицирован)

👤 Клиент:
   • Имя: [Name] [LastName]
   • Телефон: [Phone]
   • Email: [Email]

💼 Данные:
   • Профессия: [Career]
   • Образование: [Education]
   • Доход: [Income]€

❌ Не отправлено в Kommo (не соответствует критериям)

⏰ [Timestamp]
```

#### 3. API Error
```
🚨 Ошибка API

❌ Тип: [Error type]
📍 Endpoint: [endpoint]
📊 Статус: [HTTP Status Code]

👤 Контекст: [Name] ([Email])

⏰ [Timestamp]
```

## Testing Checklist

### Test 1: Qualified Lead Submission

1. Fill out the form with:
   - Name: Test User
   - Last Name: Qualified
   - Phone: +49 151 12345678
   - Email: test@example.com
   - Career: Engineering
   - Education: Higher
   - Income: >3000€ (will qualify)
   - Accept privacy policy

2. Submit the form

3. **Expected Results:**
   - ✅ Form submits successfully
   - ✅ Success modal appears
   - ✅ Telegram notification received with "🎯 Новый квалифицированный лид!"
   - ✅ Message shows "✅ Отправлено в Kommo"
   - ✅ Lead appears in Kommo CRM

### Test 2: Non-Qualified Lead Submission

1. Fill out the form with:
   - Name: Test User
   - Last Name: NotQualified
   - Phone: +49 151 12345678
   - Email: test2@example.com
   - Career: Other
   - Education: School
   - Income: <1000€ (will NOT qualify)
   - Accept privacy policy

2. Submit the form

3. **Expected Results:**
   - ✅ Form submits successfully
   - ✅ Success modal appears
   - ✅ Telegram notification received with "📝 Новая анкета (не квалифицирован)"
   - ✅ Message shows "❌ Не отправлено в Kommo (не соответствует критериям)"
   - ✅ Lead does NOT appear in Kommo CRM

### Test 3: Error Handling

1. Temporarily break Kommo credentials in `.env.local`:
   ```bash
   KOMMO_API_TOKEN=invalid_token_for_testing
   ```

2. Restart dev server: `pnpm dev`

3. Submit a qualified lead

4. **Expected Results:**
   - ✅ Telegram notification received with "🚨 Ошибка API"
   - ✅ Error details shown in message
   - ✅ Form still displays success modal (graceful failure)

5. **Restore the correct token** after testing!

### Test 4: Telegram Disabled

1. Remove/comment out Telegram env vars in `.env.local`:
   ```bash
   # TELEGRAM_BOT_TOKEN=...
   # TELEGRAM_CHAT_ID=...
   ```

2. Restart dev server

3. Submit a form

4. **Expected Results:**
   - ✅ Form still works normally
   - ✅ Console shows "Telegram not configured - skipping notification"
   - ✅ No Telegram messages sent
   - ✅ Qualified leads still sent to Kommo

### Test 5: Special Characters

1. Submit with Cyrillic characters:
   - Name: Иван
   - Last Name: Петров
   - Career (Other): Инженер-программист

2. **Expected Results:**
   - ✅ Telegram message displays correctly
   - ✅ No encoding issues

## Troubleshooting

### No Telegram Messages Received

1. **Check bot token:**
   ```bash
   curl https://api.telegram.org/bot<YOUR_TOKEN>/getMe
   ```
   Should return bot info

2. **Check chat ID:**
   - Make sure it's a negative number for groups
   - Verify bot is still in the group

3. **Check server logs:**
   - Look for "Telegram not configured" warnings
   - Check for API errors

4. **Test Telegram API directly:**
   ```bash
   curl -X POST "https://api.telegram.org/bot<YOUR_TOKEN>/sendMessage" \
     -H "Content-Type: application/json" \
     -d '{"chat_id":"<YOUR_CHAT_ID>","text":"Test message"}'
   ```

### Form Not Submitting

1. Check browser console for errors
2. Check server logs (`pnpm dev` output)
3. Verify all required environment variables are set
4. Try with Telegram disabled to isolate the issue

### Messages Not Formatted Correctly

- Telegram uses HTML parse mode
- Special characters like `<`, `>`, `&` may need escaping
- Check message in Telegram utility: `lib/telegram.ts`

## Architecture Notes

### Flow Diagram

```
User submits form
    ↓
HeroForm.tsx validates & determines qualification
    ↓
Sends to /api/submit-lead with isQualified flag
    ↓
API Route checks isQualified:
    ├─ If false → Log to Telegram only → Return success
    ├─ If true → Send to Kommo CRM
    │              ↓
    │           Success → Log to Telegram → Return success
    │              ↓
    │           Error → Log error to Telegram → Return error
    └─ Catch errors → Log to Telegram → Return error
```

### Error Handling Philosophy

- **Silent failures** - Telegram errors never break form submission
- **Try-catch wrappers** - All Telegram calls are wrapped
- **Environment checks** - Skip Telegram if not configured
- **Console logging** - Errors logged to console for debugging

### Security Considerations

- Bot token in environment variables (not in code)
- Group chat should be private
- No sensitive credentials in error logs
- Telegram API uses TLS encryption

## Next Steps

1. **Deploy to production:**
   - Add Telegram env vars to production environment
   - Test with real submissions

2. **Monitor notifications:**
   - Check Telegram group regularly
   - Verify all leads are being captured

3. **Optional enhancements:**
   - Add notification preferences (email, SMS)
   - Create different chats for qualified vs non-qualified
   - Add analytics tracking to Telegram messages
   - Implement message rate limiting

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review server logs and browser console
3. Test Telegram API directly
4. Verify all environment variables

---

**Implementation Date:** February 15, 2026
**Status:** Complete and ready for testing
