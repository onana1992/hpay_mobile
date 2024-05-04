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
    Keyboard, SafeAreaView,
} from 'react-native';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { Colors } from '../themes';
import { emailValidator } from '../helpers/emailValidator';
import { useTranslation } from 'react-i18next';
import NoConnectedHeader from '../components/NoConnectedHeader';
import { PostEmailRequest } from '../services/request';
import LoadingModal from '../components/LoadingModal';

function EmailScreen({ navigation,route }: {navigation:any,route:any}) {


    const [email, setEmail] = React.useState({ value: '', error: '' })
    const { t } = useTranslation();
    const [modalVisible, setModalVisible] = React.useState(false);
    const { phone, idclient } = route.params;



    const onLoginPressed = () => {

        const emailError = emailValidator(email.value);  
        
        if (emailError) {
            setEmail({ ...email, error: emailError })
            return
        }

        
        setModalVisible(true);
        PostEmailRequest(idclient, email.value ).then((response: any) => {

            console.log(response.data);

            if (response.data.success === true) {

                setModalVisible(false);
                navigation.navigate('PhotoScreen', { phone: phone, idclient: idclient });
            } else {

                console.log('echec');
                setModalVisible(false);

            }


        }).catch((error: any) => {
            console.log(error);
            setModalVisible(false);
        })
        
    }



    const pass = () => {

        navigation.navigate('PhotoScreen');
  
    }


    return (

        <KeyboardAvoidingView
            style={styles.main}
            enabled={false}
            behavior='padding'
        >

            <SafeAreaView style={{ flex: 1 }} onPress={Keyboard.dismiss}>

                <NoConnectedHeader navigation={navigation} />

                <View style={styles.content}>
                    <Logo />
                    <Header> {t('emailscreen.title')}</Header>

                    <Paragraph>
                        {t('emailscreen.titlemsg')}
                    </Paragraph>

                    <View style={styles.inputTitle}>
                        <Text style={styles.inputTitleText}>{t('emailscreen.email')}*</Text>
                    </View>
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

                <View style={{ flex: 2, marginTop:250 }}>
                    <View style={{ marginTop: 10, width: '100%' }}>
                        <Button
                            mode="contained"
                            onPress={() => { onLoginPressed() }}>
                            {t('emailscreen.submit')}
                        </Button>

                        <Button
                            mode="outlined"
                            onPress={() => { pass() }}>
                            {t('emailscreen.pass')}
                        </Button>
                    </View>
                </View>
            </SafeAreaView>
            <LoadingModal setModalVisible={setModalVisible} modalVisible={modalVisible} />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({

    main: {
        backgroundColor: '#ffff',
        flex: 1,
        padding: 20,
    },

    content: {
        flex: 4,
        flexDirection: 'column',
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


export default EmailScreen;


