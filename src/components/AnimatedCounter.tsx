import { useEffect, useState } from "react";
import { useMotionValue, useSpring, useTransform, useMotionValueEvent } from "framer-motion";
import { motion } from "framer-motion";

interface AnimatedCounterProps {
  targetNumber: number;
  displayString: string;
  duration?: number;
  className?: string;
}

/**
 * AnimatedCounter animates to a target number but always displays
 * the exact provided display string literal to guarantee exact rendering.
 * During animation, shows the counting number; after completion, shows the exact display string.
 */
export function AnimatedCounter({
  targetNumber,
  displayString,
  duration = 1.5,
  className = "",
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  // Transform the spring value to an integer for display during animation
  const animatedValue = useTransform(spring, (latest) => Math.floor(latest));

  // Update display value as animation progresses
  useMotionValueEvent(animatedValue, "change", (latest) => {
    setDisplayValue(latest);
  });

  useEffect(() => {
    motionValue.set(0);
    setDisplayValue(0);
    setIsComplete(false);
    
    const timeout = setTimeout(() => {
      motionValue.set(targetNumber);
    }, 50);

    // Mark as complete after animation duration
    const completeTimeout = setTimeout(() => {
      setIsComplete(true);
    }, duration * 1000);

    return () => {
      clearTimeout(timeout);
      clearTimeout(completeTimeout);
    };
  }, [targetNumber, motionValue, duration]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {isComplete ? (
        // After animation, always show the exact display string (never reformat)
        displayString
      ) : (
        // During animation, show the raw number (no formatting to avoid differences)
        displayValue
      )}
    </motion.span>
  );
}

