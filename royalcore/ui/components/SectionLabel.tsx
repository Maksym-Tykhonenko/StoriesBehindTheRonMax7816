import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FONT_FAMILY, FONT_SIZE, SPACING } from '../../foundation';

type Props = {
  label: string;
};

export function SectionLabel({ label }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: SPACING.screen,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xs,
  },
  text: {
    color: COLORS.textSoft,
    fontFamily: FONT_FAMILY.title,
    fontSize: FONT_SIZE.xl,
    letterSpacing: 0.5,
  },
});
