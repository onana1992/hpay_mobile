/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import React, { useEffect } from 'react';

import { SafeAreaView, StatusBar, useColorScheme, View, Text } from 'react-native';
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
import Toast from 'react-native-toast-message';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import StackNavigation from './src/navigation/StackNavigation';
import messaging from '@react-native-firebase/messaging';
import { navigate } from './NavigationService';

registerTranslation('en-GB', enGB);
registerTranslation('fr', fr);

/*type SectionProps = PropsWithChildren<{
  title: string;
}>;*/

/*function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}*/

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


    /*const isDarkMode = useColorScheme() === 'dark';*/
    /*const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };*/


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
                    <Toast/>
                </PersistGate>
            </Provider>
            <PortalHost name="transactionPanel" />
        </PortalProvider>
  );
}


export default App;
