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
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { Colors } from '../../themes';
import { RadioButton } from 'react-native-paper';
import NoConnectedHeader from '../../components/NoConnectedHeader';
import { useTranslation } from 'react-i18next';
import { firstNameValidator, familyNameValidator, dateNaissValidator } from '../../helpers/identifyValidators';
import DateInput from '../../components/DateInput';
import { PostIdentityRequest } from '../../services/request';
import LoadingModal from '../../components/LoadingModal';
import StepCompnent from '../../components/StepCompnent';
import { useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';



function IdentityScreen({ navigation}: {navigation:any}) {

    const route = useRoute<any>();
    const [modalVisible, setModalVisible] = React.useState(false);
    const [familyName, setFamilyName] = React.useState({ value: '', error: '' });
    const [firstName, setFirstName] = React.useState({ value: '', error: '' });
    const [sex, setSex] = React.useState({ value: 'M', error: '' });
    const [dateNaiss,setDateNaiss] = React.useState<{ value: Date | undefined, error: string }>({ value: undefined, error: '' });
    const { t } = useTranslation();
    const { phone, idclient } = route.params;



    function formatDate(val:any) {

        if (Number(val) > 9) {
            return val
        } else {
            return '0' + val;
        }
    }

    const onSubmitPressed = () => {

       // navigation.navigate('Email');
        
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
            setModalVisible(false);
            navigation.navigate('Email', { phone: phone, idclient: idclient })


        }).catch((error: any) => {
            console.log(error);
            setModalVisible(false);
        })


    }



    return (

        <KeyboardAvoidingView
            enabled={true}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.main}
        >
        

            <NoConnectedHeader navigation={navigation} />

            <ScrollView>

                <Pressable onPress={Keyboard.dismiss}>


                    <View style={styles.content}>

                        <StepCompnent step={4} />

                        <View style={styles.pageheader}>
                            <Text style={styles.title}>{t('identitycreen.title')}</Text>
                            <Text style={styles.subtitle}>
                                {t('identitycreen.titlemsg')}.
                            </Text>
                        </View>

                        <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start' }}>
                            <Text style={styles.inputTitleText}>{t('identitycreen.firstname')}*</Text>
                            <View style={{ flexDirection: 'row', width: '100%', }}>
                                <TextInput
                                    label={t('identitycreen.yourfirstname')}
                                    returnKeyType="next"
                                    value={firstName.value}
                                    onChangeText={(text: string) => setFirstName({ value: text, error: '' })}
                                    error={!!firstName.error}
                                    errorText={firstName.error}
                                    autoCapitalize="none"
                                    description={undefined}
                                />
                            </View>
                        </View>


                        <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start', marginTop: 20 }}>
                            <Text style={styles.inputTitleText} >{t('identitycreen.familyname')}*</Text>
                            <View style={{ flexDirection: 'row', width: '100%', }}>
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
                            </View>
                        </View>


                        <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start', marginTop: 20 }}>
                            <Text style={styles.inputTitleText}>{t('identitycreen.dateofbirth')}*</Text>
                            <View style={{ flexDirection: 'row'}}>
                                <DateInput
                                    label={t('identitycreen.dateofbirth')}
                                    value={dateNaiss.value}
                                    onChange={(d: Date | undefined) => setDateNaiss({ value: d, error: '' })}
                                    hasError={!!dateNaiss.error}
                                    errorText={dateNaiss.error}
                                />
                            </View>
                        </View>


                        <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start', marginTop: 20 }}>
                            <Text style={styles.inputTitleText}>{t('identitycreen.sex')}*</Text>
                            <View style={{ flexDirection: 'row', width:'100%' }}>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
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

                        </View>

                                          
                    </View>
                </Pressable>
                
            </ScrollView>
            <View style={{ width: '100%', marginTop: 20 }}>
                <Button
                    mode="contained"
                    onPress={() => { onSubmitPressed() }}
                >
                    {t('identitycreen.submit')}
                </Button>
            </View>
            <LoadingModal setModalVisible={setModalVisible} modalVisible={modalVisible} />

        </KeyboardAvoidingView>

        
    );
}

const styles = StyleSheet.create({

    main: {
        backgroundColor: '#ffff',
        padding: 20,
        flex:1,
    },

    content: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
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
        fontWeight: 'bold',
        marginBottom: 10,
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


export default IdentityScreen;
