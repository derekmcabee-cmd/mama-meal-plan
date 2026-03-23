import { useState, useEffect, useCallback, useMemo } from 'react';
import weeklyNutrition from './data/weeklyNutrition';
import mealDatabase from './data/mealDatabase';
import babySizes from './data/babySizes';
import { getWeekMeals, getTrimester, isTopTierForWeek, calculateWeekFromDueDate } from './utils/mealSelection';
import { useLocalStorage } from './hooks/useLocalStorage';
import { CartIcon, SaveIcon } from './components/Icons';
import WeekSlider from './components/WeekSlider';
import WeeklyFocusCard from './components/WeeklyFocusCard';
import MealCard from './components/MealCard';
import GroceryPanel from './components/GroceryPanel';
import SavedMealsPanel from './components/SavedMealsPanel';

export default function MamaMealPlan() {
  const [dueDate, setDueDate] = useLocalStorage('mama-due-date', '');
  const [meals, setMeals] = useState({});
  const [saved, setSaved] = useLocalStorage('mama-saved-meals', []);
  const [showSaved, setShowSaved] = useState(false);
  const [showGrocery, setShowGrocery] = useState(false);
  const [excluded, setExcluded] = useState({ breakfast: [], lunch: [], dinner: [], snack: [] });

  const dueDateInfo = useMemo(() => {
    if (!dueDate) return null;
    return calculateWeekFromDueDate(dueDate);
  }, [dueDate]);

  const calculatedWeek = dueDateInfo?.week ?? null;
  const [week, setWeek] = useState(calculatedWeek ?? 21);

  // When due date changes, snap to calculated week
  useEffect(() => {
    if (calculatedWeek !== null) setWeek(calculatedWeek);
  }, [calculatedWeek]);

  const generateMeals = useCallback((targetWeek, exclusions = excluded) => {
    const newMeals = {};
    ["breakfast", "lunch", "dinner", "snack"].forEach(type => {
      newMeals[type] = getWeekMeals(targetWeek, type, exclusions[type] || [])[0];
    });
    setMeals(newMeals);
  }, [excluded]);

  useEffect(() => {
    generateMeals(week);
  }, [week]);

  const shuffle = (type) => {
    const currentName = meals[type]?.name;
    const newExcluded = { ...excluded };
    if (currentName) newExcluded[type] = [...(newExcluded[type] || []), currentName];
    if (newExcluded[type].length >= mealDatabase[type].length - 1) newExcluded[type] = [];
    setExcluded(newExcluded);
    setMeals(prev => ({ ...prev, [type]: getWeekMeals(week, type, newExcluded[type])[0] }));
  };

  const toggleSave = (type) => {
    const meal = meals[type];
    if (!meal) return;
    const existingIndex = saved.findIndex(s => s.name === meal.name);
    if (existingIndex >= 0) {
      setSaved(prev => prev.filter((_, i) => i !== existingIndex));
    } else {
      setSaved(prev => [...prev, { ...meal, week, type }]);
    }
  };

  const isMealSaved = (type) => {
    const meal = meals[type];
    return meal && saved.some(s => s.name === meal.name);
  };

  const weekData = weeklyNutrition[week] || weeklyNutrition[20];
  const trimester = getTrimester(week);
  const babySize = babySizes[week] || "growing!";

  // Build subtitle text
  let subtitle = `Trimester ${trimester} · Baby is the size of a ${babySize}`;
  let countdownText = null;
  if (dueDateInfo) {
    if (dueDateInfo.status === 'past') {
      countdownText = "Congratulations! Showing week 40";
    } else if (dueDateInfo.status === 'early') {
      countdownText = "Early days — meal plans start at week 4";
    } else if (dueDateInfo.weeksToGo === 0) {
      countdownText = "Baby's due any day now!";
    } else {
      countdownText = `${dueDateInfo.weeksToGo} week${dueDateInfo.weeksToGo === 1 ? '' : 's'} to go`;
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg,#FBF7F0 0%,#F5EDE0 50%,#FBF7F0 100%)", fontFamily: "'DM Sans',sans-serif" }}>
      <div style={{ maxWidth: 520, margin: "0 auto", padding: "0 16px" }}>
        {/* Header */}
        <div style={{ padding: "32px 0 8px", textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", color: "#C17C74", margin: "0 0 8px", fontFamily: "'DM Sans',sans-serif" }}>
            Mama Meal Plan
          </p>
          <h1 style={{ fontSize: 32, fontWeight: 400, color: "#2C1810", margin: "0 0 4px", fontFamily: "'Fraunces',serif", lineHeight: 1.2 }}>
            Week {week}
          </h1>
          <p style={{ fontSize: 14, color: "#8B6D52", margin: 0, fontFamily: "'DM Sans',sans-serif" }}>
            {subtitle}
          </p>
          {countdownText && (
            <p style={{ fontSize: 12, color: "#C17C74", margin: "6px 0 0", fontWeight: 500, fontFamily: "'DM Sans',sans-serif" }}>
              {countdownText}
            </p>
          )}
        </div>

        {/* Due Date Setting */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          padding: "12px 0 20px",
        }}>
          <label style={{ fontSize: 12, color: "#8B6D52", fontWeight: 600, fontFamily: "'DM Sans',sans-serif", whiteSpace: "nowrap" }}>
            When is baby due?
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            style={{
              padding: "6px 10px", borderRadius: 8, border: "1px solid rgba(139,109,82,0.2)",
              background: "#FFFDF9", fontSize: 13, color: "#2C1810", fontFamily: "'DM Sans',sans-serif",
              outline: "none", cursor: "pointer",
            }}
          />
          {dueDate && (
            <button
              onClick={() => setDueDate('')}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: 16, color: "#8B6D52", opacity: 0.5, padding: "2px 4px", lineHeight: 1,
              }}
              title="Clear due date"
            >
              ×
            </button>
          )}
        </div>

        <WeekSlider
          week={week}
          onWeekChange={setWeek}
          currentWeek={calculatedWeek}
        />
        <WeeklyFocusCard weekData={weekData} />

        {/* Action Buttons */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginBottom: 12 }}>
          <button
            onClick={() => { setShowGrocery(!showGrocery); if (!showGrocery) setShowSaved(false); }}
            style={{
              display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 10,
              border: "1px solid rgba(139,109,82,0.15)",
              background: showGrocery ? "rgba(133,163,146,0.08)" : "transparent",
              cursor: "pointer", fontSize: 12, fontWeight: 600,
              color: showGrocery ? "#85A392" : "#8B6D52", fontFamily: "'DM Sans',sans-serif",
            }}
          >
            <CartIcon /> Grocery List
          </button>
          <button
            onClick={() => { setShowSaved(!showSaved); if (!showSaved) setShowGrocery(false); }}
            style={{
              display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 10,
              border: "1px solid rgba(139,109,82,0.15)",
              background: showSaved ? "rgba(193,124,116,0.08)" : "transparent",
              cursor: "pointer", fontSize: 12, fontWeight: 600,
              color: showSaved ? "#C17C74" : "#8B6D52", fontFamily: "'DM Sans',sans-serif",
            }}
          >
            <SaveIcon /> Saved ({saved.length})
          </button>
        </div>

        {showGrocery && <GroceryPanel meals={meals} week={week} onClose={() => setShowGrocery(false)} />}

        {showSaved && (
          <SavedMealsPanel
            saved={saved}
            onRemove={(i) => setSaved(prev => prev.filter((_, j) => j !== i))}
            onClose={() => setShowSaved(false)}
          />
        )}

        {/* Meal Cards */}
        <div style={{ display: "grid", gap: 16, paddingBottom: 40 }}>
          {["breakfast", "lunch", "dinner", "snack"].map((type, i) =>
            meals[type] ? (
              <MealCard
                key={`${type}-${meals[type].name}`}
                meal={meals[type]}
                mealType={type}
                week={week}
                onShuffle={() => shuffle(type)}
                onSave={() => toggleSave(type)}
                isSaved={isMealSaved(type)}
                isTopTier={isTopTierForWeek(meals[type], week, type)}
                index={i}
              />
            ) : null
          )}
        </div>

        <div style={{ textAlign: "center", paddingBottom: 40, opacity: 0.4 }}>
          <p style={{ fontSize: 11, color: "#8B6D52" }}>Made with love · Not a substitute for medical advice</p>
        </div>
      </div>
    </div>
  );
}
