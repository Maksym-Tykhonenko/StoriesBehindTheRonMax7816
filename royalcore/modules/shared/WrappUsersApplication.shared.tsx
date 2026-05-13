// @ts-nocheck
import {  Image, Pressable,  StyleSheet, ScrollView, Text, View,Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import facts from '../../../storingsrc/data/facts';
import { STORAGE_KEYS, readJson, writeJson } from '../../engine/storage';
import stories from '../../../storingsrc/data/stories';
import {RADIUS, COLORS,  FONT_SIZE, FONT_FAMILY,  SCREEN, SPACING } from '../../foundation';
import React, { useEffect, useState } from 'react';

type StoryItem = { id: number; title: string; text: string };
type SituationItem = { id: number; title: string; options: string[]; correctIndex: number; explanation: string };
type TestItem = { id: number; title: string; options: string[] };
type SavedTab = 'Stories' | 'Facts';

type HydratedCollections = {
    ready: boolean;
    savedStories: number[];
    savedFacts: number[];
    usedSituations: number[];
    toggleSavedStory: (storyId: number) => void;
    toggleSavedFact: (factId: number) => void;
    storeUsedSituations: (next: number[]) => void;
};

const kingImage = require('../../../storingsrc/hinassets/oindimages/onboardings/cool.png');
const questionImage = require('../../../storingsrc/hinassets/oindimages/onboardings/question.png');

function shortenText(text: string, maxLength = 132) {
    if (text.length <= maxLength) {
        return text;
    }

    return `${text.slice(0, maxLength).trim()}...`;
}

function useHydratedCollections(): HydratedCollections {
    const [savedStories, setSavedStories] = useState<number[]>([]);
    const [savedFacts, setSavedFacts] = useState<number[]>([]);
    const [usedSituations, setUsedSituations] = useState<number[]>([]);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        let alive = true;

        Promise.all([
            readJson<number[]>(STORAGE_KEYS.savedStories, []),
            readJson<number[]>(STORAGE_KEYS.savedFacts, []),
            readJson<number[]>(STORAGE_KEYS.usedSituations, []),
        ])
            .then(([storedStories, storedFacts, storedSituations]) => {
                if (!alive) {
                    return;
                }

                setSavedStories(storedStories);
                setSavedFacts(storedFacts);
                setUsedSituations(storedSituations);
                setReady(true);
            })
            .catch(() => {
                if (!alive) {
                    return;
                }

                setReady(true);
            });

        return () => {
            alive = false;
        };
    }, []);

    const toggleSavedStory = async (storyId: number) => {
        setSavedStories(prev => {
            const next = prev.includes(storyId) ? prev.filter(id => id !== storyId) : [...prev, storyId];
            writeJson(STORAGE_KEYS.savedStories, next);
            return next;
        });
    };

    const toggleSavedFact = async (factId: number) => {
        setSavedFacts(prev => {
            const next = prev.includes(factId) ? prev.filter(id => id !== factId) : [...prev, factId];
            writeJson(STORAGE_KEYS.savedFacts, next);
            return next;
        });
    };

    const storeUsedSituations = (next: number[]) => {
        setUsedSituations(next);
        writeJson(STORAGE_KEYS.usedSituations, next);
    };

    return {
        ready,
        savedStories,
        savedFacts,
        usedSituations,
        toggleSavedStory,
        toggleSavedFact,
        storeUsedSituations,
    };
}

function ScreenShell({ children }: { children: React.ReactNode }) {
    return <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>{children}</ScrollView>;
}

