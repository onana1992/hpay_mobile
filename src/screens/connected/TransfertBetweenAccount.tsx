﻿/* eslint-disable react-hooks/exhaustive-deps */
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
    Alert,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../themes';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native';
import AmountCurrencyInput from '../../components/transaction/AmountCurrencyInput';
import { saveBenef } from '../../store/profilSlice';
import { useSelector } from 'react-redux';
import ChangeRate from '../../components/transaction/ChangeRate';
import TransactionFee from '../../components/transaction/TransactionFee';
import TotalToPay from '../../components/transaction/TotalToPay';
import { currencyRateRequest } from '../../services/request';
import { NetworkInfo } from 'react-native-network-info';
import UserAgent from 'react-native-user-agent';


interface VirementDataType {
    montant: number | null;
    frais: string | null;
    fraisMontant: number | null;
    idClientFrom: string | null;
    idClientTo: string | null;
    idCompteFrom: string | null;
    idCompteTo: string | null;
    idPaysFrom: string | null;
    virementRaison: string | null;
    programmer: string | null;
    deviseFrom: string | null;
    deviseTo: string | null;
    total: number | null;
    tauxConversion: number | null;
    gainHpayCAD: number | null;
    gainHpay: number | null;
    ip: string | null;
    agent: string | null;
    montantCompteTo: number | null;
    montantCompteFrom: number | null;
    realRate: number | null;
    hpayRate: number | null;
    cadRate: number | null;

}

