import React, { useEffect } from 'react';
import { Image, ImageSourcePropType, Pressable, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { getDivyaMessage } from './divyaMessages';
import type { DivyaExpression } from './divyaState';

const expressionAssets: Record<DivyaExpression, ImageSourcePropType> = {
  idle: require('../../assets/divya/divya_idle.png'),
  focus: require('../../assets/divya/divya_focus.png'),
  calm: require('../../assets/divya/divya_calm.png'),
  happy: require('../../assets/divya/divya_happy.png'),
  celebrate: require('../../assets/divya/divya_celebrate.png'),
};

interface DivyaAvatarProps {
  expression: DivyaExpression;
  size?: number;
  onMessage?: (message: string) => void;
}

export const DivyaAvatar: React.FC<DivyaAvatarProps> = ({
  expression,
  size = 88,
  onMessage,
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.85);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.02, { duration: 1800, easing: Easing.inOut(Easing.quad) }),
        withTiming(1.0, { duration: 1800, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
      false,
    );

    opacity.value = withTiming(1, { duration: 280 });
  }, [expression, opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Divya mascot"
      onPress={() => onMessage?.(getDivyaMessage(expression, Date.now()))}
    >
      <Animated.View style={[styles.avatarWrap, animatedStyle, { width: size, height: size }]}>
        <Image source={expressionAssets[expression]} style={styles.image} resizeMode="contain" />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  avatarWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
