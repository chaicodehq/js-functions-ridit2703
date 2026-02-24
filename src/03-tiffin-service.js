/**
 * 🍱 Mumbai Tiffin Service - Plan Builder
 *
 * Mumbai ki famous tiffin delivery service hai. Customer ka plan banana hai
 * using destructuring parameters aur rest/spread operators.
 *
 * Functions:
 *
 *   1. createTiffinPlan({ name, mealType = "veg", days = 30 })
 *      - Destructured parameter with defaults!
 *      - Meal prices per day: veg=80, nonveg=120, jain=90
 *      - Agar mealType unknown hai, return null
 *      - Agar name missing/empty, return null
 *      - Return: { name, mealType, days, dailyRate, totalCost }
 *
 *   2. combinePlans(...plans)
 *      - Rest parameter! Takes any number of plan objects
 *      - Each plan: { name, mealType, days, dailyRate, totalCost }
 *      - Return: { totalCustomers, totalRevenue, mealBreakdown }
 *      - mealBreakdown: { veg: count, nonveg: count, ... }
 *      - Agar koi plans nahi diye, return null
 *
 *   3. applyAddons(plan, ...addons)
 *      - plan: { name, mealType, days, dailyRate, totalCost }
 *      - Each addon: { name: "raita", price: 15 }
 *      - Add each addon price to dailyRate
 *      - Recalculate totalCost = new dailyRate * days
 *      - Return NEW plan object (don't modify original)
 *      - addonNames: array of addon names added
 *      - Agar plan null hai, return null
 *
 * Hint: Use { destructuring } in params, ...rest for variable args,
 *   spread operator for creating new objects
 *
 * @example
 *   createTiffinPlan({ name: "Rahul" })
 *   // => { name: "Rahul", mealType: "veg", days: 30, dailyRate: 80, totalCost: 2400 }
 *
 *   combinePlans(plan1, plan2, plan3)
 *   // => { totalCustomers: 3, totalRevenue: 7200, mealBreakdown: { veg: 2, nonveg: 1 } }
 */
export function createTiffinPlan({ name, mealType = "veg", days = 30 } = {}) {
  // Your code here
   const mealPrices = {
    veg: 80,
    nonveg: 120,
    jain: 90
  };

  // Validate name
  if (typeof name !== "string" || name.trim().length === 0) {
    return null;
  }

  // Validate mealType
  if (typeof mealType !== "string" || !(mealType in mealPrices)) {
    return null;
  }

  const dailyRate = mealPrices[mealType];
  const totalCost = dailyRate * days;

  return {
    name,
    mealType,
    days,
    dailyRate,
    totalCost
  };

}

export function combinePlans(...plans) {
  // Your code here
  if (plans.length===0){
    return null;
  }
  let totalCustomers=0;
  let totalRevenue=0;
  let mealBreakdown={};
  for(let i =0;i<plans.length;i++){
    totalCustomers++;
    totalRevenue+=plans[i].totalCost;
    const mealType=plans[i].mealType;
    if (mealBreakdown[mealType]) {
      mealBreakdown[mealType]++;
    }else {
      mealBreakdown[mealType] = 1;
    }
  }
  
  return{
    totalCustomers,
    totalRevenue,
    mealBreakdown

  };
}

export function applyAddons(plan, ...addons) {
  if (!plan || typeof plan !== "object") return null;

  
  let newDailyRate = plan.dailyRate;
  const addonNames = [];

  
  for (const addon of addons) {
    if (addon && typeof addon.price === "number" && typeof addon.name === "string") {
      newDailyRate += addon.price;
      addonNames.push(addon.name);
    }
  }

  
  return {
    ...plan,
    dailyRate: newDailyRate,
    totalCost: newDailyRate * plan.days,
    addonNames,
  };
}