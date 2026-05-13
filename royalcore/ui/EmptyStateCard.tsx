// @ts-nocheck
import React from 'react';



import Card from './Card';

import Button from './Button';

import { kingImage, styles } from '../modules/shared/WrappUsersApplication.shared';

import {ImageSourcePropType, Image,  Text } from 'react-native';
import { SCREEN } from '../foundation';

type Props = {
  title: string;
  description: string;
  buttonText?: string;
  onPress?: () => void;
  image?: ImageSourcePropType;
};

export default function EmptyStateCard({ title, description, buttonText, onPress, image = kingImage }: Props) {
  return (
    <>
      {/* {image ? <Image source={image} style={styles.emptyImage} resizeMode="contain" /> : null} */}
      <Card style={[styles.emptyCard, {
        marginTop: SCREEN.height * 0.19,
      }]}>
        <Text style={styles.emptyTitle}>{title}</Text>
        <Text style={styles.emptyBody}>{description}</Text>
        {buttonText ? <Button label={buttonText} onPress={onPress} /> : null}
      </Card>
    </>
  );
}
