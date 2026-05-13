/**
 * HeroIcon Component
 *
 * Centralized component for using heroicons across the app.
 * RULE: Use this component for ALL icons except bottom bar.
 *
 * Usage:
 * import { HeroIcon } from './HeroIcon'
 * <HeroIcon name="BookOpen" color={COLORS.accent} size={24} />
 *
 * Size presets:
 * - xs: 16
 * - sm: 20
 * - md: 24
 * - lg: 28
 * - xl: 32
 *
 * Available icons (outline and solid):
 * BookOpen, FaceSmile, QuestionMarkCircle, ShieldCheck, Bookmark,
 * StarFilled, CheckCircle, XMark, Plus, Minus, ChevronUp, ChevronDown,
 * Share, Download, and many more...
 *
 * Always come from react-native-heroicons:
 * - import { IconName } from "react-native-heroicons/outline"  (for outline)
 * - import { IconName } from "react-native-heroicons/solid"    (for solid)
 */

import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

// Re-export all outline icons
export * as OutlineIcons from 'react-native-heroicons/outline';
// Re-export all solid icons
export * as SolidIcons from 'react-native-heroicons/solid';

type SizeKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const sizes: Record<SizeKey, number> = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
};

type HeroIconProps = {
  name: string;
  color?: string;
  size?: number | SizeKey;
  style?: StyleProp<ViewStyle>;
  variant?: 'outline' | 'solid';
};

/**
 * Example helper to dynamically render heroicons
 * For production, import specific icons and use them directly:
 *
 * import { BookOpen, FaceSmile } from 'react-native-heroicons/outline'
 * <BookOpen color={COLORS.accent} />
 * <FaceSmile color={COLORS.text} size={20} />
 */
export function HeroIcon({ name, color = '#000000', size = 'md', variant = 'outline', style }: HeroIconProps) {
  const resolvedSize = typeof size === 'string' ? sizes[size] : size;

  // For production, you would:
  // 1. Define a mapping of icon names to components
  // 2. Import specific icons and render them
  // 3. Or use dynamic imports
  //
  // This is a placeholder that shows the pattern

  return null;
}

/**
 * HEROICONS QUICK REFERENCE
 *
 * Import patterns:
 * ================
 *
 * Outline (thin stroke):
 * import { BookOpen, FaceSmile, QuestionMarkCircle } from 'react-native-heroicons/outline'
 *
 * Solid (filled):
 * import { BookOpen, FaceSmile, QuestionMarkCircle } from 'react-native-heroicons/solid'
 *
 * Common icons for Stories app:
 * =============================
 * - BookOpen: Stories screen, read action
 * - FaceSmile: Jokes screen
 * - QuestionMarkCircle: Test/Quiz screen
 * - ShieldCheck: Situations screen
 * - Bookmark: Saved screen
 * - Star, StarFilled: Rating/favorites
 * - CheckCircle: Test correct answer
 * - XMark: Test wrong answer
 * - Share: Share action
 * - Download: Save action
 * - ChevronUp, ChevronDown: Navigation
 * - Plus, Minus: Counters
 *
 * Colors MUST come from COLORS object:
 * ====================================
 * import { COLORS } from '../../royalcore/foundation'
 * <BookOpen color={COLORS.accent} size={24} />
 *
 * ❌ NEVER hardcode colors:
 * <BookOpen color="#FFD900" />    // WRONG
 *
 * Size recommendations:
 * ====================
 * Button icons: 20-24 (sm or md)
 * Header icons: 24-28 (md or lg)
 * Large actions: 32+ (xl)
 * Small labels: 16-20 (xs or sm)
 */
