/* eslint-disable keyword-spacing */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
// eslint-disable-next-line react-native/no-inline-styles
import { View, TouchableOpacity, Text, StatusBar, StyleSheet ,SafeAreaView} from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import IconBadge from 'react-native-icon-badge';
import { Badge } from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import HomeScreen from '../screens/hometab/HomeScreen';
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
                    name="Card"
                    component={HomeScreen}
                    options={{
                        tabBarLabel: 'Carte',
                        tabBarIcon: ({ color, size }) => (
                            <Feather name="credit-card" color={color} size={26} />
                        ),
                        headerShown: false,
                    }}
                />

                <Tab.Screen
                    name="Beneficiaries"
                    component={HomeScreen}
                    options={{
                        tabBarLabel: 'Beneficiaires',
                        tabBarIcon: ({ color, size }) => (
                            <Feather name="users" color={color} size={26} />
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
                            <AntDesign name="swap" color={color} size={26} />
                        ),
                        headerShown: false,
                    }}
                />




                {/*<Tab.Screen
                    name="Transactions"
                    component={HomeScreen}
                    options={{
                        tabBarLabel: 'Transactions',
                        tabBarIcon: ({ color, size }) => (
                            <View>
                                <FontAwesome name="dollar" color={Colors.text} size={30} />
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
                />*/}

                {/*<Tab.Screen
                    name="profile"
                    component={ProfilScreen}
                    options={{
                        tabBarLabel: 'Paramètres',
                        tabBarIcon: ({ color, size }) => (
                            <AntDesign name="setting" color={color} size={size} />
                        ),
                        headerShown: false,
                    }}
                />*/}


            </Tab.Navigator>

        </SafeAreaView>
    );
};




const styles = StyleSheet.create({

});

export default TabNavigator;

