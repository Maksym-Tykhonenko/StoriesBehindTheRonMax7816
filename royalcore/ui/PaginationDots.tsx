import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS, SPACING } from '../foundation';

type Props = {
    totalDots: number;
    activeIndex: number;
};

const PaginationDots = ({ totalDots, activeIndex }: Props): React.ReactElement => {
    return (
        <View style={styles.container}>
            {Array.from({ length: totalDots }).map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.dot,
                        index === activeIndex && styles.dotActive,
                    ]}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: SPACING.sm,
        alignItems: 'center',
    },
    dot: {width: 6, height: 6, borderRadius: 3,backgroundColor: 'rgba(255, 217, 0, 0.45)',},
    dotActive: {
        width: 10,
        backgroundColor: COLORS.accent,
    },
});

export default PaginationDots;
