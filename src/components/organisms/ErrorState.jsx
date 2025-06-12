import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const ErrorState = ({ message, onRetry }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        <motion.div
          animate={{ 
            rotate: [0, -10, 10, -10, 0],
            y: [0, -5, 0]
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
          className="mb-6"
        >
          <ApperIcon name="CloudOff" className="w-20 h-20 text-white/80 mx-auto" />
        </motion.div>
        
        <h2 className="text-2xl font-display font-semibold text-white mb-4">
          Weather Unavailable
        </h2>
        
        <p className="text-white/80 mb-8 font-body leading-relaxed">
          {message || "We couldn't fetch the weather data right now. Please check your connection and try again."}
        </p>
        
        <Button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 border border-white/20 flex items-center gap-2 mx-auto"
        >
          <ApperIcon name="RotateCcw" className="w-4 h-4" />
          Try Again
        </Button>
        
        <div className="mt-8 text-white/60 text-sm font-body">
          <p>Tips:</p>
          <ul className="mt-2 space-y-1 text-left max-w-xs mx-auto">
            <li>• Check your internet connection</li>
            <li>• Try searching for a different city</li>
            <li>• Enable location services for better results</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorState;