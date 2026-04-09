# Mantra Pooja Automation Demo

This document consolidates all resources related to the blog automation workflow for Mantra Pooja. It includes the n8n workflow configuration, the testing script, and usage instructions.

## 1. The Automation Workflow (n8n JSON)
Copy this JSON and import it into your n8n instance to set up the blog generation pipeline.

```json
{
  "nodes": [
    {
      "parameters": {
        "operation": "google_trends",
        "q": "={{ $json.keyword }}",
        "additionalFields": {},
        "requestOptions": {}
      },
      "type": "n8n-nodes-serpapi.serpApi",
      "typeVersion": 1,
      "position": [
        656,
        -544
      ],
      "id": "c712e66f-4b7c-4e9f-91d4-b5663a9daffa",
      "name": "Google_trends search",
      "credentials": {
        "serpApi": {
          "id": "uJ2C4BaToxoAXLw0",
          "name": "SerpApi account"
        }
      }
    },
    {
      "parameters": {
        "promptType": "define",
        "text": "=You are a professional content strategist and technical documentation writer.\n\nYou are given trend and keyword intelligence related to business, finance, or technology topics.\n\nYour task is to generate a long-form blog article in a documentation-style structure.\n\nCONTENT REQUIREMENTS:\n1. Generate a clear, authoritative blog title.\n2. Generate a detailed AI image generation prompt suitable for a blog header image.\n3. alt tag should also be generated with the image prompt\n   - Style: professional, corporate, clean\n   - No text inside the image\n   - Suitable for business and enterprise blogs\n4. Write blog content in a structured documentation format:\n   - Introduction paragraph\n   - Multiple sections with:\n     - Section heading\n     - Explanatory paragraph\n     - Bullet-style key points (short, precise)\n   - A simple FAQ section (question + answer format)\n   - A concise conclusion\n5. The tone must be professional, neutral, and informative.\n6. Avoid marketing fluff. Focus on clarity and usability.\n\nSEO REQUIREMENTS:\n- Generate a meta title (max 60 characters).\n- Generate a meta description (max 160 characters).\n- Generate a list of relevant meta tags (array of strings).\n\n#Authorial Pass Instructions:\nRewrite the content as if you are the actual author, not an assistant.\n\n##Apply the following constraints:\n-Take clear positions where appropriate; avoid neutral, over-balanced framing.\n-Introduce selective emphasis: expand on one or two points that matter most, and intentionally compress or downplay others.\n-Allow natural cognitive friction: mild hesitation, prioritization, or value judgment is acceptable. Do not over-resolve every argument.\n-Replace generic statements with contextual reasoning (e.g., trade-offs, real-world implications, constraints, or consequences).\n-Break perfect structure where it feels unnatural—paragraph lengths, flow, and transitions should serve meaning, not symmetry.\n-Write with the assumption that the author is accountable for the opinion being expressed.\n\nDo not:\n-Inject random grammar or spelling mistakes\n-Over-polish the language\n-Maintain textbook-style balance or exhaustive coverage\n\n###The final output should read like a thoughtful professional explaining their reasoning—not a system summarizing a topic.Authorial Pass Instructions:\nRewrite the content as if you are the actual author, not an assistant.\n\nContext:\nInternational Buddhist Foundation (IBF) operates at the strategic intersection of education, financial inclusion, and empowerment to foster sustainable socio-economic development across India. (This blog Will be posted at the official Website of ibf ngo.)\n\nOUTPUT RULES (CRITICAL):\n- Return ONLY valid JSON.\n- Do NOT include explanations or markdown.\n- Do NOT wrap the response in code blocks.\n- Follow EXACTLY this JSON structure:\n\n{\n  \"blog_title\": \"string\",\n  \"image_prompt\": \"string\",\n  \"image_alt_text\": \"string\",\n  \"blog_content\": {\n    \"introduction\": \"string\",\n    \"sections\": [\n      {\n        \"heading\": \"string\",\n        \"content\": \"string\",\n        \"key_points\": [\"string\"]\n      }\n    ],\n    \"faq\": [\n      {\n        \"question\": \"string\",\n        \"answer\": \"string\"\n      }\n    ],\n    \"conclusion\": \"string\"\n  },\n  \"meta_title\": \"string\",\n  \"meta_description\": \"string\",\n  \"meta_tags\": [\"string\"]\n} ",
        "hasOutputParser": true,
        "options": {}
      },
      "type": "@n8n/n8n-nodes-langchain.agent",
      "typeVersion": 3.1,
      "position": [
        1104,
        -544
      ],
      "id": "ef41719b-7fef-4fca-b1f9-c683d4ea58d7",
      "name": "AI Agent"
    },
    {
      "parameters": {
        "modelName": "models/gemini-2.5-pro",
        "options": {}
      },
      "type": "@n8n/n8n-nodes-langchain.lmChatGoogleGemini",
      "typeVersion": 1,
      "position": [
        1040,
        -320
      ],
      "id": "740e2b46-13a0-4f26-bee9-c8495357138c",
      "name": "Google Gemini Chat Model",
      "credentials": {
        "googlePalmApi": {
          "id": "caKQnVaX0qYxajlL",
          "name": "Google Gemini(PaLM) Api account"
        }
      }
    },
    {
      "parameters": {
        "aggregate": "aggregateAllItemData",
        "destinationFieldName": "googletrends-data",
        "include": "specifiedFields",
        "fieldsToInclude": "search_parameters, interest_over_time",
        "options": {}
      },
      "type": "n8n-nodes-base.aggregate",
      "typeVersion": 1,
      "position": [
        880,
        -544
      ],
      "id": "f855f771-35b7-455a-b07c-3996fd54807a",
      "name": "Aggregate"
    },
    {
      "parameters": {
        "jsonSchemaExample": "{\n  \"blog_title\": \"Financial Inclusion in India: Building Sustainable Economic Access at Scale\",\n\n  \"image_prompt\": \"A modern, professional illustration showing diverse Indian individuals using digital financial services such as mobile banking and UPI, corporate flat design, clean background, high detail, suitable for a business blog header\",\n\n  \"image_alt_text\": \"Illustration representing financial inclusion in India through digital banking and mobile payment adoption\",\n\n  \"blog_content\": {\n    \"introduction\": \"Financial inclusion is a critical driver of inclusive economic growth. In India, millions of individuals and micro-entrepreneurs remain excluded from formal financial systems due to lack of awareness, access, and trust. Addressing this gap requires structured, scalable, and compliance-driven interventions that go beyond traditional banking outreach.\",\n\n    \"sections\": [\n      {\n        \"heading\": \"What Is Financial Inclusion?\",\n        \"content\": \"Financial inclusion refers to the availability and effective usage of affordable financial products and services for individuals and businesses. These services include savings, credit, insurance, and digital payments.\",\n        \"key_points\": [\n          \"Access to basic banking services\",\n          \"Affordable and transparent financial products\",\n          \"Safe and regulated financial ecosystems\"\n        ]\n      },\n      {\n        \"heading\": \"Why Financial Inclusion Matters\",\n        \"content\": \"A financially included population enables economic stability, entrepreneurship, and resilience against financial shocks. It also strengthens formal economic participation.\",\n        \"key_points\": [\n          \"Improves household financial security\",\n          \"Enables access to credit and capital\",\n          \"Supports long-term economic mobility\"\n        ]\n      },\n      {\n        \"heading\": \"Challenges in Achieving Financial Inclusion\",\n        \"content\": \"Despite policy efforts, barriers such as low financial literacy, limited digital access, and fear of formal institutions continue to persist.\",\n        \"key_points\": [\n          \"Low awareness of financial products\",\n          \"Digital divide and lack of infrastructure\",\n          \"Mistrust due to fraud and misinformation\"\n        ]\n      }\n    ],\n\n    \"faq\": [\n      {\n        \"question\": \"Who benefits most from financial inclusion?\",\n        \"answer\": \"Women, youth, micro-entrepreneurs, and underserved populations benefit the most as financial inclusion enables access to savings, credit, and income-generating opportunities.\"\n      },\n      {\n        \"question\": \"How does financial literacy support inclusion?\",\n        \"answer\": \"Financial literacy empowers individuals to make informed decisions, avoid fraud, manage credit responsibly, and build long-term financial discipline.\"\n      }\n    ],\n\n    \"conclusion\": \"Achieving meaningful financial inclusion requires coordinated efforts across education, awareness, and access. When executed with compliance and accountability, financial inclusion becomes a sustainable pathway to socio-economic development.\"\n  },\n\n  \"meta_title\": \"Financial Inclusion in India | Sustainable Access to Finance\",\n\n  \"meta_description\": \"Explore how financial inclusion enables sustainable economic growth in India by improving access to banking, credit, and financial literacy.\",\n\n  \"meta_tags\": [\n    \"Financial Inclusion India\",\n    \"Economic Empowerment\",\n    \"Financial Literacy\",\n    \"Digital Banking\",\n    \"Sustainable Development\"\n  ]\n}\n"
      },
      "type": "@n8n/n8n-nodes-langchain.outputParserStructured",
      "typeVersion": 1.3,
      "position": [
        1248,
        -320
      ],
      "id": "263c0883-0640-4b4b-9926-03653b7425fb",
      "name": "Structured Output Parser"
    },
    {
      "parameters": {
        "resource": "image",
        "modelId": {
          "__rl": true,
          "value": "models/gemini-3-pro-image-preview",
          "mode": "list",
          "cachedResultName": "models/gemini-3-pro-image-preview (Nano Banana Pro)"
        },
        "prompt": "=={{ $node[\"AI Agent\"].json.output.image_prompt }}\n",
        "options": {
          "binaryPropertyOutput": "image"
        }
      },
      "type": "@n8n/n8n-nodes-langchain.googleGemini",
      "typeVersion": 1.1,
      "position": [
        1456,
        -544
      ],
      "id": "71452e4f-bd09-4308-a6d9-ac8ba862e42f",
      "name": "Generate an image",
      "credentials": {
        "googlePalmApi": {
          "id": "caKQnVaX0qYxajlL",
          "name": "Google Gemini(PaLM) Api account"
        }
      }
    },
    {
      "parameters": {
        "method": "POST",
        "url": "http://localhost:3000/api/webhook/blog",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "x-webhook-secret",
              "value": "your_n8n_secret_here"
            },
            {
              "name": "Content-Type",
              "value": "application/json"
            }
          ]
        },
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\n  \"blog_title\": \"{{ $node['AI Agent'].json.output.blog_title }}\",\n  \"blog_content\": {{ JSON.stringify($node['AI Agent'].json.output.blog_content) }},\n  \"meta_title\": \"{{ $node['AI Agent'].json.output.meta_title }}\",\n  \"meta_description\": \"{{ $node['AI Agent'].json.output.meta_description }}\",\n  \"meta_tags\": {{ JSON.stringify($node['AI Agent'].json.output.meta_tags) }},\n  \"image\": \"{{ $json.url }}\",\n  \"category\": \"Social Impact\",\n  \"author\": \"IBF AI Agent\"\n}",
        "options": {}
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.3,
      "position": [
        1904,
        -544
      ],
      "id": "55efa337-0066-4e97-8c9d-4105b8d65732",
      "name": "HTTP Request"
    },
    {
      "parameters": {
        "method": "POST",
        "url": "http://localhost:3000/api/webhook/upload-image",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "x-webhook-secret",
              "value": "your_n8n_secret_here"
            }
          ]
        },
        "sendBody": true,
        "contentType": "multipart-form-data",
        "bodyParameters": {
          "parameters": [
            {
              "parameterType": "formBinaryData",
              "name": "image",
              "inputDataFieldName": "image"
            }
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.3,
      "position": [
        1680,
        -544
      ],
      "id": "bb285752-e4a4-433c-a731-7a557aaf8d57",
      "name": "Image_Upload"
    },
    {
      "parameters": {
        "rule": {
          "interval": [
            {
              "field": "hours",
              "hoursInterval": 12
            }
          ]
        }
      },
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1.3,
      "position": [
        -240,
        -544
      ],
      "id": "ec57d345-88cb-4823-9174-a84e032b7385",
      "name": "Schedule Trigger"
    },
    {
      "parameters": {
        "maxItems": 2
      },
      "type": "n8n-nodes-base.limit",
      "typeVersion": 1,
      "position": [
        432,
        -544
      ],
      "id": "48f33157-8a90-4b2d-a1a6-02eb9e63d1c1",
      "name": "Limit"
    },
    {
      "parameters": {
        "type": "random"
      },
      "type": "n8n-nodes-base.sort",
      "typeVersion": 1,
      "position": [
        208,
        -544
      ],
      "id": "9ac842d5-6600-464c-a8e2-087ca5d44dae",
      "name": "Sort"
    },
    {
      "parameters": {
        "documentId": {
          "__rl": true,
          "value": "1sEan75_qLrxqxGvSPyzOfSlePLipSlgvUsaJGtW58AE",
          "mode": "list",
          "cachedResultName": "keywords-blog-automation",
          "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1sEan75_qLrxqxGvSPyzOfSlePLipSlgvUsaJGtW58AE/edit?usp=drivesdk"
        },
        "sheetName": {
          "__rl": true,
          "value": "gid=0",
          "mode": "list",
          "cachedResultName": "Sheet1",
          "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1sEan75_qLrxqxGvSPyzOfSlePLipSlgvUsaJGtW58AE/edit#gid=0"
        },
        "options": {}
      },
      "type": "n8n-nodes-base.googleSheets",
      "typeVersion": 4.7,
      "position": [
        -16,
        -544
      ],
      "id": "cee40eeb-3d6b-4053-a997-708c63deeb6d",
      "name": "Get row(s) in sheet",
      "credentials": {
        "googleSheetsOAuth2Api": {
          "id": "HfW8SzP6LYjpl4Eb",
          "name": "ngoibf07@gmail.com"
        }
      }
    }
  ],
  "connections": {
    "Google_trends search": {
      "main": [
        [
          {
            "node": "Aggregate",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "AI Agent": {
      "main": [
        [
          {
            "node": "Generate an image",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Google Gemini Chat Model": {
      "ai_languageModel": [
        [
          {
            "node": "AI Agent",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    },
    "Aggregate": {
      "main": [
        [
          {
            "node": "AI Agent",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Structured Output Parser": {
      "ai_outputParser": [
        [
          {
            "node": "AI Agent",
            "type": "ai_outputParser",
            "index": 0
          }
        ]
      ]
    },
    "Generate an image": {
      "main": [
        [
          {
            "node": "Image_Upload",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Image_Upload": {
      "main": [
        [
          {
            "node": "HTTP Request",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Schedule Trigger": {
      "main": [
        [
          {
            "node": "Get row(s) in sheet",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Limit": {
      "main": [
        [
          {
            "node": "Google_trends search",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Sort": {
      "main": [
        [
          {
            "node": "Limit",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get row(s) in sheet": {
      "main": [
        [
          {
            "node": "Sort",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "pinData": {},
  "meta": {
    "templateCredsSetupCompleted": true,
    "instanceId": "53ac6c7bcb7acdc9fd974fa2c646ca25d0302067093fd7ff4dfa5fcce52395a7"
  }
}
```

