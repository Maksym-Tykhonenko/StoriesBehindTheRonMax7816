import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { COLORS, FONT_FAMILY, FONT_SIZE, RADIUS, SPACING } from '../../foundation';

type Variant = 'accent' | 'correct' | 'wrong' | 'ghost';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  style?: ViewStyle;
  textStyle?: ViewStyle;
  disabled?: boolean;
};

const backgroundByVariant: Record<Variant, string> = {
  accent: COLORS.accent,
  correct: COLORS.correct,
  wrong: COLORS.wrong,
  ghost: 'transparent',
};

const textByVariant: Record<Variant, string> = {
  accent: '#2E1E00',
  correct: '#102A08',
  wrong: '#FFF6C9',
  ghost: COLORS.accent,
};

export function RoyalButton({ label, onPress, variant = 'accent', style, textStyle, disabled }: Props) {
  return (
    <Pressable onPress={onPress} disabled={disabled} style={({ pressed }) => [styles.button, { backgroundColor: backgroundByVariant[variant], opacity: pressed || disabled ? 0.88 : 1 }, style]}>
      <Text style={[styles.label, { color: textByVariant[variant] }, textStyle]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 44,
    borderRadius: RADIUS.pill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },
  label: {
    fontFamily: FONT_FAMILY.title,
    fontSize: FONT_SIZE.lg,
  },
});
