// @ts-nocheck
import React from 'react';

import {
    Pressable,
    Text, View
} from 'react-native';
import {
    styles,
    type SavedTab
} from '../modules/shared/WrappUsersApplication.shared';

type Props = {
    value: SavedTab;
    onChange: (tab: SavedTab) => void;
};

export default function Tabs({ value, onChange }: Props) {
    return (
        <View style={styles.pillTabs}>
            {(['Stories', 'Facts'] as SavedTab[]).map(tab => {
                const active = tab === value;
                return (
                    <Pressable key={tab} onPress={() => onChange(tab)} style={[styles.pillTab, active && styles.pillTabActive]}>
                        <Text style={[styles.pillText, active && styles.pillTextActive]}>{tab === 'Stories' ? 'Saved Stories' : 'Saved Facts'}</Text>
                    </Pressable>
                );
            })}
        </View>
    );
}
