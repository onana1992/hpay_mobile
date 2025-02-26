/* eslint-disable jsx-quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable react-native/no-inline-styles */

import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Pressable,
    Platform,
    Keyboard,

} from 'react-native';

import Button from '../../components/Button';
import { Colors } from '../../themes'
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import NoConnectedHeader from '../../components/NoConnectedHeader';
import { useTranslation } from 'react-i18next';
import StepRecover from '../../components/StepRecover';
import { passforgotVerifyPhoneRequest, passforgotCodeRequest} from '../../services/request';
import Toast from 'react-native-toast-message';
import LoadingModal from '../../components/LoadingModal';
import { useRoute } from '@react-navigation/native';



function VerificationScreen({ navigation }: { navigation: any }) {

    const route = useRoute<any>();
    const [code, setCode] = React.useState('');
    const { t } = useTranslation();
    const [modalVisible, setModalVisible] = React.useState(false);
    const { phone} = route.params;


    const submit = () => {

        //navigation.navigate('NewPassword')


        if (code.length === 4) {

            setModalVisible(true);
            passforgotVerifyPhoneRequest(phone, code).then((response: any) => {


               // console.log(response.data.response)

                if (response.data.statusCode === 200) {
                    setModalVisible(false);
                    console.log('okay');
                    navigation.navigate('NewPassword', {phone:phone});
                }


            }).catch((error: any) => {

                console.log(error.response.data)

                if (error.response.data.statusCode) {

                    setModalVisible(false);
                    Toast.show({
                        type: 'error',
                        text1: t('passwordRecover.failure'),
                        text2: t('passwordRecover.incorrectverificationcode'),
                        position: 'top'
                    });

                }



            })
           
        }

    }

    const lauchUpdateCode = () =>{

        setModalVisible(true);
        passforgotCodeRequest(phone).then((response: any) => {


            if (response.data.statusCode === 200) {
                setModalVisible(false);
            }


        }).catch((error: any) => {

            console.log(error.response.data) 
            
            if (error.response.data.statusCode) {

                setModalVisible(false);
                Toast.show({
                    type: 'error',
                    text1: t('passwordRecover.failure'),
                    text2: t('passwordRecover.noaccoundfound'),
                    position: 'top'
                });

            }
           
        })

    }



    return (

        <KeyboardAvoidingView
            style={styles.main}
            enabled={true}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

            <NoConnectedHeader navigation={navigation} />
            <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>

                <StepRecover step={2}/>

                <View style={{ flex: 3, alignItems: 'flex-start' }}>
                    

                    <View style={styles.pageheader}>
                        <Text style={styles.title}>{t('telVerificationcreen.title')}</Text>
                        <Text style={styles.subtitle}>
                            {t('telVerificationcreen.titlemsg')}
                        </Text>
                    </View>


                    <View style={{ width: '100%', marginTop: 10, alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}>
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

                    <View style={{ flexDirection: 'row', width: '100%', marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={styles.row}>
                            <Text style={{ color: Colors.text }}>{t('telVerificationcreen.nocode')}</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', width:'100%', marginTop: 5, alignItems:'center', justifyContent:'center' }}>
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => lauchUpdateCode()}>
                                <Text style={styles.link}>{t('telVerificationcreen.resendcode')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>


                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <View style={{ flexDirection: 'row', marginTop: 30 }}>
                        <Button
                           mode="contained"
                          onPress = {() => {submit()}} 
                            //disabled={code.length == 4 ? false : true}
                        >
                            {t('passwordRecover.next')}

                        </Button>
                    </View>
                </View>

            </Pressable>
            <LoadingModal setModalVisible={setModalVisible} modalVisible={modalVisible} />
        </KeyboardAvoidingView> 
    );
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#ffff',
        flex: 1,
        padding: 20,
        width: '100%',
    },

    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
    },

    forgotPassword: {

        alignItems: 'flex-end',
        marginBottom: 24,
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

    pageheader: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItem: 'flex-start',
        marginBottom: 30,
        marginTop: 30
    },

    step: {
        flexDirection: 'row',
        height: 20,
        width: '100%'
    },

    title: {
        color: Colors.text,
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'left',
        paddingVertical: 5,
        marginTop: 0
    },

    subtitle: {
        fontSize: 14,
        color: Colors.text,
        marginTop: 0
    },

});


export default VerificationScreen;
