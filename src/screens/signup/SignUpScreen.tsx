/* eslint-disable jsx-quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable react-native/no-inline-styles */


import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Pressable,
    Keyboard,
    ScrollView
} from 'react-native';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { Colors } from '../../themes';
import { telValidator } from '../../helpers/telValidator';
import { passwordValidator } from '../../helpers/passwordValidator';
import { confirmPasswordValidator } from '../../helpers/confirmPasswordValidator';
import { TextInput as Input } from 'react-native-paper';
import { Checkbox } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import NoConnectedHeader from '../../components/NoConnectedHeader';
import { signUpRequest } from '../../services/request';
import Toast from 'react-native-toast-message';
import LoadingModal from '../../components/LoadingModal';
import StepCompnent from '../../components/StepCompnent';
import { useRoute } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';


function SignUpScreen({ navigation}: {navigation:any, route: any}) {


    const route = useRoute<any>();
    const { country, city } = route.params;
    const [modalVisible, setModalVisible] = React.useState(false);
    const [telephone, setTelephone] = React.useState({ value: '', error: '' });
    const [password, setPassword] = React.useState({ value: '', error: '' });
    const [confirmPassword, setConfirmPassword] = React.useState({ value: '', error: '' });
    const [passwordShow, setPasswordShow] = React.useState(false);
    const [confirmPasswordShow, setConfirmPasswordShow] = React.useState(false);
    const [checked, setChecked] = React.useState(false);
    const { t } = useTranslation();


    const indice = (val:string) => {
        return '+' + val; 
    }


    const onLoginPressed = () => {

        const telError = telValidator(telephone.value);
        const passwordError = passwordValidator(password.value);
        const passwordConfirmationError = confirmPasswordValidator(password.value, confirmPassword.value);
        

        if (telError || passwordError || passwordConfirmationError) {
            setTelephone({ ...telephone, error: t(`${telError}`)  })
            setPassword({
                ...password, error: t(`${passwordError}`)  })
            setConfirmPassword({ ...confirmPassword, error: t(`${passwordConfirmationError}`) })
            return
        }

        if (checked) {


            setModalVisible(true);
            signUpRequest(telephone.value, password.value, country.id, city.id).then((response: any) => {

                setModalVisible(false);
                navigation.navigate('TelVerification', { phone: telephone.value, idclient: response.data.response.data.idLoginClient });

            }).catch((_error: any) => {
               
                setModalVisible(false);
               

                if (_error.response.status === 409) {
                    Toast.show({
                        type: 'error',
                        text1: t('signupscreen.registrationfailure'),
                        text2: t('signupscreen.accountalreadyexist'),
                        position: 'top'
                    });
                } else {


                }
            })
    
        }

    }


    // effacement du token
    React.useEffect(() => {
        messaging().deleteToken();

    }, []);



    return (
        <ScrollView style={styles.main}>
        
            <NoConnectedHeader navigation={navigation} />

                <Pressable  onPress={Keyboard.dismiss}>


                    <View style={styles.content}>

                        <StepCompnent step={2} />

                        <View style={styles.pageheader}>
                            <Text style={styles.title}>{t('signupscreen.step1')}</Text>
                            <Text style={styles.subtitle}>
                                {t('signupscreen.titlemsg')}
                            </Text>
                        </View>

                        <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start'}}>
                            <Text style={styles.inputTitleText}>{t('signupscreen.phone')}*</Text>
                            <View style={{ flexDirection: 'row', width: '100%',  }}>
                                <TextInput
                                    label={t('signupscreen.yourphone')}
                                    returnKeyType="done"
                                    value={telephone.value}
                                    error={!!telephone.error}
                                    errorText={telephone.error}
                                    inputMode="numeric"
                                    onChangeText={(text: string) => setTelephone({ value: text, error: '' })}
                                    description={undefined}
                                    left={<Input.Affix text={indice(country.indicatif)} />}
                                />
                                {telephone.error ? <Text style={styles.error}>{telephone.error}</Text> : null}
                            </View>
                        </View>

                        <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start', marginTop:20 }}>
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

                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 20 }}>

                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: "center" }}>
                                <Checkbox
                                    status={checked ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setChecked(!checked);
                                    }}
                                    color={Colors.primary}
                                />
                                <Text style={styles.forgot}>{t('signupscreen.iaccept')} </Text>
                                <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                                    <Text style={styles.link}>{t('signupscreen.termsandconditions')}</Text>
                                </TouchableOpacity>
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
                        

                        <View style={{ marginTop: 20, flex: 1, width:'100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: Colors.text }}>{t('signupscreen.youalreadyhaveanaccount')}</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                                <Text style={styles.link}> {t('signupscreen.signin')} </Text>
                            </TouchableOpacity>
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
        marginBottom: 10,
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
        marginTop:30
    },

    step: {
        flexDirection:'row',
        height: 20,
        width:'100%'
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


export default SignUpScreen;
