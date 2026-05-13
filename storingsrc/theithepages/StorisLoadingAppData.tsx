import { COLORS, SCREEN } from '../../royalcore/foundation';
import {  StatusBar, Image, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import WebViewAnimation from '../../royalcore/ui/WebViewAnimation';
import { STORAGE_KEYS } from '../../royalcore/engine/storage';

type Props = {
    durationMs?: number;
};

const StorisLoadingAppData = ({ durationMs = 5000 }: Props): React.ReactElement => {
    const navigation = useNavigation<any>();

    {/** 
    useEffect(() => {
        let alive = true;

        const timeoutId = setTimeout(() => {
            AsyncStorage.getItem(STORAGE_KEYS.onboardingCompleted)
                .then(value => {
                    if (!alive) {
                        return;
                    }

                    navigation.replace(value === 'true' ? 'WrappUsersApplication' : 'OnboardUsersBeforeExp');
                })
                .catch(() => {
                    if (!alive) {
                        return;
                    }

                    navigation.replace('OnboardUsersBeforeExp');
                });
        }, durationMs);

        return () => {
            alive = false;
            clearTimeout(timeoutId);
        };
    }, [durationMs, navigation]);
*/}
    return (
        <View style={styles.root}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
            <Image source={require('../hinassets/oindimages/groundofapp.png')} style={styles.background} />
            <View style={styles.animationOverlay}>
                <WebViewAnimation />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        width: SCREEN.width,
        height: SCREEN.height,
        resizeMode: 'cover',
    },
    root: {
        justifyContent: 'center',
        backgroundColor: COLORS.background,
        flex: 1,
        alignItems: 'center',
    },
    logo: {
        width: SCREEN.width * 0.72,
        height: SCREEN.width * 0.72,
    },
    background: {
        height: SCREEN.height,
        position: 'absolute',
        width: SCREEN.width,
    },
    
    animationOverlay: {
        position: 'absolute',
        width: SCREEN.width,
        height: SCREEN.height,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
});

export default StorisLoadingAppData;
