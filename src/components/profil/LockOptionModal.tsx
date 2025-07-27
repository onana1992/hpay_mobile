/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, Pressable, StyleSheet, View, Image, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import { Colors } from '../../themes';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useSelector,  } from 'react-redux';
//import I18n from 'react-native-i18n';


type PropType = {
    isVisible: boolean,
    onClose: () => void,
    accessCode: null|string
}


export default function LockOptionModal({ isVisible, onClose, accessCode }: PropType) {


    const { t } = useTranslation();
    const navigation = useNavigation();
    const lockMode = useSelector((state: any) => state.profil.lockMode);

    const navigateToPasscodeSet = () => {
        onClose();
        navigation.navigate('PasscodeSetScreen');
    };


    return (
        <Modal
            isVisible={isVisible}
            onBackButtonPress={onClose}
            onBackdropPress={onClose}
            onSwipeComplete={onClose} // Handle swipe to close
            swipeDirection={['down']}
            animationIn="slideInUp" // Optional: animation for modal entry
            animationOut="slideOutDown" // Optional: animation for modal exit
            style={styles.modal}>
            <SafeAreaView style={styles.content}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                    <View style={{ height: 5, width: 40, borderRadius: 5, backgroundColor: Colors.background }}>
                    </View>
                </View>

                <View style={{}}>
                    <Text style={{ color: Colors.text, fontSize: 26, fontWeight: 'bold', paddingVertical: 10 }}>{t('profil.lockscreen')}</Text>
                </View>


                <Pressable disabled={lockMode === 1} style={styles.item} onPress={() => { navigateToPasscodeSet(); }} >
                    <View style={{
                        flex: 1,
                        borderColor: Colors.background,
                        borderWidth: 1,
                        height: 50,
                        width: 50,
                        borderRadius: 25,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Ionicons name="keypad-outline" size={22} color={Colors.text} />
                    </View>

                    <View style={{
                        flex: 5,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        paddingLeft: 20,
                    }}>
                        <Text style={styles.buttonText}>{t('profil.enablethepasscodelockscreen')}</Text>

                        <TouchableOpacity >
                            <Text>Changer le code d'accès</Text>
                        </TouchableOpacity>

                    </View>



                    <View style={{
                        flex: 1,
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                    }}>
                        {lockMode === 1 && <Ionicons name="checkmark-outline" size={20} color={lockMode === 1 ? 'green' : Colors.gray} />}
                    </View>

                </Pressable>


                <Pressable style={styles.item} onPress={() => { changeLangage('fr'); }} >

                    <View style={{
                        borderColor: Colors.background,
                        borderWidth: 1,
                        height: 50,
                        width: 50,
                        borderRadius: 25,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Ionicons name="finger-print-outline" size={22} color={Colors.text} />
                    </View>

                    <View style={{
                        flex: 3,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        paddingLeft: 20,
                    }}>
                        <Text style={styles.buttonText}>{t('profil.enablebiometriclockscreen')}</Text>
                    </View>


                    <View style={{
                        flex: 1,
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                    }}>
                        {lockMode === 2 && <Ionicons name="checkmark-outline" size={20} color={lockMode === 2 ? 'green' : Colors.gray} /> } 
                    </View>
                </Pressable>


                <Pressable style={styles.item} onPress={() => { navigateToPasscodeSet(); }} >
                    <View style={{
                        flex: 1,
                        borderColor: Colors.background,
                        borderWidth: 1,
                        height: 50,
                        width: 50,
                        borderRadius: 25,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Ionicons name="close" size={24} color={Colors.error} />
                    </View>

                    <View style={{
                        flex: 5,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        paddingLeft: 20,
                    }}>
                        <Text style={styles.buttonText}>{t('profil.disablethelockscreen')}</Text>
                    </View>

                    <View style={{
                        flex: 1,
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                    }}>
                        {lockMode === 0 && <Ionicons name="checkmark-outline" size={20} color={lockMode === 0 ? 'green' : Colors.gray} />}
                    </View>
                </Pressable>

            </SafeAreaView>
        </Modal>
    );
}

const styles = StyleSheet.create({

    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },

    content: {
        backgroundColor: '#ffffff',
        padding: 20,
        height: 340,
    },

    item: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
    },

    buttons: {
        backgroundColor: 'white',
        flexDirection: 'row',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },

    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        fontSize: 16,
        color: Colors.text,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
    },

    avatarImage: {
        height: 30,
        width: 30,
        overflow: 'hidden',
        borderColor: '#ffffff',
        borderWidth: 1,
        borderRadius: 15,
    },


});