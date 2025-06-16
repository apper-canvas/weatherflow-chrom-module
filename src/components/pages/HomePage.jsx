import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import MainFeature from '@/components/organisms/MainFeature';
import { weatherService } from '@/services';

const HomePage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [units, setUnits] = useState('celsius');

  useEffect(() => {
    loadDefaultWeather();
  }, []);

const loadDefaultWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      // Try to load last searched location or default to New York
      const lastLocation = localStorage.getItem('weatherflow-last-location');
      const location = lastLocation || 'New York';
      const data = await weatherService.getWeatherByCity(location, units);
      setWeatherData(data);
    } catch (err) {
      console.error("Error loading default weather:", err);
      setError(err.message || 'Failed to load weather data');
      toast.error(err.message || 'Failed to load weather data');
    } finally {
      setLoading(false);
    }
  };

const handleLocationSearch = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const data = await weatherService.getWeatherByCity(cityName, units);
      setWeatherData(data);
      localStorage.setItem('weatherflow-last-location', cityName);
      toast.success(`Weather loaded for ${cityName}`);
    } catch (err) {
      console.error("Error searching location:", err);
      setError(err.message || 'Failed to load weather data');
      toast.error(err.message || 'Failed to load weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleGeolocation = async () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by this browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setLoading(true);
        setError(null);
try {
          const { latitude, longitude } = position.coords;
          const data = await weatherService.getWeatherByCoords(latitude, longitude, units);
          setWeatherData(data);
          toast.success('Weather loaded for your location');
        } catch (err) {
          console.error("Error getting weather by coordinates:", err);
          setError(err.message || 'Failed to load weather data');
          toast.error(err.message || 'Failed to load weather data');
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        toast.error('Unable to retrieve your location');
      }
    );
  };

  const handleUnitsToggle = (newUnits) => {
    setUnits(newUnits);
    if (weatherData) {
      // Reload weather data with new units
      handleLocationSearch(weatherData.location);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <MainFeature
        weatherData={weatherData}
        loading={loading}
        error={error}
        units={units}
        onLocationSearch={handleLocationSearch}
        onGeolocation={handleGeolocation}
        onUnitsToggle={handleUnitsToggle}
        onRetry={loadDefaultWeather}
      />
    </motion.div>
  );
};

export default HomePage;