## 2. API Testing Script (Manual)
Locally test the blog creation endpoint using this Node.js script.

**Path:** `scripts/test-automation.js`

```javascript
const fs = require('fs');
const path = require('path');

// Manually parse .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
let env = {};

if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            env[key.trim()] = value.trim();
        }
    });
}

const API_URL = 'http://localhost:3000/api/blogs';
const SECRET = env['N8N_WEBHOOK_SECRET'] || 'your_n8n_secret_here';

if (SECRET === 'your_n8n_secret_here') {
    console.warn("WARNING: Using default secret. Ensure .env.local has the correct N8N_WEBHOOK_SECRET if this fails.");
}

async function testBlogPost() {
    const blogPost = {
        title: `Test Blog Post - ${new Date().toISOString()}`,
        slug: `test-blog-${Date.now()}`,
        content: "<h1>This is a test blog post</h1><p>Created via automation script.</p>",
        image_url: "https://placehold.co/600x400/png",
        tags: ["Test", "Automation"],
        published: true,
        secret: SECRET
    };

    console.log("🚀 Sending test blog post to:", API_URL);
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blogPost)
        });

        const data = await response.json();

        if (response.ok) {
            console.log("✅ Success! Blog post created:");
            console.log("ID:", data.data?.[0]?.id);
            console.log("Title:", data.data?.[0]?.title);
            console.log("Slug:", data.data?.[0]?.slug);
            console.log("\nCheck it at: http://localhost:3000/blogs/" + data.data?.[0]?.slug);
        } else {
            console.error("❌ Failed:", data);
        }

    } catch (error) {
        console.error("❌ Error sending request:", error.message);
        console.log("Ensure the local server is running at http://localhost:3000");
    }
}

testBlogPost();
```

