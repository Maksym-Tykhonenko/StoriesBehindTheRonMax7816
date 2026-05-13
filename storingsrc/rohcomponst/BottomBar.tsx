import React, { memo } from 'react';
import {
    FONT_FAMILY,
    COLORS,
    FONT_SIZE,
    ICON_SIZE,
    SPACING
} from '../../royalcore/foundation';
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';

export type MainTabKey = 'Stories' | 'Jokes' | 'Facts' | 'Test' | 'Situations' | 'Saved';

type Props = {
    activeTab: MainTabKey;
    onTabPress: (tab: MainTabKey) => void;
};

const barIconImages = {
    Stories: require('../hinassets/oindimages/baricons/si_book-fill.png'),
    Jokes: require('../hinassets/oindimages/baricons/fa7-solid_face-smile.png'),
    Facts: require('../hinassets/oindimages/baricons/fluent_brain-sparkle-20-filled.png'),
    Test: require('../hinassets/oindimages/baricons/material-symbolsquiz-rounded.png'),
    Situations: require('../hinassets/oindimages/baricons/material-symbols-rounded.png'),
    Saved: require('../hinassets/oindimages/baricons/iconamoon_bookmark-fill.png'),
};

const tabs: Array<{ key: MainTabKey; label: string }> = [
    { key: 'Stories', label: 'Stories' },
    { key: 'Jokes', label: 'Jokes' },
    { key: 'Facts', label: 'Facts' },
    { key: 'Test', label: 'Test' },
    { key: 'Situations', label: 'Situations' },
    { key: 'Saved', label: 'Saved' },
];

function BottomBarComponent({ activeTab, onTabPress }: Props) {
    return (
        <View style={styles.shell}>
            <View style={styles.row}>
                {tabs.map(tab => {
                    const isActive = tab.key === activeTab;
                    return (
                        <Pressable key={tab.key} onPress={() => onTabPress(tab.key)} style={({ pressed }) => [styles.tab, pressed && styles.pressed]}>
                            <Image
                                source={barIconImages[tab.key]}
                                style={[
                                    styles.icon,
                                    { tintColor: isActive ? COLORS.accent : COLORS.textSoft, opacity: isActive ? 1 : 0.6 },
                                ]}
                            />
                            <View
                                style={{
                                    marginTop: 4,
                                    height: Dimensions.get('window').height * 0.0025,
                                    borderRadius: Dimensions.get('window').height * 0.0025,
                                    backgroundColor: isActive ? COLORS.accent : 'transparent',
                                    width: '59%',
                                }}
                            />
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.72,
    },
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        gap: 4,
    },
    shell: {
        borderBottomWidth: 0,

        borderColor: 'rgba(255, 217, 0, 0.7)',
        paddingHorizontal: SPACING.xs,
        borderTopRightRadius: Dimensions.get('window').width * 0.1,
        borderWidth: Dimensions.get('window').width * 0.004,

        paddingTop: SPACING.xxl * 0.8,
        paddingBottom: SPACING.md,
        backgroundColor: COLORS.background,
        bottom: 0,

        position: 'absolute',
        height: Dimensions.get('window').height * 0.12,
        borderTopLeftRadius: Dimensions.get('window').width * 0.1,
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    
    icon: {
        width: ICON_SIZE.xxl,
        height: ICON_SIZE.xxl,
        resizeMode: 'contain',
    },
    label: {
        fontFamily: FONT_FAMILY.body,
        fontSize: FONT_SIZE.xs,
        letterSpacing: 0.1,
    },
    
});

export const BottomBar = memo(BottomBarComponent);

