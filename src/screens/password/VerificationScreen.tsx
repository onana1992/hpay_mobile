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

} from 'react-native';

import Button from '../../components/Button';
import { Colors } from '../../themes'
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import NoConnectedHeader from '../../components/NoConnectedHeader';
import { useTranslation } from 'react-i18next';
import StepCompnent from '../../components/StepCompnent';
import StepRecover from '../../components/StepRecover';

function VerificationScreen({ navigation }: { navigation: any }) {

    const [code, setCode] = React.useState('');
    const { t } = useTranslation();

    return (

        <KeyboardAvoidingView
            enabled={true}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.main}
        >
            <NoConnectedHeader navigation={navigation} />
            <Pressable style={styles.content} onPress={Keyboard.dismiss}>

                <StepRecover step={2}/>

                <View style={{ flex: 3, alignItems: 'flex-start' }}>
                    

                    <View style={styles.pageheader}>
                        <Text style={styles.title}>{t('telVerificationcreen.title')}</Text>
                        <Text style={styles.subtitle}>
                            {t('telVerificationcreen.titlemsg')}
                        </Text>
                    </View>


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
                </View>


                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <View style={{ flexDirection: 'row', marginTop: 30 }}>
                        <Button
                           mode="contained"
                          onPress = {() => {navigation.navigate('NewPassword')}} 
                            //disabled={code.length == 4 ? false : true}
                        >
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
        width: "100%",
    },

    content: {
        flex: 1,
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
    }

});


export default VerificationScreen;
