/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
import React from 'react';
import { SafeAreaView, Text, Pressable, StyleSheet, View, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import { Colors } from '../themes';
import { useTranslation } from 'react-i18next';
//import I18n from 'react-native-i18n';


type PropType = {
    isVisible: boolean,
    onClose: () => void,
}


export default function LangageModal({ isVisible, onClose }: PropType) {

    const { t, i18n } = useTranslation();

    const changeLangage = (lang: string) => {
        i18n.changeLanguage(lang);
        onClose();
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
                    <Text style={{ color: Colors.text, fontSize: 26, fontWeight: 'bold', paddingVertical: 10 }}> {t('changethelangage')}</Text>
                </View>

                <Pressable style={styles.item} onPress={() => { changeLangage('fr'); }} >

                    <View style={{
                        flex: 1,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                    }}>
                        {/*<View style={{
                            borderColor: Colors.background,
                            borderWidth: 1,
                            height: 50,
                            width: 50,
                            borderRadius: 25,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Text>&#x1F1E8;&#x1F1F5;</Text>
                        </View>*/}

                        <Image
                            source={require('../assets/france.png')}
                            style={styles.avatarImage}
                        />

                    </View>

                    <View style={{
                        flex: 3,
                        alignItems: 'flex-start',
                        justifyContent: 'center'
                    }}>
                        <Text style={styles.buttonText}>{t('french')}</Text>
                    </View>

                    <View style={{
                        flex: 1,
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                    }}>
                        <Ionicons name="chevron-forward-outline" size={16} color={Colors.text} />
                    </View>
                </Pressable>

                <Pressable style={styles.item} onPress={() => { changeLangage('en'); }}>

                    <View style={{
                        flex: 1,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                    }}>

                        <Image
                            source={require('../assets/gb.png')}
                            style={styles.avatarImage}
                        />

                    </View>

                    <View style={{
                        flex: 3,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                    }}>
                        <Text style={styles.buttonText}>
                            {t('english')} </Text>
                    </View>

                    <View style={{
                        flex: 1,
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                    }}>
                        <Ionicons name="chevron-forward-outline" size={16} color={Colors.text} />
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
        height: 250,
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