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
    ScrollView
} from 'react-native';
import Button from '../../components/Button';
import { Colors } from '../../themes';
import { useTranslation } from 'react-i18next';
import NoConnectedHeader from '../../components/NoConnectedHeader';
import LoadingModal from '../../components/LoadingModal';
import StepCompnent from '../../components/StepCompnent';
import { Dropdown } from 'react-native-element-dropdown';
import { getPaysRequest } from '../../services/request';



function CountryScreen({ navigation }: {navigation:any}) {


   
    const { t } = useTranslation();
    const [modalVisible, setModalVisible] = React.useState(false);
    const [country, setCountry] = React.useState({ label: '🇨🇦 Canada', value: 'ca', indicator: "1" });
    const [selectedCountry, setSelectedCountry] = React.useState<any>(null);
    const [cities, setCities] = React.useState([]);
    const [countries, setCountries] = React.useState([]);
    const [city, setCity] = React.useState({id:1, label: 'Montreal', value: 'Montreal' });
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

   

    React.useState(() => {
        
        getPaysRequest().then((response: any) => {

            console.log(response.data);

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

           // console.log(error)
            /* if (error.response.data.statusCode) {
 
                 setModalVisible(false);
                 Toast.show({
                     type: 'error',
                     text1: t('passwordRecover.failure'),
                     text2: t('passwordRecover.noaccoundfound'),
                     position: 'top'
                 });
 
             }*/

        });

    },[]);




    const next = () => {
        if (city){
             navigation.navigate('SignUp',{ country: selectedCountry, city: city });
        }
    }

    const changeCountry = (item:any) => {


        setCountry(item);
        const choosecountry = countries.find((it: { indicatif: any; }) => it.indicatif === item.indicator);
        setSelectedCountry(choosecountry);

        const formattedCities = choosecountry.villes.map((city: { ville: any; }) => ({
            id: city.id,
            label: city.ville,
            value: city.ville
        }));

        setCities(formattedCities)
        setCity(formattedCities[0]);

    }

  
     
    return (
   
        <View
            style={styles.main}
        >
            <NoConnectedHeader navigation={navigation} />
            <ScrollView  >
                <StepCompnent step={1} />

                <View style={{ alignItems:'flex-start' }}>
                           
                    <View style={styles.pageheader}>
                        <Text style={styles.title}>{t('countryScreen.title')}</Text>
                        <Text style={styles.subtitle}>
                            {t('countryScreen.titlemsg')}
                        </Text>
                    </View>

                    <View style={{  alignContent: 'flex-end', justifyContent: 'flex-end',}}>
                         <Text style={styles.inputTitleText}>{t('countryScreen.country')}*</Text>
                          <View style={{ flexDirection: 'row', width: '100%',  }}>
                          <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
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
                    </View>


                    <View style={{ alignContent: 'flex-end', justifyContent: 'flex-end', marginTop: 20, marginBottom:10 }}>
                         <Text style={styles.inputTitleText}>{t('countryScreen.city')}*</Text>
                         <View style={{ flexDirection: 'row', width: '100%'  }}>
                          <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
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
                    </View>

                </View>


            </ScrollView>
            <View style={{ marginTop: 10, width: '100%', justifyContent:'flex-end' }}>
                    <Button
                        mode="contained"
                        onPress={() => { next() }}>
                        {t('countryScreen.next')}
                    </Button>

                </View>
            <LoadingModal setModalVisible={setModalVisible} modalVisible={modalVisible} />
        </View>       
    );
}

const styles = StyleSheet.create({

    main: {
        backgroundColor: '#ffff',
        flex: 1,
        padding: 20,
    },

    content: {
        flex:1,
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


     inputTitleText: {
        textAlign: 'left',
        color: Colors.text,
        fontWeight: 'bold',
         marginBottom: 10,
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


    placeholderStyle: {
        fontSize: 16,
        color: 'gray',
    },


    selectedTextStyle: {
        fontSize: 16,
        color: 'black',
    },

    iconStyle: {
        width: 20,
        height: 20,
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
        marginTop: 10,
    },

});




export default CountryScreen;


