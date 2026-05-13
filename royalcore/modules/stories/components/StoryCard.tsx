// @ts-nocheck
import React from 'react';
import { Text, View } from 'react-native';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';
import { styles, shortenText, type StoryItem } from '../../shared/WrappUsersApplication.shared';

type Props = {
  story: StoryItem;
  isSaved: boolean;
  onReadAll: () => void;
  onToggleSave?: () => void;
  previewLength?: number;
  showSaveAction?: boolean;
  containerStyle?: any;
};

export default function StoryCard({
  story,
  isSaved,
  onReadAll,
  onToggleSave,
  previewLength = 132,
  showSaveAction = true,
  containerStyle,
}: Props) {
  if (!showSaveAction) {
    return (
      <Card style={[styles.savedCard, containerStyle]}>
        <Text style={styles.storyTitle}>{story.title}</Text>
        <Text style={styles.storyPreview}>{shortenText(story.text, previewLength)}</Text>
        <Button label="Read all" onPress={onReadAll} style={styles.storyButton} />
      </Card>
    );
  }

  return (
    <Card style={[styles.storyCard, containerStyle]}>
      <Text style={styles.storyTitle}>{story.title}</Text>
      <Text style={styles.storyPreview}>{shortenText(story.text, previewLength)}</Text>
      <View style={styles.storyActions}>
        <Button label="Read all" onPress={onReadAll} style={styles.storyButton} />
        <Button label={isSaved ? 'Saved' : 'Save'} variant="ghost" onPress={onToggleSave} style={styles.storyGhostButton} />
      </View>
    </Card>
  );
}
