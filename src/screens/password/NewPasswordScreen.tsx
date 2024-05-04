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
import PhoneInput from 'react-native-phone-number-input';



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
                behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}>

                <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>


                    <View style={styles.content}>
                        <Logo />
                        <Header>{t('passwordRecover.titlenewpassword').toUpperCase()}</Header>

                        <Paragraph>
                            {t('passwordRecover.titlemsgnewpassword')}
                        </Paragraph>

                        
                       
                        <View style={[styles.inputTitle, { marginTop: 20 }]}>
                            <Text style={styles.inputTitleText}>{t('signupscreen.password')}*</Text>
                        </View>
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

                        <View style={styles.inputTitle}>
                            <Text style={styles.inputTitleText}>{t('signupscreen.passwordconfirmation')}*</Text>
                        </View>

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

                        

                        <Button
                            mode="contained"
                            onPress={() => { onLoginPressed() }}>
                            {t('signupscreen.signup')}
                        </Button>



                        

                        <Snackbar
                            visible={snackVisible}
                            onDismiss={onDismissSnackBar}
                            style={{ marginTop: 150, width: '100%' }}
                        >
                            <Text style={{ color: 'red' }}> Echec, un compte existe deja avec ce numero</Text>
                        </Snackbar>

                    </View>
                </Pressable>
            </KeyboardAvoidingView>

        </ScrollView>

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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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
        marginVertical: -10,
        marginTop: 10
    },

    inputTitleText: {
        flex: 1,
        textAlign: 'left',
        color: Colors.text,
        fontWeight: 'bold'
    },

    error: {
        fontSize: 13,
        color: '#BA001A',
        paddingTop: 4,
    },

});


export default NewPasswordScreen;
