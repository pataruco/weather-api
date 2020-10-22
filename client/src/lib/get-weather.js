export const getWeatherData = async (location) => {
  try {
    const response = await fetch(`/forecast?city=${location}`);
    const { daily } = await response.json();
    return daily;
  } catch (error) {
    console.error(error);
  }
};
