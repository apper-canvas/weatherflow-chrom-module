import weatherDataJson from '../mockData/weatherData.json';
import searchSuggestionsJson from '../mockData/searchSuggestions.json';

// Extract the data from imported JSON
const weatherData = weatherDataJson.weatherData || weatherDataJson;
const searchSuggestions = searchSuggestionsJson.searchSuggestions || searchSuggestionsJson;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const convertTemperature = (temp, fromUnit, toUnit) => {
  if (fromUnit === toUnit) return temp;
  
  if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
    return (temp * 9/5) + 32;
  } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
    return (temp - 32) * 5/9;
  }
  
  return temp;
};

const convertWindSpeed = (speed, units) => {
  // Mock data is in km/h, convert to mph if needed
  return units === 'fahrenheit' ? speed * 0.621371 : speed;
};

export const weatherService = {
async getWeatherByCity(cityName, units = 'celsius') {
    await delay(800);
    
    // Simulate API failure for certain cities
    if (cityName.toLowerCase().includes('nowhere')) {
      throw new Error('City not found');
    }
    
    // Find weather data for the city or use default
    const cityData = weatherData.find(data => 
      data.location.toLowerCase().includes(cityName.toLowerCase())
    ) || weatherData[0];
    
    // Convert temperatures based on units
    const current = {
      ...cityData.current,
      temperature: convertTemperature(cityData.current.temperature, 'celsius', units),
      feelsLike: convertTemperature(cityData.current.feelsLike, 'celsius', units),
      windSpeed: convertWindSpeed(cityData.current.windSpeed, units),
      timestamp: new Date().toISOString()
    };
    
    const forecast = cityData.forecast.map(day => ({
      ...day,
      tempHigh: convertTemperature(day.tempHigh, 'celsius', units),
      tempLow: convertTemperature(day.tempLow, 'celsius', units),
      date: new Date(day.date)
    }));
    
    return {
      location: cityName,
      current,
      forecast,
      units
    };
  },

  async getSunPosition(cityName) {
    await delay(800);
    
    const now = new Date();
    const today = now.toDateString();
    
    // Mock sun position data - in real app would use coordinates and sun calculation library
    const sunData = {
      sunrise: new Date(`${today} 06:23:00`),
      sunset: new Date(`${today} 19:47:00`),
      solarNoon: new Date(`${today} 13:05:00`),
      location: cityName,
      timestamp: now.toISOString()
    };
    
    // Calculate current sun position (0-100, where 50 is solar noon)
    const dayStart = sunData.sunrise.getTime();
    const dayEnd = sunData.sunset.getTime();
    const currentTime = now.getTime();
    
    let sunPosition = 0;
    if (currentTime >= dayStart && currentTime <= dayEnd) {
      sunPosition = ((currentTime - dayStart) / (dayEnd - dayStart)) * 100;
    } else if (currentTime > dayEnd) {
      sunPosition = 100;
    }
    
    return {
      ...sunData,
currentPosition: Math.round(sunPosition),
      isDaytime: currentTime >= dayStart && currentTime <= dayEnd
    };
  },

  async getWeatherByCoords(latitude, longitude, units = 'celsius') {
    await delay(600);
    // Simulate getting weather for coordinates
    // In a real app, this would use the coordinates to fetch location-specific data
    const locationName = `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
    
    return this.getWeatherByCity('Current Location', units).then(data => ({
      ...data,
      location: locationName
    }));
  },

  async searchCities(query) {
    await delay(300);
    
    if (!query || query.length < 2) {
      return [];
    }
    
    const filtered = searchSuggestions.filter(city =>
      city.cityName.toLowerCase().includes(query.toLowerCase()) ||
      city.country.toLowerCase().includes(query.toLowerCase())
    );
    
    return filtered.slice(0, 5); // Return max 5 suggestions
  }
};