// @ts-nocheck
import React from 'react';
import Header from '../../ui/Header';
import StoryCard from './components/StoryCard';
import { ScreenShell, styles, type StoryItem } from '../shared/WrappUsersApplication.shared';

type Props = {
  items: StoryItem[];
  savedStories: number[];
  onOpenDetails: (story: StoryItem) => void;
  onToggleSave: (storyId: number) => void;
};

export default function StoriesScreen({ items, savedStories, onOpenDetails, onToggleSave }: Props) {
  return (
    <ScreenShell>
      <Header title="Stories" />
      {items.map(item => (
        <StoryCard
          key={item.id}
          story={item}
          isSaved={savedStories.includes(item.id)}
          onReadAll={() => onOpenDetails(item)}
          onToggleSave={() => onToggleSave(item.id)}
          containerStyle={styles.storyCard}
        />
      ))}
    </ScreenShell>
  );
}
