/* eslint-disable jsx-quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable react-native/no-inline-styles */

import * as React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Pressable, Platform,Keyboard,} from 'react-native';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { Colors } from '../../themes';
import { useTranslation } from 'react-i18next';
import NoConnectedHeader from '../../components/NoConnectedHeader';
import StepCompnent from '../../components/StepCompnent';
import StepRecover from '../../components/StepRecover';


function RecoverScreen({ navigation }: { navigation: any }) {


    const [email, setEmail] = React.useState({ value: '', error: '' })
    const { t } = useTranslation();
    const [telephone, setTelephone] = React.useState({ value: '', error: '' });

    const onLoginPressed = () => {

        /*const emailError = emailValidator(email.value);
        if (emailError) {
            setEmail({ ...email, error: emailError })
            return
        }*/

        navigation.navigate('Verification');

    }


    return (

        <KeyboardAvoidingView
            style={styles.main}
            enabled={true}
            behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}>

                <NoConnectedHeader navigation={navigation} />
                <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>

                    <StepRecover step={1} />

                    <View style={{ flex: 3, alignItems: 'flex-start' }}>
                        <View style={styles.content}>

                        <View style={styles.pageheader}>
                            <Text style={styles.title}>{t('passwordRecover.title')}</Text>
                            <Text style={styles.subtitle}>
                                {t('passwordRecover.titlemsg')}
                            </Text>
                        </View>

                        <View style={{ alignContent: 'flex-start', justifyContent: 'flex-start', marginTop: 20 }}>
                            <Text style={styles.inputTitleText}>{t('signinscreen.phone')}*</Text>
                            <View style={{ flexDirection: 'row', width: '100%', }}>
                                <TextInput
                                    label={t('signinscreen.yourphone')}
                                    returnKeyType="next"
                                    value={telephone.value}
                                    onChangeText={(text: string) => setTelephone({ value: text, error: '' })}
                                    error={!!telephone.error}
                                    errorText={telephone.error}
                                    autoCapitalize="none"
                                    autoCompleteType="tel"
                                    textContentType="emailAddress"
                                    description={undefined}
                                />
                            </View>

                        </View>
                    </View>
                    
                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>

                        <View style={{ flexDirection: 'row', marginTop: 30, width: "100%" }}>
                            <Button
                                mode="contained"
                                onPress={() => { onLoginPressed() }}>
                                {t('passwordRecover.next')}
                            </Button>

                        </View>
                    </View>

                </View>
            </Pressable>

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
    },

    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
        marginTop: 10
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
        marginTop: 10
    },

    inputTitleText: {
        textAlign: 'left',
        color: Colors.text,
        fontWeight: 'bold'
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
    },




});


export default RecoverScreen;
