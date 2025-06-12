import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const CurrentWeather = ({ data, units }) => {
  if (!data) return null;

  const getWeatherIcon = (condition, iconCode) => {
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
    } else if (conditionLower.includes('fog') || conditionLower.includes('mist')) {
      return 'CloudFog';
    }
    
    return 'Cloud';
  };

  const formatTemperature = (temp) => {
    return Math.round(temp);
  };

  const formatWindSpeed = (speed) => {
    return units === 'celsius' ? `${Math.round(speed)} km/h` : `${Math.round(speed)} mph`;
  };

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-xl border border-white/20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main Temperature Display */}
        <div className="text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
            <motion.div
              animate={{ 
                rotate: data.condition.toLowerCase().includes('sun') ? 360 : 0,
                y: data.condition.toLowerCase().includes('cloud') ? [0, -5, 0] : 0
              }}
              transition={{ 
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <ApperIcon 
                name={getWeatherIcon(data.condition, data.icon)} 
                className="w-16 h-16 lg:w-20 lg:h-20 text-white"
              />
            </motion.div>
            <div>
              <motion.div
                key={data.temperature}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="text-5xl lg:text-6xl font-display font-bold text-white"
              >
                {formatTemperature(data.temperature)}°
                <span className="text-2xl lg:text-3xl font-medium">
                  {units === 'celsius' ? 'C' : 'F'}
                </span>
              </motion.div>
              <div className="text-white/80 font-body text-lg">
                Feels like {formatTemperature(data.feelsLike)}°
              </div>
            </div>
          </div>
          
          <div className="text-xl lg:text-2xl font-display font-medium text-white capitalize mb-2">
            {data.condition}
          </div>
          
          <div className="text-white/70 font-body">
            {new Date(data.timestamp).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <ApperIcon name="Droplets" className="w-5 h-5 text-white/80" />
              <span className="text-white/80 font-body text-sm">Humidity</span>
            </div>
            <div className="text-2xl font-display font-semibold text-white">
              {data.humidity}%
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <ApperIcon name="Wind" className="w-5 h-5 text-white/80" />
              <span className="text-white/80 font-body text-sm">Wind</span>
            </div>
            <div className="text-2xl font-display font-semibold text-white">
              {formatWindSpeed(data.windSpeed)}
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <ApperIcon name="Eye" className="w-5 h-5 text-white/80" />
              <span className="text-white/80 font-body text-sm">Visibility</span>
            </div>
            <div className="text-2xl font-display font-semibold text-white">
              {units === 'celsius' ? '10 km' : '6 mi'}
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <ApperIcon name="Gauge" className="w-5 h-5 text-white/80" />
              <span className="text-white/80 font-body text-sm">Pressure</span>
            </div>
            <div className="text-2xl font-display font-semibold text-white">
              1013 hPa
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default CurrentWeather;