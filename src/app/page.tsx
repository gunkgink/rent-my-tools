import Link from "@/components/Link";
import EquipmentArt from "@/components/EquipmentArt";
export default function Home() {
  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">The campus equipment library</p>
          <h1>Equipment for your next project.</h1>
          <p className="lead">
            A camera for your story. A projector for your big idea. Find the
            equipment you need, for just the time you need it.
          </p>
          <Link prefetch={false} className="button" href="/equipment">
            Browse equipment <span aria-hidden="true">↗</span>
          </Link>
          <p className="muted">
            Up to 3 units per request. Short rentals up to 7 days.
          </p>
        </div>
        <div className="hero-visual">
          <EquipmentArt category="Camera" />
          <div className="hero-tag">
            <strong>
              Big ideas.
              <br />
              The right equipment.
            </strong>
            <span>Borrow the possibilities.</span>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="section-title">
          <h2>What are you working on?</h2>
          <Link prefetch={false} href="/equipment">
            View all equipment
          </Link>
        </div>
        <div className="categories">
          {[
            ["Camera", "Capture a new perspective"],
            ["Projector", "Make your ideas visible"],
            ["Computer", "Get the work moving"],
            ["Sports", "Bring everyone together"],
          ].map(([c, t]) => (
            <Link prefetch={false} key={c} href={"/equipment?category=" + c}>
              <span>{c}</span>
              <strong>{t}</strong>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="how">
        <h2>
          A little equipment.
          <br />A lot of possibility.
        </h2>
        <ol>
          <li>
            <strong>Find your equipment</strong>
            <p>
              Browse the library and check the available quantity and daily
              rate.
            </p>
          </li>
          <li>
            <strong>Set your dates</strong>
            <p>Choose up to 3 units for a rental period of up to 7 days.</p>
          </li>
          <li>
            <strong>Send a request</strong>
            <p>
              Manage your requests in one place. No payment is collected here.
            </p>
          </li>
        </ol>
      </section>
    </>
  );
}
