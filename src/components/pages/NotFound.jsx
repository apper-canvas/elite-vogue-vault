import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg"
      >
        <div className="mb-8">
          <h1 className="text-9xl font-display font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-display font-bold text-primary mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-primary/60 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" onClick={() => navigate("/")}>
            <ApperIcon name="Home" size={20} />
            Back to Home
          </Button>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            <ApperIcon name="ArrowLeft" size={20} />
            Go Back
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;