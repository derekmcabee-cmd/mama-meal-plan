import { useState } from 'react';
import weeklyNutrition from '../data/weeklyNutrition';
import mealTypeConfig from '../data/mealTypeConfig';
import {
  ClockIcon, StarIcon, BagIcon, RecipeIcon,
  ChevronDownIcon, ChevronUpIcon, ShuffleIcon, HeartIcon,
} from './Icons';

export default function MealCard({ meal, mealType, week, onShuffle, onSave, isSaved, index }) {
  const [showIngredients, setShowIngredients] = useState(false);
  const [showRecipe, setShowRecipe] = useState(false);
  const [shuffling, setShuffling] = useState(false);

  const weekData = weeklyNutrition[week] || weeklyNutrition[20];
  const config = mealTypeConfig[mealType];
  const TypeIcon = config.icon;

  const matchedNutrients = meal.nutrients.filter(nutrient =>
    weekData.nutrients.some(weekNutrient =>
      nutrient.toLowerCase().includes(weekNutrient.toLowerCase()) ||
      weekNutrient.toLowerCase().includes(nutrient.toLowerCase())
    )
  );

  const handleShuffle = () => {
    setShuffling(true);
    setShowRecipe(false);
    setShowIngredients(false);
    setTimeout(() => {
      onShuffle();
      setShuffling(false);
    }, 400);
  };

  return (
    <div style={{
      background: "#FFFDF9",
      borderRadius: 16,
      border: "1px solid rgba(139,109,82,0.1)",
      overflow: "hidden",
      transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
      opacity: shuffling ? 0 : 1,
      transform: shuffling ? "scale(0.95) rotateY(10deg)" : "scale(1)",
      animationName: "cardIn",
      animationDuration: "0.5s",
      animationTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
      animationFillMode: "both",
      animationDelay: `${index * 0.1}s`,
    }}>
      {/* Header */}
      <div style={{ padding: "16px 20px 12px", display: "flex", alignItems: "flex-start", gap: 12 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 12, background: config.bg,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: config.color, flexShrink: 0, marginTop: 2,
        }}>
          <TypeIcon />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: config.color, fontFamily: "'DM Sans',sans-serif" }}>
              {config.label}
            </span>
            {meal.time > 0 ? (
              <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: "#8B6D52", opacity: 0.5, fontFamily: "'DM Sans',sans-serif" }}>
                <ClockIcon /> {meal.time} min
              </span>
            ) : (
              <span style={{ fontSize: 11, color: "#8B6D52", opacity: 0.5, fontFamily: "'DM Sans',sans-serif" }}>No cook</span>
            )}
          </div>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: "#2C1810", lineHeight: 1.3, margin: 0, fontFamily: "'Fraunces',serif" }}>
            {meal.name}
          </h3>
          <p style={{ fontSize: 13, color: "#8B6D52", lineHeight: 1.5, margin: "6px 0 0", fontFamily: "'DM Sans',sans-serif" }}>
            {meal.summary}
          </p>
        </div>
      </div>

      {/* Nutrient Tags */}
      <div style={{ padding: "0 20px 12px", display: "flex", flexWrap: "wrap", gap: 6 }}>
        {meal.nutrients.map((nutrient, i) => {
          const isMatched = matchedNutrients.includes(nutrient);
          return (
            <span key={i} style={{
              fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 20,
              fontFamily: "'DM Sans',sans-serif", letterSpacing: "0.03em",
              background: isMatched ? `${config.color}18` : "rgba(139,109,82,0.06)",
              color: isMatched ? config.color : "#8B6D52",
              border: isMatched ? `1px solid ${config.color}30` : "1px solid transparent",
              display: "flex", alignItems: "center", gap: 3,
            }}>
              {isMatched && <StarIcon />} {nutrient}
            </span>
          );
        })}
      </div>

      {/* Why This Meal */}
      <div style={{ padding: "0 20px 12px" }}>
        <div style={{ background: config.bg, borderRadius: 10, padding: "10px 14px", borderLeft: `3px solid ${config.color}40` }}>
          <p style={{ fontSize: 12, color: "#5C4033", lineHeight: 1.6, margin: 0, fontFamily: "'DM Sans',sans-serif" }}>
            <span style={{ fontWeight: 600 }}>Why this meal: </span>{meal.why}
          </p>
        </div>
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

      {/* Actions */}
      <div style={{ padding: "10px 20px 16px", display: "flex", gap: 8, borderTop: "1px solid rgba(139,109,82,0.06)" }}>
        <button onClick={handleShuffle} style={{
          display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 10,
          border: "1px solid rgba(139,109,82,0.15)", background: "transparent",
          cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#8B6D52",
          fontFamily: "'DM Sans',sans-serif", transition: "all 0.2s",
        }}>
          <ShuffleIcon /> New meal
        </button>
        <button onClick={onSave} style={{
          display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 10,
          border: "none",
          background: isSaved ? "rgba(193,124,116,0.12)" : "rgba(139,109,82,0.06)",
          cursor: "pointer", fontSize: 12, fontWeight: 600,
          color: isSaved ? "#C17C74" : "#8B6D52",
          fontFamily: "'DM Sans',sans-serif", transition: "all 0.2s",
        }}>
          <HeartIcon filled={isSaved} /> {isSaved ? "Saved" : "Save"}
        </button>
      </div>
    </div>
  );
}
