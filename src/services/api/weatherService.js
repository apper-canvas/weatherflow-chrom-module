import { toast } from 'react-toastify';
import { searchSuggestionService } from './searchSuggestionService';
import { weatherDataService } from './weatherDataService';
import { forecastService } from './forecastService';

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
  // Database data is in km/h, convert to mph if needed
  return units === 'fahrenheit' ? speed * 0.621371 : speed;
};

export const weatherService = {
  async getWeatherByCity(cityName, units = 'celsius') {
    try {
      await delay(800);
      
      // Simulate API failure for certain cities
      if (cityName.toLowerCase().includes('nowhere')) {
        throw new Error('City not found');
      }
      
      // Get weather data from database
      const cityData = await weatherDataService.getByLocation(cityName);
      
      if (!cityData) {
        throw new Error('Weather data not found for this city');
      }
      
      // Get forecast data
      const forecastData = await forecastService.getByWeatherDataId(cityData.Id);
      
      // Convert temperatures based on units
      const current = {
        temperature: convertTemperature(cityData.current_temperature, 'celsius', units),
        feelsLike: convertTemperature(cityData.current_feels_like, 'celsius', units),
        condition: cityData.current_condition,
        icon: cityData.current_icon,
        humidity: cityData.current_humidity,
        windSpeed: convertWindSpeed(cityData.current_wind_speed, units),
        timestamp: new Date().toISOString()
      };
      
      const forecast = forecastData.map(day => ({
        date: new Date(day.date),
        tempHigh: convertTemperature(day.temp_high, 'celsius', units),
        tempLow: convertTemperature(day.temp_low, 'celsius', units),
        condition: day.condition,
        icon: day.icon,
        precipitation: day.precipitation
      }));
      
      return {
        location: cityName,
        current,
        forecast,
        units
      };
    } catch (error) {
      console.error("Error getting weather by city:", error);
      toast.error(error.message || "Failed to load weather data");
      throw error;
    }
  },

  async getSunPosition(cityName) {
    try {
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
    } catch (error) {
      console.error("Error getting sun position:", error);
      throw error;
    }
  },

  async getWeatherByCoords(latitude, longitude, units = 'celsius') {
    try {
      await delay(600);
      // Simulate getting weather for coordinates
      // In a real app, this would use the coordinates to fetch location-specific data
      const locationName = `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
      
      const data = await this.getWeatherByCity('New York', units);
      return {
        ...data,
        location: locationName
      };
    } catch (error) {
      console.error("Error getting weather by coordinates:", error);
      throw error;
    }
  },

  async searchCities(query) {
    try {
      if (!query || query.length < 2) {
        return [];
      }
      
      const results = await searchSuggestionService.searchByQuery(query);
      
      // Transform database results to match expected format
      return results.map(result => ({
        cityName: result.city_name,
        country: result.country,
        coordinates: {
          lat: result.coordinates_lat,
          lng: result.coordinates_lng
        }
      })).slice(0, 5); // Return max 5 suggestions
    } catch (error) {
      console.error("Error searching cities:", error);
      return [];
    }
  }
};