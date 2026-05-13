// @ts-nocheck
import { Text } from 'react-native';
import { styles } from '../modules/shared/WrappUsersApplication.shared';
import React from 'react';

type Props = {
  title: string;
};

export default function Header({ title }: Props) {
  return <Text style={styles.headerTitle}>{title}</Text>;
}
