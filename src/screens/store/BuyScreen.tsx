/* eslint-disable react-hooks/exhaustive-deps */
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
    ScrollView,
    TouchableOpacity,
    Alert
} from 'react-native';
import { Colors } from '../../themes';
import { useTranslation } from 'react-i18next';
import LoadingModal from '../../components/LoadingModal';
import { Dropdown } from 'react-native-element-dropdown';
import { currencyRateRequest, getSochitelCountry, getSochitelOperator, getSochitelService } from '../../services/request';
import { useSelector } from 'react-redux';
import { TextInput as Input } from 'react-native-paper';
import AmountCurrencyInput2 from '../../components/transaction/AmountCurrencyInput2';
import TextInput2 from '../../components/TextInput2';
import Ionicons from 'react-native-vector-icons/Ionicons';


function BuyScreen({ navigation }: { navigation: any }) {


    //https://api.hpaytest.cash/
    //https://wt2.westsofts.com/

    const { t } = useTranslation();
    const [modalVisible, setModalVisible] = React.useState(false);
    const [country, setCountry] = React.useState(null);
    const [operator, setOperator] = React.useState(null);
    const [service, setService] = React.useState(null);
    const [operators, setOperators] = React.useState([]);
    const [countries, setCountries] = React.useState([]);
    const [services, setServices] = React.useState([]);
    const [amount, setAmount] = React.useState<string>('0.00');
    const [samount, setSamount] = React.useState<string>('0.00');
    const accounts = useSelector((state: any) => state.profil.accounts);
    const [account, setAccount] = React.useState<any>(accounts[0]);
    const [telephone, setTelephone] = React.useState<string>('');
    const [fixedAmount, setFixedAmount] = React.useState<boolean>(false);
    const [rate, setRate] = React.useState<{ hpayRate: string, realRate: string }>({ hpayRate: '1', realRate: '1' });
    const [idRequired, setIdRequired] = React.useState<boolean>(false);

    const servicesWithId = [
        'Mobile Top Up',
        'Mobile Data',
        'Mobile PIN',
        'eSim',
        'Utilities > Electricity',
        'Uncategorized'
    ];

    const verifyIdRequired = (serviceName:string) => {

        if (servicesWithId.includes(serviceName)) {
            console.log(true);
            return true;
        } else {
            console.log(false);
            return false
        }
    }




    const cancel = () => {
        Alert.alert('', t('transaction.doyoureallywanttocancelthistransaction'), [
            {
                text: t('no'),
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: t('yes'), onPress: () => confirmCancel() },
        ]);
    };



    const confirmCancel = () => {
        navigation.goBack();
    };


    const isFormValidate = () => {

        if (idRequired === true) {
            return service != null &&
                operator != null &&
                country != null &&
                telephone.length > 0 &&
                Number(amount) > 0 &&
                (telephone + country?.country_prefixes).length >= Number(country?.msisdn_length_min) &&
                (telephone + country?.country_prefixes).length <= Number(country?.msisdn_length_max);
        } else {

            return service != null &&
                operator != null &&
                country != null &&
                Number(amount) > 0;
        }

    }


    React.useState(() => {

        getSochitelCountry().then((response) => {

            const result = Object.keys(response.data.results).map(key => {
                return {
                    country_id: response.data.results[key].country_id,
                    country_name: response.data.results[key].country_name + ' (' + response.data.results[key].country_currency + ')',
                    country_currency: response.data.results[key].country_currency,
                    country_prefixes: response.data.results[key].country_prefixes,
                    msisdn_length_min: response.data.results[key].msisdn_length_min,
                    msisdn_length_max: response.data.results[key].msisdn_length_max
                };
            });


            setCountries(result);
           

        }).catch((error) => {

            //alert();
            console.log('error');

        })

    }, []);



    const getOperators = (country: any) => {

        getSochitelOperator(country.country_id).then((response) => {

            const result = Object.keys(response.data.results).map(key => {
                return {
                    operator_id: response.data.results[key].operator_id,
                    operator_name: response.data.results[key].operator_name ,
                    operator_brand_id: response.data.results[key].operator_brand_id,
                    product_type_id: response.data.results[key].product_type_id,
                    product_type_name: response.data.results[key].product_type_name,
                    country_name: response.data.results[key].country_name,
                    currency: response.data.results[key].currency,
                    country_prefixes: response.data.results[key].country_prefixes,
                    msisdn_length_min: response.data.results[key].msisdn_length_min,
                    msisdn_length_max: response.data.results[key].msisdn_length_max
                };
            });

            setOperators(result);
            
        }).catch((error) => {

            console.log('erro')

        })

    }


    const getServices = (operator: any) => {

        getSochitelService(operator.operator_id).then((response) => {

            //console.log(response.data.results);

            const result = Object.keys(response.data.results).map(key => {
                return {
                    product_id: response.data.results[key].product_id,
                    product_type_id: response.data.results[key].product_type_id,
                    operator_brand_id: response.data.results[key].operator_brand_id,
                    product_type_name: response.data.results[key].product_type_name,
                    product_category_id: response.data.results[key].product_category_id,
                    name: response.data.results[key].name,
                    description: response.data.results[key].description,
                    currency_user: response.data.results[key].currency_user,
                    currency_operator: response.data.results[key].currency_operator,
                    price_type: response.data.results[key].price_type,
                    price_min_operator: response.data.results[key].price_min_operator,
                    price_min_user: response.data.results[key].price_min_user,

                };
            });

            setServices(result);

        }).catch((error) => {

            console.log('erro')

        })

    }


    const changeCountry = (item: any) => {
        setCountry(item);
        setOperators([]);
        setOperator(null);
        setServices([]);
        setService(null);
        setAmount('0.00');
        setTelephone('');
        setFixedAmount(false);
        getOperators(item);
    }


    const changeOperator = (item: any) => {
        //console.log(item);
        setOperator(item);
        setServices([]);
        setService(null);
        setAmount('0.00');
        setTelephone('');
        setFixedAmount(false);
        getServices(item);
    }

    const changeService = (item: any) => {

        console.log(item);

        setIdRequired(verifyIdRequired(item.product_type_name));

        setService(item);
        if (item.price_type === 'fixed') {
            setFixedAmount(true);
           // setAmount(Number((Number(item.price_min_operator) * Number(rate.realRate)).toString()).toFixed(2));
            setSamount(item.price_min_operator);
            setAmount((Number(item.price_min_operator) * Number(rate.realRate)).toFixed(2).toString())
              //  parseFloat(((parseFloat((item.price_min_operator) * parseFloat((rate.realRate))).toFixed(2).toString());

        } else {
            setAmount('0.00');
            setFixedAmount(false);
        }

    }


    const getRate = async (currencyFrom: string, currencyTo: string) => {

        currencyRateRequest(currencyFrom, currencyTo).then((response: any) => {
            //console.log("le taux applicable", response.data);
            setRate(response.data);
            if (service !== null && service.price_type === 'fixed') {
                setFixedAmount(true);
               // setAmount(Number((Number(service.price_min_operator) * Number(response.data.realRate)).toString()).toFixed(2));
               // setAmount(Number((Number(item.price_min_operator) * Number(rate.realRate)).toString()).toFixed(2));

             //   setAmount((parseFloat(service.price_min_operator) * parseFloat(response.data.realRate)).toString())

            } else {
                setAmount('0.00');
                setFixedAmount(false);
            }
        }).catch((error: any) => {

        });
    };



    const submit = () => {

      //  console.log(service);
        navigation.navigate('BuyRecapScreen',
            {
                country: country,
                operator: operator,
                service: service,
                account: account,
                telephone: country?.country_prefixes + telephone,
                amount: amount,
                rate: rate,
                samount: samount,
                fixedAmount: fixedAmount
            }
        );
    }


    React.useEffect(() => {
        getRate(country?.country_currency, account?.compte.devise,);
        //getCADRate(account?.compte.devise);
    }, [account, country]);


    return (

        <View
            style={styles.main}
        >
            
           

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                <TouchableOpacity style={{
                    justifyContent: 'center',
                    backgroundColor: '#e6e4e0',
                    height: 40,
                    width: 40,
                    alignItems: 'center',
                    borderRadius: 20,
                }} onPress={() => { cancel() }} >
                    <View>
                        <Ionicons name="close" color={Colors.text} size={24} />
                    </View>
                </TouchableOpacity>
            </View>


            <ScrollView>

                <View style={{ alignItems: 'flex-start', marginTop:10 }}>

                    <View style={styles.pageheader}>
                        <Text style={styles.title}>{t('BuyScreen.Purchaseandsubscription')}</Text>
                        <Text style={styles.subtitle}>
                            {t('BuyScreen.buyService')}
                        </Text>
                    </View>

                    <View style={{ alignContent: 'flex-end', justifyContent: 'flex-end', }}>
                        <Text style={styles.inputTitleText}>{t('BuyScreen.country')}*</Text>
                        <View style={{ flexDirection: 'row', width: '100%', }}>
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                itemTextStyle={{ color: 'black' }}
                                iconStyle={styles.iconStyle}
                                data={countries}
                                search
                                maxHeight={300}
                                labelField="country_name"
                                valueField="country_id"
                                placeholder={t('BuyScreen.selectacountry')}
                                searchPlaceholder={t('BuyScreen.search')}
                                value={country}
                                onChange={(item) => {
                                   changeCountry(item)
                                }}
                            />
                        </View>
                    </View>


                    <View style={{ alignContent: 'flex-end', justifyContent: 'flex-end', marginTop:20 }}>
                        <Text style={styles.inputTitleText}>{t('BuyScreen.operator')}*</Text>
                        <View style={{ flexDirection: 'row', width: '100%', }}>
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                itemTextStyle={{ color: 'black' }}
                                iconStyle={styles.iconStyle}
                                data={operators}
                                disable={country === null}
                                search
                                maxHeight={300}
                                labelField="operator_name"
                                valueField="operator_id"
                                placeholder={t('BuyScreen.selecttheoperator')} 
                                searchPlaceholder={t('rechercher')}
                                value={operator}
                                onChange={(item) => {
                                    changeOperator(item)
                                }}
                            />
                        </View>
                    </View>

                    <View style={{ alignContent: 'flex-end', justifyContent: 'flex-end', marginTop: 20 }}>
                        <Text style={styles.inputTitleText}>{t('BuyScreen.service')}*</Text>
                        <View style={{ flexDirection: 'row', width: '100%', }}>
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                itemTextStyle={{ color: 'black' }}
                                iconStyle={styles.iconStyle}
                                data={services}
                                disable={operator === null}
                                search
                                maxHeight={300}
                                labelField="name"
                                valueField="product_id"
                                placeholder={t('BuyScreen.selecttheservice')}
                                searchPlaceholder={t('BuyScreen.search')}
                                value={service}
                                onChange={(item) => {
                                    changeService(item);
                                }}
                            />
                        </View>
                    </View>

                    

                    <View style={{ alignContent: 'flex-end', justifyContent: 'flex-end', marginTop: 20 }}>
                        <Text style={styles.inputTitleText}>{t('BuyScreen.accountandamount')}*</Text>
                        <View style={{ flexDirection: 'row', width: '100%', }}>
                            <AmountCurrencyInput2
                                amount={amount}
                                setAmount={setAmount}
                                account={account}
                                setAccount={setAccount}
                                accounts={accounts}
                                title={t('transaction.whichaccountdoyouwanttosendfrom')}
                                disabled={fixedAmount}
                            />
                        </View>
                        {country &&
                            <View>
                                {fixedAmount ?
                                    <Text style={[styles.inputTitleText, { marginTop: -5 }]}> {samount} {service?.currency_operator}</Text>
                                    :
                                    <Text style={[styles.inputTitleText, { marginTop: -5 }]}> {(amount / rate.realRate).toFixed(2)} {service?.currency_operator}</Text>
                                }
                            </View>
                        }
                    </View>

                    {
                        idRequired &&
                        <View style={{ alignContent: 'flex-end', justifyContent: 'flex-end', marginTop: 20 }}>
                            <Text style={styles.inputTitleText}>{t('BuyScreen.beneficiary')}*</Text>
                            <View style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>
                                <TextInput2
                                    //label={t('signupscreen.yourphone')}
                                    returnKeyType="done"
                                    value={telephone || ""}
                                    error={telephone.length > 0 && ((telephone + country?.country_prefixes).length < Number(country?.msisdn_length_min) || (telephone + country?.country_prefixes).length > Number(country?.msisdn_length_max))}
                                    errorText={(telephone.length > 0 && ((telephone + country?.country_prefixes).length < Number(country?.msisdn_length_min) || (telephone + country?.country_prefixes).length > Number(country?.msisdn_length_max))) ? t('BuyScreen.incorrectNumber') : ''}
                                    disabled={country === null}
                                    inputMode="numeric"
                                    onChangeText={(text: string) => setTelephone(text)}
                                    description={undefined}
                                    left={<Input.Affix text={country?.country_prefixes} />}
                                    placeholder="entrez le numéro"
                                    underlineColor="transparent"
                                />
                            </View>

                        </View>

                    }

                    
                    <View style={{ marginTop: 20, marginBottom:20, width: '100%', justifyContent: 'flex-end' }}>
                        
                        <TouchableOpacity
                            style={{
                                height: 70,
                                backgroundColor: isFormValidate() ? Colors.primary : Colors.primary1,
                                width: '100%',
                                borderRadius: 5,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onPress={() => { submit() }}
                            disabled={!isFormValidate() }
                        >
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: 18,
                                }}
                            >
                                {t('countryScreen.next')}
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </ScrollView>
            
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


    inputTitleText: {
        textAlign: 'left',
        color: Colors.text,
        fontWeight: 'bold',
        marginBottom: 0,
    },

    pageheader: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItem: 'flex-start',
        marginBottom: 30,
        marginTop: 0
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
        height: 70,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
        marginTop: 10,
    },

});



export default BuyScreen;


