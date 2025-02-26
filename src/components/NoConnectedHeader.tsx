/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */

import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { Colors } from '../themes';

export default function NoConnectedHeader({ navigation, visible = true }: { navigation: { goBack: () => void; }, visible?: boolean }) {

    const { t, i18n } = useTranslation();

    const changeLangage = (lang:string) => {
        i18n.changeLanguage(lang)
    }


    return (

        < View style={styles.main}>

            <View style={{ flex: 1 }}>
                {
                    visible &&
                    <TouchableOpacity style={{
                        justifyContent: 'center',
                        backgroundColor: '#e6e4e0',
                        height: 40,
                        width: 40,
                        alignItems: 'center',
                        borderRadius: 20,
                    }} onPress={() => { navigation.goBack(); }} >
                        <View>
                            <Ionicons name="chevron-back" color={Colors.text} size={24} />
                        </View>
                    </TouchableOpacity>
                    /*<TouchableOpacity style={styles.backbutton} onPress={() => { navigation.goBack() }}>
                        <Ionicons name="chevron-back" color="black" size={18} />
                    </TouchableOpacity>*/

                }
                
            </View>

            <View style={{ flex: 5, alignItems: 'flex-end', justifyContent:'flex-start' }}>
                <Menu>
                    <MenuTrigger>
                        {
                            i18n.language === 'fr' ?
                                <Text style={{ color: Colors.text }}> &#x1F1E8;&#x1F1F5; {t('french')}</Text>
                                    :
                                <Text style={{ color: Colors.text }}> &#x1F1EC;&#x1F1E7; {t('english')}</Text>
                        }
                    </MenuTrigger>
                    <MenuOptions>
                        
                        <MenuOption onSelect={() => changeLangage('fr')} >
                            <Text style={{ color: Colors.text }}> &#x1F1E8;&#x1F1F5; {t('french')}</Text>
                        </MenuOption>

                        <MenuOption onSelect={() => changeLangage('en')} >
                            <Text style={{ color: Colors.text }}> &#x1F1EC;&#x1F1E7; {t('english')}</Text>
                        </MenuOption>

                    </MenuOptions>
                </Menu>
            </View>
        </View>
    
    ) 
}

const styles = StyleSheet.create({
    main: {
       // height: 40,
        flexDirection: 'row',
        paddingVertical: 10 ,
    },

    backbutton: {
        height: 30,
        width: 30,
        borderRadius: 20,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent:'center',
    },
})
