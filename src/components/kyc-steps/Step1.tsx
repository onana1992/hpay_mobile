/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
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
    ScrollView,
} from 'react-native';
/*import { Colors } from 'react-native/Libraries/NewAppScreen';*/
import { useTranslation } from 'react-i18next';
import TextInput from '../../components/TextInput';
import { RadioButton } from 'react-native-paper';
import { Colors } from '../../themes';
import Button from '../../components/Button';
import { DatePickerInput } from 'react-native-paper-dates';
import { PaperSelect } from 'react-native-paper-select';
import {
         firstNameValidator,
         familyNameValidator,
         dateNaissValidator,
         nationalityValidator,
} from '../../helpers/kycValidators';
import DateInput from '../../components/DateInput';




const Step1 = ({ data, setData, step, setStep }: { data:any, setData:any, step:any, setStep:any } )=> {

    const [familyname, setFamilyName] = React.useState({ value: data.nom, error: '' });
    const [firstName, setFirstName] = React.useState({ value: data.prenoms, error: '' });
    const [sex, setSex] = React.useState({ value: data.sexe, error: '' });
    const [statut_mat, setstatut_mat] = React.useState({ value: data.statut_mat, error: '' });
    var date = new Date(data.date_naissance);
  
    const [date_naissance, setDate_naissance] = React.useState<{ value: Date | undefined, error: string }>({ value: data.date_naissance, error: '' });
    const [nationnality, setNationnality] = React.useState({ value: '', error: '' });
    const { t } = useTranslation();

    const onBack = () => {
        setStep((PrevStep: number) => {
            return PrevStep - 1;
        })
    };



    const [gender, setGender] = React.useState({
        value: '',
        list: [
            { _id: '1', value: t('identitycreen.single') },
            { _id: '2', value: t('identitycreen.married') },
            { _id: '3', value: t('identitycreen.divorce') },
        ],
        selectedList: [],
        error: '',
    });


    function formatDate(val: any) {
        if (Number(val) > 9) {
            return val
        } else {
            return '0' + val;
        }
    }



    const onValid = () => {

        const familyNameError  = firstNameValidator(familyname.value);
        const firstNameError = familyNameValidator(firstName.value);
        const dateNaissError = dateNaissValidator(date_naissance.value);
        const nationalityError = nationalityValidator(nationnality.value);

        console.log(dateNaissError);

        if (firstNameError || familyNameError  || nationalityError ) {
            setFamilyName({ ...familyname, error: t(`${firstNameError}`) });
            setFirstName({ ...firstName, error: t(`${firstNameError}`) });
            setDate_naissance({ ...date_naissance, error: t(`${dateNaissError}`) });
            setNationnality({ ...nationnality, error: t(`${nationalityError}`) })
            return
        }

        const dataNaissString = date_naissance.value?.getFullYear() + '-' + formatDate(date_naissance.value?.getMonth()) + '-' + formatDate(date_naissance.value?.getDate());


        setData(
            {
                ...data,
                nom: familyname.value,
                prenoms: firstName.value, //user.prenoms,
                sexe: sex.value,// user.sexe,
                statut_mat: statut_mat.value, // user.date_naissance,
                date_naissance: dataNaissString, // user.date_naissance,
                nationalite: nationnality.value,// user.date_naissance,
            }

        );

        console.log(data);
        setStep(2);
    }

   


    return (
        <ScrollView style={styles.main}>
            <KeyboardAvoidingView
                enabled={true}
               // behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
            >

                <View style={{
                    width: '100%',
                    justifyContent: 'center',
                    backgroundColor: 'black',
                    borderTopRightRadius: 5,
                    borderTopLeftRadius: 5,
                    height: 50,
                    alignItems: 'flex-start',
                    paddingLeft: 10
                }}>

                    <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>1. {t('kyc.identitydetails') }</Text>

                </View>
                {
                    step === 1 &&
                    <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>

                        <View style={{ justifyContent: 'center', padding: 10 }}>

                            <View style={styles.inputTitle}>
                                <Text style={styles.inputTitleText}>{t('identitycreen.firstname')}*</Text>
                            </View>

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


                            <View style={styles.inputTitle}>
                                <Text style={styles.inputTitleText} >{t('identitycreen.familyname')}</Text>
                            </View>
                            <TextInput
                                label={t('identitycreen.familyname')}
                                returnKeyType="next"
                                value={familyname.value}
                                onChangeText={(text: string) => setFamilyName({ value: text, error: '' })}
                                error={!!familyname.error}
                                errorText={familyname.error}
                                autoCapitalize="none"
                                description={undefined}
                            />


                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10 }}>
                                <Text style={styles.inputTitleText}>{t('identitycreen.sex')}*</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
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

                            <View style={styles.inputTitle}>
                                <Text style={styles.inputTitleText}>{t('identitycreen.statut')}*</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                    <View>
                                        <RadioButton
                                            value="bachelor"
                                            status={statut_mat.value === 'C' ? 'checked' : 'unchecked'}
                                            onPress={() => setstatut_mat({ value: 'C', error: '' })}
                                            color={Colors.primary}
                                        />
                                    </View>

                                    <View>
                                        <Text style={{ color: Colors.text }}>{t('identitycreen.single')}</Text>
                                    </View>
                                </View>

                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                    <View>
                                        <RadioButton
                                            value="married"
                                            status={statut_mat.value === 'M' ? 'checked' : 'unchecked'}
                                            onPress={() => setstatut_mat({ value: 'M', error: '' })}
                                            color={Colors.primary}
                                        />
                                    </View>

                                    <View>
                                        <Text style={{ color: Colors.text }} >{t('identitycreen.married')}</Text>
                                    </View>
                                </View>

                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                    <View>
                                        <RadioButton
                                            value="devorce"
                                            status={statut_mat.value === 'D' ? 'checked' : 'unchecked'}
                                            onPress={() => setstatut_mat({ value: 'D', error: '' })}
                                            color={Colors.primary}
                                        />
                                    </View>

                                    <View>
                                        <Text style={{ color: Colors.text }} >{t('identitycreen.divorce')}</Text>
                                    </View>
                                </View>

                            </View>



                            <View style={styles.inputTitle}>
                                <Text style={styles.inputTitleText}>{t('identitycreen.dateofbirth')}*</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginVertical: 12, }}>
                                <DateInput
                                    label={t('identitycreen.dateofbirth')}
                                    value={date_naissance.value}
                                    onChange={(d: Date | undefined) => setDate_naissance({ value: d, error: '' })}
                                    hasError={!!date_naissance.error}
                                    errorText={date_naissance.error}
                                />
                            </View>


                            {/*<View style={styles.inputTitle}>
                            <Text style={styles.inputTitleText}>{t('identitycreen.placeofbirth')}*</Text>
                            </View>

                            <TextInput
                                label={t('identitycreen.yourplaceofbirth')}
                                returnKeyType="next"
                                value={birthPlace.value}
                                onChangeText={(text: string) => setBirthPlace({ value: text, error: '' })}
                                error={!!birthPlace.error}
                                errorText={birthPlace.error}
                                autoCapitalize="none"
                                description={undefined}
                            />*/}



                            <View style={styles.inputTitle}>
                                <Text style={styles.inputTitleText}>{t('identitycreen.yourNationality')}*</Text>
                            </View>

                            <TextInput
                                label={t('identitycreen.yourNationality')}
                                returnKeyType="next"
                                value={nationnality.value}
                                onChangeText={(text: string) => setNationnality({ value: text, error: '' })}
                                error={!!nationnality.error}
                                errorText={nationnality.error}
                                autoCapitalize="none"
                                description={undefined}
                            />

                            <View style={{ flexDirection: 'row', flex: 1 }}>

                                <View style={{ flex: 1, padding: 5 }}>
                                    <Button
                                        mode="contained"
                                        onPress={() => { onValid() }}>
                                        {t('kyc.next')}
                                    </Button>
                                </View>

                            </View>

                        </View>


                    </Pressable>
                }
               
            </KeyboardAvoidingView>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    main: {
        backgroundColor: '#ffff',
        flex: 1,
        marginTop: 20,
        borderRadius: 5,
        marginBottom: 0,
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


export default Step1;

