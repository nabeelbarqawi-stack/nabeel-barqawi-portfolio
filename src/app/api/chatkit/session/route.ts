import { NextResponse } from "next/server";

// Public domain key — scoped to this ChatKit workflow, safe server-side
const CHATKIT_KEY = "domain_pk_69ed4d96e1608197943c289c2fcd21b20b4ba4759c1f6303";
const WORKFLOW_ID = "wf_68df4b13b3588190a09d19288d4610ec0df388c3983f58d1";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const deviceId: string = body.deviceId || "anonymous";

    const res = await fetch("https://api.openai.com/v1/chatkit/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "OpenAI-Beta": "chatkit_beta=v1",
        Authorization: `Bearer ${CHATKIT_KEY}`,
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
