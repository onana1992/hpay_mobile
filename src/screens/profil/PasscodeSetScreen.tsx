/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable eslint-comments/no-unused-disable */
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
import { Colors } from '../../themes'
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { useTranslation } from 'react-i18next';;
import VirtualKeyboard from 'react-native-virtual-keyboard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch } from 'react-redux';
import { saveAccesCode } from '../../store/profilSlice';

//import { useRoute } from '@react-navigation/native';


function PasscodeSetScreen({ navigation }: { navigation: any }) {


    // const route = useRoute<any>();
    const [passCode, setPassCode] = React.useState('');
    const [confirmPassCode, setConfirmPassCode] = React.useState('');
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [step, setStep] = React.useState(1);


    const passCodeChange = (code:string) => {
        if (code.length <= 5 ) {
            setPassCode(code);
            if (code.length === 5) {
                setStep(2);
            }
        }
        
    }

    const confirmPassCodeChange = (code: string) => {
        if (code.length <= 5) {
            setConfirmPassCode(code);
            if (code.length === 5) {
                if (code === passCode ) {
                    setStep(3);
                    dispatch(saveAccesCode(passCode));
                } else {

                    setStep(1);
                    setPassCode('');
                    setConfirmPassCode('');
                    Toast.show({
                        type: 'errorMessage',
                        props: { text: t('passcodeSetScreen.nomatchcode') }
                    });
                }
            }
        }

    }



    const close = () => {
        navigation.goBack();
    }


    return (
        <KeyboardAvoidingView
            enabled={true}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.main}
        >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }} >
                <TouchableOpacity style={{
                    justifyContent: 'center',
                    backgroundColor: '#e6e4e0',
                    height: 40,
                    width: 40,
                    alignItems: 'center',
                    borderRadius: 20,
                }} onPress={() => { navigation.goBack() }} >
                    <View>
                        <Ionicons name="close" color={Colors.text} size={24} />
                    </View>
                </TouchableOpacity>
            </View>

            {
                step === 1 &&
                <Pressable style={styles.content} onPress={Keyboard.dismiss}>


                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                        <View style={styles.pageheader}>
                                <Text style={styles.title}>{t('passcodeSetScreen.pleasechooseanaccesscode')}</Text>
                        </View>
                    </View>




                    <View style={{
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        marginVertical: 20,
                        width: '100%',
                        flex: 1
                    }}>
                        <SmoothPinCodeInput
                                cellStyle={{
                                    borderWidth: 2,
                                    borderColor: 'gray',
                                }}
                                cellStyleFocused={{
                                    borderColor: 'black',
                                }}
                                value={passCode}
                                //password mask="﹡"
                                codeLength={5}
                                //onTextChange={code => accesCodeChange(code)}
                                editable={false}
                                animated={true}
                        />

                        {/*<View style={{ marginTop: 10 }}>
                        <Text style={{ color: Colors.error }} >Code d'accès incorrect</Text>
                    </View>*/}

                    </View>



                    <View style={{
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        width: '100%',
                        flex: 1
                    }}>

                        {/*<Button
                            mode="contained"
                            onPress={() => { onLoginPressed() }}>
                            Enregistrer
                        </Button>*/}

                        <VirtualKeyboard
                            color='black'
                            pressMode='string'
                            onPress={(val: string) => passCodeChange(val)}
                         />

                    </View>


                </Pressable>
                
           
            }


            {
                step === 2 &&
                <Pressable style={styles.content} onPress={Keyboard.dismiss}>


                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                        <View style={styles.pageheader}>
                                <Text style={styles.title}> {t('passcodeSetScreen.pleaseconfirmyouraccesscode')}</Text>
                        </View>
                    </View>



                    <View style={{
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        marginVertical: 20,
                        width: '100%',
                        flex: 1
                    }}>
                        <SmoothPinCodeInput
                            cellStyle={{
                                borderWidth: 2,
                                borderColor: 'gray',
                            }}
                            cellStyleFocused={{
                                borderColor: 'black',
                            }}
                            value={confirmPassCode}
                            //password mask="﹡"
                            codeLength={5}
                            //onTextChange={code => accesCodeChange(code)}
                            editable={false}
                            animated={true}
                        />

                        {/*<View style={{ marginTop: 10 }}>
                            <Text style={{ color: Colors.error }} >Code d'accès incorrect</Text>
                            </View>*/
                        }

                    </View>



                    <View style={{
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        width: '100%',
                        flex: 1
                    }}>

                        {/*<Button
                            mode="contained"
                            onPress={() => { onLoginPressed() }}>
                            Enregistrer
                        </Button>*/}

                        <VirtualKeyboard
                            color='black'
                            pressMode='string'
                            onPress={(val: string) => confirmPassCodeChange(val)}
                        />

                    </View>


                </Pressable>


            }





            {
                step === 3 &&
                <View style={{flex:1}}>


                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View>
                            <Feather name="check-circle" color="green" size={80} />
                        </View>
                        <View style={{ paddingVertical: 20 }}>
                                <Text style={{ color: Colors.text, textAlign: 'center', fontWeight: 'bold', fontSize: 24 }}> {t('passcodeSetScreen.welldone')} ! </Text>
                                <Text style={{ color: Colors.text, textAlign: 'center', fontSize: 14 }}> {t('passcodeSetScreen.accesscodesaved')} </Text>
                        </View>
                    </View>

                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <View style={{ paddingVertical: 10 }}>
                            <TouchableOpacity style={styles.addbutton} onPress={() => { close(); }}>
                                    <Text style={styles.addbuttonText}>{t('passcodeSetScreen.close')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            }
            
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

    addbuttonText: {
        fontWeight: 'bold',
        color: '#ffffff',
        fontSize: 16,
    },

    addbutton: {
        height: 50,
        backgroundColor: Colors.primary,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

});


export default PasscodeSetScreen;
