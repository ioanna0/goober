const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
}
  
export const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  }

  /**
 * Calculate the fare based on the distance and other factors.
 * 
 * @param {number} distanceKm - Distance of the ride in kilometers.
 * @param {number} durationMin - Duration of the ride in minutes (optional).
 * @param {number} surgeMultiplier - Surge pricing multiplier (optional, default is 1).
 * @returns {number} - Calculated fare.
 */
export const calculateFare = (distanceKm: number, durationMin = 0, surgeMultiplier = 1): number => {
  const baseFare = 2.00; // Base fare in dollars
  const ratePerKm = 1.50; // Rate per kilometer in dollars
  const timeFactor = 0.25; // Time factor in dollars per minute

  const distanceFare = ratePerKm * distanceKm;
  const timeFare = timeFactor * durationMin;

  const totalFare = (baseFare + distanceFare + timeFare) * surgeMultiplier;

  return totalFare;
}
