import React, { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";

export default function AnimatedEntrance({
  children,
  delay = 0,
  distance = 24,
  duration = 520,
  style = undefined,
}) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(distance)).current;

  useEffect(() => {
    if (hasAnimated) {
      opacity.setValue(1);
      translateY.setValue(0);
      return;
    }

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        delay,
        damping: 18,
        stiffness: 140,
        mass: 0.9,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setHasAnimated(true);
    });
  }, [delay, distance, duration, hasAnimated, opacity, translateY]);

  return (
    <Animated.View style={[style, { opacity, transform: [{ translateY }] }]}>
      {children}
    </Animated.View>
  );
}
