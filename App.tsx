/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import React, { useEffect } from 'react';

import { SafeAreaView, StatusBar, useColorScheme,} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { PaperProvider } from 'react-native-paper';
import StackNavigation from './src/navigation/StackNavigator';
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

  /*const isDarkMode = useColorScheme() === 'dark';*/
  /*const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };*/

  LogBox.ignoreLogs(['ERROR:VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.']);
  useEffect(() => {
      SplashScreen.hide();
      LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

    return (
        <PortalProvider>
            <Provider store={store}>
                <PersistGate  persistor={persistor}>
                    <StatusBar
                        animated={true}
                        backgroundColor={Colors.primary}
                        translucent={false}
                    />
                    <PaperProvider>
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


/*const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});*/

export default App;
