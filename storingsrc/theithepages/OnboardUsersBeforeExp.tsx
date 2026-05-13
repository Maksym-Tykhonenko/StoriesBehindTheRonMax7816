import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLORS, SCREEN } from '../../royalcore/foundation';


import { STORAGE_KEYS } from '../../royalcore/engine/storage';

import { useNavigation } from '@react-navigation/native';

type Slide = {
    title: string;
    description: string;
    image: any;
    action: string;
};

const slides: Slide[] = [
    // {
    //     title: 'This is your decision space',
    //     description: 'I am Queen Kate.\nHere you do not just watch content — you react, choose, and see what comes of it.',
    //     image: require('../hinassets/oindimages/onboardings/ThisDecisionSpace.png'),
    //     action: 'Hello!',
    // },
    // {
    //     title: 'Situations where everything depends on you',
    //     description: 'You get a situation — and several options. You choose the one that is closest to you and immediately see the explanation.',
    //     image: require('../hinassets/oindimages/onboardings/cool.png'),
    //     action: 'Next',
    // },
    {
        title: 'Content that you do not want to close',
        description: 'There are stories, jokes, and facts here. Something will make you laugh, something will surprise you, something will resonate deeply.',
        image: require('../hinassets/oindimages/onboardings/book.png'),
        action: 'Continue',
    },
    {
        title: 'Look at yourself from the side',
        description: 'There is a quiz that collects your answers and shows the result. Without embellishment — as it is. Sometimes it is very accurate.',
        image: require('../hinassets/oindimages/onboardings/question.png'),
        action: 'Good',
    },
    {
        title: 'What is worth keeping',
        description: 'Any fact or story can be saved. You can come back later — or show it to someone. Because there are some things you do not want to lose.',
        image: require('../hinassets/oindimages/onboardings/yellobookmar.png'),
        action: "Let's start!",
    },
];

import { Image,
     NativeScrollEvent,
      NativeSyntheticEvent,
       ScrollView,
        StatusBar,
         StyleSheet,
          View } from 'react-native';
import React, {useRef, useState } from 'react';

import OnboardingSlide from '../../royalcore/ui/OnboardingSlide';



export default function OnboardUsersBeforeExp() {
    const navigation = useNavigation<any>();
    const scrollRef = useRef<ScrollView>(null);
    const [index, setIndex] = useState(0);

    const completeOnboarding = async () => {
        await AsyncStorage.setItem(STORAGE_KEYS.onboardingCompleted, 'true');
        navigation.replace('WrappUsersApplication');
    };

    const advance = () => {
        if (index === slides.length - 1) {
            completeOnboarding();
            return;
        }

        const nextIndex = index + 1;
        setIndex(nextIndex);
        scrollRef.current?.scrollTo({ x: SCREEN.width * nextIndex, animated: true });
    };

    const onMomentumEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const nextIndex = Math.round(event.nativeEvent.contentOffset.x / SCREEN.width);
        setIndex(Math.max(0, Math.min(slides.length - 1, nextIndex)));
    };

    return (
        <View style={styles.root}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
            <Image source={require('../hinassets/oindimages/groundofapp.png')} style={styles.background} />
            <ScrollView
                ref={scrollRef}
                horizontal
                pagingEnabled
                decelerationRate="fast"
                onMomentumScrollEnd={onMomentumEnd}
                showsHorizontalScrollIndicator={false}
                bounces={false}
                scrollEventThrottle={16}
            >
                {slides.map((slide, slideIndex) => (
                    <OnboardingSlide
                        key={slide.title}
                        title={slide.title}
                        description={slide.description}
                        image={slide.image}
                        action={slide.action}
                        onAction={advance}
                        totalSlides={slides.length}
                        currentIndex={slideIndex}
                        onSkip={completeOnboarding}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: 'flex-end',
    },
    background: {
        position: 'absolute',
        width: SCREEN.width,
        height: SCREEN.height,
    },
});
