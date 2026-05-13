// @ts-nocheck
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Header from '../../ui/Header';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { ScreenShell, styles, type StoryItem } from '../shared/WrappUsersApplication.shared';

type Props = {
  story: StoryItem;
  isSaved: boolean;
  onGoBack: () => void;
  onShare: () => void;
  onToggleSave: () => void;
};

export default function StoryDetailsScreen({ story, isSaved, onGoBack, onShare, onToggleSave }: Props) {
  return (
    <ScreenShell>
      <View style={styles.detailTopRow}>
        <Pressable onPress={onGoBack} style={styles.backChip}>
          <Text style={styles.backChipText}>Back</Text>
        </Pressable>
        <Text style={styles.detailLabel}>Story</Text>
        <View style={styles.backChipSpacer} />
      </View>
      <Card style={styles.detailCard}>
        <Text style={styles.storyTitle}>{story.title}</Text>
        <Text style={styles.detailBody}>{story.text}</Text>
      </Card>
      <View style={styles.actionRow}>
        <Button label="Share" onPress={onShare} style={styles.actionButton} />
        <Button label={isSaved ? 'Saved' : 'Save'} variant="ghost" onPress={onToggleSave} style={styles.actionButton} />
      </View>
    </ScreenShell>
  );
}
