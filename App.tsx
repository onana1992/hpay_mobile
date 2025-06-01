/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import React, { useEffect } from 'react';

import { SafeAreaView, StatusBar, useColorScheme, View, Text, Linking } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {  Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { MenuProvider } from 'react-native-popup-menu';
import { enGB, fr, registerTranslation } from 'react-native-paper-dates';
import store from './src/store/store';
import { persistStore, persistReducer } from 'redux-persist';
import { Provider } from 'react-redux';
import Colors from './src/themes/Colors';
import { Portal, PortalProvider, PortalHost } from '@gorhom/portal';
import { PersistGate } from 'redux-persist/integration/react';
import { LogBox } from 'react-native';
import Toast, { BaseToast, ErrorToast  } from 'react-native-toast-message';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import StackNavigation from './src/navigation/StackNavigation';
import messaging from '@react-native-firebase/messaging';
import { navigate } from './NavigationService';


registerTranslation('en-GB', enGB);
registerTranslation('fr', fr);



function App(): JSX.Element {

    const persistor = persistStore(store);

    // Register background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
    });


    React.useEffect(() => {
        changeNavigationBarColor('#ffffff', true);
    }, []);


    LogBox.ignoreLogs(['ERROR:VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.']);

    useEffect(() => {
          SplashScreen.hide();
          LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, []);


    useEffect(() => {
        // Fonction pour gérer les liens entrants
        const handleDeepLink = (event) => {
            const { url } = event;
            console.log('URL du Deep Link:', url);
            // Extraire des informations et naviguer vers l'écran approprié
        };

        // Écouter les événements de deep link
        Linking.addEventListener('url', handleDeepLink);

        // Vérifier si l'app a été ouverte via un deep link (au lancement)
        Linking.getInitialURL().then((url) => {
            if (url) {
                console.log('URL initiale:', url);
                // Gérer la navigation
            }
        });

        // Nettoyer l'événement au démontage
        return () => {
            //Linking.removeAllListeners();
            //removeEventListener('url', handleDeepLink);
        };
    }, []);





    messaging().onNotificationOpenedApp(remoteMessage => {

        if (remoteMessage) {
            navigate('MyMessageScreen');
        }
        /*const screen = remoteMessage?.data?.screen;
        if (screen) {
            navigate(screen, remoteMessage.data);
        }*/
    });


    // Quand l'app est complètement fermée
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {


            if (remoteMessage) {
                navigate('MyMessageScreen');
            }

             /*  navigate('MyMessageScreen');
            if (remoteMessage) {
                const screen = remoteMessage?.data?.screen;
                if (screen) {
                    navigate(screen, remoteMessage.data);
                }
            }*/
        });

    const toastConfig = {

        error: (props:any) => (
            <ErrorToast
                {...props}

                text1NumberOfLines={3}
                text2NumberOfLines={3}
            />
        ),
    };


    return (

        <PortalProvider>
            <Provider store={store}>
                <PersistGate  persistor={persistor}>
                    <StatusBar
                        animated={true}
                        backgroundColor="#ffffff"
                        barStyle="dark-content"
                        translucent={false}
                    />
                    <PaperProvider
                        theme={{
                            ...DefaultTheme,
                            colors: {
                              ...DefaultTheme.colors,
                              text: Colors.text,  // Change the text color globally
                            },
                        }}
                    >
                        <SafeAreaView style={{ flex: 1 }}>
                            <MenuProvider>
                                <StackNavigation />
                            </MenuProvider>
                        </SafeAreaView>
                    </PaperProvider>
                    <Toast config={toastConfig} />
                </PersistGate>
            </Provider>
            <PortalHost name="transactionPanel" />
        </PortalProvider>
  );
}


export default App;

function removeEventListener(arg0: string, handleDeepLink: (event: any) => void) {
    throw new Error('Function not implemented.');
}
