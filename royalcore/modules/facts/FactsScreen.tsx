// @ts-nocheck
import React from 'react';
import { Image, Text, View } from 'react-native';
import Header from '../../ui/Header';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { ScreenShell, kingImage, styles } from '../shared/WrappUsersApplication.shared';
import { SCREEN } from '../../foundation';

type Props = {
  items: string[];
  savedFacts: number[];
  index: number;
  onBack: () => void;
  onNext: () => void;
  onToggleSave: (id: number) => void;
  onShare: (message: string) => void;
};

export default function FactsScreen({ items, savedFacts, index, onBack, onNext, onToggleSave, onShare }: Props) {
  const isSaved = savedFacts.includes(index + 1);
  const fact = items[index];

  return (
    <ScreenShell>
      <Header title="Facts" />
      {/* <Image source={kingImage} style={styles.heroImage} resizeMode="contain" /> */}
      <Card style={[styles.factCard, {marginTop: SCREEN.height * 0.17}]}>
        <Image 
            source={require('../../../storingsrc/hinassets/oindimages/baricons/material-symbols-rounded.png')}
            style={{
                width: SCREEN.width * 0.1,
                height: SCREEN.width * 0.1,
                resizeMode: 'contain',
            }}
        />
        <Text style={styles.factText}>{fact}</Text>
        <View style={styles.factButtons}>
          <Button label="Share" onPress={() => onShare(fact)} style={styles.factButton} />
          <Button label={isSaved ? 'Saved' : 'Save'} variant="ghost" onPress={() => onToggleSave(index + 1)} style={styles.factButton} />
        </View>
      </Card>
      <View style={styles.navRow}>
        <Button label="Back" onPress={onBack} style={styles.navButton} />
        <Button label="Next" onPress={onNext} style={styles.navButton} />
      </View>
    </ScreenShell>
  );
}
