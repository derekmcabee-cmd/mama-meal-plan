import weeklyNutrition from '../data/weeklyNutrition';
import mealDatabase from '../data/mealDatabase';

/**
 * Score a meal by counting nutrient overlaps with the week's priority nutrients.
 * Uses bidirectional case-insensitive substring matching.
 */
export function scoreMeal(meal, weekNutrients) {
  if (!weekNutrients) return 1;
  return meal.nutrients.filter(nutrient =>
    weekNutrients.some(weekNutrient =>
      nutrient.toLowerCase().includes(weekNutrient.toLowerCase()) ||
      weekNutrient.toLowerCase().includes(nutrient.toLowerCase())
    )
  ).length;
}

/**
 * Select the best meal for a given week and type, excluding previously seen meals.
 * Returns the top-scoring meal (randomized among ties).
 */
export function getWeekMeals(week, type, exclude = []) {
  const weekData = weeklyNutrition[week] || weeklyNutrition[20];

  // Step 1: Filter by week eligibility and exclusions
  const eligible = mealDatabase[type].filter(meal =>
    (!meal.weekRange || (week >= meal.weekRange[0] && week <= meal.weekRange[1])) &&
    !exclude.includes(meal.name)
  );

  if (!eligible.length) return [mealDatabase[type][0]];

  // Step 2: Score by nutrient overlap
  const scored = eligible.map(meal => ({
    ...meal,
    score: scoreMeal(meal, weekData.nutrients),
  }));
  scored.sort((a, b) => b.score - a.score);

  // Step 3: Randomize within top tier
  const topTier = scored
    .filter(meal => meal.score >= scored[0].score - 1)
    .sort(() => Math.random() - 0.5);

  return [topTier[0]];
}

/**
 * Get trimester number from pregnancy week
 */
export function getTrimester(week) {
  return week <= 13 ? 1 : week <= 27 ? 2 : 3;
}
