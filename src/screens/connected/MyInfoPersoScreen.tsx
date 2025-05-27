/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable curly */
/* eslint-disable no-alert */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable react-native/no-inline-styles */

import * as React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    ScrollView,
    Dimensions
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../themes';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-native-element-dropdown';
import { COUNTRIES } from '../../assets/country/countries_fr';
import TextInput from '../../components/TextInput';
import DateInput from '../../components/DateInput';

function MyInfoPersoScreen({ navigation }: { navigation: any }) {

    const { t } = useTranslation();
    const [visible, setVisible] = React.useState(false);
    const user = useSelector((state: any) => state.profil.user);
    const [selectedCountry, setSelectedCountry] = React.useState<any>(null);
    const { height } = Dimensions.get('window');
    const [country, setCountry] = React.useState({ label: '🇨🇦 Canada', value: 'ca', indicator: "1" });
    const [countries, setCountries] = React.useState([]);
    const [familyName, setFamilyName] = React.useState({ value: user.client.nom, error: '' });
    const [firstName, setFirstName] = React.useState({ value: user.client.prenoms, error: '' });
    const [dateNaiss, setDateNaiss] = React.useState<{ value: Date | undefined, error: string }>({ value: new Date(user.client.dateNaissance), error: '' });


    const changeCountry = (item: any) => {
        setCountry(item);
        const choosecountry: any = countries.find((it: { indicatif: any; }) => it.indicatif === item.indicator);
        setSelectedCountry(choosecountry);
    };


    React.useEffect(() => {
        const userCountry: any = COUNTRIES.find((it: { indicator: any; }) => it.indicator === user.client.pays.indicatif);
        setCountry(userCountry);
    }, []);



    return (
        <View style={styles.main}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }} >
                <TouchableOpacity style={{
                    justifyContent: 'center',
                    backgroundColor: '#e6e4e0',
                    height: 40,
                    width: 40,
                    alignItems: 'center',
                    borderRadius: 20,
                }} onPress={() => { navigation.goBack() }} >
                    <View>
                        <Ionicons name="chevron-back" color={Colors.text} size={24} />
                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView>

                <View style={{}}>
                    <Text style={styles.title}>Mes informations personnelles</Text>
                </View>


                <View style={{ marginTop:20 }}>
                    <View style={{ alignContent: 'flex-end', justifyContent: 'flex-end', }}>
                        <Text style={styles.inputTitleText}>{t('countryScreen.country')}*</Text>
                        <View style={{ flexDirection: 'row', width: '100%',}}>
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                itemTextStyle={{ color: 'black' }}
                                iconStyle={styles.iconStyle}
                                data={COUNTRIES}
                                search
                                disable={true}
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
                </View>


                <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start', marginTop: 20 }}>
                    <Text style={styles.inputTitleText}>{t('identitycreen.firstname')}*</Text>
                    <View style={{ flexDirection: 'row', width: '100%', }}>
                        <TextInput
                            //label={t('identitycreen.yourfirstname')}
                            returnKeyType="next"
                            value={firstName.value}
                            onChangeText={(text: string) => setFirstName({ value: text, error: '' })}
                            autoCapitalize="none"
                            description={undefined}
                            disabled={true}
                        />
                    </View>
                </View>


                <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start', marginTop: 20 }}>
                    <Text style={styles.inputTitleText} >{t('identitycreen.familyname')}*</Text>
                    <View style={{ flexDirection: 'row', width: '100%', }}>
                        <TextInput
                            //label={t('identitycreen.yourfamilyname')}
                            returnKeyType="next"
                            value={familyName.value}
                            onChangeText={(text: string) => setFamilyName({ value: text, error: '' })}
                            autoCapitalize="none"
                            description={undefined}
                            disabled={true}
                        />
                    </View>
                </View>


                <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start', marginTop: 20 }}>
                    <Text style={styles.inputTitleText}>{t('identitycreen.dateofbirth')}*</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <DateInput
                            //label={t('identitycreen.dateofbirth')}
                            value={dateNaiss.value}
                            onChange={(d: Date | undefined) => setDateNaiss({ value: d, error: '' })}
                            disabled={true}
                        />
                    </View>
                </View>

            </ScrollView>

        </View>
    );

}

const styles = StyleSheet.create({

    main: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
        paddingBottom: 0,
        paddingVertical: 10,
    },

    title: {
        color: Colors.text,
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'left',
        paddingVertical: 5,
        marginTop: 10,
    },

    emptycard: {
        marginTop: 20,
        backgroundColor: '#e6e4e0',
        padding: 20,
        borderRadius: 10,
        height: 160,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
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
        marginTop: 0,
    },

    inputTitleText: {
        textAlign: 'left',
        color: Colors.text,
        fontWeight: 'bold',
        marginBottom: 10,
    },


});


export default MyInfoPersoScreen;
