import React, { useCallback } from 'react';
import { Pressable, PressableProps, ViewStyle, StyleProp } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

interface TouchableBounceProps extends PressableProps {
  style?: StyleProp<ViewStyle>;
  bounceScale?: number;
  children: React.ReactNode;
}

const SPRING_CONFIG = { damping: 20, stiffness: 400, mass: 0.5 };

export const TouchableBounce: React.FC<TouchableBounceProps> = ({ 
  style, 
  bounceScale = 0.96,
  children, 
  onPressIn,
  onPressOut,
  ...props 
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = useCallback((e: any) => {
    scale.value = withSpring(bounceScale, SPRING_CONFIG);
    if (onPressIn) onPressIn(e);
  }, [bounceScale, onPressIn]);

  const handlePressOut = useCallback((e: any) => {
    scale.value = withSpring(1, SPRING_CONFIG);
    if (onPressOut) onPressOut(e);
  }, [onPressOut]);

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...props}
    >
      <Animated.View style={[style, animatedStyle]}>
        {children}
      </Animated.View>
    </Pressable>
  );
};
