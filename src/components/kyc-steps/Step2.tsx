/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
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
import DropdownInput from '../../components/DropdownInput'
import { DatePickerInput } from 'react-native-paper-dates';
import { PaperSelect } from 'react-native-paper-select';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
    emailValidator,
    countryValidator,
    townValidator,
    addressValidator
} from '../../helpers/kycValidators';



const Step2 = ({ data, setData, step, setStep, countries }: { data: any, setData: any, step: any, setStep: any, countries: any }) => {

   
    
    const [address, setAddress] = React.useState({ value: '', error: '' });
    const [country, setCountry] = React.useState({ value: '', id:0, error: '' });
    const [town, setTown] = React.useState({ value: '', id: 0, error: '' });
    const [telephone, setTelephone] = React.useState({ value: data.telephone, error: '' });
    const [telephone2, setTelephone2] = React.useState({ value: '', error: '' });
    const [email, setEmail,] = React.useState({ value: '', error: '' });
    const { t } = useTranslation();
    const [value, setValue] = React.useState(null);
    const [isFocus, setIsFocus] = React.useState(false);
    const [countryData, setCountryData] = React.useState<any>([]);
    const [townData, setTownData] = React.useState<any>([]);


    const data1 = [
        { label: t('kyc.passport'), value: '1' },
        { label: t('kyc.idcard'), value: '2' }
    ];

    const onBack = () => {
        setStep((PrevStep: number) => {
            return PrevStep - 1;
        })
    }

    React.useEffect(() => {

        let tab: any = [];
        countries.forEach((country, index) => {
            tab.push({ label: country.pays, id: country.idpays, value: country.pays });
        });
        setCountryData(tab);

       // console.log(tab);

    }, []);

    

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    Dropdown label
                </Text>
            );
        }
        return null;
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


    const selectCountry = (pays: any) => {

        console.log(pays);

        setCountry({ value: pays.value, id: pays.id, error: '' });

        let seletedCountry = countries.find((item) => {
            return (item.pays === pays.value);
        })

        console.log(seletedCountry);

        let tab: any = [];
        seletedCountry.ville.forEach((item: {idville: any; ville: any;}, index: any) => {
            tab.push({ label: item.ville, id: item.idville, value: item.ville });
        });

        setTownData(tab);

    }



    const onValid = () => {

        const addressError = addressValidator(address.value);
        const countryError = countryValidator(country.value);
        const townError = townValidator(town.value);
        const emailError = emailValidator(email.value);
        
        if (addressError || countryError || emailError) {

            setAddress({ ...address, error: t(`${addressError}`) });
            setCountry({ ...country, error: t(`${countryError}`) });
            setTown({ ...town, error: t(`${townError}`) });
            setEmail({ ...email, error: t(`${emailError}`) });
            return;
        }


        setData(
            {
                ...data,
                email: email.value,
                pays: country.id,
                ville: town.id,
                adresse: address.value,
                telephone2: telephone2.value
            }
        );

        setStep(3);

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

                    <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>2. {t('kyc.Addressdetails')} </Text>

                </View>
                {
                    step === 2
                    &&
                    <View style={{ justifyContent: 'center', padding: 10 }}>

                        <View style={styles.inputTitle}>
                            <Text style={styles.inputTitleText}>{t('kyc.address')}*</Text>
                        </View>

                        <TextInput
                            label={t('kyc.youraddress')}
                            returnKeyType="next"
                            value={address.value}
                            onChangeText={(text: string) => setAddress({ value: text, error: '' })}
                            error={!!address.error}
                            errorText={address.error}
                            autoCapitalize="none"
                            description={undefined}
                        />


                        <View style={styles.inputTitle}>
                            <Text style={styles.inputTitleText}>{t('kyc.country')}*</Text>
                        </View>

                        <DropdownInput
                            placeholder={t('kyc.chooseacountry')}
                            data={countryData}
                            value={value}
                            onChange={(text: string) => selectCountry(text)}
                            search={false}
                            error={!!country.error}
                            errorText={country.error}
                        />


                        <View style={styles.inputTitle}>
                            <Text style={styles.inputTitleText}>{t('kyc.town')}*</Text>
                        </View>

                        <DropdownInput
                            placeholder={t('kyc.chooseatown')}
                            data={townData}
                            value={country}
                            onChange={(val: any) => setTown({ value: val.value,id:val.id, error: '' })}
                            //search={true}
                            error={!!town.error}
                            errorText={town.error}
                        />



                        <View style={styles.inputTitle}>
                            <Text style={styles.inputTitleText}>{t('signinscreen.phone')}*</Text>
                        </View>
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
                            disabled={true}
                        />


                        <View style={styles.inputTitle}>
                            <Text style={styles.inputTitleText}>{t('kyc.telephone2')}</Text>
                        </View>
                        <TextInput
                            label={t('signinscreen.yourphone')}
                            returnKeyType="next"
                            value={telephone2.value}
                            onChangeText={(text: string) => setTelephone2({ value: text, error: '' })}
                            error={!!telephone2.error}
                            errorText={telephone2.error}
                            autoCapitalize="none"
                            autoCompleteType="tel"
                            description={undefined}
                        />


                        <View style={styles.inputTitle}>
                            <Text style={styles.inputTitleText}>{t('kyc.email')}*</Text>
                        </View>
                        <TextInput
                            label={t('identitycreen.youremail')}
                            returnKeyType="next"
                            value={email.value}
                            onChangeText={(text: string) => setEmail({ value: text, error: '' })}
                            error={!!email.error}
                            errorText={email.error}
                            autoCapitalize="none"
                            textContentType="emailAddress"
                            description={undefined}
                        />

                        <View style={{ flexDirection: 'row', flex: 1 }}>

                            <View style={{ flex: 1, padding: 5 }}>
                                <Button
                                    mode="outlined"
                                    onPress={() => { onBack() }}>
                                    {t('kyc.previous')}
                                </Button>
                            </View>

                            <View style={{ flex: 1, padding: 5 }}>
                                <Button
                                    mode="contained"
                                    onPress={() => { onValid() }}>
                                    {t('kyc.next')}
                                </Button>
                            </View>

                        </View>


                    </View>

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
    },

    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginTop:20
    },

    icon: {
        marginRight: 5,
    },

    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },

    placeholderStyle: {
        fontSize: 16,
    },

    selectedTextStyle: {
        fontSize: 16,
    },

    iconStyle: {
        width: 20,
        height: 20,
    },

    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },

});


export default Step2;

