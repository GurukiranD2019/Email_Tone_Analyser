import React from "react";
import { useInView } from "../hooks/useInView";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fadeInUp" | "fadeInLeft" | "fadeInRight" | "scaleIn";
  delay?: number;
  threshold?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = "",
  animation = "fadeInUp",
  delay = 0,
  threshold = 0.1,
}) => {
  const { ref, isInView } = useInView({ threshold, triggerOnce: true });

  const getAnimationClasses = () => {
    const baseClasses = "transition-all duration-700 ease-out";

    switch (animation) {
      case "fadeInUp":
        return `${baseClasses} ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`;
      case "fadeInLeft":
        return `${baseClasses} ${
          isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
        }`;
      case "fadeInRight":
        return `${baseClasses} ${
          isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
        }`;
      case "scaleIn":
        return `${baseClasses} ${
          isInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`;
      default:
        return baseClasses;
    }
  };

  return (
    <div
      ref={ref}
      className={`${getAnimationClasses()} ${className}`}
      style={{
        transitionDelay: isInView ? `${delay}ms` : "0ms",
        transform: isInView ? undefined : "translateZ(0)", // Trigger hardware acceleration
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
