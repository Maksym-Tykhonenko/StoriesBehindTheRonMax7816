// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import Header from '../../ui/Header';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { kingImage, ScreenShell, styles, type SituationItem } from '../shared/WrappUsersApplication.shared';
import { SCREEN } from '../../foundation';

type Props = {
  items: SituationItem[];
  usedSituations: number[];
  onUseSituation: (nextUsed: number[]) => void;
};

export default function SituationsScreen({ items, usedSituations, onUseSituation }: Props) {
  const [currentSituation, setCurrentSituation] = useState<SituationItem | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const pickNext = (sourceUsed = usedSituations) => {
    const available = items.filter(item => !sourceUsed.includes(item.id));
    const pool = available.length > 0 ? available : items;
    const next = pool[Math.floor(Math.random() * pool.length)];
    const nextUsed = pool === items ? [next.id] : [...sourceUsed, next.id];

    setCurrentSituation(next);
    setSelectedIndex(null);
    setAnswered(false);
    onUseSituation(nextUsed);
  };

  useEffect(() => {
    if (!currentSituation) {
      pickNext();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!currentSituation) {
    return null;
  }

  const isCorrect = selectedIndex === currentSituation.correctIndex;

  return (
    <ScreenShell>
      <Header title="Situations" />
      {/* <Image source={kingImage} style={styles.heroImage} resizeMode="contain" /> */}
      <Card style={[styles.situationIntroCard, {marginTop: SCREEN.height * 0.1}]}>
        <Text style={styles.situationIntroBody}>We give you a situation, and you choose the option that you think is most correct.</Text>
      </Card>
      <Card style={styles.situationCard}>
        <Text style={styles.situationLabel}>Situation</Text>
        <Text style={styles.situationTitle}>{currentSituation.title}</Text>
        <Text style={styles.situationLabel}>Options</Text>
        <View style={styles.answerList}>
          {currentSituation.options.map((option, optionIndex) => {
            const correct = answered && optionIndex === currentSituation.correctIndex;
            const wrong = answered && selectedIndex === optionIndex && optionIndex !== currentSituation.correctIndex;
            const selected = selectedIndex === optionIndex && !answered;
            return (
              <Pressable
                key={option}
                onPress={() => {
                  if (answered) {
                    return;
                  }
                  setSelectedIndex(optionIndex);
                  setAnswered(true);
                }}
                style={[
                  styles.situationOption,
                  selected && styles.situationOptionSelected,
                  correct && styles.situationOptionCorrect,
                  wrong && styles.situationOptionWrong,
                ]}
              >
                <Text style={[styles.situationOptionText, (selected || correct || wrong) && styles.situationOptionTextActive]}>{option}</Text>
              </Pressable>
            );
          })}
        </View>
        {answered ? (
          <View style={styles.explanationBox}>
            <Text style={styles.explanationTitle}>{isCorrect ? 'Correct answer:' : 'Explanation:'}</Text>
            <Text style={styles.explanationBody}>{isCorrect ? currentSituation.options[currentSituation.correctIndex] : currentSituation.explanation}</Text>
            <Button label="Next situation" onPress={() => pickNext([...usedSituations, currentSituation.id])} style={styles.nextSituationButton} />
          </View>
        ) : null}
      </Card>
    </ScreenShell>
  );
}
