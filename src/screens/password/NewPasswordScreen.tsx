/* eslint-disable jsx-quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable react-native/no-inline-styles */


import React, { useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Pressable,
    Platform,
    Keyboard,
    ScrollView
} from 'react-native';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Paragraph from '../../components/Paragraph';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { Colors } from '../../themes'
import { telValidator } from '../../helpers/telValidator'
import { passwordValidator } from '../../helpers/passwordValidator';
import { confirmPasswordValidator } from '../../helpers/confirmPasswordValidator';
import { TextInput as Input, Snackbar } from 'react-native-paper'
import { useTranslation } from 'react-i18next';
import NoConnectedHeader from '../../components/NoConnectedHeader';
import StepRecover from "../../components/StepRecover";



function NewPasswordScreen({ navigation }: { navigation: any }) {

    const { t } = useTranslation();
   
    const [password, setPassword] = React.useState({ value: '', error: '' })
    const [confirmPassword, setConfirmPassword] = React.useState({ value: '', error: '' })
    const [passwordShow, setPasswordShow] = React.useState(false)
    const [confirmPasswordShow, setConfirmPasswordShow] = React.useState(false)
    const [snackVisible, setSnackVisible] = React.useState(false);
    const onDismissSnackBar = () => setSnackVisible(false);
    const onLoginPressed = () => {

        navigation.navigate('TelVerification');
        /*console.log(confirmPassword.value);
        console.log(password.value);
       

        const telError = telValidator(telephone.value)
        const passwordError = passwordValidator(password.value)
        const passwordConfirmationError = confirmPasswordValidator(password.value, confirmPassword.value)
        

        if (telError || passwordError || passwordConfirmationError) {
            setTelephone({ ...telephone, error: t(`${telError}`)  })
            setPassword({
                ...password, error: t(`${passwordError}`)  })
            setConfirmPassword({ ...confirmPassword, error: t(`${passwordConfirmationError}`) })
            return
        }*/


        // setSnackVisible(true);
        //alert()
    }

    return (
        <ScrollView style={styles.main}>

            <NoConnectedHeader navigation={navigation} />

            <KeyboardAvoidingView
                enabled={true}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                
                <Pressable onPress={Keyboard.dismiss}>

                    <StepRecover step={3} />

                    <View style={styles.content}>

                        <View style={styles.pageheader}>
                            <Text style={styles.title}>{t('signupscreen.step1')}</Text>
                            <Text style={styles.subtitle}>
                                {t('signupscreen.titlemsg')}
                            </Text>
                        </View>

                        

                        <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start', marginTop: 20 }}>
                            <Text style={styles.inputTitleText}>{t('signupscreen.password')}*</Text>
                            <View style={{ flexDirection: 'row', width: '100%', }}>
                                <TextInput
                                    label={t('signupscreen.yourpassword')}
                                    returnKeyType="done"
                                    value={password.value}
                                    onChangeText={(text: string) => setPassword({ value: text, error: '' })}
                                    error={!!password.error}
                                    errorText={password.error}
                                    secureTextEntry={!passwordShow}
                                    right={<Input.Icon icon={!passwordShow ? 'eye-off' : 'eye'} onPress={() => { setPasswordShow(!passwordShow) }} />}
                                    description={undefined}
                                />
                            </View>
                        </View>


                        <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start', marginTop: 20 }}>
                            <Text style={styles.inputTitleText}>{t('signupscreen.passwordconfirmation')}*</Text>
                            <View style={{ flexDirection: 'row', width: '100%', }}>
                                <TextInput
                                    label={t('signupscreen.confirmyourpassword')}
                                    returnKeyType="done"
                                    value={confirmPassword.value}
                                    onChangeText={(text: string) => setConfirmPassword({ value: text, error: '' })}
                                    error={!!confirmPassword.error}
                                    errorText={confirmPassword.error}
                                    secureTextEntry={!confirmPasswordShow}
                                    right={<Input.Icon icon={!confirmPasswordShow ? 'eye-off' : 'eye'} onPress={() => { setConfirmPasswordShow(!confirmPasswordShow) }} />}
                                    description={undefined}
                                />
                            </View>
                        </View>

                        

                        <View style={{ marginTop: 20, flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Button
                                mode="contained"
                                //disabled={!checked}
                                onPress={() => { onLoginPressed() }}>
                                {t('signupscreen.submit')}

                            </Button>
                        </View>



                    </View>
                </Pressable>
               {/* <LoadingModal setModalVisible={setModalVisible} modalVisible={modalVisible} />*/}
            </KeyboardAvoidingView>

        </ScrollView>

    );
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#ffff',
        padding: 20,
    },

    content: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },

    forgotPassword: {
        width: '100%',
        alignItems: 'flex-start',
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

    inputTitle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%'
    },

    inputTitleText: {
        textAlign: 'left',
        color: Colors.text,
        fontWeight: 'bold',

    },

    error: {
        fontSize: 13,
        color: '#BA001A',
        paddingTop: 4,
    },

    pageheader: {
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
        fontSize: 22,
        fontWeight: 500,
        textAlign: 'left',
        paddingVertical: 0
    },

    subtitle: {
        color: Colors.gray,
        fontSize: 14,
        fontStyle: 'italic',
        marginTop: 0
    }

});


export default NewPasswordScreen;