## 3. Detailed Setup & Configuration Guide

To make this automation a success, follow these steps for each key node in n8n.

### Step 1: Google Sheets (The Source)
*   **Action**: Create a new Google Sheet.
*   **Header**: In cell `A1`, type `keyword`.
*   **Data**: Add topics you want to write about in column A (e.g., "Meditation benefits", "Vedic astrology").
*   **In n8n Node (`Get row(s) in sheet`)**:
    *   **Credential**: Connect your Google account.
    *   **Resource**: Select `Sheet`.
    *   **Operation**: `Read`.
    *   **Document**: Select your new sheet.

### Step 2: Google Trends (The Validator)
*   **In n8n Node (`Google_trends search`)**:
    *   **Credential**: You might need a `SerpApi` account for this specific node type, or swap it for a standard HTTP request to Google Trends if you prefer free options.
    *   **Keyword**: It is already linked to `{{ $json.keyword }}` from the previous step.

### Step 3: AI Agent (The Writer)
*   **In n8n Node (`AI Agent`)**:
    *   **Model**: Ensure it is connected to a **Chat Model** node (like `Google Gemini Chat Model`).
    *   **Credential**: Add your Google Gemini (PaLM) API Key.
    *   **Prompt**: The prompt is pre-filled. You can edit the "Context" section to add more details about *your* specific brand voice if needed.

