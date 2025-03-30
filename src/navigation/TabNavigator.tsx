/* eslint-disable keyword-spacing */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
// eslint-disable-next-line react-native/no-inline-styles

import {StatusBar, StyleSheet ,SafeAreaView} from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {useTranslation} from 'react-i18next';
import HomeScreen from '../screens/hometab/HomeScreen';
import { Colors } from '../themes';
import BeneficiariesScreen from '../screens/hometab/BeneficiariesScreen';
import ParrainageScreen from '../screens/hometab/ParrainageScreen';
import TransactionScreen from '../screens/hometab/TransactionScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';


const TabNavigator = () => {


    const Tab = createBottomTabNavigator();
    const { t } = useTranslation();
    const [isPanelActive, setIsPanelActive] = React.useState(false);
    const openTransactionPanel = () => {
        setIsPanelActive(true);
    };



    return (

        <SafeAreaView style={{backgroundColor: '#ffffff', flex:1}}>

         <StatusBar
          animated={true}
          backgroundColor="#ffffff" //{Colors.primary}
          //barStyle="light-content"
          hidden={false}
        />

            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: Colors.primary,
                    tabBarInactiveTintColor: Colors.gray,
                }}
            >

                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarLabel: 'Accueil',
                        tabBarIcon: ({ color, size }) => (
                            <AntDesign name="home" color={color} size={26} />
                        ),
                        headerShown: false,
                    }}
                />

                <Tab.Screen
                    name="Beneficiaries"
                    component={BeneficiariesScreen}
                    options={{
                        tabBarLabel: 'Beneficiaires',
                        tabBarIcon: ({ color, size }) => (
                            <Feather name="users" color={color} size={26} />
                        ),
                        headerShown: false,
                    }}
                />


                <Tab.Screen
                    name="Parrainnage"
                    component={ParrainageScreen}
                    options={{
                        tabBarLabel: 'Parrainage',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="gift-outline" color={color} size={26} />
                        ),
                        headerShown: false,
                    }}
                />



                <Tab.Screen
                    name="Transactions"
                    component={TransactionScreen}
                    options={{
                        tabBarLabel: 'Transactions',
                        tabBarIcon: ({ color, size }) => (
                            <AntDesign name="swap" color={color} size={26} />
                        ),
                        headerShown: false,
                    }}
                />



            </Tab.Navigator>

        </SafeAreaView>
    );
};




const styles = StyleSheet.create({

});

export default TabNavigator;

