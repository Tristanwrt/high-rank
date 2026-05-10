// HIGH RANK — main app (EN-only, full landing)
const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "charte": "signal",
  "signalAccent": "#E5FF00",
  "sirenAccent": "#DC2626"
}/*EDITMODE-END*/;

const SIGNAL_VARIANTS = [
  { hex: "#E5FF00", label: "Electric — chartreuse" },
  { hex: "#FAFF00", label: "Hi-Vis — pure yellow" },
  { hex: "#FFCB05", label: "Butter — safety amber" },
  { hex: "#FFB800", label: "Amber — golden" },
  { hex: "#C5F300", label: "Lime — yellow-green" },
];
const SIREN_VARIANTS = [
  { hex: "#DC2626", label: "Crimson — web standard" },
  { hex: "#E63946", label: "Vermilion — editorial" },
  { hex: "#FF4630", label: "Coral — punchy" },
  { hex: "#B91C1C", label: "Carmine — premium" },
  { hex: "#7F1D1D", label: "Bordeaux — luxe" },
];

function Nav({ copy }) {
  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <a href="#top" className="brand">
          <span className="brand-mark">H</span>
          HIGH RANK
        </a>
        <div className="nav-links">
          <a href="#problem" className="nav-link">Why</a>
          <a href="#method" className="nav-link">Method</a>
          <a href="#services" className="nav-link">Pricing</a>
          <a href="#faq" className="nav-link">FAQ</a>
        </div>
        <div className="nav-cta">
          <a href="#services" className="btn btn-primary">Book an audit →</a>
        </div>
      </div>
    </nav>
  );
}