const styles = StyleSheet.create({
    
    scrollContent: {
        gap: SPACING.md,
        paddingTop: SPACING.lg,
        paddingBottom: SPACING.xxl,
        paddingBottom: Dimensions.get('window').height * 0.210324,
        paddingHorizontal: SPACING.screen,
    },
    headerTitle: {
        color: COLORS.text,
        fontFamily: FONT_FAMILY.title,
        fontSize: FONT_SIZE.xxl,
        textAlign: 'center',
        marginBottom: SPACING.sm,
    },
    card: {
        backgroundColor: 'rgba(52, 34, 0, 0.92)',
        borderWidth: 1,
        borderColor: COLORS.accent,
        borderRadius: RADIUS.lg,
        padding: SPACING.lg,
        gap: SPACING.md,
    },
    storyCard: {
        gap: SPACING.sm,
    },
    root: { backgroundColor: COLORS.background, flex: 1,},
    
    storyTitle: {
        color: COLORS.text,
        fontFamily: FONT_FAMILY.title,
        fontSize: FONT_SIZE.lg,
        textAlign: 'center',
    },
    storyPreview: {
        color: COLORS.textMuted,
        fontFamily: FONT_FAMILY.body,
        fontSize: FONT_SIZE.md,
        lineHeight: 20,
        textAlign: 'center',
    },
    content: {flex: 1,},
    storyActions: {
        justifyContent: 'space-between',
        gap: SPACING.sm,
        flexDirection: 'row',
    },
    storyButton: {
        flex: 1,
    },
    storyGhostButton: {
        flex: 0.7,
    },
    detailTopRow: {
        paddingTop: SPACING.lg,

        alignItems: 'center',


        flexDirection: 'row',

        paddingHorizontal: SPACING.screen,

        marginBottom: SPACING.md,

        justifyContent: 'space-between',
    },
    detailLabel: {
        fontSize: FONT_SIZE.xl,
        color: COLORS.text,
        fontFamily: FONT_FAMILY.title,
    },
    backChip: {
        paddingHorizontal: SPACING.lg,
        borderRadius: RADIUS.pill,
        paddingVertical: SPACING.sm,
        backgroundColor: COLORS.accent,
    },
    backChipText: {
        color: '#2B1D00',
        fontFamily: FONT_FAMILY.title,
        fontSize: FONT_SIZE.md,
    },
    backChipSpacer: {
        width: 64,
    },
    detailCard: {
        marginHorizontal: SPACING.screen,
    },
    detailBody: {
        fontSize: FONT_SIZE.md,
        fontFamily: FONT_FAMILY.body,
        lineHeight: 24,
        textAlign: 'left',
        color: COLORS.textMuted,
    },
    actionRow: {
        flexDirection: 'row',
        gap: SPACING.md,
        paddingHorizontal: SPACING.screen,
        paddingTop: SPACING.md,
    },
    actionButton: {
        flex: 1,
    },
    jokeCard: {
        alignItems: 'center',
    },
    jokeText: {
        lineHeight: 22,
        fontFamily: FONT_FAMILY.body,
        textAlign: 'center',
        fontSize: FONT_SIZE.md,
        color: COLORS.text,
    },
    jokeButton: {
        alignSelf: 'center',
        minWidth: 120,
    },
    heroImage: {
        width: SCREEN.width * 0.56,
        height: SCREEN.width * 0.56,
        alignSelf: 'center',
        marginTop: -SPACING.sm,
        marginBottom: -SPACING.md,
    },
    factCard: {
        alignItems: 'center',
    },
    factText: {
        color: COLORS.text,
        fontFamily: FONT_FAMILY.body,
        fontSize: FONT_SIZE.md,
        lineHeight: 22,
        textAlign: 'center',
    },
    factButtons: {
        flexDirection: 'row',
        gap: SPACING.md,
        justifyContent: 'center',
    },
    factButton: {
        flex: 1,
    },
    navRow: {
        flexDirection: 'row',
        gap: SPACING.md,
        paddingHorizontal: SPACING.screen,
    },
    navButton: {
        flex: 1,
    },
    testLeadCard: {
        alignItems: 'center',
    },
    questionImage: {
        height: SCREEN.width * 0.30,




        marginTop: -SPACING.md,




        width: SCREEN.width * 0.30,




    },
    testLeadText: {
        textAlign: 'center',
        fontFamily: FONT_FAMILY.body,
        fontSize: FONT_SIZE.md,
        lineHeight: 22,
        color: COLORS.textMuted,
    },
    testQuestionCard: {
        gap: SPACING.md,
    },
    dotRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 5,
    },
    dot: {
        width: 5,
        height: 5,
        borderRadius: 3,
        backgroundColor: 'rgba(255, 217, 0, 0.45)',
    },
    dotActive: {
        backgroundColor: COLORS.accent,
        width: 10,
    },
    testQuestion: {
        fontSize: FONT_SIZE.lg,
        textAlign: 'center',
        fontFamily: FONT_FAMILY.title,
        color: COLORS.text,
    },
    answerList: {
        gap: SPACING.sm,
    },
    answerButton: {
        backgroundColor: COLORS.accent,
        paddingVertical: SPACING.sm,
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
        minHeight: 38,
        justifyContent: 'center',
        borderRadius: RADIUS.pill,
    },
    answerButtonSelected: {
        backgroundColor: COLORS.text,
    },
    answerButtonDimmed: {
        opacity: 0.62,
    },
    answerText: {
        textAlign: 'center',
        fontFamily: FONT_FAMILY.title,
        color: '#2C1D00',
        fontSize: FONT_SIZE.md,
    },
    answerTextSelected: {
        color: '#2C1D00',
    },
    testResultCard: {
        alignItems: 'center',
    },
    testResultTitle: {
        textAlign: 'center',
        fontFamily: FONT_FAMILY.title,
        fontSize: FONT_SIZE.xl,
        color: COLORS.text,
    },
    testResultBody: {
        color: COLORS.textMuted,
        fontFamily: FONT_FAMILY.body,
        fontSize: FONT_SIZE.md,
        textAlign: 'center',
    },
    testResultPercent: {
        fontSize: FONT_SIZE.lg,
        color: COLORS.accent,
        textAlign: 'center',
        fontFamily: FONT_FAMILY.title,
    },
    testResultImage: {
        width: SCREEN.width * 0.36,
        height: SCREEN.width * 0.36,
    },
    resultButtons: {
        flexDirection: 'row',
        gap: SPACING.md,
        width: '100%',
    },
    resultButton: {
        flex: 1,
    },
    situationIntroCard: {
        alignItems: 'center',
    },
    situationIntroTitle: {
        fontSize: FONT_SIZE.lg,
        fontFamily: FONT_FAMILY.title,
        color: COLORS.text,
    },
    situationIntroBody: {
        color: COLORS.textMuted,
        fontFamily: FONT_FAMILY.body,
        fontSize: FONT_SIZE.md,
        textAlign: 'center',
        lineHeight: 22,
    },
    situationCard: {
        gap: SPACING.md,
    },
    situationLabel: {
        fontSize: FONT_SIZE.sm,
        textAlign: 'center',
        fontFamily: FONT_FAMILY.title,
        color: COLORS.textMuted,
    },
    situationTitle: {
        color: COLORS.text,
        fontFamily: FONT_FAMILY.title,
        fontSize: FONT_SIZE.lg,
        textAlign: 'center',
    },
    situationOption: {
        justifyContent: 'center',
        borderRadius: RADIUS.pill,
        borderColor: COLORS.accent,
        paddingVertical: SPACING.sm,
        backgroundColor: 'transparent',
        paddingHorizontal: SPACING.lg,
        alignItems: 'center',
        borderWidth: 1,
    },
    situationOptionSelected: {
        backgroundColor: COLORS.accent,
    },
    situationOptionCorrect: {
        backgroundColor: COLORS.correct,
        borderColor: COLORS.correct,
    },
    situationOptionWrong: {
        backgroundColor: COLORS.wrong,
        borderColor: COLORS.wrong,
    },
    situationOptionText: {
        color: COLORS.accent,
        fontFamily: FONT_FAMILY.title,
        fontSize: FONT_SIZE.md,
        textAlign: 'center',
    },
    situationOptionTextActive: {
        color: '#2C1D00',
    },
    explanationBox: {
        gap: SPACING.sm,
        marginTop: SPACING.sm,
        paddingTop: SPACING.sm,
    },
    explanationTitle: {
        color: COLORS.text,
        fontFamily: FONT_FAMILY.title,
        fontSize: FONT_SIZE.md,
        textAlign: 'center',
    },
    explanationBody: {
        lineHeight: 22,
        fontFamily: FONT_FAMILY.body,
        textAlign: 'center',
        fontSize: FONT_SIZE.md,
        color: COLORS.textMuted,
    },
    nextSituationButton: {
        alignSelf: 'center',
        minWidth: 180,
    },
    emptyCard: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyImage: {
        width: SCREEN.width * 0.4,
        height: SCREEN.width * 0.4,
        alignSelf: 'center',
        marginBottom: -SPACING.md,
    },
    emptyTitle: {
        color: COLORS.text,
        fontFamily: FONT_FAMILY.title,
        fontSize: FONT_SIZE.lg,
        textAlign: 'center',
    },
    emptyBody: {
        color: COLORS.textMuted,
        fontFamily: FONT_FAMILY.body,
        fontSize: FONT_SIZE.md,
        textAlign: 'center',
        lineHeight: 22,
    },
    pillTabs: {
        flexDirection: 'row',
        gap: SPACING.sm,
        justifyContent: 'center',
        marginBottom: SPACING.sm,
    },
    pillTab: {
        paddingVertical: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.accent,
        backgroundColor: 'transparent',
        width: Dimensions.get('window').width * 0.35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: RADIUS.pill,
    },
    pillTabActive: {
        backgroundColor: COLORS.accent,
    },
    pillText: {
        color: COLORS.accent,
        fontFamily: FONT_FAMILY.title,
        fontSize: FONT_SIZE.lg,
    },
    pillTextActive: {
        color: '#2C1D00',
    },
    savedCard: {
        gap: SPACING.sm,
    },
});

export {
    AsyncStorage,
    Image,
    Pressable,
    View,
    Text,
    useSafeAreaInsets,
    kingImage,
    questionImage,
    ScreenShell,
    styles,
    shortenText,
    useHydratedCollections,
};

export type { StoryItem, SituationItem, TestItem, SavedTab, HydratedCollections };
