import { HeartIcon } from './Icons';

export default function SavedMealsPanel({ saved, onRemove, onClose }) {
  return (
    <div style={{ background: "#FFFDF9", borderRadius: 16, marginBottom: 16, border: "1px solid rgba(139,109,82,0.1)", overflow: "hidden", animation: "fadeIn 0.3s ease" }}>
      <div style={{ padding: "16px 20px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#2C1810", margin: 0, fontFamily: "'Fraunces',serif" }}>Saved Meals</h3>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#8B6D52", fontSize: 18, padding: 4 }}>×</button>
      </div>
      {saved.length === 0 ? (
        <div style={{ padding: 32, textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🤍</div>
          <p style={{ color: "#8B6D52", fontSize: 14 }}>No saved meals yet. Tap the heart on any meal to save favorites!</p>
        </div>
      ) : (
        <div style={{ padding: "0 0 20px" }}>
          {saved.map((meal, i) => (
            <div key={i} style={{ padding: "14px 20px", borderBottom: "1px solid rgba(139,109,82,0.08)", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#2C1810", margin: 0, fontFamily: "'Fraunces',serif" }}>{meal.name}</p>
                <p style={{ fontSize: 11, color: "#8B6D52", margin: "2px 0 0" }}>Week {meal.week} · {meal.type}</p>
              </div>
              <button onClick={() => onRemove(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#C17C74", padding: 4, display: "flex" }}>
                <HeartIcon filled={true} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
