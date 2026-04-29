export function getYearsOfExperience(startDate) {
  const now = new Date();
  let years = now.getFullYear() - startDate.getFullYear();
  if (now.getMonth() < startDate.getMonth()) years--;
  return years;
}
