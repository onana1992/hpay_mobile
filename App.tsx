/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import React, { useEffect, createContext, useState, useContext } from 'react';
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
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';


registerTranslation('en-GB', enGB);
registerTranslation('fr', fr);
export const ApiContext = createContext();


function App(): JSX.Element {

    const persistor = persistStore(store);
    const { t } = useTranslation();
    const rnBiometrics = new ReactNativeBiometrics();

   // const [photoUrl, setPhotoUrl] = useState("http://10.0.0.133:5000/api/auth/photos"); // valeur initiale
   const [photoUrl, setPhotoUrl] = useState("https://devmanager.hpaytest.cash/CAISSE/photo/");

   // const { biometryType } = await rnBiometrics.isSensorAvailable();

    // Register background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        //console.log('Message handled in the background!', remoteMessage);
    });

    useEffect(() => {
        rnBiometrics.isSensorAvailable()
            .then(resultObject => {
                const { available, biometryType } = resultObject;

                console.log(biometryType);

                if (available && biometryType === BiometryTypes.TouchID) {

                    // console ios face Touch If
                    console.log('TouchID is supported');
                    handleBiometricAuth();
                } else if (available && biometryType === BiometryTypes.FaceID) {

                    // console ios face id
                    console.log('FaceID is supported');
                    handleBiometricAuth();

                } else if (available && biometryType === BiometryTypes.Biometrics) {
                    // android supported
                    console.log('Android supported');
                    handleBiometricAuth();
                }
                else
                {
                    console.log('Biometric authentication not supported');
                }
            });
    }, []);


    const handleBiometricAuth = () => {
        rnBiometrics.simplePrompt({ promptMessage: 'Authentifiez-vous' })
        .then(resultObject => {
            const { success } = resultObject;

            if (success) {
                console.log('Succès', 'Authentification réussie');
            } else {
                console.log('Annulé', 'Authentification annulée');
            }
        })
        .catch(() => {
            console.log('Erreur', 'Erreur durant l\'authentification');
        });
    };


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

        errorMessage: ({ text1, props }: { text1:string, props:any }) => (
            <View style={{
                flexDirection: 'row',
                minHeight: 70,
                margin: 10,
                borderRadius: 10,
                borderWidth: 0.5,
                borderColor:'gray',
            }}>

                <View style={{
                    flex: 1,
                    backgroundColor:'red',
                    padding: 10,
                    justifyContent: 'center',
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                }}>
                    <Ionicons name="close-circle-outline" color="#ffffff" size={34} />
                </View>

                <View style={{
                    flex: 6,
                    padding: 10,
                    paddingRight: 20,
                    backgroundColor: '#ffffff',
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,
                }}>
                    <Text
                        style={{
                            color: Colors.text,
                            fontWeight: 'bold',
                            fontSize:16,
                        }}
                    >
                        {t('Error')}
                    </Text>
                    <Text
                        style={{
                            color: Colors.text,
                            marginTop: 0,
                            fontSize: 14,
                        }}
                    >
                        {props.text}
                    </Text>
                </View>

            </View>
        ),

        succesMessage: ({ text1, props }: { text1: string, props: any }) => (
            <View style={{
                flexDirection: 'row',
                minHeight: 70,
                margin: 10,
                borderRadius: 10,
                borderWidth: 0.5,
                borderColor: 'gray',
            }}>

                <View style={{
                    flex: 1,
                    backgroundColor: 'green',
                    padding: 10,
                    justifyContent: 'center',
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                }}>
                    <Ionicons name="close-circle-outline" color="#ffffff" size={34} />
                </View>

                <View style={{
                    flex: 6,
                    padding: 10,
                    paddingRight: 20,
                    backgroundColor: '#ffffff',
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,
                }}>
                    <Text
                        style={{
                            color: Colors.text,
                            fontWeight: 'bold',
                            fontSize: 16,
                        }}
                    >
                        {t('success')}
                    </Text>
                    <Text
                        style={{
                            color: Colors.text,
                            marginTop: 0,
                            fontSize: 14,
                        }}
                    >
                        {props.text}
                    </Text>
                </View>

            </View>
        ),

        alertMessage: ({ text1, props }: { text1: string, props: any }) => (
            <View style={{
                flexDirection: 'row',
                minHeight: 70,
                margin: 10,
                borderRadius: 10,
                borderWidth: 0.5,
                borderColor: 'gray',
            }}>

                <View style={{
                    flex: 1,
                    backgroundColor: '#ffcc00',
                    padding: 10,
                    justifyContent: 'center',
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                }}>
                    <Ionicons name="alert-circle-outline" color="black" size={34} />
                </View>

                <View style={{
                    flex: 6,
                    padding: 10,
                    paddingRight: 20,
                    backgroundColor: '#ffffff',
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,
                }}>
                    <Text
                        style={{
                            color: Colors.text,
                            fontWeight: 'bold',
                            fontSize: 16,
                        }}
                    >
                        {t('info')}
                    </Text>
                    <Text
                        style={{
                            color: Colors.text,
                            marginTop: 0,
                            fontSize: 14,
                        }}
                    >
                        {props.text}
                    </Text>
                </View>

            </View>
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
                        <ApiContext.Provider value={{ photoUrl, setPhotoUrl }}>
                            <SafeAreaView style={{ flex: 1 }}>
                                <MenuProvider>
                                    <StackNavigation />
                                </MenuProvider>
                            </SafeAreaView>
                        </ApiContext.Provider>
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
