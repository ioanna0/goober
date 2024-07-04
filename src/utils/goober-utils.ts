export const calculateFare = (distanceM: number, durationSecs = 0, surgeMultiplier = 1): number => {
  const baseFare = 2.00; // Base fare in dollars
  const ratePerKm = 1.50; // Rate per kilometer in dollars
  const timeFactor = 0.25; // Time factor in dollars per minute

  const minutes = Math.floor(durationSecs / 60);
  const distanceKm = Math.floor(distanceM / 1000);
  const distanceFare = ratePerKm * distanceKm;
  const timeFare = timeFactor * minutes;

  const totalFare = (baseFare + distanceFare + timeFare) * surgeMultiplier;

  return totalFare;
}
