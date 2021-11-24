import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const TopTab = () => {

    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
            >
                <Ionicons
                    name={'arrow-back-outline'}
                    size={43}
                    color='#FFF'
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('About')}
            >
                <Ionicons
                    name={'cube-outline'}
                    size={43}
                    color='#FFF'
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '10%'
    }
})
 
export default TopTab;