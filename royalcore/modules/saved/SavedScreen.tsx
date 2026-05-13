// @ts-nocheck
import { styles, type SavedTab, ScreenShell, type StoryItem, kingImage, } from '../shared/WrappUsersApplication.shared';

import React, { useState } from 'react';

import Header from '../../ui/Header';

import { Text } from 'react-native';

import Card from '../../ui/Card';

import EmptyStateCard from '../../ui/EmptyStateCard';

import StoryCard from '../stories/components/StoryCard';

import stories from '../../../storingsrc/data/stories';

import Tabs from '../../ui/Tabs';

type Props = {
    savedStories: number[];
    savedFacts: number[];
    onOpenStory: (story: StoryItem) => void;
    savedFactsData: string[];
};

export default function SavedScreen({ savedStories, savedFacts, onOpenStory, savedFactsData }: Props) {
    const [tab, setTab] = useState<SavedTab>('Stories');

    const savedStoryItems = (stories as StoryItem[]).filter(item => savedStories.includes(item.id));
    const savedFactItems = savedFactsData.filter((_, index) => savedFacts.includes(index + 1));

    return (
        <ScreenShell>
            <Header title="Saved" />
            <Tabs value={tab} onChange={setTab} />
            {tab === 'Stories' ? (
                savedStoryItems.length > 0 ? (
                    savedStoryItems.map(item => (
                        <StoryCard
                            previewLength={110}
                            story={item}
                            isSaved
                            key={item.id}
                            onReadAll={() => onOpenStory(item)}
                            containerStyle={styles.savedCard}
                            showSaveAction={false}
                        />
                    ))
                ) : (
                    <EmptyStateCard image={kingImage} title="Nothing saved" description="You do not have anything saved yet, take a look, maybe something will interest you."/>
                )
            ) : savedFactItems.length > 0 ? (
                savedFactItems.map((item, index) => (
                    <Card key={`${item}-${index}`} style={styles.savedCard}>
                        <Text style={styles.storyPreview}>{item}</Text>
                    </Card>
                ))
            ) : (
                <EmptyStateCard
                    description="You do not have anything saved yet, take a look, maybe something will interest you."
                    image={kingImage}
                    title="Nothing saved"
                />
            )}
        </ScreenShell>
    );
}
