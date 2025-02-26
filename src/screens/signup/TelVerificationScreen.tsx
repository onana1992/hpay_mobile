/* eslint-disable eqeqeq */
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
import { useTranslation } from 'react-i18next';
import NoConnectedHeader from '../../components/NoConnectedHeader';
import { verifyTelRequest, updateActivationCodeRequest } from '../../services/request';
import Toast from 'react-native-toast-message';
import LoadingModal from '../../components/LoadingModal';
import StepCompnent from '../../components/StepCompnent';
import { useRoute } from '@react-navigation/native';



function TelVerificationScreen({ navigation}: {navigation:any,}) {

    const route = useRoute<any>();
    const [code, setCode] = React.useState('');
    const { t } = useTranslation();
    const [modalVisible, setModalVisible] = React.useState(false);
    const { phone, idclient } = route.params;

    console.log(phone);


    const lauchUpdateCode = () =>{

        setModalVisible(true);
        updateActivationCodeRequest(idclient).then((response: any) => {

            setModalVisible(false);
            console.log(response.data)

            if (response.data.statusCode === 200) {

                Toast.show({
                    type: 'success',
                    text1: t('telVerificationcreen.coderenewtitle'),
                    text2: t('telVerificationcreen.coderenewmessage'),
                    position: 'top'
                });

            } else {


            }

        }).catch((_error: any) => {

            console.log(_error.response.data)
            setModalVisible(false)
            if (_error.response.status === 401) {
                Toast.show({
                    type: 'error',
                    text1: t('telVerificationcreen.telverificationfailure'),
                    text2: t('telVerificationcreen.novalidcode'),
                    position: 'top'
                });
            } else {


            }

        })

    }




    const lauchVerification = () => {

       // navigation.navigate('Identity');

        if (code.length == 4) {
            
            setModalVisible(true);

            verifyTelRequest(idclient, code).then((response: any) => {

                setModalVisible(false);
                console.log(response.data)

                if (response.data.statusCode === 200) {

                    setModalVisible(false);
                    navigation.navigate('Identity', { phone: phone, idclient: idclient });

                } else {


                }

            }).catch((_error: any) => {

                console.log(_error.response.data)
                setModalVisible(false)
                if (_error.response.status === 401) {
                    Toast.show({
                        type: 'error',
                        text1: t('telVerificationcreen.telverificationfailure'),
                        text2: t('telVerificationcreen.novalidcode'),
                        position: 'top'
                    });
                } else {


                }

            })

        }

    }


    return (
   
        <KeyboardAvoidingView
            enabled={true}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.main}
        >
            <NoConnectedHeader navigation={navigation} />
            <Pressable style={styles.content} onPress={Keyboard.dismiss}>
              

                <View style={{ flex:1, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <StepCompnent step={3} />     
             
                    <View style={styles.pageheader}>
                        <Text style={styles.title}>{t('telVerificationcreen.title')}</Text>
                        <Text style={styles.subtitle}>
                            {t('telVerificationcreen.titlemsg')}
                        </Text>
                    </View>

                    
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 20, width: '100%', marginTop:40 }}>
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

                    <View style={{ flexDirection: 'row', marginTop: 10, width: '100%', justifyContent:'center' }}>
                        <View style={styles.row}>
                            <Text style={{ color: Colors.text }}>{t('telVerificationcreen.nocode')}</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 0, width: '100%', justifyContent: 'center' }}>
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
                            onPress={() => { lauchVerification() }}
                            //disabled={code.length == 4 ? false : true}
                        >
                            {t('telVerificationcreen.validate')}
                                    
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
        width:'100%',
    },

    content: {
        flex:1,
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
        marginBottom: 20,
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


export default TelVerificationScreen;
