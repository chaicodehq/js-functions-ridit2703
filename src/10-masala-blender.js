export function pipe(...fns) {
  if (fns.length === 0) {
    return (x) => x; // identity
  }

  return function (input) {
    return fns.reduce((acc, fn) => {
      return typeof fn === "function" ? fn(acc) : acc;
    }, input);
  };
}

export function compose(...fns) {
  if (fns.length === 0) {
    return (x) => x; // identity
  }

  return function (input) {
    return fns.reduceRight((acc, fn) => {
      return typeof fn === "function" ? fn(acc) : acc;
    }, input);
  };
}

export function grind(spice) {
  if (!spice || typeof spice !== "object") return spice;
  return { ...spice, form: "powder" };
}

export function roast(spice) {
  if (!spice || typeof spice !== "object") return spice;
  return { ...spice, roasted: true, aroma: "strong" };
}

export function mix(spice) {
  if (!spice || typeof spice !== "object") return spice;
  return { ...spice, mixed: true };
}

export function pack(spice) {
  if (!spice || typeof spice !== "object") return spice;
  return {
    ...spice,
    packed: true,
    label: `${spice.name} Masala`,
  };
}

export function createRecipe(steps) {
  if (!Array.isArray(steps) || steps.length === 0) {
    return (x) => x; // identity
  }

  const stepMap = {
    grind,
    roast,
    mix,
    pack,
  };

  const validFns = steps
    .map((step) => stepMap[step])
    .filter((fn) => typeof fn === "function");

  if (validFns.length === 0) {
    return (x) => x;
  }

  return pipe(...validFns);
}