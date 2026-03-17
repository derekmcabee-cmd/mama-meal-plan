import { BabyIcon } from './Icons';

export default function WeeklyFocusCard({ weekData }) {
  return (
    <div style={{ background: "linear-gradient(135deg,#2C1810,#4A3228)", borderRadius: 16, padding: "20px 24px", marginBottom: 16, color: "#FBF7F0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <BabyIcon />
        <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", opacity: 0.7 }}>
          This Week's Focus
        </span>
      </div>
      <h2 style={{ fontSize: 20, fontWeight: 500, margin: "0 0 8px", fontFamily: "'Fraunces',serif" }}>
        {weekData.focus}
      </h2>
      <p style={{ fontSize: 13, lineHeight: 1.7, margin: "0 0 12px", opacity: 0.85 }}>
        {weekData.why}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {weekData.nutrients.map((nutrient, i) => (
          <span key={i} style={{
            fontSize: 10,
            fontWeight: 600,
            padding: "4px 10px",
            borderRadius: 20,
            background: "rgba(251,247,240,0.12)",
            border: "1px solid rgba(251,247,240,0.2)",
            textTransform: "capitalize",
          }}>
            {nutrient}
          </span>
        ))}
      </div>
      <p style={{ fontSize: 12, marginTop: 12, opacity: 0.6, fontStyle: "italic" }}>
        💡 {weekData.tip}
      </p>
    </div>
  );
}
