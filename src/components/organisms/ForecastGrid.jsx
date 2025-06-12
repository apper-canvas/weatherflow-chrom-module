import { motion } from 'framer-motion';
import { format, addDays } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';

const ForecastGrid = ({ forecast, units }) => {
  const getWeatherIcon = (condition) => {
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('sun') || conditionLower.includes('clear')) {
      return 'Sun';
    } else if (conditionLower.includes('cloud')) {
      return 'Cloud';
    } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return 'CloudRain';
    } else if (conditionLower.includes('snow')) {
      return 'CloudSnow';
    } else if (conditionLower.includes('storm') || conditionLower.includes('thunder')) {
      return 'CloudLightning';
    }
    
    return 'Cloud';
  };

  const formatTemperature = (temp) => {
    return Math.round(temp);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {forecast.map((day, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="bg-white/20 backdrop-blur-sm rounded-xl p-4 lg:p-6 shadow-lg border border-white/20 text-center"
        >
          {/* Day */}
          <div className="text-white/90 font-body font-medium mb-3">
            {index === 0 ? 'Today' : format(addDays(new Date(), index), 'EEE')}
          </div>

          {/* Weather Icon */}
          <motion.div
            animate={{ 
              rotate: day.condition.toLowerCase().includes('sun') ? 360 : 0,
              y: day.condition.toLowerCase().includes('cloud') ? [0, -3, 0] : 0
            }}
            transition={{ 
              rotate: { duration: 8, repeat: Infinity, ease: "linear" },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
            className="mb-3"
          >
            <ApperIcon 
              name={getWeatherIcon(day.condition)} 
              className="w-10 h-10 lg:w-12 lg:h-12 text-white mx-auto"
            />
          </motion.div>

          {/* Condition */}
          <div className="text-white/80 font-body text-sm capitalize mb-3 leading-tight">
            {day.condition}
          </div>

          {/* Temperature Range */}
          <div className="space-y-1">
            <div className="text-white font-display font-semibold text-lg">
              {formatTemperature(day.tempHigh)}°
            </div>
            <div className="text-white/70 font-body text-sm">
              {formatTemperature(day.tempLow)}°
            </div>
          </div>

          {/* Precipitation */}
          {day.precipitation > 0 && (
            <div className="mt-3 flex items-center justify-center gap-1 text-white/70">
              <ApperIcon name="Droplets" className="w-3 h-3" />
              <span className="text-xs font-body">{day.precipitation}%</span>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default ForecastGrid;