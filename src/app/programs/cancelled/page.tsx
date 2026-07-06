import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function ProgramCancelledPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="section" style={{ paddingTop: 160 }}>
        <div className="container" style={{ maxWidth: 560 }}>
          <h1 className="section-title">No charge was made.</h1>
          <p style={{ fontSize: 16, color: "var(--fg-dim)", marginTop: 24 }}>
            You cancelled checkout — nothing was charged. Want to try again?
          </p>
          <Link href="/#programs" className="btn btn--primary" style={{ marginTop: 32, display: "inline-flex" }}>
            Back to programs
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
