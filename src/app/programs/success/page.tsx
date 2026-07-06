import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CheckoutStatus from "@/components/CheckoutStatus";

export default async function ProgramSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;

  return (
    <>
      <Nav />
      <main id="main-content" className="section" style={{ paddingTop: 160 }}>
        <div className="container" style={{ maxWidth: 560 }}>
          <h1 className="section-title">You&apos;re in.</h1>
          <div style={{ marginTop: 24 }}>
            {sessionId ? (
              <CheckoutStatus sessionId={sessionId} />
            ) : (
              <p style={{ fontSize: 16, color: "var(--fg-dim)" }}>Thanks — check your email for details.</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
