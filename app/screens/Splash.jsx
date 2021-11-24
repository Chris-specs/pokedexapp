import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

import Logo from '../assets/images/logo.png'


const colorLayer = <View style={[StyleSheet.absoluteFill, { backgroundColor: '#FB6C6C' }]}></View>

const Splash = ({ navigation }) => {

    const initialState = {
        loadingProgress: new Animated.Value(0),
        animationDone: false
    }
    
    const [state, setState] = useState(initialState)
    
    useEffect(() => {
        Animated.timing(state.loadingProgress, {
            toValue: 100,
            duration: 1000,
            useNativeDriver: true,
            delay: 400
        }).start(() => {
            setState(state.animationDone = true)
        })
        setTimeout(() => {
            navigation.replace('Home')
        }, 1000);
        return () => {
            
        }
    }, [])

    const imageScale = {
        transform: [
            state.loadingProgress == undefined ? {scale: 1} :
            {
                scale: state.loadingProgress.interpolate({
                    inputRange: [ 0, 15, 100],
                    outputRange: [ 0.1, 0.06, 16]
                })
            }
        ]
    }
    
    return ( 
        <View style={{flex: 1}}>
            {colorLayer}
            <View style={styles.centered}>
                <Animated.Image
                    source={Logo}
                    style={[{width: 1000}, imageScale]}
                    resizeMode='contain'
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
 
export default Splash;