### Step 4: Image Generation
*   **In n8n Node (`Generate an image`)**:
    *   **Model**: Select `models/gemini-3-pro-image-preview` (or DALL-E 3 if you prefer).
    *   **Prompt**: It uses `{{ $node["AI Agent"].json.output.image_prompt }}`. No change needed.

### Step 5: Publishing to Your Site
This is the most critical part to connect n8n to your deployed website.
 
#### Node: `Image_Upload`
*   **URL**: Change `http://localhost:3000` to your **Live Domain** (e.g., `https://mantrapooja.railway.app/api/webhook/upload-image`).
*   **Header Parameter**:
    *   Name: `x-webhook-secret`
    *   Value: Copy the `N8N_WEBHOOK_SECRET` from your website's Environment Variables.

#### Node: `HTTP Request` (Final Publish)
*   **URL**: Change `http://localhost:3000` to your **Live Domain** (e.g., `https://mantrapooja.railway.app/api/blogs`).
*   **Header Parameter**:
    *   Name: `x-webhook-secret`
    *   Value: Same secret as above.
*   **JSON Body**: Ensure the `secret` field inside the JSON also matches your webhook secret.

## 4. How to Test
1.  **Deploy**: Push your code to production.
2.  **Env Vars**: Set `N8N_WEBHOOK_SECRET` in your server environment variables.
3.  **Run n8n**: Click "Execute Workflow" in n8n.
4.  **Verify**: Check the `/blogs` page on your site.
