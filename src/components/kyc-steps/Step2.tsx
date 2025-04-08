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
import { getPaysRequest } from '../../services/request';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    emailValidator,
    countryValidator,
    townValidator,
    addressValidator
} from '../../helpers/kycValidators';



const Step2 = ({ data, setData, step, setStep, }: { data: any, setData: any, step: any, setStep: any }) => {


  
    const [country, setCountry] = React.useState({ label: '🇨🇦 Canada', value: 'ca', indicator: "1" });
    const [selectedCountry, setSelectedCountry] = React.useState(null);
    const [cities, setCities] = React.useState([]);
    const [countries, setCountries] = React.useState([]);
    const [city, setCity] = React.useState({ label: 'Montreal', value: 'Montreal' });
    const [address, setAddress] = React.useState({ value: '', error: '' });
    const [town, setTown] = React.useState({ value: '', id: 0, error: '' });
    const [telephone, setTelephone] = React.useState({ value: data.telephone, error: '' });
    const [telephone2, setTelephone2] = React.useState({ value: '', error: '' });
    const [email, setEmail,] = React.useState({ value: '', error: '' });
    const { t } = useTranslation();
    const [townData, setTownData] = React.useState<any>([]);
    const COUNTRIES = [
        { label: '🇨🇦 Canada', value: 'ca', indicator: "1" },
        { label: '🇨🇲 Cameroun', value: 'cm', indicator: '237' },
        { label: "🇨🇮 Cote d'ivoire", value: 'ci', indicator: "225" },
        { label: "🇭🇹 Haiti", value: 'ht', indicator: "509" },
        { label: "🇹🇬 Togo", value: 'tg', indicator: "228" },
        { label: '🇸🇳 Senegal', value: 'sn', indicator: '221' },
        { label: '🇨🇭 Suisse', value: 'ch', indicator: '41' },
        { label: '🇬🇲 Gambie', value: 'gm', indicator: '220' },
        { label: '🇲🇱 Mali', value: 'ml', indicator: '223' },
        { label: '🇧🇯 Benin', value: 'bj', indicator: '229' },
        { label: '🇬🇦 Gabon', value: 'ga', indicator: '241' },
        { label: '🇺🇸 États-Unis', value: 'us', indicator: '1' },
        { label: '🇨🇩 Congo RD', value: 'cd', indicator: '243' },
        { label: '🇩🇴 République Dominicaine', value: 'do', indicator: '1' },
        { label: '🇬🇹 Guatemala', value: 'gt', indicator: '502' },
        { label: '🇨🇬 République du Congo', value: 'cg', indicator: '242' },
        { label: '🇫🇷 France', value: 'fr', indicator: '33' },
        { label: '🇧🇪 Belgique', value: 'be', indicator: '32' },
        { label: '🇳🇬 Nigeria', value: 'ng', indicator: '234' },
        { label: '🇨🇱 Chili', value: 'cl', indicator: '56' },
        { label: '🇨🇴 Colombie', value: 'co', indicator: '57' },
        { label: '🇱🇧 Liban', value: 'lb', indicator: '961' },
        { label: '🇵🇪 Panama', value: 'pa', indicator: '507' },
        { label: '🇹🇼 Taïwan', value: 'tw', indicator: '886' }
    ];


    const data1 = [
        { label: t('kyc.passport'), value: '1' },
        { label: t('kyc.idcard'), value: '2' }
    ];


    const onBack = () => {
        setStep((PrevStep: number) => {
            return PrevStep - 1;
        })
    }

    const getPays = () =>{
        
         getPaysRequest().then((response: any) => {
            
            setCountries(response.data);
            const firstCountry = response.data.find(item => item.id === 9);
            setSelectedCountry(firstCountry);
          

            const formattedCities = firstCountry.villes.map(city => ({
                id: city.id,
                label: city.ville,
                value: city.ville
            }));

            setCities(formattedCities);
            setCity(formattedCities[0]);


        }).catch((error: any) => {

            if (error){
                console.log(error);
            }

        });
    
    }



    React.useState(() => {
        
        getPays();

    },[]);




   const changeCountry = (item) => {
       
       const choosecountry = countries.find((it: { indicatif: any; })=> it.indicatif === item.indicator);
       setSelectedCountry(choosecountry);
       const formattedCities = choosecountry.villes.map((city: { ville: any; }) => ({
            id: city.id,
            label: city.ville,
            value: city.ville
       }));

        setCities(formattedCities)
        setCity(formattedCities[0]);
    }



   /* React.useEffect(() => {

        let tab: any = [];
        countries.forEach((country, index) => {
            tab.push({ label: country.pays, id: country.idpays, value: country.pays });
        });
        setCountryData(tab);

       // console.log(tab);

    }, []);*/

    

    /*const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    Dropdown label
                </Text>
            );
        }
        return null;
    };*/



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
            email: email.value,
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

                    <View style={{alignItem:"center", justifyContent:'center'}}>
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

