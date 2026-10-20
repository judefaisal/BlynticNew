import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Hosting Security & Crawler Friendly Middleware
  // Ensures OpenAI (OAI-SearchBot, GPTBot, ChatGPT-User), Googlebot, Bingbot,
  // and other search crawlers are never blocked and receive proper discovery headers.
  app.use((req, res, next) => {
    // Search engine & AI crawler permissive tag
    res.setHeader(
      "X-Robots-Tag",
      "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
    );

    // Permissive access headers for metadata discovery
    if (
      req.path === "/robots.txt" ||
      req.path === "/sitemap.xml" ||
      req.path === "/llms.txt" ||
      req.path === "/llms-full.txt" ||
      req.path.startsWith("/api/seo/")
    ) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
      res.setHeader("Cache-Control", "public, max-age=3600");
    }

    next();
  });

  // Explicitly serve robots.txt with text/plain UTF-8
  app.get("/robots.txt", (req, res) => {
    const robotsPath = path.join(process.cwd(), "public", "robots.txt");
    if (fs.existsSync(robotsPath)) {
      res.type("text/plain; charset=utf-8");
      res.sendFile(robotsPath);
    } else {
      res.type("text/plain; charset=utf-8").send("User-agent: *\nAllow: /\nSitemap: https://www.blyntic.co.nz/sitemap.xml\n");
    }
  });

  // Explicitly serve sitemap.xml with application/xml UTF-8
  app.get("/sitemap.xml", (req, res) => {
    const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");
    if (fs.existsSync(sitemapPath)) {
      res.type("application/xml; charset=utf-8");
      res.sendFile(sitemapPath);
    } else {
      res.status(404).send("Sitemap not found");
    }
  });

  // Serve llms.txt and llms-full.txt for AI agents and LLM search discovery
  app.get("/llms.txt", (req, res) => {
    const llmsPath = path.join(process.cwd(), "public", "llms.txt");
    if (fs.existsSync(llmsPath)) {
      res.type("text/plain; charset=utf-8");
      res.sendFile(llmsPath);
    } else {
      res.status(404).send("llms.txt not found");
    }
  });

  app.get("/llms-full.txt", (req, res) => {
    const llmsFullPath = path.join(process.cwd(), "public", "llms-full.txt");
    if (fs.existsSync(llmsFullPath)) {
      res.type("text/plain; charset=utf-8");
      res.sendFile(llmsFullPath);
    } else {
      res.status(404).send("llms-full.txt not found");
    }
  });

  // Verification endpoint for crawler and hosting security settings
  app.get("/api/seo/crawlers-status", (req, res) => {
    res.json({
      status: "active",
      crawlersAllowed: [
        { name: "OAI-SearchBot", purpose: "ChatGPT Search discovery & live web indexation", status: "allowed" },
        { name: "ChatGPT-User", purpose: "ChatGPT live browsing on behalf of users", status: "allowed" },
        { name: "GPTBot", purpose: "OpenAI knowledge base data gathering", status: "allowed" },
        { name: "Googlebot", purpose: "Google Search indexation", status: "allowed" },
        { name: "Google-Extended", purpose: "Google Gemini & AI Overviews grounding", status: "allowed" },
        { name: "Bingbot", purpose: "Microsoft Bing & Copilot discovery", status: "allowed" },
        { name: "ClaudeBot", purpose: "Anthropic Claude web analysis", status: "allowed" },
        { name: "PerplexityBot", purpose: "Perplexity AI real-time answer engine", status: "allowed" },
        { name: "Applebot", purpose: "Apple Intelligence & Siri web results", status: "allowed" }
      ],
      securitySettings: {
        xRobotsTag: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
        accessControlAllowOrigin: "*",
        rateLimiterForCrawlers: "unrestricted",
        ipBlocking: "disabled"
      },
      endpoints: {
        robotsTxt: "https://www.blyntic.co.nz/robots.txt",
        sitemapXml: "https://www.blyntic.co.nz/sitemap.xml",
        llmsTxt: "https://www.blyntic.co.nz/llms.txt"
      }
    });
  });

  // API proxy route for Gemini
  app.post("/api/gemini/generate-content", async (req, res) => {
    try {
      const { model, contents, config } = req.body;
      const response = await ai.models.generateContent({
        model,
        contents,
        config
      });
      res.json(response);
    } catch (error: any) {
      console.error("Gemini API error:", error);
      res.status(500).json({ error: error.message || "Failed to generate content" });
    }
  });

  const DEFAULT_N8N_WEBHOOK_URL =
    process.env.N8N_REVIEW_WEBHOOK_URL ||
    "https://n8n.srv1310032.hstgr.cloud/webhook/gbp-review";

  // Get review system config (default Google review link and webhook availability)
  app.get("/api/reviews/config", (req, res) => {
    res.json({
      defaultGoogleReviewUrl:
        process.env.VITE_GOOGLE_BUSINESS_REVIEW_URL ||
        process.env.GOOGLE_BUSINESS_REVIEW_URL ||
        "https://search.google.com/local/writereview?placeid=ChIJ-3-BlynticNZ",
      webhookUrl: DEFAULT_N8N_WEBHOOK_URL,
      hasServerWebhookConfigured: true,
      serverWebhookUrlConfigured: true
    });
  });

  // Test n8n webhook connectivity
  app.post("/api/reviews/test-webhook", async (req, res) => {
    const { webhookUrl } = req.body;
    const targetUrl = webhookUrl || DEFAULT_N8N_WEBHOOK_URL;

    if (!targetUrl) {
      return res.status(400).json({
        success: false,
        error: "No webhook URL provided or configured in environment."
      });
    }

    const testPayload = {
      event: "google_review_test",
      timestamp: new Date().toISOString(),
      test: true,
      reviewerName: "John Doe (Test Reviewer)",
      reviewerEmail: "test@blyntic.co.nz",
      rating: 5,
      reviewText: "Blyntic transformed our business operations with automated 24/7 AI call answering! (Test ping)",
      recommend: true,
      serviceUsed: "AI Receptionist & Phone Automation",
      tags: ["AI Receptionist", "Fast Response", "High ROI"],
      source: "n8n_test_button"
    };

    const startTime = Date.now();
    try {
      const webhookResponse = await fetch(targetUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Blyntic-Reviews-Webhook-Client/1.0"
        },
        body: JSON.stringify(testPayload)
      });

      const latencyMs = Date.now() - startTime;
      const responseText = await webhookResponse.text();

      if (webhookResponse.ok) {
        return res.json({
          success: true,
          status: webhookResponse.status,
          statusText: webhookResponse.statusText,
          latencyMs,
          responseSample: responseText.slice(0, 500)
        });
      } else {
        let isInactiveHint = "";
        if (webhookResponse.status === 404 && responseText.includes("not registered")) {
          isInactiveHint = " — Reached n8n server! Toggle the workflow to 'Active' in the top-right of the n8n editor.";
        }
        return res.status(webhookResponse.status).json({
          success: false,
          status: webhookResponse.status,
          statusText: webhookResponse.statusText,
          latencyMs,
          error: `n8n webhook returned HTTP ${webhookResponse.status}${isInactiveHint}`
        });
      }
    } catch (err: any) {
      const latencyMs = Date.now() - startTime;
      console.error("Error testing n8n webhook:", err);
      return res.status(502).json({
        success: false,
        latencyMs,
        error: `Could not reach webhook URL (${targetUrl}): ${err.message || String(err)}`
      });
    }
  });

  // Submit Review and forward to n8n webhook
  app.post("/api/reviews/submit", async (req, res) => {
    try {
      const {
        rating,
        reviewText,
        reviewerName,
        reviewerEmail,
        reviewerPhone,
        companyName,
        serviceUsed,
        tags,
        recommend,
        customWebhookUrl,
        metadata
      } = req.body;

      if (!rating || !reviewerName || !reviewerEmail) {
        return res.status(400).json({
          success: false,
          error: "Missing required fields: rating, reviewerName, or reviewerEmail."
        });
      }

      const reviewPayload = {
        event: "google_review_submitted",
        timestamp: new Date().toISOString(),
        rating: Number(rating),
        sentiment: Number(rating) >= 4 ? "positive" : Number(rating) === 3 ? "neutral" : "negative",
        isNegativeAlert: Number(rating) <= 3,
        reviewerName,
        reviewerEmail,
        reviewerPhone: reviewerPhone || "",
        companyName: companyName || "",
        serviceUsed: serviceUsed || "AI Automation",
        tags: Array.isArray(tags) ? tags : [],
        reviewText: reviewText || "",
        recommend: Boolean(recommend),
        source: "blyntic_review_funnel",
        googleReviewRedirectUrl:
          process.env.VITE_GOOGLE_BUSINESS_REVIEW_URL ||
          process.env.GOOGLE_BUSINESS_REVIEW_URL ||
          "https://search.google.com/local/writereview?placeid=ChIJ-3-BlynticNZ",
        metadata: metadata || {}
      };

      const webhookUrl = customWebhookUrl || DEFAULT_N8N_WEBHOOK_URL;
      let webhookResult: any = { delivered: false, note: "No webhook URL provided" };

      if (webhookUrl) {
        try {
          const startTime = Date.now();
          const webhookResp = await fetch(webhookUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "User-Agent": "Blyntic-Reviews-Webhook-Client/1.0"
            },
            body: JSON.stringify(reviewPayload)
          });

          const latencyMs = Date.now() - startTime;
          const bodyText = await webhookResp.text();

          webhookResult = {
            delivered: webhookResp.ok,
            status: webhookResp.status,
            latencyMs,
            message: webhookResp.ok
              ? "Delivered to n8n successfully"
              : webhookResp.status === 404 && bodyText.includes("not registered")
              ? "Dispatched to n8n production webhook (Note: Toggle workflow to 'Active' in n8n)"
              : `n8n returned status ${webhookResp.status}`
          };
        } catch (webhookErr: any) {
          console.error("Failed to forward review to n8n webhook:", webhookErr);
          webhookResult = {
            delivered: false,
            error: webhookErr.message || "Failed to reach n8n webhook"
          };
        }
      }

      console.log(`[Review Submitted] ${rating}★ from ${reviewerName} (${reviewerEmail}) - Webhook delivered: ${webhookResult.delivered}`);

      return res.json({
        success: true,
        message: "Review recorded successfully",
        webhook: webhookResult,
        payload: {
          rating: reviewPayload.rating,
          reviewerName: reviewPayload.reviewerName,
          sentiment: reviewPayload.sentiment,
          googleReviewRedirectUrl: reviewPayload.googleReviewRedirectUrl
        }
      });
    } catch (error: any) {
      console.error("Error submitting review:", error);
      res.status(500).json({ success: false, error: error.message || "Internal server error" });
    }
  });

  // AI Review Polish helper using Gemini
  app.post("/api/reviews/polish", async (req, res) => {
    try {
      const { draftText, rating, serviceUsed, tags } = req.body;
      if (!draftText || draftText.trim().length === 0) {
        return res.status(400).json({ error: "Draft text is required." });
      }

      const prompt = `You are helping a customer write an authentic, high-converting, and warm Google Business review for Blyntic (an AI automation agency in New Zealand specializing in AI voice receptionists, chatbots, and business automation).
Customer's draft thoughts or bullet points: "${draftText}"
Star rating: ${rating || 5} out of 5
Service used: ${serviceUsed || "AI Automation"}
Selected tags: ${(tags || []).join(", ")}

Task:
- Polish these thoughts into a natural, enthusiastic, authentic Google Business Profile review (2 to 4 sentences).
- Keep the reviewer's genuine voice. Do not make it sound robotic or like corporate PR fluff.
- Highlight benefits like time saved, 24/7 call responsiveness, or professional service.
- Return ONLY the polished review text with no quotes, no markdown headers, and no preamble.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
      });

      const polished = response.text?.trim() || draftText;
      res.json({ polishedText: polished });
    } catch (err: any) {
      console.error("Gemini polish error:", err);
      res.status(500).json({ error: err.message || "Failed to polish review" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
