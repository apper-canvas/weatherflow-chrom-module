import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '../components/ApperIcon';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="mb-8"
        >
          <ApperIcon name="CloudOff" className="w-24 h-24 text-surface-400 mx-auto" />
        </motion.div>
        
        <h1 className="text-4xl font-display font-bold text-surface-900 mb-4">
          404 - Page Not Found
        </h1>
        
        <p className="text-surface-600 mb-8 font-body">
          Looks like this page got lost in the clouds. Let's get you back to the weather dashboard.
        </p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
        >
          Back to Weather
        </motion.button>
      </motion.div>
    </div>
  );
};

export default NotFound;