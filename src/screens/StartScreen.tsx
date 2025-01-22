/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable react-native/no-inline-styles */

import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Logo from '../components/Logo';
import Header from '../components/Header'
import Background from '../components/Background';
import Paragraph from '../components/Paragraph';
import { Colors } from '../themes';
import Button from '../components/Button';
import { useTranslation } from 'react-i18next';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';


function StartScreen({ navigation }: {navigation:any}) {

    const { t, i18n } = useTranslation();
    const changeLangage = (lang: string) => {
        i18n.changeLanguage(lang);
    };



    return (
        <View style={{ flex: 1 }}>
            < View style={{ height: 60, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding:15}}>

                <View style={{ flex: 1 }}></View>

                <View style={{ flex: 5, alignItems: 'flex-end' }}>
                    <Menu>
                        <MenuTrigger
                            customStyles={{
                                triggerWrapper: {
                                    height: 40,
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    paddingHorizontal: 10,
                                    borderRadius: 10,
                                },
                            }}>
                            {
                                i18n.language === 'fr' ?
                                    <Text> &#x1F1E8;&#x1F1F5; {t('french')}</Text>
                                    :
                                    <Text> &#x1F1EC;&#x1F1E7; {t('english')}</Text>
                            }
                        </MenuTrigger>
                        <MenuOptions>

                            <MenuOption
                                onSelect={() => changeLangage('fr')}
                                customStyles={{
                                    optionWrapper: {
                                        height: 30,
                                        justifyContent: 'center',
                                        paddingHorizontal: 10,
                                    },
                                }}
                            >
                                <Text style={{}}> &#x1F1E8;&#x1F1F5; {t('french')}</Text>
                            </MenuOption>

                            <MenuOption
                                onSelect={() => changeLangage('en')}
                                customStyles={{
                                    optionWrapper: {
                                        height: 30,
                                        justifyContent: 'center',
                                        paddingHorizontal: 10,
                                    },
                                }}
                            >
                                <Text style={{}}> &#x1F1EC;&#x1F1E7; {t('english')}</Text>
                            </MenuOption>

                        </MenuOptions>
                    </Menu>
                </View>
            </View>

            <View style={styles.main}>
                <View style={{ flex: 4, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Logo />
                    <Header>{t('startscreen.welcome').toUpperCase()}</Header>
                    <Text style={styles.welcomemessage}>
                        {t('startscreen.connectionmsg')}
                    </Text>
                </View>

                <View style={{ flex: 1 }}>
                    <Button
                        mode="contained"
                        onPress={() => navigation.navigate('SignIn')}   >
                        {t('startscreen.signin')}
                    </Button>

                    <Button
                        mode="outlined"
                        onPress={() => navigation.navigate('SignUp')}  >
                        {t('startscreen.signup')}
                    </Button>
                </View>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    main: {
        backgroundColor: '#ffff',
        flex: 1,
        padding: 20,
    },

    welcomemessage:{
        fontStyle: 'italic',
        fontSize: 14,
        color: 'gray',
        textAlign:'center',
    },
});


export default StartScreen;
