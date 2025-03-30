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
    Image,
    Text,
    ScrollView,
    Platform,
    PermissionsAndroid,
    Rationale, Alert, Touchable, TextInput
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../themes';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AmountCurrencyInput from '../../components/transaction/AmountCurrencyInput';
import { saveBenef} from '../../store/profilSlice';
import { useSelector} from 'react-redux';
import ChangeRate from '../../components/transaction/ChangeRate';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TransactionFee from '../../components/transaction/TransactionFee';
import TotalToPay from '../../components/transaction/TotalToPay';
import { currencyRateRequest } from '../../services/request';


function TransfertScreen({ navigation }: { navigation: any }) {

    const route = useRoute<any>();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { accountParm } = route.params || { id: 0 };
    const [visible, setVisible] = React.useState(false);
    const [langageModalvisible, setLangageModalvisible] = React.useState(false);
    const [amount, setAmount] = React.useState<string>("0.00");
    const accounts = useSelector((state: any) => state.profil.accounts);
    const benef = useSelector((state: any) => state.profil.benef);
    const [account, setAccount] = React.useState<any>(accounts[0]);
    const [benefAccount, setBenefAccount] = React.useState<any>(null);
    const [benefaccounts, setBenefAccounts] = React.useState<any[]>([]);
    const [rate, setRate] = React.useState<number>(1);
    const [benefAmount, setBenefAmount] = React.useState<string>("0.00");
    

    React.useEffect(() => {

        if (accountParm) {
            setAccount(accountParm);
        }

    }, []);

    //console.log(benef);

    

    const cancel = () => {
        Alert.alert('', 'Voulez-vou vraiment annuler cette transaction ?', [
            {
                text: 'Non',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Oui', onPress: () => confirmCancel() },
        ]);
    };


    const confirmCancel = () => {
        dispatch(saveBenef(null));
        navigation.goBack();
    }



    const formatAmount = (val: string) => {
        const amount = Number(val).toFixed(2).toString();
        setAmount(amount);

    }


    const addBenef = () => {
        navigation.navigate("ChooseBenefScreen");
    }



    const fetchAccount = (benef: any) => {

        if (!benef.compte) {
            return []
        } else {

            const mainAccount = benef.compte.find((account: any) => {
                if (account.typeCompte.idTypeCompte == 6) {
                    return true;
                }
            })

            const otherAccounts = benef.compte.filter((account: any) => {

                if (account.typeCompte.idTypeCompte != 6 && account.typeCompte.idTypeCompte != 2) {

                    return account;
                }

            });


            let allAccount = [];
            allAccount.push(mainAccount);

            for (const acc of otherAccounts) {
                allAccount.push(acc);
            }

            const newAccountsList = allAccount.map((account: any) => {

                if (account.typeCompte.idTypeCompte == 6) {
                    return {
                        id: account.typeCompte.idTypeCompte,
                        icon: require('../../assets/cad.png'),
                        compte: account
                    };
                }

                else if (account.typeCompte.idTypeCompte == 1) {
                    return {
                        id: account.typeCompte.idTypeCompte,
                        icon: require('../../assets/us.png'),
                        compte: account
                    };
                }

                else if (account.typeCompte.idTypeCompte == 4) {
                    return {
                        id: account.typeCompte.idTypeCompte,
                        icon: require('../../assets/ue.png'),
                        compte: account
                    };
                }

                else if (account.typeCompte.idTypeCompte == 5) {
                    return {
                        id: account.typeCompte.idTypeCompte,
                        icon: require('../../assets/gb.png'),
                        compte: account
                    };
                }


            })


            return newAccountsList;

        }

       
    }


    const getRate = async (currencyFrom: string, currencyTo: string) => {
        currencyRateRequest(currencyFrom, currencyTo).then((response: any) => {

            console.log("le taux applicable", response.data.realRate);
            setRate(response.data.realRate);

        }).catch((error: any) => {


        });
    };


    const send = () => {
        navigation.navigate("ConfirmTransfert",
            
                {   benef:benef,
                    amount: amount,
                    account: account,
                    benefAccount: benefAccount,
                    rate:rate
                }
        );  
    }


    React.useEffect(() => {

        if (benef != null) {
            let list: any[] = fetchAccount(benef);
            setBenefAccount(list[0]);
            setBenefAccounts(fetchAccount(benef));
        }

        //console.log(benefAccount?.compte.devise);
        //console.log(account?.compte.devise);
        getRate(benefAccount?.compte.devise, account?.compte.devise);

    }, [benef]);


    React.useEffect(() => {
      
        //console.log(benefAccount?.compte.devise);
        //console.log(account?.compte.devise);
        getRate(account?.compte.devise, benefAccount?.compte.devise, );

    }, [account, benefAccount])



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
                }} onPress={() => { cancel()  }} >
                    <View>
                        <Ionicons name="close" color={Colors.text} size={24} />
                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView style={{ marginBottom:10 }}>

                <Text style={styles.title}>Envoyez de l'argent</Text>

                <View style={{ marginTop: 10 }}>

                    <Text style={{ fontSize: 16, color: Colors.text, fontWeight: 600 }}>Combien souhaitez-vous envoyer ?</Text>

                    <AmountCurrencyInput
                        amount={amount}
                        setAmount={setAmount}
                        account={account}
                        setAccount={setAccount}
                        accounts={accounts}
                        title="Avec quel compte souhaitez-vous envoyer ?"
                    />
                    
                    
                </View>

                {
                    benefAccount != null &&
                    <ChangeRate
                        rate={Number(rate).toFixed(2).toString()}
                    />
                }


                {
                    benefAccount !=null &&
                    <View style={{ marginTop: 20 }}>

                            <Text style={{ fontSize: 16, color: Colors.text, fontWeight: 600 }}> {benef?.prenoms} recevra </Text>
                            <AmountCurrencyInput
                                amount={(Number(amount)*rate).toFixed(2).toString()}
                                setAmount={setBenefAmount}
                                account={benefAccount}
                                setAccount={setBenefAccount}
                                accounts={benefaccounts}
                                title="Dans quel compte souhaitez vous envoyez ?"
                            />
                    </View>

                }


                {
                    benefAccount != null &&
                    <View style={{ marginTop: 30, borderBottomColor: Colors.background, borderBottomWidth: 1, paddingVertical: 20 }}>
                        <TransactionFee
                            amount={(Number(amount) * 0.5 / 10).toFixed(2).toString()}
                            currency={account.compte.devise}
                        />
                    </View>
                }


                {
                    benefAccount != null &&
                    <View style={{ marginTop: 0, borderBottomColor: Colors.background , borderBottomWidth: 1, paddingVertical: 20 }}>
                        <TotalToPay
                            amount={(Number(amount) + Number(amount) * 0.5 / 10).toFixed(2).toString()}
                            currency={account.compte.devise}
                        />
                    </View>
                }


            </ScrollView>


            <View style={{ justifyContent: 'flex-end', marginBottom: 0, }}>
                {
                    benefAccount == null &&
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <View style={{ flex: 1 }}>
                                <TouchableOpacity disabled={Number(amount) <= 0} style={Number(amount) > 0 ? styles.addbutton : styles.addbuttonDisabled} onPress={() => { addBenef() }}>
                                <Text style={styles.addbuttonText}>Choisir un beneficiaire</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }

                {
                    benefAccount != null &&
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity disabled={Number(amount) <= 0 } style={Number(amount) > 0 ? styles.addbutton : styles.addbuttonDisabled} onPress={() => { send() }}>
                                <Text style={styles.addbuttonText}>Envoyer</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }

            </View>

        </View>
    );
}


const styles = StyleSheet.create({

    main: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
    },

    emptycard: {
        marginTop: 10,
        backgroundColor: '#e6e4e0',
        padding: 20,
        borderRadius: 10,
        height: 160,
        alignItems: 'center',
        justifyContent: 'center',
    },


    title: {
        color: Colors.text,
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'left',
        paddingVertical: 5,
        marginTop: 10,
    },


    rightButton: {
        marginRight: 0,
        marginLeft: 10,
    },

    input: {
        height: "100%",
        width:'100%',
        padding: 0,
        fontSize:26
        
    },

    addbutton: {
        height: 50,
        backgroundColor: Colors.primary,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    addbuttonDisabled: {
        height: 50,
        backgroundColor: Colors.primary1,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },


    cancelbuttonText: {
        color: Colors.text,
        fontWeight: 'bold',
        fontSize: 16,
    },

    addbuttonText: {
        fontWeight: 'bold',
        color: '#ffffff',
        fontSize: 16,
    },



});


export default TransfertScreen;



