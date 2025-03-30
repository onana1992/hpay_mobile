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
import { verifyEmailRequest } from '../services/request';
import Toast from 'react-native-toast-message';
import LoadingModal from '../components/LoadingModal';

//import I18n from 'react-native-i18n';


type PropType = {
    isVisible: boolean,
    onClose: () => void,
    idclient: Number
    phone:string
}



export default function EmailVerificationModal({ isVisible, onClose, phone, idclient }: PropType) {


    const { t } = useTranslation();
    const [code, setCode] = React.useState<string>('');
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = React.useState(false);

    const cancel = () => {
        onClose();
    };

    const next = () => {
        lauchVerification();
    };


    const lauchVerification = () => {

        //console.log(idclient);
        //console.log(code);

        if (code.length === 4) {

            setModalVisible(true);

            verifyEmailRequest(idclient, code).then((response: any) => {

                setModalVisible(false);
                navigation.navigate("PhotoScreen", { phone : phone , idclient: idclient });
                onClose();

            }).catch((_error: any) => {

                console.log(_error.response.data);
                setModalVisible(false);
                if (_error.response.data.statusCode === 404) {
                    Toast.show({
                        type: 'error',
                        text1: t('telVerificationcreen.telverificationfailure'),
                        text2: t('telVerificationcreen.novalidcode'),
                        position: 'top',
                    });
                } else {


                }

            });

        }

    };

    const resendCode = () => {

        console.log("à implementer")
    };

    return (
        <Modal
            isVisible={isVisible}
            onBackButtonPress={onClose}
            onBackdropPress={onClose}
            onSwipeComplete={onClose} // Handle swipe to close
            swipeDirection={['down']}
          //  animationIn="slideInUp" // Optional: animation for modal entry
          //  animationOut="slideOutDown" // Optional: animation for modal exit
            style={styles.modal}>
            <SafeAreaView style={styles.content}>

                <ScrollView>

                    <View style={styles.pageheader}>
                        <Text style={styles.title}>{t('emailscreen.veriftitle')}</Text>
                        <Text style={styles.subtitle}>
                            {t('emailscreen.verifmsg')}
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

                   {/* <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.row}>
                            <Text style={{ color: Colors.text }}>{t('telVerificationcreen.nocode')}</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 0, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => resendCode()}>
                                <Text style={styles.link}>{t('telVerificationcreen.resendcode')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>*/}

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

                <LoadingModal setModalVisible={setModalVisible} modalVisible={modalVisible} />
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
        height: 570,
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
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'left',
        paddingVertical: 5,
        marginTop: 0,
    },

    subtitle: {
        fontSize: 14,
        color: Colors.text,
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