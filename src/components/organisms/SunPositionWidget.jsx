import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Sunrise, Sunset } from 'lucide-react';
import { weatherService } from '@/services';

const SunPositionWidget = ({ location }) => {
  const [sunData, setSunData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!location) return;

const fetchSunData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await weatherService.getSunPosition(location);
        setSunData(data);
      } catch (err) {
        console.error("Error fetching sun data:", err);
        setError(err.message || 'Failed to load sun position data');
      } finally {
        setLoading(false);
      }
    };

    fetchSunData();
  }, [location]);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <div className="animate-pulse">
          <div className="h-6 bg-white/20 rounded mb-4"></div>
          <div className="h-24 bg-white/20 rounded mb-4"></div>
          <div className="flex justify-between">
            <div className="h-4 bg-white/20 rounded w-20"></div>
            <div className="h-4 bg-white/20 rounded w-20"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <div className="text-red-300 text-center">
          <Sun className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Unable to load sun position data</p>
        </div>
      </div>
    );
  }

  if (!sunData) return null;

  const { sunrise, sunset, currentPosition, isDaytime } = sunData;

  return (
    <motion.div 
      className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <Sun className="w-6 h-6 text-yellow-300" />
        <h3 className="text-lg font-semibold text-white">Sun Position</h3>
      </div>

      {/* Sun Arc Visualization */}
      <div className="relative h-24 mb-6">
        <svg 
          className="w-full h-full" 
          viewBox="0 0 200 50"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Arc Path */}
          <path
            d="M 20 40 Q 100 10 180 40"
            fill="none"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          
          {/* Active Arc (daytime portion) */}
          {isDaytime && (
            <motion.path
              d="M 20 40 Q 100 10 180 40"
              fill="none"
              stroke="rgba(252, 211, 77, 0.8)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="160"
              strokeDashoffset={160 - (currentPosition * 1.6)}
              initial={{ strokeDashoffset: 160 }}
              animate={{ strokeDashoffset: 160 - (currentPosition * 1.6) }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          )}

          {/* Sun Position Indicator */}
          <motion.circle
            cx={20 + (currentPosition * 1.6)}
            cy={40 - Math.sin((currentPosition / 100) * Math.PI) * 30}
            r="4"
            fill={isDaytime ? "#fbbf24" : "#6b7280"}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          />
          
          {/* Sunrise marker */}
          <circle
            cx="20"
            cy="40"
            r="2"
            fill="rgba(251, 191, 36, 0.6)"
          />
          
          {/* Sunset marker */}
          <circle
            cx="180"
            cy="40"
            r="2"
            fill="rgba(251, 191, 36, 0.6)"
          />
        </svg>
      </div>

      {/* Time Information */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sunrise className="w-4 h-4 text-yellow-300" />
          <div>
            <p className="text-xs text-white/60">Sunrise</p>
            <p className="text-sm font-medium text-white">
              {formatTime(sunrise)}
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-xs text-white/60">Current</p>
          <p className="text-sm font-medium text-white">
            {isDaytime ? 'Day' : 'Night'}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Sunset className="w-4 h-4 text-orange-300" />
          <div className="text-right">
            <p className="text-xs text-white/60">Sunset</p>
            <p className="text-sm font-medium text-white">
              {formatTime(sunset)}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SunPositionWidget;