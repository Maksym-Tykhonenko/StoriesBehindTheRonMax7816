import React from 'react';
import { RoyalButton } from './components/RoyalButton';

export type ButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: 'accent' | 'correct' | 'wrong' | 'ghost';
  style?: any;
  textStyle?: any;
  disabled?: boolean;
};

export default function Button(props: ButtonProps) {
  return <RoyalButton {...props} />;
}
