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
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Paragraph from '../../components/Paragraph';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { Colors } from '../../themes';
import { emailValidator } from '../../helpers/emailValidator';
import { useTranslation } from 'react-i18next';
import NoConnectedHeader from '../../components/NoConnectedHeader';


function RecoverScreen({ navigation }: { navigation: any }) {


    const [email, setEmail] = React.useState({ value: '', error: '' })
    const { t } = useTranslation();

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

            <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>

                <NoConnectedHeader navigation={navigation} />

                <View style={styles.content}>
                    <Logo />
                    <Header> {t('passwordRecover.title').toUpperCase()}</Header>

                    <Paragraph>
                        {t('passwordRecover.titlemsg')}
                    </Paragraph>

                    <View style={styles.inputTitle}>
                        <Text style={styles.inputTitleText}>{t('passwordRecover.id')}*</Text>
                    </View>
                    <TextInput
                        label={t('')}
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

                    <View style={{ marginTop: 20, width: "100%" }}>
                        <Button
                            mode="contained"
                            onPress={() => { onLoginPressed() }}>
                            {t('passwordRecover.next')}
                        </Button>

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


export default RecoverScreen;
