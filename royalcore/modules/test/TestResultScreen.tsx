// @ts-nocheck
import React from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import Button from '../../ui/Button';
import Card from '../../ui/Card';
import { kingImage, styles } from '../shared/WrappUsersApplication.shared';

type Props = {
    finalPercent: number;
    onShare: () => void;
    onTryAgain: () => void;
};

export default function TestResultScreen({ finalPercent, onShare, onTryAgain }: Props) {
    return (
        <Card style={[styles.testResultCard, {
            width: '95%',
            alignSelf: 'center',
            marginTop: Dimensions.get('window').height * 0.1,
        }]}>
            <Text style={styles.testResultTitle}>Thank you for taking the test!</Text>
            <Text style={styles.testResultBody}>You are a very interesting way of thinking.</Text>
            <Text style={styles.testResultPercent}>You think like a king on: {finalPercent}%</Text>
            {/* <Image source={kingImage} style={styles.testResultImage} resizeMode="contain" /> */}
            <Button label="Share" onPress={onShare} style={[styles.resultButton, {
                width: Dimensions.get('window').width * 0.5,
                marginBottom: Dimensions.get('window').height * 0.05,
                marginTop: Dimensions.get('window').height * 0.03,
                backgroundColor: '#51DD3F',
            }]} />
            <Button label="Try again" onPress={onTryAgain} style={[styles.resultButton, {
                width: Dimensions.get('window').width * 0.5,
            }]} />
        </Card>
    );
}
