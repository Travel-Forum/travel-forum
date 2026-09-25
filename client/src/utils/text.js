export const getLengthHint = (value, min, max) => {
  const length = value.trim().length;
  const missing = min - length;

  if (missing > 0) {
    return `${missing} more ${missing === 1 ? "character" : "characters"} needed (min ${min})`;
  }
  return `${length}/${max}`;
};
