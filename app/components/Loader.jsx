import React, { useEffect } from 'react'
import { View, Text, TextInput, TouchableHighlight, Image, StyleSheet, Animated } from 'react-native';
import Background from '../assets/images/background.svg';

const Loader = ({ size }) => {

    const rotate = new Animated.Value(0)

    useEffect(() => {
        Animated.loop(
        Animated.timing(
            rotate, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            }
        )).start()
        return () => {
        }
    }, [])

    const spin = rotate.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    return (
        <View style={styles.image}>
            <Animated.View
                style={[styles.image, {transform: [{rotate: spin}] }]}
            >
                <Background height={ size } width={ size } fill={'#e7e7e7'} />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
})
 
export default Loader;