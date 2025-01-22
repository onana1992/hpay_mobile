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
    Pressable ,
    Platform,
    Keyboard,
    ScrollView,

} from 'react-native';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { Colors } from '../themes';
import { telValidator1 } from '../helpers/telValidator';
import { passwordValidator1 } from '../helpers/passwordValidator';
import { TextInput as Input, Snackbar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import NoConnectedHeader from '../components/NoConnectedHeader';
import { useDispatch } from 'react-redux';
import { signIn, } from '../store/profilSlice';
import { signInRequest } from '../services/request';
import LoadingModal from '../components/LoadingModal';
import Toast from 'react-native-toast-message';

function SignInScreen({ navigation }: {navigation:any}){

    const [modalVisible, setModalVisible] = React.useState(false);
    const [telephone, setTelephone] = React.useState({ value: '', error: '' })
    const [password, setPassword] = React.useState({ value: '', error: '' })
    const [passwordShow, setPasswordShow] = React.useState(false)
    const [snackVisible, setSnackVisible] = React.useState(false);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const onDismissSnackBar = () => setSnackVisible(false);

    const onLoginPressed = () => {

        const telError = telValidator1(telephone.value)
        const passwordError = passwordValidator1(password.value)

        if (telError || passwordError) {
            setTelephone({ ...telephone, error: t(`${telError}`) })
            setPassword({ ...password, error: passwordError })
            return
        }

        setModalVisible(true);
        signInRequest(telephone.value, password.value).then((response: any) => {

          console.log(response.data);

            if (response.data.success === true) {

                setModalVisible(false);
                dispatch(signIn(response.data.data[0]));

            } else {

               console.log('echec');
               setModalVisible(false);

               Toast.show({
                   type: 'error',
                   text1: t('signinscreen.connexionfailure'), 
                   text2: t('signinscreen.loginorpasswordinvalid'),
                   position: 'top'
               });

            }


            
        }).catch((error: any) => {

            console.log(error);
            setModalVisible(false);
        })

 
    }


    return (
        <ScrollView style={styles.main}>
            <KeyboardAvoidingView
                enabled={true}
                behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}>

                <Pressable style={{flex:1}} onPress={Keyboard.dismiss}>
                    
                    <NoConnectedHeader navigation={navigation} />

                    <View style={styles.content}>

                        <Logo />

                        <Header> {t('signinscreen.title')}</Header>

                        <Paragraph>
                            {t('signinscreen.titlemsg')}
                        </Paragraph>


                        <View style={styles.inputTitle}>
                            <Text style={styles.inputTitleText}>{t('signinscreen.phone')}*</Text>
                        </View>

                        <TextInput
                            label={t('signinscreen.yourphone')}
                            returnKeyType="next"
                            value={telephone.value}
                            onChangeText={(text:string) => setTelephone({ value: text, error: '' })}
                            error={!!telephone.error}
                            errorText={telephone.error}
                            autoCapitalize="none"
                            autoCompleteType="tel"
                            textContentType="emailAddress"
                            description={undefined}
                        />


                        <View style={styles.inputTitle}>
                            <Text style={styles.inputTitleText}>{t('signinscreen.password')}*</Text>
                        </View>
                        <TextInput
                            label={t('signinscreen.yourpassword')}
                            returnKeyType="done"
                            value={password.value}
                            onChangeText={(text:string) => setPassword({ value: text, error: '' })}
                            error={!!password.error}
                            errorText={password.error}
                            description={undefined}
                            secureTextEntry={!passwordShow}
                            right={<Input.Icon icon={!passwordShow ? 'eye-off' : 'eye'} onPress={() => { setPasswordShow(!passwordShow) }} />}
                        />

                        <View style={styles.forgotPassword}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Recover')}
                            >
                                <Text style={styles.forgot}>{t('signinscreen.passwordforgotten')}</Text>
                            </TouchableOpacity>
                        </View>


                        <Button
                            mode="contained"
                            onPress={() => { onLoginPressed() }}>
                            {t('signinscreen.signin')}
                        </Button>

                        <View style={styles.row}>
                            <Text style={{ color: Colors.text }}>{t('signinscreen.youdonthaveaccount')} </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                                <Text style={styles.link}>{t('signinscreen.signup')}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={{ marginTop: 45 }}>
                        <Snackbar
                            visible={snackVisible}
                            onDismiss={onDismissSnackBar}
                        >
                            <Text style={{ color: 'red' }}>Echec de connexion. Numero ou mot de passe invalide.</Text>
                        </Snackbar>
                    </View>

                    
                    
                </Pressable>
            
            </KeyboardAvoidingView>
            <LoadingModal setModalVisible={setModalVisible} modalVisible={modalVisible} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#ffff',
        flex: 1,
        padding:20, 
    },

    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
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
    }

});


export default SignInScreen;


/*Login: 0150182512
Pass: 123456789*/