import React from 'react';
import {View,Image, StyleSheet, Text,  Dimensions,TouchableOpacity,  useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {SPACING, COLORS,  FONT_SIZE,  FONT_FAMILY, SCREEN } from '../foundation';
import { RoyalButton } from './components/RoyalButton';
import PaginationDots from './PaginationDots';

type Props = {
    title: string;
    description: string;
    image: any;
    action: string;
    onAction: () => void;
    totalSlides: number;
    currentIndex: number;
    onSkip?: () => void;
};

const OnboardingSlide = ({
    title,
    description,
    image,
    action,
    onAction,
    totalSlides,
    currentIndex,
    onSkip,
}: Props): React.ReactElement => {
    const insets = useSafeAreaInsets();
    const { width, height } = useWindowDimensions();
    const isLastSlide = currentIndex === totalSlides - 1;

    return (
        <View style={[styles.slide, { width, height }]}>
            <Image source={image} style={[styles.image, {
                marginBottom: currentIndex < 2 ? - height * 0.05 : height * 0.1,
                height: currentIndex < 2 ? height * 0.5 : height * 0.35,
            }]} resizeMode="contain" />
            {/* Content Container: Title + Description */}
            <View style={styles.contentContainer}>
                <PaginationDots totalDots={totalSlides} activeIndex={currentIndex} />
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
                {/* Button Container */}
                <View style={[styles.buttonContainer, { paddingBottom: Math.max(insets.bottom, SPACING.lg) }]}>
                    <View style={{ width: SCREEN.width * 0.14 }} />
                    <RoyalButton label={action} onPress={onAction} style={styles.button} />

                    <TouchableOpacity disabled={isLastSlide} onPress={onSkip} style={{
                        width:
                            SCREEN.width * 0.14,
                        opacity: isLastSlide ? 0 : 1,

                    }}>
                        <Text numberOfLines={1} adjustsFontSizeToFit style={styles.skip} onPress={onSkip}>
                            SKIP
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    slide: {
        paddingVertical: SPACING.lg,
        backgroundColor: 'rgba(38, 26, 0, 0.40)',
        flex: 1,
        justifyContent: 'flex-end',
    },
    topRow: {
        paddingBottom: SPACING.md,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: SPACING.screen,
    },
    skip: {
        color: 'white',
        fontFamily: FONT_FAMILY.body,
        fontSize: FONT_SIZE.xl,
    },
    skipSpacer: {
        width: 36,
    },
    imageContainer: {
        alignItems: 'center',
        paddingHorizontal: SPACING.screen,
        marginBottom: SPACING.md,
    },
    image: {
        width: SCREEN.width * 0.7,
        height: SCREEN.height * 0.5,
        alignSelf: 'center',
        marginBottom: - SCREEN.height * 0.05,
    },
    contentContainer: {
        borderBottomRightRadius: 0,
        paddingBottom: SCREEN.height * 0.1,
        paddingHorizontal: SPACING.screen,
        width: '100%',
        borderWidth: Dimensions.get('window').width * 0.003,
        backgroundColor: COLORS.background,
        borderColor: COLORS.accent,
        padding: SPACING.lg,
        marginBottom: - SCREEN.height * 0.05,
        borderBottomLeftRadius: 0,
        alignItems: 'center',
        borderRadius: SPACING.xxl * 2,
    },
    title: {
        color: COLORS.text,
        marginTop: SPACING.md,
        fontSize: FONT_SIZE.xxxl,
        marginBottom: SPACING.md,
        fontFamily: FONT_FAMILY.title,
        textAlign: 'center',
        lineHeight: 38,
    },
    description: {
        textAlign: 'center',
        lineHeight: 22,
        fontSize: FONT_SIZE.md,
        fontFamily: FONT_FAMILY.body,
        color: COLORS.textMuted,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SPACING.lg,
        paddingHorizontal: SPACING.screen,
        width: '100%',
        justifyContent: 'space-between',
    },
    button: {
        minWidth: SCREEN.width * 0.42,
    },
});

export default OnboardingSlide;
