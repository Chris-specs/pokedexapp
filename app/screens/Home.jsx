import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import { width, height, widthR, fontSizeR } from '../utils/dimensions';
import Background from '../assets/images/background.svg';
import Card from '../components/Card';
import { apiInstance } from '../api/instances';
import Loader from '../components/Loader';

const Home = () => {
    const [pokemons, setPokemons] = useState([]);
    const [quantity, setQuantity] = useState(200);
    const [loader, setLoader] = useState(false);
    const [from, setFrom] = useState(0);
    const [flag, setFlag] = useState(false);

    let allPokemons = pokemons;
    let poke = [];

    const getPokemons = async () => {
        try {
            for (let i = from == 0 ? 1 : from + 1; i <= from + quantity; i++) {
                const response = await apiInstance.get(`pokemon/${i}`);
                poke.push(response.data);
            }
            const a = allPokemons.concat(poke);
            setPokemons(a);
            setLoader(false);
        } catch (error) {}
    };

    let timeout = null;

    const waitToSearch = (search) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            setFrom(0);
            setQuantity(200);
            setPokemons([]);
            allPokemons = [];
            poke = [];
            searchPokemons(search);
        }, 1000);
    };

    const searchPokemons = async (search) => {
        try {
            if (search == '') {
                setFrom(0);
                setQuantity(200);
                setPokemons([]);
                allPokemons = [];
                poke = [];
                getPokemons();
            } else {
                const response = await apiInstance.get(
                    `pokemon/${search.toLowerCase()}`
                );
                setPokemons([response.data]);
            }
        } catch (error) {}
    };

    useEffect(() => {
        getPokemons();
        return () => {};
    }, [flag]);

    const memoData = useMemo(
        () =>
            ({ item }) =>
                <Card data={item} />,
        [pokemons]
    );

    const getMore = () => {
        if (!loader) {
            setFrom(from + quantity);
            setQuantity(40);
            setFlag(!flag);
            setLoader(true);
        }
    };

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
                <Text style={styles.title}>Pokedex</Text>
                <View style={styles.containerInput}>
                    <TextInput
                        placeholder='Search Pokemons'
                        placeholderTextColor='#4f6d7a81'
                        style={styles.input}
                        onChangeText={(search) => waitToSearch(search)}
                    />
                </View>
                <View style={styles.container}>
                    <View>
                        <FlatList
                            data={pokemons}
                            renderItem={memoData}
                            numColumns={2}
                            keyExtractor={(item, i) => item.name + '-' + i}
                            style={{
                                marginTop: '0%',
                                flexGrow: 1,
                                height: '100%',
                            }}
                            showsVerticalScrollIndicator={false}
                            onEndReached={() =>
                                pokemons.length == 1 ? null : getMore()
                            }
                            onEndReachedThreshold={0.01}
                            ListFooterComponent={
                                loader ? <Loader size={width * 0.08} /> : null
                            }
                            ListFooterComponentStyle={{ marginVertical: '5%' }}
                            ListEmptyComponent={<Loader size={widthR * 0.15} />}
                            contentContainerStyle={
                                pokemons.length === 0
                                    ? {
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          flex: 1,
                                      }
                                    : null
                            }
                        />
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
    container: {
        width: '100%',
        backgroundColor: '#FFF',
        flexGrow: 1,
        flexShrink: 1,
    },
    containerBackground: {
        width: '100%',
        height: '20%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderWidth: 2,
        borderColor: '#e63946',
    },
    background: {
        top: -height * 0.07,
        right: -widthR * 0.18,
    },
    title: {
        fontFamily: 'poppins_bold',
        fontSize: fontSizeR * 0.09,
        color: '#4F6D7A',
        marginTop: '10%',
    },
    containerInput: {
        width: '100%',
        alignItems: 'center',
        marginVertical: '5%',
    },
    input: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 20,
        color: '#4F6D7A',
        borderWidth: 2,
        borderColor: '#EDF6F9',
        borderRadius: 9999,
        backgroundColor: '#FFF',
        textAlign: 'center',
        fontFamily: 'poppins_bold',
    },
    contain: {
        width: '100%',
        height: '10%',
        backgroundColor: '#457b9d',
    },
});

export default Home;
