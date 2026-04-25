import { NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;
const WORKFLOW_ID = "wf_69ed4ae7a0d481908690c28384305a1b0ba7496df3397489";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const deviceId: string = body.deviceId || "anonymous";

    const res = await fetch("https://api.openai.com/v1/chatkit/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "OpenAI-Beta": "chatkit_beta=v1",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        workflow: { id: WORKFLOW_ID },
        user: deviceId,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("[chatkit] session error:", res.status, text);
      return NextResponse.json(
        { error: "Failed to create session" },
        { status: 502 }
      );
    }

    const data = await res.json();
    return NextResponse.json({ client_secret: data.client_secret });
  } catch (err) {
    console.error("[chatkit] unexpected error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
