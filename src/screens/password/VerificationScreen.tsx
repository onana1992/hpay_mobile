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
    ScrollView
} from 'react-native';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Paragraph from '../../components/Paragraph';
import Button from '../../components/Button';
import { Colors } from '../../themes'
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import NoConnectedHeader from '../../components/NoConnectedHeader';
import { useTranslation } from 'react-i18next';

function VerificationScreen({ navigation }: { navigation: any }) {

    const [code, setCode] = React.useState('');
    const { t } = useTranslation();

    return (

        <ScrollView style={styles.main}>
            <KeyboardAvoidingView
                enabled={true}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

                <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>

                    <NoConnectedHeader navigation={navigation} />

                    <View style={styles.content}>
                        <Logo />
                        <Header>{t('passwordRecover.titleverif').toUpperCase()}</Header>

                        <Paragraph>
                            {t('passwordRecover.titlemsgverif')}
                        </Paragraph>

                        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                            <SmoothPinCodeInput
                                cellStyle={{
                                    borderWidth: 2,
                                    borderColor: 'gray',
                                }}
                                cellStyleFocused={{
                                    borderColor: 'black',
                                }}
                                value={code}
                                onTextChange={code => setCode(code)}
                            />
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 30 }}>
                            <View style={styles.row}>
                                <Text style={{ color: Colors.text }}>{t('telVerificationcreen.nocode')}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 0 }}>
                            <View style={styles.row}>
                                <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                                    <Text style={styles.link}>{t('telVerificationcreen.resendcode')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 30 }}>
                            <Button
                                mode="contained"
                                onPress={() => { navigation.navigate('NewPassword') }}>
                                {t('passwordRecover.next')}
                            </Button>
                        </View>


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

});


export default VerificationScreen;
