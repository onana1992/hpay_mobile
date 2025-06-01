/* eslint-disable @typescript-eslint/no-shadow */



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
    ScrollView,
} from 'react-native';
/*import { Colors } from 'react-native/Libraries/NewAppScreen';*/
import { useTranslation } from 'react-i18next';
import TextInput from '../../components/TextInput';
import { Colors } from '../../themes';
import Button from '../../components/Button';
import { Dropdown } from 'react-native-element-dropdown';
import { getPaysRequest, getPaysRequest1, getVilleRequest } from '../../services/request';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    countryValidator,
    townValidator,
    addressValidator
} from '../../helpers/kycValidators';
import { COUNTRIES } from '../../assets/country/countries_fr';



const Step2 = ({ data, setData, step, setStep, }: { data: any, setData: any, step: any, setStep: any }) => {

  
    const [country, setCountry] = React.useState<any>({ label: '🇨🇦 Canada', value: 'ca', indicator: '1' });
    const [selectedCountry, setSelectedCountry] = React.useState(country);
    const [cities, setCities] = React.useState([]);
    const [countries, setCountries] = React.useState([]);
    const [city, setCity] = React.useState({ label: 'Montreal', value: 'Montreal' });
    const [address, setAddress] = React.useState({ value: '', error: '' });
    const [town, setTown] = React.useState({ value: '', id: 0, error: '' });
    const [telephone, setTelephone] = React.useState({ value: data.telephone, error: '' });
    const [telephone2, setTelephone2] = React.useState({ value: '', error: '' });
    const { t } = useTranslation();
    


    const data1 = [
        { label: t('kyc.passport'), value: '1' },
        { label: t('kyc.idcard'), value: '2' }
    ];


    const onBack = () => {
        setStep((PrevStep: number) => {
            return PrevStep - 1;
        })
    }

 

    React.useState(() => {

       const initCountry = COUNTRIES.find((item: { indicator: string; }) => item.indicator === data.pays.indicatif);
       setCountry(initCountry);


       getPaysRequest1().then((response: any) => {
           
            setCountries(response.data.response.data);
            const firstCountry = response.data.response.data.find((item: { indicatif: string; }) => item.indicatif === data.pays.indicatif);
            setSelectedCountry(firstCountry)
            fetchCities1(firstCountry.id);

       }).catch((error: any) => {

            if (error) {
               // console.log(error);
            }

       });

    }, []);


    const fetchCities = (idPays: number) => {
        getVilleRequest(idPays).then((response: any) => {


            const formattedCities = response.data.response.data.map(city => ({
                id: city.id,
                label: city.ville,
                value: city.ville
            }));

            setCities(formattedCities);

            //const choosenTown = formattedCities.find((item: { id: any; }) => item.id === data.ville.id);
            setCity(formattedCities[0]);

        }).catch((error: any) => {
            // console.log(error);
        });

    }

    const fetchCities1 = (idPays: number) => {
        getVilleRequest(idPays).then((response: any) => {


            const formattedCities = response.data.response.data.map(city => ({
                id: city.id,
                label: city.ville,
                value: city.ville
            }));

            setCities(formattedCities);

            const choosenTown = formattedCities.find((item: { id: any; }) => item.id === data.ville.id);
            setCity(choosenTown);

        }).catch((error: any) => {
            // console.log(error);
        });

    }


    const changeCountry = (item: any) => {
        setCountry(item);
        const choosecountry: any = countries.find((it: { indicatif: any; }) => it.indicatif === item.indicator);
        setSelectedCountry(choosecountry);
        fetchCities(choosecountry?.id);
    }




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



    const onValid = () => {

        const addressError = addressValidator(address.value);
        const countryError = countryValidator(country.value);
        const townError = townValidator(city);
       
        
        if (addressError || countryError || townError) {

          //  alert()
            setAddress({ ...address, error: t(`${addressError}`) });
            setCountry({ ...country, error: t(`${countryError}`) });
            setTown({ ...town, error: t(`${townError}`) });
            
            return;
        }


        /*console.log({
            ...data,
            pays: selectedCountry.id,
            ville: city.id,
            adresse: address.value,
            telephone2: telephone2.value
        });*/

        setData(
            {
                ...data,
                pays: selectedCountry.id,
                ville: city.id,
                adresse: address.value,
                telephone2: telephone2.value
            }
        );
        
           
         //setStep(3);

    }


    return (
        <ScrollView style={styles.main}>
            <KeyboardAvoidingView
                enabled={true}
               // behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
            >

                <View style={{
                    width: '100%',
                    backgroundColor: '#e6e4e0',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    borderRadius: 10,
                    height: 50,
                    paddingHorizontal: 10
                }}>
                    <View style={{alignItem:'center', justifyContent:'center'}}>
                        <Text style={{ fontSize: 16, color: Colors.text, fontWeight: 'bold' }}>2. {t('kyc.Addressdetails')} </Text>
                    </View>

                    <View style={{alignItem:'center', justifyContent:'center'}}>
                       <Ionicons name="checkmark-done-outline" size={20} color={step > 2 ? Colors.primary :'gray'}/>
                    </View>
                   

                </View>
                {
                    step === 2
                    &&
                    <View style={{ justifyContent: 'center', padding: 10 }}>
                        
                  

                    <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start', marginTop: 10}}>
                        
                        <View style={styles.inputTitle}>
                            <Text style={styles.inputTitleText}>{t('kyc.country')}*</Text>
                        </View>

                        <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                //searchPlaceholderTextColor='gray'
                                itemTextStyle={{ color: 'black' }}
                                iconStyle={styles.iconStyle}
                                data={COUNTRIES}
                                search
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="Selectionez un pays"
                                searchPlaceholder={t('rechercher')}
                                value={country}
                                onChange={(item) => {
                                    changeCountry(item)
                                }}
                         />
                    </View>


                    <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start', marginTop: 10}}>
                        <View style={styles.inputTitle}>
                            <Text style={styles.inputTitleText}>{t('kyc.town')}*</Text>
                        </View>

                        <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                               // searchPlaceholderTextColor='gray'
                                itemTextStyle={{ color: 'black' }}
                                iconStyle={styles.iconStyle}
                                data={cities}
                                search
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="Selectionez un pays"
                                searchPlaceholder={t('rechercher')}
                                value={city}
                                onChange={(item) => {
                                    setCity(item);
                                }}
                            />
                    </View>

                    <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start'}}>

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
                    </View>

                    <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start', marginTop: 10}}>
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
                    </View>


                    <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start', marginTop: 10}}>
                        <View style={styles.inputTitle}>
                            <Text style={styles.inputTitleText}>{t('kyc.telephone2')}</Text>
                        </View>
                        <TextInput
                            label={t('signinscreen.yourphone')}
                            returnKeyType="next"
                            value={telephone2.value}
                            inputMode='numeric'
                            onChangeText={(text: string) => setTelephone2({ value: text, error: '' })}
                            error={!!telephone2.error}
                            errorText={telephone2.error}
                            autoCapitalize="none"
                            autoCompleteType="tel"
                            description={undefined}
                        />
                    </View>


                   {/* <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start', marginTop: 10}}>
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
                    </View>*/}


                    <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start', marginTop: 20}}>
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

    iconStyle: {
        width: 20,
        height: 20,
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
        marginBottom: 15,
        fontSize: 14
    },

     placeholderStyle: {
        fontSize: 16,
        color: 'gray',
    },

    selectedTextStyle: {
        fontSize: 16,
        color: 'black',
    },


    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color: 'black',
    },

     iconImage: {
        height: 120,
        width: 120,
        overflow: 'hidden',
        marginBottom: 10,
    },

     dropdown: {
        width: '100%',
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
      
    },

});


export default Step2;

