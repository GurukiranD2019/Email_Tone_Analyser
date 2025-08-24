import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Reset states on route change
    setIsExiting(false);
    setIsVisible(false);

    // Small delay for exit animation to complete from previous page
    const enterTimer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => {
      clearTimeout(enterTimer);
    };
  }, [location.pathname]);

  // Enhanced transition styles
  const getTransitionStyles = () => {
    if (isExiting) {
      return "opacity-0 -translate-x-8 scale-95";
    }
    if (isVisible) {
      return "opacity-100 translate-x-0 scale-100";
    }
    return "opacity-0 translate-x-8 scale-95";
  };

  return (
    <div
      className={`w-full transition-all duration-500 ease-out transform ${getTransitionStyles()} ${className}`}
      style={{
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div className="animate-fadeIn">{children}</div>
    </div>
  );
};

export default PageTransition;
