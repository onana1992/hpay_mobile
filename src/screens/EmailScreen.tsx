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
    KeyboardAvoidingView,
    Keyboard, Pressable, Platform, ScrollView
} from 'react-native';

import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { Colors } from '../themes';
import { useTranslation } from 'react-i18next';
import NoConnectedHeader from '../components/NoConnectedHeader';
import LoadingModal from '../components/LoadingModal';
import StepCompnent from '../components/StepCompnent';
import EmailVerificationModal from '../components/EmailVerificationModal';



function EmailScreen({ navigation,route}: {navigation:any,route:any}) {


    const [email, setEmail] = React.useState({ value: '', error: '' })
    const { t } = useTranslation();
    const [modalVisible, setModalVisible] = React.useState(false);
    const [verifModalVisible, setVerifModalVisible] = React.useState<boolean>(false);



    //const { phone, idclient } = route.params;



    const onLoginPressed = () => {

        setVerifModalVisible(true);

        //navigation.navigate('PhotoScreen');

        //console.log(email.value);

        /*const emailError = emailValidator(email.value);  
        
        if (emailError) {
            setEmail({ ...email, error: emailError })
            return
        }

        
        setModalVisible(true);*/
        /*PostEmailRequest(idclient, email.value ).then((response: any) => {

            console.log(response.data);

            if (response.data.success === true) {

                setModalVisible(false);
                navigation.navigate('PhotoScreen'); *//*, { phone: phone, idclient: idclient })*//*;
            } else {

                console.log('echec');
                setModalVisible(false);

            }


        }).catch((error: any) => {
            //console.log(error);
            setModalVisible(false);
        })*/
        
    }



    const pass = () => {

        navigation.navigate('PhotoScreen');
  
    }

    const openVerifMotal = () => {
        setVerifModalVisible(true);
    }


    
    return (
   
        <KeyboardAvoidingView
            enabled={true}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.main}
        >
            <NoConnectedHeader navigation={navigation} />
            <ScrollView>

                <Pressable style={styles.content} onPress={Keyboard.dismiss}>

                    <View style={{ flex:2 , alignItems:'flex-start' }}>
                           
                        <StepCompnent step={5} />

                        <View style={styles.pageheader}>
                            <Text style={styles.title}>{t('emailscreen.title')}</Text>
                            <Text style={styles.subtitle}>
                                {t('emailscreen.titlemsg')}
                            </Text>
                        </View>


                        <View style={{  alignContent: 'flex-end', justifyContent: 'flex-end'}}>
                            <Text style={styles.inputTitleText}>{t('emailscreen.email')}*</Text>
                            <View style={{ flexDirection: 'row', width: '100%', }}>
                                <TextInput
                                    label={t('emailscreen.youremail')}
                                    returnKeyType="next"
                                    value={email.value}
                                    onChangeText={(text: string) => setEmail({ value: text, error: '' })}
                                    error={!!email.error}
                                    errorText={email.error}
                                    autoCapitalize="none"
                                    autoCompleteType="tel"
                                    textContentType="emailAddress"
                                    description={undefined}
                                />
                            </View>
                        </View>
        
                    </View>
                   
                </Pressable>
            </ScrollView>
            <View style={{  marginTop: 10, width: '100%', justifyContent: 'flex-end' }}>
                <Button
                    mode="contained"
                    onPress={() => { openVerifMotal() }}>
                    {t('emailscreen.submit')}
                </Button>

                <Button
                    mode="outlined"
                    onPress={() => { pass() }}>
                    {t('emailscreen.pass')}
                </Button>
            </View>
            <LoadingModal setModalVisible={setModalVisible} modalVisible={modalVisible} />
            <EmailVerificationModal
                isVisible={verifModalVisible}
                onClose={() => setVerifModalVisible(false)}
            />
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
    },

    inputTitleText: {
        textAlign: 'left',
        color: Colors.text,
        fontWeight: 'bold'
    },

});


export default EmailScreen;


