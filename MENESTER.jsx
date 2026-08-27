import React, { useState, useEffect, useMemo } from "react";

/* =========================================================================
   MENESTER — Diagnòstic d'Innovació Ciutadana en Cultura
   Eina d'autoavaluació per a institucions culturals · AdHoc Cultura
   Model propi: 5 àmbits (OBRIR, CONNECTAR, COCREAR, EXPERIMENTAR, ARRELAR)
   + factors de context.
   Identitat gràfica AdHoc: Anton (titulars) + Montserrat (cos),
   groc #FFD600 i negre #000000.
   ========================================================================= */

/* ---- Paleta corporativa AdHoc ---- */
const GROC = "#FFD600";
const NEGRE = "#1a1a1a";
const CREMA = "#FDFBF5";

/* Colors dels 5 àmbits (secundaris corporatius del llibre d'estil) */
const AMBITS = [
  {
    id: "OBRIR",
    nom: "OBRIR",
    pregunta: "La institució s'obre des de dins?",
    color: "#2E7D5B",
    descripcio:
      "Permeabilitat de l'estructura: obrir processos interns, incorporar perfils mediadors i flexibilitzar les pròpies normes per deixar entrar l'energia ciutadana.",
    preguntes: [
      "L'equip viu l'obertura a la ciutadania com una oportunitat, no com una amenaça.",
      "Hem obert processos interns reals (decisió, programació, pressupost) a la ciutadania.",
      "Tenim perfils que fan de mediadors entre l'interior de la institució i l'exterior.",
      "Estem disposats a flexibilitzar normes pròpies quan cal obrir un procés.",
    ],
  },
  {
    id: "CONNECTAR",
    nom: "CONNECTAR",
    pregunta: "Teixeix xarxa o treballa sola?",
    color: "#2B5B87",
    descripcio:
      "La institució com a plataforma que mapeja el territori, manté aliances estables i posa recursos a disposició d'altres, evitant el «paracaigudisme».",
    preguntes: [
      "Tenim el teixit d'agents culturals i socials del territori mapejat i el coneixem.",
      "Treballem en aliança estable amb altres entitats, col·lectius o agents del territori.",
      "Actuem com a plataforma: posem recursos nostres a disposició d'iniciatives externes.",
      "Entenem el nostre paper com a facilitadors de relacions entre tercers, no només com a emissors.",
    ],
  },
  {
    id: "COCREAR",
    nom: "COCREAR",
    pregunta: "Qui dissenya i qui decideix?",
    color: "#B8901F",
    descripcio:
      "Participació de la comunitat des de l'inici, disposició a cedir poder de decisió, cogestió de recursos com a procomú i distinció entre participació real i consulta simbòlica.",
    preguntes: [
      "La comunitat participa en el disseny dels projectes des de l'inici, no només en l'execució.",
      "Estem disposats a cedir part de la presa de decisions a la ciutadania.",
      "Cogestionem recursos culturals com a béns comuns, amb la comunitat.",
      "Distingim la participació real de la consulta simbòlica, i busquem la primera.",
    ],
  },
  {
    id: "EXPERIMENTAR",
    nom: "EXPERIMENTAR",
    pregunta: "Hi ha cultura de laboratori i risc?",
    color: "#E1671F",
    descripcio:
      "Cultura de laboratori: prototipar abans de desplegar, acceptar l'error, operar als marges dels formats habituals i tenir recursos dedicats a provar sense garantia de resultat.",
    preguntes: [
      "Provem idees amb prototips i pilots abans de desplegar-les del tot.",
      "Acceptem l'error i l'aprenentatge com a part natural del procés.",
      "Ens permetem operar als marges, fora de les categories i formats habituals.",
      "Tenim temps, espai o recursos dedicats a experimentar sense garantia de resultat.",
    ],
  },
  {
    id: "ARRELAR",
    nom: "ARRELAR",
    pregunta: "Respon al context i deixa empremta?",
    color: "#B23A34",
    descripcio:
      "Resposta a un context específic i empremta real: projectes que neixen de necessitats de la comunitat, vincles sostinguts i mesura de l'èxit pel retorn social.",
    preguntes: [
      "Els projectes neixen de necessitats reals de la comunitat (sense «paracaigudisme»).",
      "Mantenim vincles sostinguts en el temps amb col·lectius i veïnat.",
      "Mesurem l'èxit pel retorn social, no només pel públic assistent.",
      "Fem seguiment d'indicadors d'impacte social (cohesió, drets culturals, cura, entorn).",
    ],
  },
];

