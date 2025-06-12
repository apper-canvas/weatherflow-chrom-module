import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import ApperIcon from './ApperIcon';
import SearchBar from './SearchBar';
import CurrentWeather from './CurrentWeather';
import ForecastGrid from './ForecastGrid';
import UnitsToggle from './UnitsToggle';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';

const MainFeature = ({
  weatherData,
  loading,
  error,
  units,
  onLocationSearch,
  onGeolocation,
  onUnitsToggle,
  onRetry
}) => {
  const [backgroundGradient, setBackgroundGradient] = useState('bg-gradient-to-br from-surface-50 to-surface-100');

  useEffect(() => {
    if (weatherData?.current?.condition) {
      const condition = weatherData.current.condition.toLowerCase();
      
      if (condition.includes('sun') || condition.includes('clear')) {
        setBackgroundGradient('bg-sunny-gradient');
      } else if (condition.includes('cloud')) {
        setBackgroundGradient('bg-cloudy-gradient');
      } else if (condition.includes('rain') || condition.includes('drizzle')) {
        setBackgroundGradient('bg-rainy-gradient');
      } else if (condition.includes('snow') || condition.includes('sleet')) {
        setBackgroundGradient('bg-snowy-gradient');
      } else if (condition.includes('storm') || condition.includes('thunder')) {
        setBackgroundGradient('bg-stormy-gradient');
      } else {
        setBackgroundGradient('bg-gradient-to-br from-surface-50 to-surface-100');
      }
    }
  }, [weatherData]);

  if (loading) {
    return (
      <div className={`min-h-screen transition-all duration-1000 ${backgroundGradient}`}>
        <LoadingState />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen transition-all duration-1000 ${backgroundGradient}`}>
        <ErrorState message={error} onRetry={onRetry} />
      </div>
    );
  }

  return (
    <motion.div
      className={`min-h-screen transition-all duration-1000 ${backgroundGradient}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-white mb-2">
              WeatherFlow
            </h1>
            <p className="text-white/80 font-body">
              {weatherData?.location && `Weather for ${weatherData.location}`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <UnitsToggle units={units} onToggle={onUnitsToggle} />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGeolocation}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2"
            >
              <ApperIcon name="MapPin" size={18} />
              <span className="hidden sm:inline">My Location</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <SearchBar onSearch={onLocationSearch} />
        </motion.div>

        {/* Current Weather */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <CurrentWeather data={weatherData?.current} units={units} />
        </motion.div>

        {/* 5-Day Forecast */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-display font-semibold text-white mb-6">
            5-Day Forecast
          </h2>
          <ForecastGrid forecast={weatherData?.forecast || []} units={units} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MainFeature;