import { motion } from 'framer-motion';
import ApperIcon from './ApperIcon';

const LoadingState = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        {/* Animated Weather Icon */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          className="mb-6"
        >
          <ApperIcon name="Sun" className="w-16 h-16 text-white mx-auto" />
        </motion.div>

        {/* Loading Text */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-display font-semibold text-white mb-4"
        >
          Loading Weather Data
        </motion.h2>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2
              }}
              className="w-2 h-2 bg-white/70 rounded-full"
            />
          ))}
        </div>

        {/* Skeleton Cards */}
        <div className="mt-12 space-y-6 max-w-4xl mx-auto">
          {/* Current Weather Skeleton */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="animate-pulse bg-white/20 h-8 w-32 rounded-lg mx-auto lg:mx-0"></div>
                <div className="animate-pulse bg-white/20 h-16 w-40 rounded-lg mx-auto lg:mx-0"></div>
                <div className="animate-pulse bg-white/20 h-4 w-48 rounded-lg mx-auto lg:mx-0"></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse bg-white/10 rounded-xl p-4">
                    <div className="bg-white/20 h-4 w-16 rounded mb-2"></div>
                    <div className="bg-white/20 h-6 w-12 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Forecast Skeleton */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 lg:p-6">
                <div className="animate-pulse space-y-3">
                  <div className="bg-white/20 h-4 w-12 rounded mx-auto"></div>
                  <div className="bg-white/20 h-10 w-10 rounded-full mx-auto"></div>
                  <div className="bg-white/20 h-3 w-16 rounded mx-auto"></div>
                  <div className="bg-white/20 h-5 w-8 rounded mx-auto"></div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;