function TransfertBetweenAccount({ navigation }: { navigation: any }) {

    const route = useRoute<any>();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.profil.user);
    const [visible, setVisible] = React.useState(false);
    const [langageModalvisible, setLangageModalvisible] = React.useState(false);
    const [amount, setAmount] = React.useState<string>("0.00");
    const accounts = useSelector((state: any) => state.profil.accounts);
    const benef = useSelector((state: any) => state.profil.benef);
    const [account, setAccount] = React.useState<any>(accounts[0]);
    const [benefAccount, setBenefAccount] = React.useState<any>(accounts[1]);
    const [benefaccounts, setBenefAccounts] = React.useState<any[]>([]);
    const [rate, setRate] = React.useState<{ hpayRate: string, realRate: string }>({ hpayRate: '1', realRate: '1' });
    const [benefAmount, setBenefAmount] = React.useState<string>('0.00');
    const [ipAdress, setIpAddress] = React.useState<string | null>("");
    const [agent, setAgent] = React.useState<string | null>("");
    const [CADRate, setCADRate] = React.useState<number>(1);


    const [data, setData] = React.useState<VirementDataType>({
        montant: null,
        frais: null,
        fraisMontant: null,
        idClientFrom: null,
        idClientTo: null,
        idCompteFrom: null,
        idCompteTo: null,
        idPaysFrom: null,
        virementRaison: null,
        programmer: null,
        deviseFrom: null,
        deviseTo: null,
        total: null,
        tauxConversion: null,
        gainHpayCAD: null,
        gainHpay: null,
        ip: null,
        agent: null,
        montantCompteTo: null,
        montantCompteFrom: null,
        realRate: null,
        hpayRate: null,
        cadRate: null,

    });

    React.useEffect(() => {
        setAgent(UserAgent.getUserAgent());
        NetworkInfo.getIPAddress()
            .then(ip => setIpAddress(ip))
            .catch(error => console.error(error));
    }, []);


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
        dispatch(saveBenef(null));
        navigation.goBack();
    };



    const formatAmount = (val: string) => {
        const amount = Number(val).toFixed(2).toString();
        setAmount(amount);

    };

    const addBenef = () => {
        navigation.navigate('ChooseBenefScreen');
    };



    const fetchBenefAccount = () => {

        const filterAccounts = accounts.filter((item: any) => {

            if (item.id !== account.id) {
                return item;
            }

        });

        setBenefAccounts(filterAccounts);
        getRate(account?.compte.devise, filterAccounts[0]?.compte.devise);
        getCADRate(benefAccount?.compte.devise);
        setBenefAccount(filterAccounts[0]);
    };



    const getRate = async (currencyFrom: string, currencyTo: string) => {

        currencyRateRequest(currencyFrom, currencyTo).then((response: any) => {

            //console.log("le taux applicable", response.data);
            setRate(response.data);

        }).catch((error: any) => {

        });
    };



    const getCADRate = async (currencyTo: string) => {

        currencyRateRequest(currencyTo, 'CAD').then((response: any) => {

            //console.log("le taux applicable", response.data.realRate);
            setCADRate(response.data.realRate);

        }).catch((error: any) => {


        });
    };



    const send = () => {


        setData({
            ...data,
            montant: Number(Number(amount).toFixed(2)),
            frais: '0',
            fraisMontant: 0,
            idClientFrom: user.client.id,
            idClientTo: user.client.id,
            idCompteFrom: account.compte.idCompte,
            idCompteTo: benefAccount.compte.idCompte,
            idPaysFrom: user.client.pays.id,
            virementRaison: "transfert d'argent",
            programmer: '0',
            deviseFrom: account.compte.devise,
            deviseTo: benefAccount.compte.devise,
            total: Number(Number(amount).toFixed(2)), // pas de frais additionel
            tauxConversion: CADRate,
            gainHpayCAD: 0,
            gainHpay: 0,
            ip: ipAdress,
            agent: agent,
            montantCompteTo: Number((Number(amount) * Number(rate.hpayRate)).toFixed(2)),
            montantCompteFrom: Number(Number(amount).toFixed(2)),
            realRate: Number(rate.realRate),
            hpayRate: Number(rate.hpayRate),
            cadRate: Number(CADRate),
        });


        navigation.navigate('ConfirmTransfertBetweenAccount',

            {
                benef: benef,
                amount: amount,
                account: account,
                benefAccount: benefAccount,
                rate: rate,
                data: {
                    ...data,
                    montant: Number(Number(amount).toFixed(2)),
                    frais: '0',
                    fraisMontant: 0,
                    idClientFrom: user.client.id,
                    idClientTo: user.client.id,
                    idCompteFrom: account.compte.idCompte,
                    idCompteTo: benefAccount.compte.idCompte,
                    idPaysFrom: user.client.pays.id,
                    virementRaison: "transfert d'argent",
                    programmer: '0',
                    deviseFrom: account.compte.devise,
                    deviseTo: benefAccount.compte.devise,
                    total: Number(Number(amount).toFixed(2)), // pas de frais additionel
                    tauxConversion: rate.hpayRate,
                    gainHpayCAD: 0,
                    gainHpay: 0,
                    ip: ipAdress,
                    montantCompteTo: Number((Number(amount) * Number(rate.hpayRate)).toFixed(2)),
                    montantCompteFrom: Number(Number(amount).toFixed(2)),
                    realRate: Number(rate.realRate),
                    hpayRate: Number(rate.hpayRate),
                    cadRate: Number(CADRate),
                },
            }
        );
    };



    React.useEffect(() => {
        fetchBenefAccount();
    }, [account]);


    React.useEffect(() => {

        getRate(account?.compte.devise, benefAccount?.compte.devise);
        getCADRate(benefAccount?.compte.devise);

    }, [benefAccount]);


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
                }} onPress={() => { cancel() }} >
                    <View>
                        <Ionicons name="close" color={Colors.text} size={24} />
                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView style={{ marginBottom: 10 }}>

                <Text style={styles.title}>{t('transaction.transfermoneybetweenyouraccounts')}</Text>

                <View style={{ marginTop: 30 }}>

                    <Text style={{ fontSize: 16, color: Colors.text, fontWeight: 600 }}>{t('transaction.howmuchdoyouwanttosend')}</Text>
                    <AmountCurrencyInput
                        amount={amount}
                        setAmount={setAmount}
                        account={account}
                        setAccount={setAccount}
                        accounts={accounts}
                        title={t('transaction.whichaccountdoyouwanttosendfrom')}
                    />
                </View>


                {
                    benefAccount != null &&
                    <ChangeRate
                        rate={Number(rate.hpayRate).toFixed(2).toString()}
                    />
                }


                {
                    benefAccount != null &&
                    <View style={{ marginTop: 20 }}>

                        <Text style={{ fontSize: 16, color: Colors.text, fontWeight: 600 }}>{t('transaction.theamounttransferredwillbe')} </Text>
                            <AmountCurrencyInput
                                amount={(Number(amount) * rate.hpayRate).toFixed(2).toString()}
                                setAmount={setBenefAmount}
                                account={benefAccount}
                                setAccount={setBenefAccount}
                                accounts={benefaccounts}
                                title={t('transaction.whichaccountwouldyouliketosendto')}
                            />
                    </View>

                }


                {
                    benefAccount != null &&
                    <View style={{ marginTop: 30, borderBottomColor: Colors.background, borderBottomWidth: 1, paddingVertical: 20 }}>
                        <TransactionFee
                            amount={(Number(amount) * 0 / 10).toFixed(2).toString()}
                            currency={account.compte.devise}
                        />
                    </View>
                }


                {
                    benefAccount != null &&
                    <View style={{ marginTop: 0, borderBottomColor: Colors.background, borderBottomWidth: 1, paddingVertical: 20 }}>
                        <TotalToPay
                            amount={(Number(amount) + Number(amount) * 0 / 10).toFixed(2).toString()}
                            currency={account.compte.devise}
                        />
                    </View>
                }


            </ScrollView>


            <View style={{ justifyContent: 'flex-end', marginBottom: 0 }}>
                {
                    benefAccount == null &&
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity disabled={Number(amount) <= 0} style={Number(amount) > 0 ? styles.addbutton : styles.addbuttonDisabled} onPress={() => { addBenef() }}>
                                    <Text style={styles.addbuttonText}>{t('transaction.chooseabeneficiary')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }

                {
                    benefAccount != null &&
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity disabled={Number(amount) <= 0} style={Number(amount) > 0 ? styles.addbutton : styles.addbuttonDisabled} onPress={() => { send() }}>
                                    <Text style={styles.addbuttonText}>{t('transaction.validate')}</Text>
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
        width: '100%',
        padding: 0,
        fontSize: 26,
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
        backgroundColor: Colors.primary,
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


export default TransfertBetweenAccount;



