import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
//Utils
import colors from '../utils/colors';
import stats from '../utils/stats';
import { width, height, widthR, fontSizeR } from '../utils/dimensions';
//Components
import TopTab from '../components/layout/TopTab';
import Type from '../components/Type';
import ProgressBar from '../components/ProgressBar';
import Background from '../assets/images/background.svg';

import { apiInstance } from '../api/instances';

const Pokemon = ({ navigation, route }) => {
    const data = route.params.data;

    const [firstColor, setFirstColor] = useState('#C3C3A5');
    const [secondColor, setSecondColor] = useState('#D2D2B3');
    const [types, setTypes] = useState([]);
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');

    const asignColors = async () => {
        try {
            setFirstColor(await colors[data.types[0].type.name][0]);
            setSecondColor(await colors[data.types[0].type.name][1]);
        } catch (error) {}
    };

    const getMoreInfo = async () => {
        try {
            const response = await apiInstance.get(
                `${data.species.url.split('/')[5]}/${
                    data.species.url.split('/')[6]
                }`
            );
            setType(response.data.genera[7].genus);
            const filterDescription = response.data.flavor_text_entries.filter(
                (desc) => desc.language.name === 'en'
            );
            const descript = filterDescription[0].flavor_text.split('\n');
            let semiDescrip = '';
            descript.forEach((element) => {
                (semiDescrip += ' '), (semiDescrip += element);
            });
            setDescription(semiDescrip.slice(1));
            setTypes(data.types);
        } catch (error) {}
    };

    useEffect(() => {
        asignColors();
        getMoreInfo();
        return () => {};
    }, []);

    return (
        <View style={styles.screen}>
            <View
                style={[
                    styles.backgroundContainer,
                    { backgroundColor: firstColor },
                ]}
            >
                <Background
                    height={fontSizeR * 0.6}
                    width={fontSizeR * 0.6}
                    fill={secondColor}
                    style={styles.background}
                />
            </View>
            <View style={styles.innerContainer}>
                <View style={styles.containerContent}>
                    <View>
                        <TopTab />
                    </View>
                    <Text style={styles.index}>
                        #{data.id.toString().padStart(3, 0)}
                    </Text>
                    <View style={styles.containerImage}>
                        <Image
                            style={styles.tinyLogo}
                            source={{
                                uri: data.sprites.other['official-artwork']
                                    .front_default,
                            }}
                        />
                    </View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.name}>{data.name}</Text>
                    </View>
                </View>
                <View style={styles.containerInfo}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                    <Text style={styles.type}>{type}</Text>
                    <Text style={styles.description}>{description}</Text>
                    <View style={styles.containerTypes}>
                        {types.map((type, i) => (
                            <Type key={i} type={type.type.name} />
                        ))}
                    </View>
                    <View style={styles.containerStats}>
                        <Text style={styles.stats}>Weight </Text>
                        <Text style={styles.statsNumber}>
                            {(data.weight * 0.1).toFixed(1)} kg
                        </Text>
                    </View>
                    <View style={styles.containerStats}>
                        <Text style={styles.stats}>Height </Text>
                        <Text style={styles.statsNumber}>
                            {(data.height * 0.1).toFixed(1)} m
                        </Text>
                    </View>
                    {data.stats.map((stat, i) => (
                        <View key={i} style={styles.containerBarStats}>
                            <View style={styles.containerStats}>
                                <Text style={styles.stats}>
                                    {stats[stat.stat.name][0]}
                                </Text>
                                <Text style={styles.statsNumber}>
                                    {stat.base_stat}
                                </Text>
                            </View>
                            <View style={styles.barStat}>
                                <ProgressBar
                                    progress={stat.base_stat}
                                    color={stats[stat.stat.name][1]}
                                />
                            </View>
                        </View>
                    ))}
                    </ScrollView>
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
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        position: 'absolute',
        zIndex: 0,
    },
    innerContainer: {
        width: '100%',
        height: '100%',
    },
    containerContent: {
        paddingHorizontal: '5%',
        paddingTop: '5%',
    },
    containerBackground: {
        width: '100%',
        height: '20%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    background: {
        top: -height * 0.07,
        right: -widthR * 0.18,
    },
    index: {
        textAlign: 'right',
        marginTop: '9%',
        fontFamily: 'poppins_bold',
        color: '#FFF',
        fontSize: fontSizeR * 0.06,
    },
    containerImage: {
        width: '100%',
        alignItems: 'center',
    },
    tinyLogo: {
        width: fontSizeR * 0.5,
        height: fontSizeR * 0.5,
        marginTop: '-20%',
    },
    nameContainer: {
        paddingVertical: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        fontSize: fontSizeR * 0.08,
        fontFamily: 'poppins_bold',
        color: '#FFF',
        textTransform: 'capitalize',
    },
    containerInfo: {
        width: '100%',
        backgroundColor: '#F6F6F6',
        flexGrow: 1,
        flexShrink: 1,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        padding: '8%',
    },
    type: {
        fontSize: fontSizeR * 0.05,
        fontFamily: 'poppins_bold',
        color: '#676767',
    },
    description: {
        fontSize: fontSizeR * 0.035,
        textAlign: 'justify',
        fontFamily: 'poppins_semibold',
        color: '#4F6D7A',
    },
    containerTypes: {
        width: '100%',
        flexDirection: 'row',
        marginVertical: fontSizeR * 0.05,
    },
    containerStats: {
        flexDirection: 'row',
        width: '33%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    stats: {
        fontSize: fontSizeR * 0.032,
        fontFamily: 'poppins_bold',
        color: '#676767',
    },
    statsNumber: {
        fontSize: fontSizeR * 0.032,
        fontFamily: 'poppins_semibold',
        color: '#676767',
    },
    containerBarStats: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: '1%',
    },
    barStat: {
        width: '60%',
    },
});

export default Pokemon;
