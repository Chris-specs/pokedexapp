import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableHighlight, Image, StyleSheet } from 'react-native';
import Background from '../assets/images/background.svg';
import { useNavigation } from '@react-navigation/native';
import colors from '../utils/colors'
import { widthR } from '../utils/dimensions'

const Card = ({ data }) => {

    const [firstColor, setFirstColor] = useState('#C3C3A5')
    const [secondColor, setSecondColor] = useState('#D2D2B3')

    const navigation = useNavigation()

    const asignColors = async () => {
        try {
            setFirstColor( await colors[data.types[0].type.name][0])
            setSecondColor( await colors[data.types[0].type.name][1])
        } catch (error) {
        }
    }

    useEffect(() => {
        asignColors()
        return () => {
        }
    }, [])

    const goToDetails = () => {
        navigation.navigate('Pokemon', { data })
    }
    

    return (
        <TouchableHighlight
            style={[styles.card, { backgroundColor: firstColor }]}
            underlayColor={`${firstColor}f0`}
            onPress={goToDetails}
        >
            <View>
            <View style={styles.containerName}>
                <Text style={styles.index}>{data.name}</Text>
            </View>
            <View style={styles.containerIndex}>
                <View style={[styles.indexBox, { backgroundColor: secondColor }]}>
                    <Text style={styles.index}>#{data.id.toString().padStart(3, 0)}</Text>
                </View>
            </View>
            <View style={styles.containerBackground}>
                <Background height={100} width={100} fill={secondColor} style={styles.background} />
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: data.sprites.other['official-artwork']
                            .front_default,
                    }}
                />
            </View>
            </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '46%',
        height: 130,
        margin: '2%',
        paddingTop: 10,
        borderRadius: 20,
        overflow: 'hidden'
    },
    containerName: {
        width: '100%',
        alignItems: 'flex-end',
        paddingRight: '5%',
    },
    containerBackground: {
        width: '100%',
        alignItems: 'flex-end'
    },
    containerIndex: {
        width: '100%',
        alignItems: 'flex-start',
    },
    indexBox: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 0,
        paddingHorizontal: 8,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    },
    index: {
        fontFamily: 'poppins_bold',
        color: '#FFF',
        textTransform: 'capitalize'
    },
    background: {
        position: 'absolute',
        zIndex: 0,
        bottom: 0,
        right: -widthR * 0.04
    },
    tinyLogo: {
        width: widthR * 0.25,
        height: '90%',
        marginTop: -20
    },
});
export default Card;
