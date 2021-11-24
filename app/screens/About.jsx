import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { width, height, widthR, fontSizeR } from '../utils/dimensions';
import { Ionicons } from '@expo/vector-icons';
import Background from '../assets/images/background.svg';
import BackTab from '../components/layout/BackTab';

const Pokemon = () => {
    return (
        <View style={styles.screen}>
            <View style={styles.backgroundContainer}>
                <Background
                    height={fontSizeR * 0.6}
                    width={fontSizeR * 0.6}
                    fill={'#F6F6F6'}
                    style={styles.background}
                />
            </View>
            <View style={styles.innerContainer}>
                <View style={{ height: '100%' }}>
                    <View>
                        <BackTab />
                    </View>
                    <View style={styles.containerCard}>
                        <View style={styles.card}>
                            <Text style={styles.title}>Pokedex App v1.0.0</Text>
                            <Text style={styles.subtitle}>
                                This is a free and unoficial project of Pokedex.
                            </Text>
                            <Text
                                style={[styles.subtitle, { marginTop: fontSizeR * 0.03 }]}
                            >
                                Pokemon© is a brand registered.
                            </Text>
                            <Text style={styles.subtitle}>
                                All rights reserved.
                            </Text>
                        </View>
                    </View>
                    <View style={styles.footer}>
                        <Text style={styles.subtitle}>Created with</Text>
                        <Ionicons name={'heart'} size={fontSizeR * 0.05} color='#FF1C1C' />
                        <Text style={styles.subtitle}>by </Text>
                        <TouchableOpacity
                            onPress={() => Linking.openURL('https://github.com/chris-specs')}
                        >
                            <Text style={styles.subtitle}>
                                Christian Sanchez
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        width: '100%',
        height: '100%',
    },
    backgroundContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFF',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        position: 'absolute',
        zIndex: 0,
    },
    innerContainer: {
        width: '100%',
        height: '100%',
        padding: '5%',
    },
    background: {
        top: -height * 0.07,
        right: -widthR * 0.18,
    },
    containerCard: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: widthR * 0.5,
    },
    card: {
        width: '95%',
        backgroundColor: '#F6F6F6',
        paddingVertical: '10%',
        paddingHorizontal: '9%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    title: {
        fontFamily: 'poppins_bold',
        fontSize: fontSizeR * 0.05,
        color: '#4F6D7A',
    },
    subtitle: {
        fontFamily: 'poppins_bold',
        fontSize: fontSizeR * 0.025,
        color: '#4F6D7A',
        textAlign: 'center',
    },
    footer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
    },
});

export default Pokemon;
