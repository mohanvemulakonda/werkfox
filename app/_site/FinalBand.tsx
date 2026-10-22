import { SIGNUP_URL, DEMO_URL } from './data';

/** Closing band with the two buttons. */
export default function FinalBand() {
  return (
    <>
      {/* 12. FINAL CTA + FOOTER */}
      <section className="band pt-band">
        <div className="wrap">
          <div className="inner">
            <h2>Your factory, <span className="hand2">sorted.</span></h2>
            <p>Start today with 7 days of everything in Pro, free. If WerkFox is not for you, just stop: no card, nothing to cancel.</p>
            <div className="cta-row"><a className="btn onband lg" href={SIGNUP_URL}>Try Pro free for 7 days</a><a className="btn onband-2 lg" href={DEMO_URL}>Book a demo</a></div>
          </div>
        </div>
      </section>
    </>
  );
}
