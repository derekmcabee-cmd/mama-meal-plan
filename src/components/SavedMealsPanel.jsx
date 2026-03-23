import { useState } from 'react';
import { HeartIcon, BagIcon, RecipeIcon, ChevronDownIcon, ChevronUpIcon } from './Icons';
import mealTypeConfig from '../data/mealTypeConfig';

function SavedMealItem({ meal, index, onRemove }) {
  const [showIngredients, setShowIngredients] = useState(false);
  const [showRecipe, setShowRecipe] = useState(false);
  const config = mealTypeConfig[meal.type] || mealTypeConfig.snack;

  return (
    <div style={{ borderBottom: "1px solid rgba(139,109,82,0.08)" }}>
      <div style={{ padding: "14px 20px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: "#2C1810", margin: 0, fontFamily: "'Fraunces',serif" }}>{meal.name}</p>
          <p style={{ fontSize: 11, color: "#8B6D52", margin: "2px 0 0" }}>Week {meal.week} · {meal.type}</p>
        </div>
        <button onClick={() => onRemove(index)} style={{ background: "none", border: "none", cursor: "pointer", color: "#C17C74", padding: 4, display: "flex" }}>
          <HeartIcon filled={true} />
        </button>
      </div>

      {/* Ingredients Toggle */}
      <div style={{ padding: "0 20px" }}>
        <button onClick={() => setShowIngredients(!showIngredients)} style={{
          display: "flex", alignItems: "center", gap: 6, background: "none", border: "none",
          cursor: "pointer", padding: "8px 0", width: "100%", color: "#8B6D52",
          fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans',sans-serif", letterSpacing: "0.03em",
        }}>
          <BagIcon /> Ingredients ({meal.ingredients.length})
          <span style={{ marginLeft: "auto" }}>{showIngredients ? <ChevronUpIcon /> : <ChevronDownIcon />}</span>
        </button>
        {showIngredients && (
          <div style={{ paddingBottom: 12, display: "grid", gap: 4, animation: "fadeIn 0.3s ease" }}>
            {meal.ingredients.map((ingredient, i) => (
              <div key={i} style={{
                fontSize: 13, color: "#5C4033", fontFamily: "'DM Sans',sans-serif", padding: "4px 0",
                borderBottom: i < meal.ingredients.length - 1 ? "1px solid rgba(139,109,82,0.06)" : "none",
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: config.color, opacity: 0.4, flexShrink: 0 }} />
                {ingredient}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recipe Toggle */}
      {meal.steps && meal.steps.length > 0 && (
        <div style={{ padding: "0 20px" }}>
          <button onClick={() => setShowRecipe(!showRecipe)} style={{
            display: "flex", alignItems: "center", gap: 6, background: "none", border: "none",
            cursor: "pointer", padding: "8px 0", width: "100%",
            color: showRecipe ? config.color : "#8B6D52",
            fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans',sans-serif", letterSpacing: "0.03em",
            transition: "color 0.2s",
          }}>
            <RecipeIcon /> Recipe ({meal.steps.length} steps)
            <span style={{ marginLeft: "auto" }}>{showRecipe ? <ChevronUpIcon /> : <ChevronDownIcon />}</span>
          </button>
          {showRecipe && (
            <div style={{ paddingBottom: 16, animation: "fadeIn 0.3s ease" }}>
              {meal.steps.map((step, i) => (
                <div key={i} style={{
                  display: "flex", gap: 12, padding: "10px 0",
                  borderBottom: i < meal.steps.length - 1 ? "1px solid rgba(139,109,82,0.06)" : "none",
                }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: "50%", background: config.bg,
                    border: `1.5px solid ${config.color}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 700, color: config.color,
                    fontFamily: "'DM Sans',sans-serif", flexShrink: 0, marginTop: 1,
                  }}>
                    {i + 1}
                  </div>
                  <p style={{ fontSize: 13, color: "#5C4033", lineHeight: 1.65, margin: 0, fontFamily: "'DM Sans',sans-serif" }}>
                    {step}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

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
            <SavedMealItem key={i} meal={meal} index={i} onRemove={onRemove} />
          ))}
        </div>
      )}
    </div>
  );
}
