// @ts-nocheck
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { styles } from '../modules/shared/WrappUsersApplication.shared';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function Card({ children, style }: Props) {
  return <View style={[styles.card, style]}>{children}</View>;
}
