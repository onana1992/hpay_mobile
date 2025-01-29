/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
import React from 'react';
import { SafeAreaView, Text, Pressable, StyleSheet, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { Colors } from '../themes';
import { useTranslation } from 'react-i18next';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';

//import I18n from 'react-native-i18n';


type PropType = {
    isVisible: boolean,
    onClose: () => void,
}



export default function EmailVerificationModal({ isVisible, onClose }: PropType) {

    const { t } = useTranslation();
    const [code, setCode] = React.useState('');
    const navigation = useNavigation();

    const cancel = () => {
        onClose();
    };

    const next = () => {
        onClose();
        navigation.navigate('PhotoScreen');
    };

    return (
        <Modal
            isVisible={isVisible}
            onBackButtonPress={onClose}
            onBackdropPress={onClose}
            style={styles.modal}>
            <SafeAreaView style={styles.content}>

                <ScrollView>

                    <View style={styles.pageheader}>
                        <Text style={styles.title}>{t('telVerificationcreen.title')}</Text>
                        <Text style={styles.subtitle}>
                            {t('telVerificationcreen.titlemsg')}
                        </Text>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                        <SmoothPinCodeInput
                            cellStyle={{
                                borderWidth: 2,
                                borderColor: 'gray',
                            }}
                            cellStyleFocused={{
                                borderColor: 'black',
                            }}
                            value={code}
                            onTextChange={code => setCode(code)}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.row}>
                            <Text style={{ color: Colors.text }}>{t('telVerificationcreen.nocode')}</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 0, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                                <Text style={styles.link}>{t('telVerificationcreen.resendcode')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </ScrollView>



                <View style={styles.footer}>

                    <Button
                        mode="contained"
                        onPress={() => { next(); }}>
                        {t('emailscreen.verify')}
                    </Button>

                    <Button
                        mode="outlined"
                        onPress={() => { cancel(); }}>
                        {t('emailscreen.cancel')}
                    </Button>

                </View>

            </SafeAreaView>
        </Modal>
    );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },

    content: {
        backgroundColor:'#ffffff',
        width: '100%',
        height: 550,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        padding: 20,
        position: 'relative',
    },

    pageheader: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItem: 'flex-start',
        marginBottom: 30,
        marginTop: 30,
    },

    step: {
        flexDirection: 'row',
        height: 20,
        width: '100%',
    },

    title: {
        color: Colors.text,
        fontSize: 22,
        fontWeight: 500,
        textAlign: 'left',
        paddingVertical: 0,
    },

    subtitle: {
        color: Colors.gray,
        fontSize: 14,
        fontStyle: 'italic',
        marginTop: 0,
    },

    row: {
        flexDirection: 'row',
        marginTop: 4,
    },

    forgot: {
        fontSize: 13,
        color: Colors.text,
    },

    link: {
        fontWeight: 'bold',
        color: Colors.primary,
    },

    footer: {
        position: 'absolute',
        bottom: 10,
        paddingVertical: 10,
        borderRadius: 5,
        width: width,
        paddingHorizontal:20
    },



});