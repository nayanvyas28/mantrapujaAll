# Admin Panel Integration Steps (Gemini AI & Security)

Since you are setting up the Admin Panel on a new system, follow these steps to ensure the Guru AI chatbot works seamlessly with the mobile app.

## 1. Environment Configuration
Add the following key to your `.env.local` file in the new Admin project:

```env
ENCRYPTION_STRING_KEY=CecrRPtczs4FSGqq
```
*Note: This must be exactly 16 characters to match the AES-128 encryption used by the mobile app's setup.*

## 2. API Proxy Route (The "HTML vs JSON" Fix)
Create the file: `src/app/api/chat/route.ts`

**Crucial Fix for JSON Error:** 
Ensure this file is outside of any `(dashboard)` groups if you have a middleware or layout in that group that redirects unauthenticated users to `/` (the login page). If a request hits a redirect, it returns HTML, causing the mobile app error.

**Recommended Code:**
```typescript
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

// Setup Supabase Admin (Bypass RLS to get settings)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { message, chatHistory } = await req.json();

    // 1. Fetch encrypted Gemini Key & System Prompt
    const { data: settings } = await supabaseAdmin
      .from('settings')
      .select('key, value')
      .in('key', ['gemini_api_key', 'guru_system_prompt']);

    const apiKeyEncrypted = settings?.find(s => s.key === 'gemini_api_key')?.value;
    const systemPrompt = settings?.find(s => s.key === 'guru_system_prompt')?.value || "You are a spiritual guide.";

    if (!apiKeyEncrypted) return NextResponse.json({ error: 'AI Not Configured' }, { status: 500 });

    // 2. Decrypt API Key
    const [ivHex, encryptedText] = apiKeyEncrypted.split(':');
    const decipher = crypto.createDecipheriv('aes-128-cbc', Buffer.from('CecrRPtczs4FSGqq'), Buffer.from(ivHex, 'hex'));
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    // 3. Call Gemini API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${decrypted}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: [...chatHistory || [], { parts: [{ text: message }] }]
      }),
    });

    const data = await response.json();
    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Guruji is meditating. Try again.";

    return NextResponse.json({ text: aiText });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
```

## 3. Database Table
Ensure the `settings` table exists in Supabase:
- `key` (text, primary key)
- `value` (text)
- `updated_at` (timestamp)

## 4. Why you saw "HTML Response"
If your API route is inside a protected folder (like `/app/(dashboard)/api/chat`), Next.js might be redirecting the mobile app's request to the Login page (HTML) because it doesn't see a browser session. 
**Solution:** Keep the `api` folder directly under `src/app/api` to avoid dashboard middleware.
