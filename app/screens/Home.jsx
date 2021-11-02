import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import { width, height } from '../utils/dimensions';
import Background from '../assets/images/background.svg';
import Card from '../components/Card';
import { apiInstance } from '../api/instances';
import Loader from '../components/Loader'

const Home = () => {
    const [pokemons, setPokemons] = useState([]);
    const [quantity, setQuantity] = useState(200);
    const [loader, setLoader] = useState(false)

    const poke = [];

    const getPokemons = async () => {
        try {
            for (let i = 1; i <= quantity; i++) {
                const response = await apiInstance.get(`/${i}`);
                poke.push(response.data);
            }
            setPokemons(poke);
            setLoader(false)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPokemons();
        return () => {};
    }, [quantity]);

    const memoData = useMemo(
        () =>
            ({ item }) =>
                <Card data={item} />,
        [pokemons]
    );

    const getMore = () => {
            // console.log('MORE', quantity);
            setQuantity(quantity + 20);
            setLoader(true)
    };

    return (
        <View style={styles.screen}>
            <View style={styles.innerContainer}>
                <View style={styles.containerBackground}>
                    <Text style={styles.title}>Pokedex</Text>
                    <Background
                        height={250}
                        width={250}
                        fill={'#F6F6F6'}
                        style={styles.background}
                    />
                </View>
                <View style={styles.containerInput}>
                    <TextInput placeholder='Search' style={styles.input} />
                </View>
                <View style={styles.container}>
                    <View>
                        <FlatList
                            data={pokemons}
                            renderItem={memoData}
                            numColumns={2}
                            keyExtractor={(item, i) => item.name + '-' + i}
                            style={{ marginTop: '0%', flexGrow: 1, height: '100%' }}
                            showsVerticalScrollIndicator={false}
                            onEndReached={() => getMore()}
                            onEndReachedThreshold={0}
                            ListFooterComponent={ loader ? <Loader size={ width * 0.10 } /> : null }
                            ListFooterComponentStyle={{marginVertical: '5%'}}
                            ListEmptyComponent={<Loader size={ width * 0.15 } />}
                            contentContainerStyle={ pokemons.length === 0 ? {justifyContent: 'center', alignItems: 'center', flex: 1} : null }
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        width: width,
        height: '100%',
    },
    innerContainer: {
        width: width,
        height: '100%',
        backgroundColor: '#FFF',
        padding: '5%',
        borderWidth: 2,
        borderColor: '#e63946',
    },
    container: {
        width: '100%',
        backgroundColor: '#FFF',
        borderWidth: 2,
        borderColor: '#e63946',
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
        top: -height * 0.01,
        right: -width * 0.1,
    },
    title: {
        fontFamily: 'poppins_bold',
        fontSize: 35,
        color: '#4F6D7A',
    },
    containerInput: {
        width: '100%',
        alignItems: 'center',
        top: '-5%',
    },
    input: {
        width: '80%',
        paddingVertical: 10,
        paddingHorizontal: 20,
        color: '#4F6D7A',
        borderWidth: 2,
        borderColor: '#EDF6F9',
        borderRadius: 9999,
        backgroundColor: '#FFF',
    },
    contain: {
        width: '100%',
        height: '10%',
        backgroundColor: '#457b9d',
    },
});

export default Home;
