import { motion } from 'framer-motion';

const UnitsToggle = ({ units, onToggle }) => {
  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-1 border border-white/20">
      <div className="relative flex">
        <motion.div
          className="absolute inset-y-1 bg-white/30 rounded-md"
          initial={false}
          animate={{
            x: units === 'celsius' ? 0 : '100%',
            width: '50%'
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
        
        <button
          onClick={() => onToggle('celsius')}
          className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md ${
            units === 'celsius' 
              ? 'text-white' 
              : 'text-white/70 hover:text-white/90'
          }`}
        >
          °C
        </button>
        
        <button
          onClick={() => onToggle('fahrenheit')}
          className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md ${
            units === 'fahrenheit' 
              ? 'text-white' 
              : 'text-white/70 hover:text-white/90'
          }`}
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default UnitsToggle;