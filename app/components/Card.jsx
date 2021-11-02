import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableHighlight, Image, StyleSheet } from 'react-native';
import Background from '../assets/images/background.svg';
import { useNavigation } from '@react-navigation/native';

const Card = ({ data }) => {

    const [firstColor, setFirstColor] = useState('#C3C3A5')
    const [secondColor, setSecondColor] = useState('#D2D2B3')
    // console.log(data.types[0].type.name);

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

    const colors = {
        normal: ['#C3C3A5', '#D2D2B3'],
        grass: ['#5EDFC5', '#87EAD6'],
        fire: ['#FC7F7D', '#FE9694'],
        water: ['#86CAFF', '#ABDAFF'],
        electric: ['#FEDD86', '#FFE8AB'],
        ice: ['#86E2FF', '#ABEAFE'],
        fighting: ['#E27474', '#DC8C8C'],
        fighting: ['#D0BE8E', '#DFCFA5'],
        flying: ['#A7CAE4', '#BED7EA'],
        psychic: ['#CD8EFF', '#DAABFF'],
        bug: ['#67DCAB', '#86EAC0'],
        rock: ['#C8BC9D', '#DED1AF'],
        ghost: ['#9D7CFF', '#C2ADFF'],
        dark: ['#8E8E8E', '#A3A3A3'],
        steel: ['#AEAEAE', '#C6C6C6'],
        fairy: ['#E1A0FF', '#ECC2FF'],
    }

    const goToDetails = () => {
        console.log('PRESSED => ', data.id);
        navigation.navigate('Pokemon')
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
        right: '-10%'
    },
    tinyLogo: {
        width: '60%',
        height: '90%',
        marginTop: -20
    },
});
export default Card;
