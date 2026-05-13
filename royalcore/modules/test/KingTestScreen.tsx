// @ts-nocheck
import React, { useMemo, useState } from 'react';
import { Image, Pressable, Share, Text, View } from 'react-native';
import Header from '../../ui/Header';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import TestResultScreen from './TestResultScreen';
import { questionImage, ScreenShell, styles, type TestItem } from '../shared/WrappUsersApplication.shared';

type Props = {
  items: TestItem[];
  onReset: () => void;
};

export default function KingTestScreen({ items, onReset }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [revealedSelection, setRevealedSelection] = useState<number | null>(null);

  const current = items[currentIndex];
  const totalPoints = useMemo(() => answers.reduce((sum, answer) => sum + (5 - answer), 0), [answers]);
  const percent = Math.round((totalPoints / (items.length * 5)) * 100);

  const handleAnswer = (optionIndex: number) => {
    if (revealedSelection !== null) {
      return;
    }

    setRevealedSelection(optionIndex);
    setAnswers(prev => [...prev, optionIndex]);

    setTimeout(() => {
      if (currentIndex === items.length - 1) {
        setCurrentIndex(prev => prev);
        return;
      }

      setCurrentIndex(prev => prev + 1);
      setRevealedSelection(null);
    }, 180);
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setAnswers([]);
    setRevealedSelection(null);
    onReset();
  };

  if (answers.length === items.length) {
    const finalPercent = Math.max(0, Math.min(100, percent));

    return <TestResultScreen finalPercent={finalPercent} onShare={() => Share.share({ message: `You think like a king on: ${finalPercent}%` })} onTryAgain={resetQuiz} />;
  }

  return (
    <ScreenShell>
      <Header title="King test" />
      <Card style={styles.testLeadCard}>
        <Image source={questionImage} style={styles.questionImage} resizeMode="contain" />
        <Text style={styles.testLeadText}>This is a test that will show how much you resemble a king/queen.</Text>
      </Card>
      <Card style={styles.testQuestionCard}>
        <View style={styles.dotRow}>
          {items.map((_, dotIndex) => (
            <View key={dotIndex} style={[styles.dot, dotIndex === currentIndex && styles.dotActive]} />
          ))}
        </View>
        <Text style={styles.testQuestion}>{current.title}</Text>
        <View style={styles.answerList}>
          {current.options.map((option, optionIndex) => {
            const isSelected = revealedSelection === optionIndex;
            const isSelectedAnswer = revealedSelection !== null && isSelected;
            return (
              <Pressable
                key={option}
                onPress={() => handleAnswer(optionIndex)}
                style={[
                  styles.answerButton,
                  isSelectedAnswer && styles.answerButtonSelected,
                  revealedSelection !== null && !isSelectedAnswer && styles.answerButtonDimmed,
                ]}
              >
                <Text style={[styles.answerText, isSelectedAnswer && styles.answerTextSelected]}>{option}</Text>
              </Pressable>
            );
          })}
        </View>
      </Card>
    </ScreenShell>
  );
}
