---
description: Test the blog automation API to ensure n8n can post blogs.
---

1. Start the development server (if not already running)
// turbo
2. Run the test script
   ```bash
   node scripts/test-automation.js
   ```

3. Check the output
   - You should see a "Success!" message with the Blog ID and Slug.
   - If it fails, check your `N8N_WEBHOOK_SECRET` in `.env.local` matches the script.

4. Verify on Frontend
   - Go to `http://localhost:3000/blogs` to see the new post.
