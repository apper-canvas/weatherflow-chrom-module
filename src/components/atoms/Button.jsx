import { motion } from 'framer-motion';

const Button = ({ children, className = '', onClick, type = 'button', ...props }) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;