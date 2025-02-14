import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 0, scale: 0.1 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.1, ease: "easeOut" } },
  exit: { opacity: 0, y: 0, scale: 0.1, transition: { duration: 0.1, ease: "easeIn" } }, 
};

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;