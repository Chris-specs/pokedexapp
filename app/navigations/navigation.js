import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Screens
import Home from '../screens/Home'
import Pokemon from '../screens/Pokemon'
import About from '../screens/About'

const Stack = createNativeStackNavigator()

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={'Home'}
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='Pokemon' component={Pokemon} />
                <Stack.Screen name='About' component={About} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
 
export default Navigation;