/* ---- Factors de context (no puntuen al pentàgon) ---- */
const CONTEXT = [
  "Disposem de recursos (humans, econòmics, espai) per dedicar a la innovació ciutadana.",
  "La nostra governança ens dona marge per prendre decisions i obrir processos.",
  "Tenim suport extern: polítiques, reconeixement social o un teixit territorial dinàmic al voltant.",
];

/* ---- Recomanacions per àmbit (amb eina associada) ---- */
const RECOMANACIONS = {
  OBRIR: {
    accions: [
      "Identifiqueu un procés intern (una programació, un pressupost) i obriu-ne una part a la ciutadania com a prova.",
      "Creeu un dispositiu «frontera» (una taula, un espai, una convocatòria) on institució i comunitat es trobin de forma regular.",
      "Reviseu quines normes internes frenen l'obertura i quines podeu flexibilitzar sense risc real.",
    ],
    eina: "ara-cultura-obertura.pdf",
  },
  CONNECTAR: {
    accions: [
      "Feu un mapa dels agents del vostre entorn i detecteu amb qui encara no col·laboreu.",
      "Oferiu un recurs vostre infrautilitzat (una sala, un equip, una llista de contactes) a una iniciativa externa.",
      "Organitzeu una trobada on diferents iniciatives ciutadanes es coneguin entre elles, amb vosaltres com a amfitrions.",
    ],
    eina: "ara-cultura-mapa-agents.pdf",
  },
  COCREAR: {
    accions: [
      "Incorporeu una sessió de codisseny a la fase inicial del vostre proper projecte.",
      "Trieu un espai físic concret i redissenyeu-lo amb qui l'utilitza (mapatge col·lectiu, maquetes).",
      "Reviseu els vostres processos participatius: on hi ha consulta simbòlica que podríeu convertir en decisió compartida.",
    ],
    eina: "ara-cultura-disseny-cultural-1.pdf",
  },
  EXPERIMENTAR: {
    accions: [
      "Reserveu un espai o una franja (un «laboratori») per provar coses sense pressió de resultat.",
      "Llanceu una versió mínima d'una idea i milloreu-la amb el retorn rebut, en comptes d'esperar el pla perfecte.",
      "Doneu permís explícit a l'equip per assajar formats no convencionals i compartir-ne els aprenentatges, també els fracassos.",
    ],
    eina: "ara-cultura-disseny-cultural-3.pdf",
  },
  ARRELAR: {
    accions: [
      "Abans del proper projecte, escolteu la comunitat per detectar una necessitat real a què respondre.",
      "Convertiu una relació puntual amb un col·lectiu en un vincle estable amb continuïtat.",
      "Definiu 2-3 indicadors d'impacte social (no només de públic) i feu-ne seguiment i difusió.",
    ],
    eina: "Canvas_Adhoc_Cultura.pdf",
  },
};

const CONTACTE = "info@adhoc-cultura.com";

const ESCALA = [
  { v: 1, label: "Gens" },
  { v: 2, label: "Poc" },
  { v: 3, label: "Força" },
  { v: 4, label: "Molt" },
];

const STORAGE_KEY = "menester_historic";

/* =========================================================================
   ▼▼▼  CONFIGURACIÓ EDITABLE  ▼▼▼
   ========================================================================= */
const CONFIG = {
  kicker: "Diagnòstic d'Innovació Ciutadana en Cultura",
  titol: "MENESTER",
  presentacio:
    "Una eina d'autoavaluació perquè la teva institució cultural descobreixi on posar més esforços per avançar cap a la innovació ciutadana. Cinc àmbits, un model propi d'AdHoc Cultura.",
  peu: "3 factors de context · 5 àmbits · 20 preguntes · escala 1–4",
  logoSrc: "logo.png",
  // URL del web app de Google Apps Script (buit = només desat local).
  endpoint: "",
};
/* ▲▲▲  FI DE LA CONFIGURACIÓ EDITABLE  ▲▲▲ */

