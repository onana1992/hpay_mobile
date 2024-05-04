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
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import { Colors } from '../themes'
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { useTranslation } from 'react-i18next';
import NoConnectedHeader from '../components/NoConnectedHeader';
import { verifyTelRequest } from '../services/request';
import Toast from 'react-native-toast-message';
import LoadingModal from '../components/LoadingModal';
//import {  useRoute } from '@react-navigation/native';

function SignInScreen({ navigation, route }: {navigation:any, route:any}) {

    const [code, setCode] = React.useState('');
    const { t } = useTranslation();
    const [modalVisible, setModalVisible] = React.useState(false);

    const { phone, idclient } = route.params;

    console.log(phone);
    console.log(idclient);

    const lauchVerification = () => {

        if (code.length == 4) {
            
            setModalVisible(true);

            verifyTelRequest(phone, code).then((response: any) => {

                setModalVisible(false);

                if (response.data.success === true) {

                    setModalVisible(false);
                    navigation.navigate('Identity', { phone: phone, idclient: idclient });

                } else {

                    
                    setModalVisible(false);
                    Toast.show({
                        type: 'error',
                        text1: t('telVerificationcreen.telverificationfailure'),
                        text2: t('telVerificationcreen.novalidcode'),
                        position: 'top'
                    });

                }

            }).catch((_error: any) => {

                 console.log(_error);
                 setModalVisible(false);

            })

        }

    }


    return (
   
        <View style={styles.main}>
            <KeyboardAvoidingView
                enabled={true}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{flex:1}}
            >

                <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>

                    <NoConnectedHeader navigation={navigation} />
                    
                    <View style={styles.content}>

                        <View style={{ flex: 3, alignItems:'center' }}>
                            <Logo />
                            <Header>{t('telVerificationcreen.title')}</Header>

                            <Paragraph>
                                {t('telVerificationcreen.titlemsg')}
                            </Paragraph>

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

                            <View style={{ flexDirection: 'row', marginTop: 30 }}>
                                <View style={styles.row}>
                                    <Text style={{ color: Colors.text }}>{t('telVerificationcreen.nocode')}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 0 }}>
                                <View style={styles.row}>
                                    <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
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

                    </View>
                </Pressable>
                <LoadingModal setModalVisible={setModalVisible} modalVisible={modalVisible} />
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#ffff',
        flex: 1,
        padding: 20,
    },

    content: {
        flex: 1,
        //flexDirection: 'column',
       // justifyContent: 'center',
        alignItems: 'center',
    },

    forgotPassword: {
        width: '100%',
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

});


export default SignInScreen;
