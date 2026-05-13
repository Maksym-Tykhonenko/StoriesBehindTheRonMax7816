// @ts-nocheck
import React from 'react';
import { Share, Text } from 'react-native';
import Header from '../../ui/Header';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { ScreenShell, styles } from '../shared/WrappUsersApplication.shared';

type Props = {
  items: string[];
};

export default function JokesScreen({ items }: Props) {
  return (
    <ScreenShell>
      <Header title="Jokes" />
      {items.map((item, index) => (
        <Card key={`${item}-${index}`} style={styles.jokeCard}>
          <Text style={styles.jokeText}>{item}</Text>
          <Button label="Share" onPress={() => Share.share({ message: item })} style={styles.jokeButton} />
        </Card>
      ))}
    </ScreenShell>
  );
}
