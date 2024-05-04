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
    Pressable,
    Platform,
    Keyboard,
    ScrollView
} from 'react-native';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { Colors } from '../themes';
import { RadioButton } from 'react-native-paper';
import NoConnectedHeader from '../components/NoConnectedHeader';
import { useTranslation } from 'react-i18next';
import { firstNameValidator, familyNameValidator, dateNaissValidator } from '../helpers/identifyValidators';
import DateInput from '../components/DateInput';
import { PostIdentityRequest } from '../services/request';
import LoadingModal from '../components/LoadingModal';
//import Toast from 'react-native-toast-message';



function IdentityScreen({ navigation, route }: {navigation:any,route:any}) {

    const [modalVisible, setModalVisible] = React.useState(false);
    const [familyName, setFamilyName] = React.useState({ value: '', error: '' });
    const [firstName, setFirstName] = React.useState({ value: '', error: '' });
    const [sex, setSex] = React.useState({ value: 'M', error: '' });
    const [dateNaiss,setDateNaiss] = React.useState<{ value: Date | undefined, error: string }>({ value: undefined, error: '' });
    const { t } = useTranslation();

    const { phone, idclient } = route.params;

    console.log(phone);
    console.log(idclient);

    function formatDate(val:any) {

        if (Number(val) > 9) {
            return val
        } else {
            return '0' + val;
        }
    }

    const onSubmitPressed = () => {

        
        const firstNameError = firstNameValidator(firstName.value);
        const familyNameError = familyNameValidator(familyName.value);
        const dateNaissError = dateNaissValidator(dateNaiss.value);

        if (firstNameError || familyNameError || dateNaissError) {
            setFamilyName({ ...familyName, error: t(`${familyNameError}`) })
            setFirstName({ ...firstName, error: t(`${firstNameError}`) })
            setDateNaiss({ ...dateNaiss, error: t(`${dateNaissError}`) })
            return
        }


        const dataNaissString = dateNaiss.value?.getFullYear() + '-' + formatDate(dateNaiss.value?.getMonth()) + '-' + formatDate(dateNaiss.value?.getDate());
   
        setModalVisible(true);

        PostIdentityRequest(idclient, familyName.value, firstName.value, sex.value, dataNaissString ).then((response: any) => {

            console.log(response.data);

            if (response.data.success === true) {

                setModalVisible(false); 
                navigation.navigate('Email', { phone: phone, idclient: idclient });


            } else {

                console.log('echec');
                setModalVisible(false);

                /*Toast.show({
                    type: 'error',
                    text1: t('signinscreen.connexionfailure'),
                    text2: t('signinscreen.loginorpasswordinvalid'),
                    position: 'top'
                });*/

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
               // behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
            >

                <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>

                    <NoConnectedHeader navigation={navigation} />

                    <View style={styles.content}>
                        <Logo />
                        <Header>{t('identitycreen.title')}</Header>

                        <Paragraph>
                            {t('identitycreen.titlemsg')}
                        </Paragraph>

                        <View style={styles.inputTitle}>
                            <Text style={styles.inputTitleText}>{t('identitycreen.firstname')}</Text>
                        </View>

                        <TextInput
                            label={t('identitycreen.yourfirstname')}
                            returnKeyType="next"
                            value={firstName.value}
                            onChangeText={(text: string) => setFirstName({ value: text, error: '' })}
                            error={!!firstName.error}
                            errorText={firstName.error}
                            autoCapitalize="none"
                            autoCompleteType="tel"
                            description={undefined}
                        />

                        <View style={styles.inputTitle}>
                            <Text style={styles.inputTitleText} >{t('identitycreen.familyname')}*</Text>
                        </View>
                        <TextInput
                            label={t('identitycreen.yourfamilyname')}
                            returnKeyType="next"
                            value={familyName.value}
                            onChangeText={(text: string) => setFamilyName({ value: text, error: '' })}
                            error={!!familyName.error}
                            errorText={familyName.error}
                            autoCapitalize="none"
                            description={undefined}
                        />


                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10 }}>
                            <Text style={styles.inputTitleText}>{t('identitycreen.sex')}*</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems:'center' }}>
                                <View>
                                    <RadioButton
                                        value="first"
                                        status={sex.value === 'M' ? 'checked' : 'unchecked'}
                                        onPress={() => setSex({ value: 'M', error: '' })}
                                        color={Colors.primary}
                                    />
                                </View>

                                <View>
                                    <Text style={{ color: Colors.text }}>{t('identitycreen.male')}</Text>
                                </View>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <View>
                                    <RadioButton
                                        value="second"
                                        status={sex.value === 'F' ? 'checked' : 'unchecked'}
                                        onPress={() => setSex({ value: 'F', error: '' })}
                                        color={Colors.primary}
                                    />
                                </View>

                                <View>
                                    <Text style={{ color: Colors.text }} >{t('identitycreen.female')}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.inputTitle}>
                            <Text style={styles.inputTitleText}>{t('identitycreen.dateofbirth')}*</Text>
                        </View>


                        <View style={{ flexDirection: 'row', marginVertical: 12, }}>
                            <DateInput
                                label={t('identitycreen.dateofbirth')}
                                value={dateNaiss.value}
                                onChange={(d: Date | undefined) => setDateNaiss({ value: d, error: '' })}
                                hasError={!!dateNaiss.error}
                                errorText={dateNaiss.error}
                            />
                            
                        </View>

                        <View style={{ width: '100%', marginTop:20 }}>
                            <Button
                                mode="contained"
                                onPress={() => { onSubmitPressed() }}
                            >
                                {t('identitycreen.submit')}
                            </Button>
                        </View>
                        
                        

                    </View>
                </Pressable>
                <LoadingModal setModalVisible={setModalVisible} modalVisible={modalVisible} />
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

    row: {
        flexDirection: 'row',
        marginTop: 4,
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


export default IdentityScreen;
