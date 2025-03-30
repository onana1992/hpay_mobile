/* eslint-disable quotes */
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
    KeyboardAvoidingView,
    Pressable,
    Platform,
    Keyboard,
    ScrollView
} from 'react-native';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { Colors } from '../../themes'
import { TextInput as Input} from 'react-native-paper'
import { useTranslation } from 'react-i18next';
import NoConnectedHeader from '../../components/NoConnectedHeader';
import StepRecover from "../../components/StepRecover";
import LoadingModal from "../../components/LoadingModal";
import { useRoute } from '@react-navigation/native';
import { passforgotUpdatePasswordRequest } from "../../services/request";
import Toast from 'react-native-toast-message';
import { confirmPasswordValidator } from "../../helpers/confirmPasswordValidator";
import { passwordValidator } from "../../helpers/passwordValidator";



function NewPasswordScreen({ navigation }: { navigation: any }) {

    const route = useRoute<any>();
    const { t } = useTranslation();
    const [password, setPassword] = React.useState({ value: '', error: '' })
    const [confirmPassword, setConfirmPassword] = React.useState({ value: '', error: '' })
    const [passwordShow, setPasswordShow] = React.useState(false)
    const [confirmPasswordShow, setConfirmPasswordShow] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    const { phone } = route.params;
    

    const submit = () => {


        const passwordError = passwordValidator(password.value);
        const passwordConfirmationError = confirmPasswordValidator(password.value, confirmPassword.value);


        if ( passwordError || passwordConfirmationError) {

            setPassword({
                ...password, error: t(`${passwordError}`)
            })
            setConfirmPassword({ ...confirmPassword, error: t(`${passwordConfirmationError}`) })
            return
        }

        setModalVisible(true);



        passforgotUpdatePasswordRequest(phone, password.value).then((response: any) => {
           
            if (response.data.statusCode === 201) {

                setModalVisible(false);
                Toast.show({
                    type: 'error',
                    text1: t('passwordRecover.passwordchanged'),
                    text2: t('passwordRecover.passwordchangedmsg'),
                    position: 'top'
                });

                navigation.popToTop();
            }


         }).catch((error: any) => {

         
            if (error.response.data.statusCode) {

            }

        })


    };




    return (
        <ScrollView style={styles.main}>

            <NoConnectedHeader navigation={navigation} />

            
                <Pressable onPress={Keyboard.dismiss}>

                    <StepRecover step={3} />

                    <View style={styles.content}>

                    

                        <View style={styles.pageheader}>
                            <Text style={styles.title}>{t('passwordRecover.titlecreatenewpassword')}</Text>
                            <Text style={styles.subtitle}>
                                {t('passwordRecover.titlemsgcreatenewpassword')}
                            </Text>
                        </View>

                        

                        <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start', marginTop: 20 }}>
                            <Text style={styles.inputTitleText}>{t('signupscreen.password')}*</Text>
                            <View style={{ flexDirection: 'row', width: '100%', }}>
                                <TextInput
                                    label={t('signupscreen.yourpassword')}
                                    //returnKeyType="done"
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
                                    //returnKeyType="done"
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
                                onPress={() => { submit() }}>
                                {t('signupscreen.submit')}

                            </Button>
                        </View>

                    </View>
                </Pressable>
                <LoadingModal setModalVisible={setModalVisible} modalVisible={modalVisible} />
            

        </ScrollView>

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
        marginBottom:20
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

    inputTitleText: {
        textAlign: 'left',
        color: Colors.text,
        fontWeight: 'bold',
        marginBottom: 10,
        fontSize: 14
    },

});


export default NewPasswordScreen;
