# Simple Blog Post API Test

This guide allows you to quickly test the blog post creation API using `curl` or PowerShell.

**Endpoint:** `POST /api/blogs`

## Prerequisites

1. Ensure your local server is running at `http://localhost:3000`.
2. Make sure you have the `N8N_WEBHOOK_SECRET` environment variable set in your `.env.local`. If not set, use `"your_n8n_secret_here"` for testing if that's what's in your code logic (or update the code to use a specific secret).

## Test Command (PowerShell - Windows)

Run this in PowerShell to send a test blog post:

```powershell
$body = @{
    title = "Test Blog Post from PowerShell"
    slug = "test-blog-powershell-$(Get-Date -Format 'yyyyMMddHHmmss')"
    content = "<h1>Hello World</h1><p>This is a test post sent via PowerShell.</p>"
    image_url = "https://placehold.co/600x400/png"
    tags = @("Test", "PowerShell")
    published = $true
    secret = "your_n8n_secret_here" # REPLACE with your actual N8N_WEBHOOK_SECRET if different
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/blogs" -Method Post -ContentType "application/json" -Body $body
```

## Test Command (cURL - Mac/Linux/Bash)

Run this in your terminal:

```bash
curl -X POST http://localhost:3000/api/blogs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Blog Post from cURL",
    "slug": "test-blog-curl-'"$(date +%s)"'",
    "content": "<h1>Hello World</h1><p>This is a test post sent via cURL.</p>",
    "image_url": "https://placehold.co/600x400/png",
    "tags": ["Test", "cURL"],
    "published": true,
    "secret": "your_n8n_secret_here"
  }'
```

*(Note: Replace `your_n8n_secret_here` with your actual secret if you have set one in `.env.local`)*

## Expected Response

If successful, you should receive a JSON response similar to:

```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "title": "Test Blog Post from PowerShell",
      "slug": "test-blog-powershell-...",
      ...
    }
  ]
}
```

If the secret is incorrect, you will receive:

```json
{
  "error": "Unauthorized"
}
```
