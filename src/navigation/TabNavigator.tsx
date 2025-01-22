/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
// eslint-disable-next-line react-native/no-inline-styles
import { View, TouchableOpacity, Text, StatusBar, StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IconBadge from 'react-native-icon-badge';
import { Badge } from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import HomeScreen from '../screens/HomeScreen';
import ProfilScreen from '../screens/ProfilScreen';
import { Colors } from '../themes';
import TransactionSwipeablePanel from '../components/TransactionSwipeablePanel';
import { Portal } from '@gorhom/portal';



const TabNavigator = () => {


    const Tab = createBottomTabNavigator();
    const { t } = useTranslation();
    const [isPanelActive, setIsPanelActive] = React.useState(false);
    const openTransactionPanel = () => {
        setIsPanelActive(true);
    };


    return (

        <View style={{ flex: 1 }} >

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
                            <MaterialCommunityIcons name="home-outline" color={color} size={28} />
                        ),
                        headerShown: false,
                    }}
                />


                <Tab.Screen
                    name="Transactions"
                    component={HomeScreen}
                    options={{
                        tabBarLabel: 'Transactions',
                        tabBarIcon: ({ color, size }) => (
                            <View>
                                <FontAwesome name="dollar" color="black" size={30} />
                                <Portal hostName="transactionPanel">
                                    <TransactionSwipeablePanel
                                        isPanelActive={isPanelActive}
                                        setIsPanelActive={setIsPanelActive} />
                                </Portal>
                            </View>
                        ),
                        headerShown: true,
                    }}
                    listeners={{
                        tabPress: e => {

                            e.preventDefault();
                            openTransactionPanel();

                        },
                    }}
                />

                <Tab.Screen
                    name="profile"
                    component={ProfilScreen}
                    options={{
                        tabBarLabel: 'Profile',
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome name="user-o" color={color} size={size} />
                        ),
                        headerShown: false,
                    }}
                />


            </Tab.Navigator>

        </View>
    );
};




const styles = StyleSheet.create({

});

export default TabNavigator;

