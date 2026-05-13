// @ts-nocheck
import React, { memo, useEffect, useState } from 'react';
import { Dimensions, Image, SafeAreaView, Share, StatusBar, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import stories from '../../storingsrc/data/stories';
import jokes from '../../storingsrc/data/jokes';
import facts from '../../storingsrc/data/facts';
import situations from '../../storingsrc/data/situations';
import testQuestions from '../../storingsrc/data/whatpercintageofking';
import { BottomBar, MainTabKey } from '../../storingsrc/rohcomponst/BottomBar';
import { COLORS } from '../foundation';
import { styles, type StoryItem, useHydratedCollections } from './shared/WrappUsersApplication.shared';
import StoriesScreen from './stories/StoriesScreen';
import StoryDetailsScreen from './stories/StoryDetailsScreen';
import JokesScreen from './jokes/JokesScreen';
import FactsScreen from './facts/FactsScreen';
import KingTestScreen from './test/KingTestScreen';
import SituationsScreen from './situations/SituationsScreen';
import SavedScreen from './saved/SavedScreen';

type ScreenKey = 'stories' | 'storyDetails' | 'jokes' | 'facts' | 'test' | 'situations' | 'saved';

const screenTabMap: Record<ScreenKey, MainTabKey> = {
  stories: 'Stories',
  storyDetails: 'Stories',
  jokes: 'Jokes',
  facts: 'Facts',
  test: 'Test',
  situations: 'Situations',
  saved: 'Saved',
};

const WrapperComponent = () => {
  const insets = useSafeAreaInsets();
  const {
    ready,
    savedStories,
    savedFacts,
    usedSituations,
    toggleSavedStory,
    toggleSavedFact,
    storeUsedSituations,
  } = useHydratedCollections();
  const [currentScreen, setCurrentScreen] = useState<ScreenKey>('stories');
  const [openedStory, setOpenedStory] = useState<StoryItem | null>(null);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [testResetSeed, setTestResetSeed] = useState(0);

  useEffect(() => {
    if (currentScreen !== 'stories' && currentScreen !== 'storyDetails') {
      setOpenedStory(null);
    }
  }, [currentScreen]);

  const currentStory = openedStory;
  const activeTab = screenTabMap[currentScreen];

  const openShare = (message: string) => Share.share({ message });

  const handleSwitchTab = (tab: MainTabKey) => {
    if (tab === 'Stories') {
      setCurrentScreen(currentStory ? 'storyDetails' : 'stories');
      return;
    }

    if (tab === 'Jokes') {
      setCurrentScreen('jokes');
      return;
    }

    if (tab === 'Facts') {
      setCurrentScreen('facts');
      return;
    }

    if (tab === 'Test') {
      setCurrentScreen('test');
      return;
    }

    if (tab === 'Situations') {
      setCurrentScreen('situations');
      return;
    }

    setCurrentScreen('saved');
  };

  const renderContent = () => {
    if (!ready) {
      return null;
    }

    if (currentScreen === 'stories') {
      return (
        <StoriesScreen
          items={stories as StoryItem[]}
          savedStories={savedStories}
          onOpenDetails={story => {
            setOpenedStory(story);
            setCurrentScreen('storyDetails');
          }}
          onToggleSave={toggleSavedStory}
        />
      );
    }

    if (currentScreen === 'storyDetails') {
      if (!currentStory) {
        return (
          <StoriesScreen
            items={stories as StoryItem[]}
            savedStories={savedStories}
            onOpenDetails={story => {
              setOpenedStory(story);
              setCurrentScreen('storyDetails');
            }}
            onToggleSave={toggleSavedStory}
          />
        );
      }

      return (
        <StoryDetailsScreen
          story={currentStory}
          isSaved={savedStories.includes(currentStory.id)}
          onGoBack={() => setCurrentScreen('stories')}
          onShare={() => openShare(`${currentStory.title}\n\n${currentStory.text}`)}
          onToggleSave={() => toggleSavedStory(currentStory.id)}
        />
      );
    }

    if (currentScreen === 'jokes') {
      return <JokesScreen items={jokes as string[]} />;
    }

    if (currentScreen === 'facts') {
      return (
        <FactsScreen
          items={facts as string[]}
          savedFacts={savedFacts}
          index={currentFactIndex}
          onBack={() => setCurrentFactIndex(prev => Math.max(0, prev - 1))}
          onNext={() => setCurrentFactIndex(prev => Math.min((facts as string[]).length - 1, prev + 1))}
          onToggleSave={toggleSavedFact}
          onShare={openShare}
        />
      );
    }

    if (currentScreen === 'test') {
      return <KingTestScreen key={testResetSeed} items={testQuestions as any} onReset={() => setTestResetSeed(prev => prev + 1)} />;
    }

    if (currentScreen === 'situations') {
      return <SituationsScreen items={situations as any} usedSituations={usedSituations} onUseSituation={storeUsedSituations} />;
    }

    return <SavedScreen savedStories={savedStories} savedFacts={savedFacts} onOpenStory={setOpenedStory} savedFactsData={facts as string[]} />;
  };

  return (
    <SafeAreaView edges={['top']} style={[styles.root, { paddingBottom: insets.bottom }]}>
        <Image 
            source={require('../../storingsrc/hinassets/oindimages/groundofapp.png')}
            style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
                position: 'absolute',
                resizeMode: 'cover',
                position: 'absolute',
            }}
        />
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <View style={styles.content}>{renderContent()}</View>
      <BottomBar activeTab={activeTab} onTabPress={handleSwitchTab} />
    </SafeAreaView>
  );
};

export const WorlWrapIntoOneFile = memo(WrapperComponent);
export default WorlWrapIntoOneFile;
