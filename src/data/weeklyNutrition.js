/**
 * Weekly Nutrition Map
 * Key: pregnancy week number (4–42)
 * Each entry: { focus, nutrients, why, tip }
 */
const weeklyNutrition = {
  4: { focus: "Folate & Iron", nutrients: ["folate", "iron", "vitamin B6"], why: "Neural tube is forming — folate is critical for spinal cord and brain development. Iron supports the rapid increase in blood volume.", tip: "Think dark leafy greens, lentils, fortified cereals, and citrus to boost absorption." },
  5: { focus: "Folate & Hydration", nutrients: ["folate", "water", "vitamin B6"], why: "The embryo's heart begins to beat this week. Folate remains essential, and hydration supports the amniotic fluid forming around baby.", tip: "Water-rich fruits like watermelon and cucumber are your friends." },
  6: { focus: "Vitamin B6 & Ginger", nutrients: ["vitamin B6", "ginger", "complex carbs"], why: "Morning sickness often peaks. B6 can help ease nausea. The baby's facial features are starting to form.", tip: "Small, frequent meals with complex carbs help keep nausea at bay." },
  7: { focus: "Protein & Omega-3s", nutrients: ["protein", "omega-3", "calcium"], why: "Baby's brain is growing rapidly — about 100 new brain cells form every minute. Omega-3 DHA is the building block.", tip: "Salmon, walnuts, chia seeds, and eggs are powerhouses this week." },
  8: { focus: "Calcium & Vitamin D", nutrients: ["calcium", "vitamin D", "magnesium"], why: "Baby's bones and teeth are beginning to harden. Calcium and vitamin D work together for proper bone mineralization.", tip: "Dairy, fortified plant milks, and a little sunshine go a long way." },
  9: { focus: "Vitamin C & Zinc", nutrients: ["vitamin C", "zinc", "iron"], why: "Baby's muscles are forming and tiny fingers are developing. Vitamin C boosts iron absorption and supports tissue growth.", tip: "Bell peppers, strawberries, and lean meats are excellent choices." },
  10: { focus: "Iodine & Choline", nutrients: ["iodine", "choline", "folate"], why: "Baby's thyroid is starting to produce hormones. Iodine is essential for brain development and metabolic function.", tip: "Eggs, dairy, seaweed, and iodized salt are key sources." },
  11: { focus: "Iron & Vitamin A", nutrients: ["iron", "vitamin A", "fiber"], why: "Blood volume is increasing significantly. Baby's bones are hardening and hair follicles are forming.", tip: "Sweet potatoes, carrots, spinach — orange and green foods shine this week." },
  12: { focus: "Protein & Folate", nutrients: ["protein", "folate", "B12"], why: "Baby's digestive system is practicing contractions. Reflexes are developing. First trimester is nearly complete!", tip: "Lean proteins and legumes support the incredible growth happening." },
  13: { focus: "Calcium & Fiber", nutrients: ["calcium", "fiber", "magnesium"], why: "Baby is now the size of a peach! Vocal cords are forming. Fiber helps with the constipation many moms experience.", tip: "Whole grains, beans, and yogurt are triple-threat foods this week." },
  14: { focus: "Iron & Vitamin E", nutrients: ["iron", "vitamin E", "protein"], why: "Welcome to trimester two! Baby's facial muscles allow squinting and frowning. Iron prevents fatigue as energy may return.", tip: "Almonds, sunflower seeds, and avocado deliver vitamin E beautifully." },
  15: { focus: "Omega-3 & Calcium", nutrients: ["omega-3", "calcium", "vitamin D"], why: "Baby's skeleton is transitioning from cartilage to bone. Brain growth is accelerating.", tip: "Fatty fish twice a week plus daily calcium-rich foods." },
  16: { focus: "Vitamin A & Zinc", nutrients: ["vitamin A", "zinc", "iron"], why: "Baby's eyes are sensitive to light even through closed lids. Zinc supports the immune system forming right now.", tip: "Pumpkin seeds, beef, and colorful vegetables are your go-tos." },
  17: { focus: "Magnesium & B Vitamins", nutrients: ["magnesium", "B vitamins", "fiber"], why: "Baby's skeleton is hardening further. You may start feeling movement! Magnesium prevents leg cramps.", tip: "Dark chocolate (yes!), bananas, and nuts are magnesium-rich." },
  18: { focus: "DHA & Choline", nutrients: ["DHA", "choline", "protein"], why: "Baby's nervous system is maturing rapidly — myelin sheaths are forming around nerves. DHA and choline are critical.", tip: "Eggs are the ultimate pregnancy food — both yolks and whites." },
  19: { focus: "Iron & Vitamin C", nutrients: ["iron", "vitamin C", "B12"], why: "A waxy coating called vernix is protecting baby's skin. Mom's blood volume continues to surge — iron is essential.", tip: "Pair iron-rich foods with vitamin C for maximum absorption." },
  20: { focus: "Calcium & Protein", nutrients: ["calcium", "protein", "healthy fats"], why: "You're halfway there! Baby can hear your voice now. Bones and muscles need steady calcium and protein.", tip: "This is a great week to establish a calcium-rich routine." },
  21: { focus: "Vitamin C & Collagen", nutrients: ["vitamin C", "iron", "protein"], why: "Baby's taste buds are developing — they can taste what you eat! Vitamin C supports skin elasticity for mom's growing belly.", tip: "Citrus fruits, kiwi, bell peppers, and berries are vitamin C superstars." },
  22: { focus: "Iron & B12", nutrients: ["iron", "B12", "folate"], why: "Baby's eyes and lips are more distinct. The pancreas is developing. Iron and B12 prevent anemia as blood volume peaks.", tip: "Lean red meat, eggs, and fortified cereals deliver this combo." },
  23: { focus: "Omega-3 & Fiber", nutrients: ["omega-3", "fiber", "magnesium"], why: "Baby's lungs are developing blood vessels. The brain is growing fast. Fiber helps with digestive slowdown.", tip: "Chia pudding, salmon, and whole grains check multiple boxes." },
  24: { focus: "Vitamin D & Phosphorus", nutrients: ["vitamin D", "phosphorus", "calcium"], why: "Baby is gaining weight and developing a sense of balance. Vitamin D and phosphorus support continued bone growth.", tip: "Eggs, mushrooms exposed to sunlight, and dairy are key." },
  25: { focus: "Protein & Healthy Fats", nutrients: ["protein", "healthy fats", "iron"], why: "Baby's skin is becoming opaque and gaining fat. Healthy fats support baby's fat stores.", tip: "Avocado, olive oil, nuts, and quality proteins fuel growth." },
  26: { focus: "Vitamin K & Calcium", nutrients: ["vitamin K", "calcium", "fiber"], why: "Baby's eyes are opening for the first time! Vitamin K supports proper blood clotting preparation.", tip: "Broccoli, kale, and Brussels sprouts are vitamin K champions." },
  27: { focus: "DHA & Iron", nutrients: ["DHA", "iron", "vitamin C"], why: "Welcome to the third trimester! Baby's brain is very active — dream cycles are beginning. DHA is crucial.", tip: "Wild salmon, sardines, and walnuts for brain-building omega-3s." },
  28: { focus: "Protein & Magnesium", nutrients: ["protein", "magnesium", "potassium"], why: "Baby can blink and has eyelashes! Muscles are strengthening. Magnesium helps with leg cramps and sleep.", tip: "Bananas, pumpkin seeds, and Greek yogurt are your allies." },
  29: { focus: "Calcium & Vitamin C", nutrients: ["calcium", "vitamin C", "iron"], why: "Baby's bones are fully developed but still soft. Muscles and lungs continue maturing. Mom needs extra calcium.", tip: "Dairy, fortified OJ, and leafy greens keep calcium flowing." },
  30: { focus: "Iron & B Vitamins", nutrients: ["iron", "B vitamins", "protein"], why: "Baby's bone marrow is producing red blood cells. Brain is getting wrinklier (more surface area = more neurons!).", tip: "Lean meats, lentils, and whole grains for sustained energy." },
  31: { focus: "Fiber & Hydration", nutrients: ["fiber", "water", "magnesium"], why: "Baby is processing sensory information. Digestive discomfort may increase — fiber and water are essential.", tip: "Oats, psyllium, and water-rich fruits keep things moving." },
  32: { focus: "Protein & DHA", nutrients: ["protein", "DHA", "calcium"], why: "Baby's fingernails and toenails are fully formed. Fat accumulation accelerates.", tip: "Fatty fish, eggs, and lean proteins support final growth." },
  33: { focus: "Vitamin A & Zinc", nutrients: ["vitamin A", "zinc", "iron"], why: "Baby's immune system is developing independently. Eyes can detect light and pupils can dilate.", tip: "Sweet potatoes, carrots, and pumpkin seeds for the immune boost." },
  34: { focus: "Calcium & Healthy Fats", nutrients: ["calcium", "healthy fats", "vitamin D"], why: "Baby's central nervous system and lungs are maturing. Fat layers are filling out baby's skin.", tip: "Full-fat yogurt, avocados, and salmon are triple threats." },
  35: { focus: "Iron & Vitamin K", nutrients: ["iron", "vitamin K", "protein"], why: "Baby is running out of room! Most internal organs are fully developed. Iron stores are being built for after birth.", tip: "Dark leafy greens deliver both iron and vitamin K." },
  36: { focus: "Protein & Fiber", nutrients: ["protein", "fiber", "B vitamins"], why: "Baby is dropping into position. Bones of the skull remain soft for delivery. Mom needs sustained energy.", tip: "Complex carbs and lean proteins fuel the home stretch." },
  37: { focus: "Dates & Iron", nutrients: ["iron", "fiber", "natural sugars"], why: "Baby is considered early term! Research suggests dates may help with cervical ripening.", tip: "6 dates per day starting now may support easier labor." },
  38: { focus: "Energy & Hydration", nutrients: ["complex carbs", "water", "electrolytes"], why: "Baby's organs are ready for the outside world. Mom's body is preparing — energy stores matter.", tip: "Coconut water, bananas, and whole grains for sustained energy." },
  39: { focus: "Protein & Dates", nutrients: ["protein", "dates", "iron"], why: "Baby is full term! Final brain and lung development. Protein supports muscle readiness for labor.", tip: "Keep eating those dates and stay hydrated — the finish line is near!" },
  40: { focus: "Energy Foods & Calm", nutrients: ["complex carbs", "magnesium", "iron"], why: "Due date week! Baby's head has likely engaged. Magnesium for calm muscles and steady nerves.", tip: "Gentle, nourishing meals. Sustaining energy and staying calm." },
};

// Fill gaps with a balanced default
for (let i = 4; i <= 42; i++) {
  if (!weeklyNutrition[i]) {
    weeklyNutrition[i] = {
      focus: "Balanced Nutrition",
      nutrients: ["protein", "iron", "calcium"],
      why: "A well-rounded diet supports steady growth and development.",
      tip: "Focus on variety — colorful plates mean diverse nutrients.",
    };
  }
}

export default weeklyNutrition;
