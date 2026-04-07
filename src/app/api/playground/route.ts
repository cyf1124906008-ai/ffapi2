import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
  error?: {
    message?: string;
  };
};

type OpenAICompatResponse = {
  choices?: Array<{
    message?: {
      content?:
        | string
        | Array<{
            type?: string;
            text?: string;
          }>;
    };
  }>;
  error?: {
    message?: string;
  };
};

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

function readErrorMessage(data: unknown) {
  if (
    data &&
    typeof data === "object" &&
    "error" in data &&
    data.error &&
    typeof data.error === "object" &&
    "message" in data.error &&
    typeof data.error.message === "string"
  ) {
    return data.error.message;
  }

  return null;
}

function extractOpenAIText(data: OpenAICompatResponse) {
  const content = data.choices?.[0]?.message?.content;

  if (typeof content === "string") {
    return content;
  }

  if (Array.isArray(content)) {
    return content
      .map((part) => (part.type === "text" ? part.text : ""))
      .filter(Boolean)
      .join("\n");
  }

  return "";
}

function extractGeminiText(data: GeminiResponse) {
  return (
    data.candidates
      ?.flatMap((candidate) => candidate.content?.parts || [])
      .map((part) => part.text || "")
      .filter(Boolean)
      .join("\n") || ""
  );
}

async function forwardToFfapi(prompt: string) {
  const apiKey = process.env.FFAPI_PLAYGROUND_API_KEY;

  if (!apiKey) {
    return null;
  }

  const baseUrl = trimTrailingSlash(
    process.env.FFAPI_PLAYGROUND_API_BASE_URL ||
      process.env.NEXT_PUBLIC_BACKEND_URL ||
      "http://localhost:3001",
  );
  const model = process.env.FFAPI_PLAYGROUND_MODEL || "gemini-2.5-flash";

  const response = await fetch(`${baseUrl}/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
      stream: false,
    }),
    cache: "no-store",
  });

  const data = (await response.json().catch(() => null)) as
    | OpenAICompatResponse
    | null;

  if (!response.ok) {
    throw new Error(
      readErrorMessage(data) ||
        `FFapi playground upstream failed with ${response.status}`,
    );
  }

  const text = data ? extractOpenAIText(data) : "";
  return text || "Empty response from FFapi upstream.";
}

async function forwardToGemini(prompt: string) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return null;
  }

  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
      cache: "no-store",
    },
  );

  const data = (await response.json().catch(() => null)) as GeminiResponse | null;

  if (!response.ok) {
    throw new Error(
      readErrorMessage(data) ||
        `Gemini playground upstream failed with ${response.status}`,
    );
  }

  const text = data ? extractGeminiText(data) : "";
  return text || "Empty response from Gemini upstream.";
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json().catch(() => null)) as
      | { prompt?: unknown }
      | null;
    const prompt =
      typeof body?.prompt === "string" ? body.prompt.trim() : "";

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required." },
        { status: 400 },
      );
    }

    const ffapiResult = await forwardToFfapi(prompt);
    if (ffapiResult) {
      return NextResponse.json({ text: ffapiResult });
    }

    const geminiResult = await forwardToGemini(prompt);
    if (geminiResult) {
      return NextResponse.json({ text: geminiResult });
    }

    return NextResponse.json(
      {
        error:
          "Playground is not configured. Set FFAPI_PLAYGROUND_API_KEY or GEMINI_API_KEY on the server.",
      },
      { status: 503 },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected playground error.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