function Hero({ copy }) {
  const hl = new Set(copy.hero.kw_hl || []);
  return (
    <section className="hero" id="top">
      <div className="hero-grid" />
      <div className="wrap" style={{ position: "relative" }}>
        <div className="hero-pill">
          <span className="hero-pill-tag">{copy.hero.pill_tag}</span>
          <span>{copy.hero.pill_text}</span>
        </div>
        <h1>
          {copy.hero.title_a} <em>{copy.hero.title_em}</em>{copy.hero.title_b}
        </h1>
        <p className="hero-sub">{copy.hero.sub}</p>
        <div className="hero-ctas">
          <a href="#services" className="btn btn-primary btn-lg">{copy.hero.cta_primary} →</a>
          <a href="#contact" className="btn btn-ghost btn-lg">{copy.hero.cta_secondary}</a>
        </div>
        <div className="kw-row">
          {copy.hero.kws.map((k) => (
            <span key={k} className="kw" data-hl={hl.has(k) ? "1" : undefined}>{k}</span>
          ))}
        </div>
        <div className="hero-meta">
          {copy.hero.meta.map((m) => (
            <span key={m.l}><b>{m.v}</b> · {m.l}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Problem({ copy }) {
  return (
    <section className="section" id="problem">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">{copy.problem.eyebrow}</div>
          <h2>{copy.problem.title}</h2>
        </div>
        <div className="problem-grid">
          {copy.problem.items.map((p) => (
            <div className="problem-cell" key={p.num}>
              <div className="problem-num">{p.num}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
        <p className="problem-conclusion">
          {copy.problem.conclusion_a}<em>{copy.problem.conclusion_em}</em>{copy.problem.conclusion_b}
        </p>
      </div>
    </section>
  );
}

function Solution({ copy }) {
  return (
    <section className="section" id="method">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">{copy.solution.eyebrow}</div>
          <h2>{copy.solution.title}</h2>
          <p>{copy.solution.sub}</p>
        </div>
        <div className="compare">
          {copy.solution.cols.map((col) => (
            <div className={`compare-col ${col.kind === "us" ? "us" : ""}`} key={col.kind}>
              <div className="compare-label">{col.label}</div>
              <ul className="compare-list">
                {col.items.map((it, i) => <li key={i}>{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <p className="compare-tagline">
          {copy.solution.tagline_a}<em>{copy.solution.tagline_em1}</em>{copy.solution.tagline_b}<em>{copy.solution.tagline_em2}</em>{copy.solution.tagline_c}
        </p>
      </div>
    </section>
  );
}

function Diff({ copy }) {
  return (
    <section className="section" id="diff">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">{copy.diff.eyebrow}</div>
          <h2>{copy.diff.title}</h2>
        </div>
        <div className="diff-grid">
          {copy.diff.items.map((d, i) => (
            <div className="diff-cell" key={i}>
              <div className="diff-arrow">{d.num}</div>
              <div>
                <h3>{d.title}</h3>
                <p>{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="diff-conclusion">{copy.diff.conclusion}</p>
      </div>
    </section>
  );
}

function Services({ copy }) {
  return (
    <section className="section" id="services">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">{copy.services.eyebrow}</div>
          <h2>{copy.services.title}</h2>
          <p>{copy.services.sub}</p>
        </div>
        <div className="service-tiles">
          {copy.services.items.map((s) => (
            <div className="service-tile" key={s.num}>
              <div className="service-tile-num">— {s.num}</div>
              <h3>{s.title}</h3>
              <div className="service-tile-note">{s.note}</div>
              <ul className="service-tile-bullets">
                {s.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <BriefForm copy={copy} />
      </div>
    </section>
  );
}

function BriefForm({ copy }) {
  const f = copy.form;
  const [state, setState] = useState({
    url: "", name: "", email: "", service: copy.services.items[0].code,
    goal: "", context: "", budget: f.fields.budget_opts[0], consent: true,
  });
  const [sent, setSent] = useState(false);
  const set = (k, v) => setState((s) => ({ ...s, [k]: v }));
  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      try {
        const r = document.getElementById("brief-success-anchor");
        if (r) r.parentElement.scrollIntoView({ behavior: "smooth", block: "start" });
      } catch (err) {}
    }, 50);
  };

  if (sent) {
    return (
      <div className="brief" id="brief">
        <div className="brief-success" style={{ gridColumn: "1 / -1" }}>
          <span id="brief-success-anchor" />
          <div className="brief-success-mark">✓</div>
          <h3>Brief received.</h3>
          <p>I'll get back to you within 24h with a scoped proposal — or follow-up questions if I need them. No funnel, no spam.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="brief" id="brief">
      <div className="brief-head">
        <div className="eyebrow">{f.eyebrow}</div>
        <h2>{f.title}</h2>
        <p>{f.sub}</p>
        <div className="brief-head-meta">
          <div>Reply within 24h</div>
          <div>Free 15-min discovery call</div>
          <div>NDA on request</div>
        </div>
      </div>
      <form className="brief-form" onSubmit={submit}>
        <div className="field">
          <label htmlFor="url">{f.fields.url_l}</label>
          <div className="field-url-wrap">
            <span>https://</span>
            <input id="url" type="text" placeholder="yourdomain.com" value={state.url}
                   onChange={(e) => set("url", e.target.value)} required />
          </div>
        </div>
        <div className="brief-row">
          <div className="field">
            <label htmlFor="name">{f.fields.name_l}</label>
            <input id="name" type="text" placeholder={f.fields.name_p} value={state.name}
                   onChange={(e) => set("name", e.target.value)} required />
          </div>
          <div className="field">
            <label htmlFor="email">{f.fields.email_l}</label>
            <input id="email" type="email" placeholder={f.fields.email_p} value={state.email}
                   onChange={(e) => set("email", e.target.value)} required />
          </div>
        </div>
        <div className="field">
          <label htmlFor="goal">{f.fields.goal_l}</label>
          <textarea id="goal" placeholder={f.fields.goal_p} value={state.goal}
                    onChange={(e) => set("goal", e.target.value)} rows={3} required />
        </div>
        <div className="field">
          <label htmlFor="context">{f.fields.context_l}</label>
          <textarea id="context" placeholder={f.fields.context_p} value={state.context}
                    onChange={(e) => set("context", e.target.value)} rows={4} />
        </div>
        <label className="consent">
          <input type="checkbox" checked={state.consent}
                 onChange={(e) => set("consent", e.target.checked)} />
          {f.fields.consent}
        </label>
        <div className="brief-foot">
          <small>{f.fields.footnote}</small>
          <button type="submit" className="btn btn-primary">{f.fields.submit}</button>
        </div>
      </form>
    </div>
  );
}

function Reassure({ copy }) {
  return (
    <section className="section" id="why">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">{copy.reassure.eyebrow}</div>
          <h2>{copy.reassure.title}</h2>
        </div>
        <div className="reassure-grid">
          {copy.reassure.items.map((r) => (
            <div className="reassure-cell" key={r.num}>
              <div className="reassure-num">/ {r.num}</div>
              <h4>{r.title}</h4>
              <p>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Manifesto({ copy }) {
  return (
    <section className="section invert">
      <div className="wrap">
        <p className="manifesto-quote">
          {copy.manifesto.quote_a}<em>{copy.manifesto.quote_em}</em>{copy.manifesto.quote_b}<em>{copy.manifesto.quote_em2}</em>{copy.manifesto.quote_c}
        </p>
        <p className="manifesto-sub">{copy.manifesto.sub}</p>
      </div>
    </section>
  );
}

function FAQ({ copy }) {
  const [open, setOpen] = useState(0);
  return (
    <section className="section" id="faq">
      <div className="wrap">
        <div className="section-head" style={{ textAlign: "center", marginInline: "auto" }}>
          <div className="eyebrow" style={{ justifyContent: "center" }}>{copy.faq.eyebrow}</div>
          <h2>{copy.faq.title}</h2>
        </div>
        <div className="faq-list">
          {copy.faq.items.map((it, i) => (
            <div className="faq-item" data-open={open === i ? "1" : "0"} key={i}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{it.q}</span>
                <span className="faq-toggle">+</span>
              </button>
              <div className="faq-a">
                <div className="faq-a-inner">{it.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA({ copy }) {
  return (
    <section className="final-cta" id="contact">
      <div className="wrap">
        <h2>{copy.finalcta.title_a}<em>{copy.finalcta.title_em}</em>{copy.finalcta.title_b}</h2>
        <p>{copy.finalcta.sub}</p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#brief" className="btn btn-primary btn-xl">{copy.finalcta.cta_primary} →</a>
          <a href="#" className="btn btn-ghost btn-xl">{copy.finalcta.cta_secondary}</a>
        </div>
      </div>
    </section>
  );
}

function Footer({ copy }) {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <div>{copy.footer.left}</div>
        <div>{copy.footer.mid}</div>
        <div className="footer-links">
          {copy.footer.links.map((l) => <a key={l.label} href={l.href}>{l.label}</a>)}
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const copy = window.HR_COPY;

  useEffect(() => {
    document.documentElement.setAttribute("data-charte", t.charte);
    const root = document.documentElement;
    if (t.charte === "signal") {
      root.style.setProperty("--accent", t.signalAccent);
      root.style.setProperty("--accent-text", "#0E0E10");
    } else if (t.charte === "siren") {
      root.style.setProperty("--accent", t.sirenAccent);
      root.style.setProperty("--accent-text", "#FFFFFF");
    } else {
      root.style.removeProperty("--accent");
      root.style.removeProperty("--accent-text");
    }
  }, [t.charte, t.signalAccent, t.sirenAccent]);

  return (
    <>
      <Nav copy={copy} />
      <Hero copy={copy} />
      <Problem copy={copy} />
      <Solution copy={copy} />
      <Diff copy={copy} />
      <Services copy={copy} />
      <Reassure copy={copy} />
      <Manifesto copy={copy} />
      <FAQ copy={copy} />
      <FinalCTA copy={copy} />
      <Footer copy={copy} />

      <TweaksPanel title="HIGH RANK · Style">
        <TweakSection label="Color palette">
          <TweakRadio
            label="Charte"
            value={t.charte}
            options={[
              { value: "operator", label: "Operator" },
              { value: "index", label: "Index" },
              { value: "signal", label: "Signal" },
              { value: "siren", label: "Siren" },
            ]}
            onChange={(v) => setTweak("charte", v)}
          />
          <div style={{ fontSize: 10.5, lineHeight: 1.4, color: "rgba(41,38,27,.55)", padding: "4px 2px" }}>
            {t.charte === "operator" && "Dark · lime · monospace · terminal vibe"}
            {t.charte === "index" && "Light · indigo · swiss · premium SaaS"}
            {t.charte === "signal" && "Dark + yellow · bold · editorial-tech"}
            {t.charte === "siren" && "White + red · Montserrat · clean & confident"}
          </div>
        </TweakSection>
        {t.charte === "signal" && (
          <TweakSection label="Signal — yellow">
            <TweakColor
              label="Accent"
              value={t.signalAccent}
              options={SIGNAL_VARIANTS.map((v) => v.hex)}
              onChange={(v) => setTweak("signalAccent", v)}
            />
            <div style={{ fontSize: 10.5, lineHeight: 1.4, color: "rgba(41,38,27,.55)", padding: "4px 2px" }}>
              {(SIGNAL_VARIANTS.find((v) => v.hex.toLowerCase() === String(t.signalAccent).toLowerCase()) || {}).label}
            </div>
          </TweakSection>
        )}
        {t.charte === "siren" && (
          <TweakSection label="Siren — red">
            <TweakColor
              label="Accent"
              value={t.sirenAccent}
              options={SIREN_VARIANTS.map((v) => v.hex)}
              onChange={(v) => setTweak("sirenAccent", v)}
            />
            <div style={{ fontSize: 10.5, lineHeight: 1.4, color: "rgba(41,38,27,.55)", padding: "4px 2px" }}>
              {(SIREN_VARIANTS.find((v) => v.hex.toLowerCase() === String(t.sirenAccent).toLowerCase()) || {}).label}
            </div>
          </TweakSection>
        )}
      </TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
