import { getTrimester } from '../utils/mealSelection';

export default function WeekSlider({ week, onWeekChange }) {
  const trimester = getTrimester(week);
  const progress = ((week - 4) / 36) * 100;

  return (
    <div style={{ background: "#FFFDF9", borderRadius: 16, padding: "20px 24px", border: "1px solid rgba(139,109,82,0.1)", marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: "#8B6D52", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Pregnancy Week
        </span>
        <span style={{ fontSize: 24, fontWeight: 600, color: "#2C1810", fontFamily: "'Fraunces',serif" }}>
          {week}
        </span>
      </div>
      <input
        type="range"
        min={4}
        max={42}
        value={week}
        onChange={e => onWeekChange(+e.target.value)}
        style={{ width: "100%", marginBottom: 8 }}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: 10, color: "#8B6D52", opacity: 0.5 }}>Week 4</span>
        <span style={{ fontSize: 10, color: "#8B6D52", opacity: 0.5 }}>Week 42</span>
      </div>
      <div style={{ marginTop: 12, background: "rgba(139,109,82,0.08)", borderRadius: 4, height: 4, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          borderRadius: 4,
          transition: "width 0.4s",
          width: `${progress}%`,
          background: trimester === 1 ? "#E8A87C" : trimester === 2 ? "#85A392" : "#7B6B8D",
        }} />
      </div>
      <p style={{ fontSize: 10, textAlign: "center", color: "#8B6D52", marginTop: 6, opacity: 0.6 }}>
        {Math.round(progress)}% complete
      </p>
    </div>
  );
}
