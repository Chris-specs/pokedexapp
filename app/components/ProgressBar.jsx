import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressBar = ({progress, color}) => {
    return (
        <View style={styles.outBar}>
            <View
                style={[styles.inBar, {width: `${progress / 2}%`, backgroundColor: color}]}
            ></View>
        </View>
    );
};

const styles = StyleSheet.create({
    outBar: {
        width: '100%',
        height: 10,
        backgroundColor: '#FFF',
        borderRadius: 10,
    },
    inBar: {
        height: '100%',
        borderRadius: 10,
    }
})

export default ProgressBar;
