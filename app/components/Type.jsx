import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { width, height, widthR, fontSizeR } from '../utils/dimensions';

import colors from '../utils/colors'

const Type = ({ type }) => {

    const [typeColor, setTypeColor] = useState('#D2D2B3')

    const asignColors = async () => {
        try {
            setTypeColor(await colors[type][0])
        } catch (error) {
        }
    }

    useEffect(() => {
        asignColors()
        return () => {
        }
    }, [])

    return (
        <View style={[styles.types, { backgroundColor: typeColor }]}>
            <Text style={styles.name}>{type}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    types: {
        width: fontSizeR * 0.2,
        height: fontSizeR * 0.08,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginRight: 10
    },
    name: {
        fontSize: fontSizeR * 0.03,
        fontFamily: 'poppins_bold',
        color: '#FFF',
        textTransform: 'capitalize',
    },
})

export default Type;
