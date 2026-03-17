import { SunIcon, MiddayIcon, MoonIcon, LeafIcon } from '../components/Icons';

/**
 * Meal Type Display Config
 * Maps meal type to its icon, label, accent color, and background tint
 */
const mealTypeConfig = {
  breakfast: { icon: SunIcon, label: "Breakfast", color: "#E8A87C", bg: "rgba(232,168,124,0.08)" },
  lunch: { icon: MiddayIcon, label: "Lunch", color: "#85A392", bg: "rgba(133,163,146,0.08)" },
  dinner: { icon: MoonIcon, label: "Dinner", color: "#7B6B8D", bg: "rgba(123,107,141,0.08)" },
  snack: { icon: LeafIcon, label: "Snack", color: "#C17C74", bg: "rgba(193,124,116,0.08)" },
};

export default mealTypeConfig;