function Logo() {
  if (CONFIG.logoSrc) {
    return (
      <img
        src={CONFIG.logoSrc}
        alt="AdHoc MENESTER"
        style={{ height: 88, width: "auto", display: "block", marginBottom: 18 }}
      />
    );
  }
  return null;
}

/* ---- Geometria del pentàgon radar ---- */
function pentaPoint(cx, cy, r, i, total) {
  const ang = (Math.PI / 180) * ((360 / total) * i - 90);
  return [cx + r * Math.cos(ang), cy + r * Math.sin(ang)];
}

function PentaRadar({ scores, size = 460 }) {
  const cx = size / 2;
  const cy = size / 2;
  const R = size * 0.32;
  const N = AMBITS.length;
  const rings = [0.25, 0.5, 0.75, 1];

  const gridPolys = rings.map((f) =>
    AMBITS.map((_, i) => pentaPoint(cx, cy, R * f, i, N).join(",")).join(" ")
  );

  const dataPts = AMBITS.map((a, i) => {
    const s = scores[a.id] ?? 0;
    return pentaPoint(cx, cy, R * (s / 4), i, N);
  });
  const dataPoly = dataPts.map((p) => p.join(",")).join(" ");

  const labels = AMBITS.map((a, i) => {
    const [x, y] = pentaPoint(cx, cy, R * 1.34, i, N);
    return { x, y, a };
  });

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width="100%" style={{ maxWidth: size }}>
      <defs>
        {AMBITS.map((a, i) => (
          <radialGradient key={i} id={`grad-${a.id}`} cx="50%" cy="50%" r="75%">
            <stop offset="0%" stopColor={a.color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={a.color} stopOpacity={0.85} />
          </radialGradient>
        ))}
      </defs>

      {gridPolys.map((pts, idx) => (
        <polygon key={idx} points={pts} fill="none" stroke={NEGRE} strokeOpacity={0.12} strokeWidth={1} />
      ))}
      {AMBITS.map((_, i) => {
        const [x, y] = pentaPoint(cx, cy, R, i, N);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke={NEGRE} strokeOpacity={0.1} strokeWidth={1} />;
      })}
      {dataPts.map((p, i) => {
        const next = dataPts[(i + 1) % dataPts.length];
        return (
          <polygon
            key={`s-${i}`}
            points={`${cx},${cy} ${p[0]},${p[1]} ${next[0]},${next[1]}`}
            fill={`url(#grad-${AMBITS[i].id})`}
            stroke="#fff"
            strokeWidth={0.75}
          />
        );
      })}
      <polygon points={dataPoly} fill="none" stroke={NEGRE} strokeWidth={2} />
      {dataPts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={6} fill={AMBITS[i].color} stroke={NEGRE} strokeWidth={1.5} />
      ))}
      {labels.map(({ x, y, a }, i) => (
        <g key={i}>
          <text x={x} y={y - 3} textAnchor="middle" style={{ font: "400 14px 'Anton', sans-serif", fill: NEGRE, letterSpacing: "0.5px" }}>
            {a.nom}
          </text>
          <text x={x} y={y + 14} textAnchor="middle" style={{ font: "700 13px 'Montserrat', sans-serif", fill: a.color }}>
            {(scores[a.id] ?? 0).toFixed(1)}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function MENESTER() {
  const [fase, setFase] = useState("intro");
  const [respostes, setRespostes] = useState({});
  const [contextResp, setContextResp] = useState({});
  const [ambitActual, setAmbitActual] = useState(0);
  const [nomInstitucio, setNomInstitucio] = useState("");
  const [historic, setHistoric] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setHistoric(JSON.parse(raw));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const setResposta = (ambitId, qIdx, val) =>
    setRespostes((r) => ({ ...r, [`${ambitId}-${qIdx}`]: val }));

  const scores = useMemo(() => {
    const out = {};
    AMBITS.forEach((a) => {
      const vals = a.preguntes.map((_, i) => respostes[`${a.id}-${i}`] || 0);
      const omplerts = vals.filter((v) => v > 0);
      out[a.id] = omplerts.length ? omplerts.reduce((x, y) => x + y, 0) / omplerts.length : 0;
    });
    return out;
  }, [respostes]);

  const totalPreguntes = AMBITS.length * 4;
  const fetes = Object.values(respostes).filter((v) => v > 0).length;
  const completat = fetes === totalPreguntes;
  const global = AMBITS.reduce((acc, a) => acc + (scores[a.id] || 0), 0) / AMBITS.length;

  const contextScore = useMemo(() => {
    const vals = CONTEXT.map((_, i) => contextResp[i] || 0).filter((v) => v > 0);
    return vals.length ? vals.reduce((x, y) => x + y, 0) / vals.length : 0;
  }, [contextResp]);

  const ambitsFebles = useMemo(
    () =>
      [...AMBITS]
        .map((a) => ({ ...a, score: scores[a.id] || 0 }))
        .sort((x, y) => x.score - y.score)
        .slice(0, 3),
    [scores]
  );

  const desar = () => {
    const registre = {
      data: new Date().toISOString(),
      institucio: nomInstitucio || "Sense nom",
      scores,
      global,
      context: contextScore,
    };
    const nou = [registre, ...historic].slice(0, 50);
    setHistoric(nou);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nou));
    } catch (e) {
      console.error(e);
    }
    if (CONFIG.endpoint) {
      const payload = {
        data: registre.data,
        institucio: registre.institucio,
        global: Number(global.toFixed(2)),
        context: Number(contextScore.toFixed(2)),
      };
      AMBITS.forEach((a) => {
        payload[a.id] = Number((scores[a.id] || 0).toFixed(2));
      });
      fetch(CONFIG.endpoint, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      }).catch((e) => console.error("Error enviant al servidor:", e));
    }
  };

  const reiniciar = () => {
    setRespostes({});
    setContextResp({});
    setAmbitActual(0);
    setFase("intro");
  };

  const amb = AMBITS[ambitActual];
  const ambComplet = amb.preguntes.every((_, i) => respostes[`${amb.id}-${i}`] > 0);
  const contextComplet = CONTEXT.every((_, i) => contextResp[i] > 0);

  /* ----------------------------- ESTILS ----------------------------- */
  const S = {
    wrap: { fontFamily: "'Montserrat', system-ui, sans-serif", background: CREMA, color: NEGRE, minHeight: "100vh" },
    inner: { maxWidth: 880, margin: "0 auto", padding: "32px 24px 80px" },
    kicker: { font: "600 12px 'Montserrat'", letterSpacing: "0.16em", textTransform: "uppercase", color: "#7a6e00" },
    h1: { font: "400 clamp(40px,8vw,72px) 'Anton', sans-serif", lineHeight: 1.0, margin: "6px 0 18px", letterSpacing: "0.5px", color: NEGRE },
    h2: { font: "400 28px 'Anton', sans-serif", letterSpacing: "0.5px", margin: "6px 0 8px", color: NEGRE },
    btn: { background: NEGRE, color: GROC, border: "none", padding: "14px 28px", font: "700 15px 'Montserrat'", cursor: "pointer", borderRadius: 6 },
    btnGroc: { background: GROC, color: NEGRE, border: `2px solid ${NEGRE}`, padding: "14px 28px", font: "700 15px 'Montserrat'", cursor: "pointer", borderRadius: 6 },
    btnGhost: { background: "transparent", color: NEGRE, border: `2px solid ${NEGRE}`, padding: "12px 24px", font: "700 14px 'Montserrat'", cursor: "pointer", borderRadius: 6 },
    card: { background: "#fff", border: `2px solid ${NEGRE}`, borderRadius: 8, padding: "18px 20px", marginBottom: 14 },
  };

  /* ----------------------------- INTRO ----------------------------- */
  if (fase === "intro") {
    return (
      <div style={S.wrap}>
        <FontLink />
        <div style={S.inner}>
          <Logo />
          <p style={S.kicker}>{CONFIG.kicker}</p>
          <h1 style={S.h1}>{CONFIG.titol}</h1>
          <p style={{ font: "400 19px/1.55 'Montserrat'", maxWidth: 620, color: "#333" }}>{CONFIG.presentacio}</p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, margin: "32px 0" }}>
            {AMBITS.map((a) => (
              <div key={a.id} style={{ background: a.color, color: "#fff", padding: "10px 18px", borderRadius: 6, font: "400 15px 'Anton'", letterSpacing: "0.5px" }}>
                {a.nom}
              </div>
            ))}
          </div>

          <div style={{ margin: "24px 0 32px", maxWidth: 420 }}>
            <label style={{ font: "700 13px 'Montserrat'", display: "block", marginBottom: 8 }}>NOM DE LA INSTITUCIÓ (opcional)</label>
            <input
              value={nomInstitucio}
              onChange={(e) => setNomInstitucio(e.target.value)}
              placeholder="p. ex. Museu, Centre cultural, Biblioteca, Institució…"
              style={{ width: "100%", padding: "12px 14px", font: "400 16px 'Montserrat'", border: `2px solid ${NEGRE}`, borderRadius: 6, background: "#fff", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button style={S.btn} onClick={() => setFase("context")}>Començar →</button>
            {historic.length > 0 && (
              <button style={S.btnGhost} onClick={() => setFase("historic")}>Veure històric ({historic.length})</button>
            )}
          </div>

          <p style={{ font: "400 13px 'Montserrat'", color: "#888", marginTop: 48 }}>{CONFIG.peu}</p>
        </div>
      </div>
    );
  }

  /* ----------------------------- CONTEXT ----------------------------- */
  if (fase === "context") {
    return (
      <div style={S.wrap}>
        <FontLink />
        <div style={S.inner}>
          <p style={S.kicker}>Abans de començar</p>
          <h2 style={S.h2}>Factors de context</h2>
          <p style={{ font: "400 16px/1.5 'Montserrat'", color: "#444", maxWidth: 640, margin: "0 0 28px" }}>
            Aquestes tres preguntes situen el punt de partida de la institució. No puntuen al gràfic, però ajuden a llegir el resultat: no és el mateix una puntuació baixa amb molts recursos que amb pocs.
          </p>

          {CONTEXT.map((q, i) => {
            const val = contextResp[i] || 0;
            return (
              <div key={i} style={S.card}>
                <p style={{ font: "500 16px/1.4 'Montserrat'", margin: "0 0 14px" }}>{q}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {ESCALA.map((e) => (
                    <button
                      key={e.v}
                      onClick={() => setContextResp((r) => ({ ...r, [i]: e.v }))}
                      style={{ flex: "1 1 80px", padding: "10px 8px", cursor: "pointer", borderRadius: 6, border: `2px solid ${NEGRE}`, background: val === e.v ? GROC : CREMA, color: NEGRE, font: "700 13px 'Montserrat'" }}
                    >
                      <span style={{ display: "block", font: "400 20px 'Anton'" }}>{e.v}</span>
                      {e.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}

          <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
            <button style={{ ...S.btn, opacity: contextComplet ? 1 : 0.4 }} disabled={!contextComplet} onClick={() => setFase("test")}>
              Continuar als 5 àmbits →
            </button>
            <button style={{ ...S.btnGhost, marginLeft: "auto" }} onClick={reiniciar}>Cancel·lar</button>
          </div>
        </div>
      </div>
    );
  }

  /* ----------------------------- TEST ----------------------------- */
  if (fase === "test") {
    return (
      <div style={S.wrap}>
        <FontLink />
        <div style={S.inner}>
          <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
            {AMBITS.map((a, i) => {
              const fet = a.preguntes.every((_, qi) => respostes[`${a.id}-${qi}`] > 0);
              return (
                <button
                  key={a.id}
                  onClick={() => setAmbitActual(i)}
                  title={a.nom}
                  style={{ flex: 1, height: 8, border: `1px solid ${NEGRE}`, cursor: "pointer", background: i === ambitActual ? NEGRE : fet ? a.color : "transparent", borderRadius: 2 }}
                />
              );
            })}
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
            <span style={{ background: amb.color, color: "#fff", padding: "6px 16px", font: "400 22px 'Anton'", letterSpacing: "0.5px", borderRadius: 6 }}>{amb.nom}</span>
            <span style={{ font: "500 18px 'Montserrat'", color: "#555", fontStyle: "italic" }}>{amb.pregunta}</span>
            <span style={{ font: "400 13px 'Montserrat'", color: "#888", marginLeft: "auto" }}>{ambitActual + 1} / {AMBITS.length}</span>
          </div>

          <p style={{ font: "400 16px/1.5 'Montserrat'", color: "#444", maxWidth: 640, margin: "12px 0 28px" }}>{amb.descripcio}</p>

          {amb.preguntes.map((q, qi) => {
            const val = respostes[`${amb.id}-${qi}`] || 0;
            return (
              <div key={qi} style={S.card}>
                <p style={{ font: "500 16px/1.4 'Montserrat'", margin: "0 0 14px" }}>{q}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {ESCALA.map((e) => (
                    <button
                      key={e.v}
                      onClick={() => setResposta(amb.id, qi, e.v)}
                      style={{ flex: "1 1 80px", padding: "10px 8px", cursor: "pointer", borderRadius: 6, border: `2px solid ${NEGRE}`, background: val === e.v ? amb.color : CREMA, color: val === e.v ? "#fff" : NEGRE, font: "700 13px 'Montserrat'" }}
                    >
                      <span style={{ display: "block", font: "400 20px 'Anton'" }}>{e.v}</span>
                      {e.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}

          <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
            {ambitActual > 0 ? (
              <button style={S.btnGhost} onClick={() => setAmbitActual((i) => i - 1)}>← Anterior</button>
            ) : (
              <button style={S.btnGhost} onClick={() => setFase("context")}>← Context</button>
            )}
            {ambitActual < AMBITS.length - 1 ? (
              <button style={{ ...S.btn, opacity: ambComplet ? 1 : 0.4 }} disabled={!ambComplet} onClick={() => setAmbitActual((i) => i + 1)}>Següent àmbit →</button>
            ) : (
              <button style={{ ...S.btn, opacity: completat ? 1 : 0.4 }} disabled={!completat} onClick={() => { desar(); setFase("resultat"); }}>Veure resultats →</button>
            )}
            <button style={{ ...S.btnGhost, marginLeft: "auto" }} onClick={reiniciar}>Cancel·lar</button>
          </div>
        </div>
      </div>
    );
  }

  /* ----------------------------- RESULTAT ----------------------------- */
  if (fase === "resultat") {
    const boCami = global > 3;
    return (
      <div style={S.wrap}>
        <FontLink />
        <div style={S.inner}>
          <p style={S.kicker}>Resultat de l'autoavaluació</p>
          <h1 style={{ ...S.h1, fontSize: "clamp(30px,6vw,48px)" }}>{nomInstitucio || "La teva institució"}</h1>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "12px 0 24px" }}>
            <PentaRadar scores={scores} size={460} />
            <div style={{ textAlign: "center", marginTop: 8 }}>
              <div style={{ font: "700 13px 'Montserrat'", color: "#888" }}>PUNTUACIÓ GLOBAL</div>
              <div style={{ font: "400 68px 'Anton'", lineHeight: 1 }}>
                {global.toFixed(1)}<span style={{ font: "400 22px 'Montserrat'", color: "#888" }}> / 4</span>
              </div>
              <div style={{ font: "400 13px 'Montserrat'", color: "#888", marginTop: 4 }}>
                Context de partida: {contextScore.toFixed(1)} / 4
              </div>
            </div>
          </div>

          {boCami ? (
            <div style={{ background: GROC, border: `2px solid ${NEGRE}`, borderRadius: 8, padding: "24px 26px", marginBottom: 20 }}>
              <h2 style={{ ...S.h2, margin: "0 0 10px" }}>Aneu pel bon camí!</h2>
              <p style={{ font: "400 16px/1.6 'Montserrat'", color: NEGRE, margin: "0 0 12px" }}>
                Enhorabona: la vostra institució mostra una cultura d'innovació ciutadana sòlida i equilibrada en els cinc àmbits. Heu fet una feina notable per obrir-vos a la ciutadania i teixir comunitat.
              </p>
              <p style={{ font: "400 16px/1.6 'Montserrat'", color: NEGRE, margin: 0 }}>
                Voleu fer un pas més? Us podem acompanyar en la fase següent: aprofundir, consolidar i mesurar l'impacte. Escriviu-nos a{" "}
                <a href={`mailto:${CONTACTE}`} style={{ color: NEGRE, fontWeight: 700 }}>{CONTACTE}</a> i en parlem.
              </p>
            </div>
          ) : (
            <>
              <p style={S.kicker}>On posar esforços ara</p>
              <h2 style={{ ...S.h2, margin: "6px 0 20px" }}>Els vostres 3 àmbits més fluixos</h2>
              {ambitsFebles.map((a) => {
                const rec = RECOMANACIONS[a.id];
                return (
                  <div key={a.id} style={{ ...S.card, borderLeft: `8px solid ${a.color}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ font: "400 20px 'Anton'", letterSpacing: "0.5px" }}>{a.nom}</span>
                      <span style={{ font: "700 15px 'Montserrat'", color: a.color }}>{a.score.toFixed(1)} / 4</span>
                    </div>
                    <ul style={{ margin: "12px 0 0", paddingLeft: 20 }}>
                      {rec.accions.map((r, i) => (
                        <li key={i} style={{ font: "400 15px/1.5 'Montserrat'", color: "#333", marginBottom: 6 }}>{r}</li>
                      ))}
                    </ul>
                    <div style={{ marginTop: 12, font: "500 14px 'Montserrat'", color: "#555" }}>
                      Eina útil: <span style={{ fontWeight: 700 }}>{rec.eina}</span>
                    </div>
                    <div style={{ marginTop: 12, padding: "12px 14px", background: GROC, borderRadius: 6, font: "600 15px/1.5 'Montserrat'", color: NEGRE }}>
                      Vols que t'ajudem? Contacta'ns a{" "}
                      <a href={`mailto:${CONTACTE}`} style={{ color: NEGRE, fontWeight: 700 }}>{CONTACTE}</a> i parlem-ne!
                    </div>
                  </div>
                );
              })}
            </>
          )}

          <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
            <button style={S.btn} onClick={() => window.print()}>Imprimir / desar PDF</button>
            <button style={S.btnGhost} onClick={() => setFase("historic")}>Veure històric</button>
            <button style={S.btnGhost} onClick={reiniciar}>Nova avaluació</button>
          </div>
        </div>
      </div>
    );
  }

  /* ----------------------------- HISTÒRIC ----------------------------- */
  if (fase === "historic") {
    return (
      <div style={S.wrap}>
        <FontLink />
        <div style={S.inner}>
          <p style={S.kicker}>Evolució en el temps</p>
          <h1 style={{ ...S.h1, fontSize: "clamp(30px,6vw,48px)" }}>Històric</h1>

          {historic.length === 0 ? (
            <p style={{ font: "400 17px 'Montserrat'", color: "#666" }}>Encara no hi ha avaluacions desades.</p>
          ) : (
            <div style={{ marginTop: 20 }}>
              {historic.map((h, idx) => (
                <div key={idx} style={S.card}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                    <span style={{ font: "700 16px 'Montserrat'" }}>{h.institucio}</span>
                    <span style={{ font: "400 13px 'Montserrat'", color: "#888" }}>
                      {new Date(h.data).toLocaleDateString("ca-ES", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
                    {AMBITS.map((a) => (
                      <span key={a.id} style={{ font: "400 13px 'Anton'", letterSpacing: "0.5px", background: a.color, color: "#fff", padding: "3px 9px", borderRadius: 4 }}>
                        {a.nom} {(h.scores[a.id] || 0).toFixed(1)}
                      </span>
                    ))}
                    <span style={{ font: "400 13px 'Anton'", letterSpacing: "0.5px", background: NEGRE, color: GROC, padding: "3px 9px", borderRadius: 4, marginLeft: "auto" }}>
                      GLOBAL {h.global.toFixed(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
            <button style={S.btn} onClick={reiniciar}>Nova avaluació</button>
            {historic.length > 0 && (
              <button style={S.btnGhost} onClick={() => { if (window.confirm("Esborrar tot l'històric?")) { setHistoric([]); try { localStorage.removeItem(STORAGE_KEY); } catch (e) {} } }}>
                Esborrar històric
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

function FontLink() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Anton&family=Montserrat:wght@400;500;600;700;800&display=swap');
      * { box-sizing: border-box; }
      @media print { button { display: none !important; } body { background: #fff !important; } }
    `}</style>
  );
}
