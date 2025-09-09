/* eslint-disable no-mixed-spaces-and-tabs */
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
    Dimensions,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../themes';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import TransactionFee from '../../components/transaction/TransactionFee';
import TotalToPay from '../../components/transaction/TotalToPay';
import { executeSochitelTransaction, getAccount, getSochitelRate, saveSochitel, sendTransfertRequest } from '../../services/request';
import RecipiantAmount from '../../components/transaction/RecipiantAmount';
import LoadingModal from '../../components/LoadingModal';
import StatutModal from '../../components/transaction/StatutModal';
import Toast from 'react-native-toast-message';
import { Checkbox } from 'react-native-paper';
import Modal from 'react-native-modal';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



function BuyRecapScreen({ navigation }: { navigation: any }) {

    //const frais = 2; // en pourcentage
    const gain_client = 25; // en pourcentage
    const gain_parrain = 10; // en pourcentage
    const gain_franchise = 15; // en pourcentage
    const gain_hpay = 50; // en pourcentage

    const { t } = useTranslation();
    const route = useRoute<any>();
    const [visible, setVisible] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    const { country, operator, service, account, telephone, amount, rate, samount, fixedAmount } = route.params;
    const [statut, setStatut] = React.useState(true);
    const [title, setTitle] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [completeModalOpen, setCompleteModalOpen] = React.useState(false);
    const user = useSelector((state: any) => state.profil.user);
    const [sochitelRate, setSochitelRate] = React.useState<null | any>(null);
    const [frais, setFrais] = React.useState<number>(0);



    console.log(account.compte.idCompte);

    const repartitionGain = (CONCERNE: string, fraisMontant: number) => {



        if (CONCERNE === 'CLIENT') {

            return (gain_client * fraisMontant) / 100;

        } else if (CONCERNE === 'PARRAIN') {

            return (gain_parrain * fraisMontant) / 100;

        } else if (['FRANCHISE', 'AGENCE'].includes(CONCERNE)) {

            return (gain_franchise * fraisMontant) / 100;

        } else if (CONCERNE === 'HPAY') {

            return (gain_hpay * fraisMontant) / 100;
        }
    };


    const closeModal = () => {
        setCompleteModalOpen(false);
        navigation.navigate('Home');
    };


    const getRate = (currency_from :string, currency_to : string, buyAmount: number) => {

        getSochitelRate(currency_from, currency_to, buyAmount, 2).then((response) => {


            //console.log('rate', response.data);
            setFrais(Number(response.data?.hpay_rate) * 2 / 100);
            setSochitelRate(response.data);

        }).catch((error) => {


        });

    };



    React.useEffect(() => {

        getRate(operator.currency, account.compte.devise, amount);

    }, []);


    const fetchAccount =  () => {

        getAccount(account.compte.idCompte).then((response) => {


            if (response.data.solde > sochitelRate?.hpay_rate * amount ) {

                console.log('lancer', response.data.solde);
                confirmSend();

            } else {

                // solde insuffisant
                setModalVisible(false);
                setTitle('transaction.transferfailed');
                setStatut(false);
                setMessage('transaction.insufficientbalance');
                setCompleteModalOpen(true);
            }


        }).catch((error) => {

            setModalVisible(false);
            setTitle('transaction.transferfailed');
            setStatut(false);
            setMessage('');
            setCompleteModalOpen(true);

        });
    };



    const submit = () => {

        Alert.alert(t('transaction.Confirmthetransfer'), t('transaction.confirmmsg'), [
            {
                text: t('cancel'),
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: t('send'), onPress: () => fetchAccount() },
        ]);

    };



    const confirmSend = () => {

        const currentDate = new Date();
        const dateString = currentDate.toISOString();
        const ref = Date.now();
        const timestamp = Math.floor(Date.now() / 1000);
        let montant = 0;

        setModalVisible(true);
        executeSochitelTransaction(
            operator.operator_id,
            service.product_id,
            Number(amount),
            telephone,
            '12345878879'
        ).then((response) => {

            //console.log(response.data);

            if (response.data.success === true) {

                setTitle('transaction.transfercomplete');
                setMessage('');
                setStatut(true);
                //setModalVisible(false);
                setCompleteModalOpen(true);

                const data = {
                    idclients: user.client.id,// ok
                    idcompte: account.compte.idCompte, // ok
                    montant: amount, //ok
                    frais: sochitelRate?.hpay_rate * 2 / 100,
                    total: sochitelRate?.hpay_rate * amount ,
                    montantDebite: sochitelRate?.hpay_rate * amount,
                    deviseDebite: account.compte.devise,
                    gainClient: repartitionGain('CLIENT', frais),
                    gainParrain: repartitionGain('PARRAIN', frais),
                    gainFranchise: repartitionGain('AGENCE', frais),
                    gainHpay: repartitionGain('HPAY', frais),
                    operatorId: response.data.results.results.operator.operator_id,//ok
                    operatorName: response.data.results.results.operator.operator_name,//ok,
                    operatorAmount: response.data.results.results.operator.operator_amount,//ok
                    operatorReference: response.data.results.results.operator.operator_reference,//ok
                    operatorCurrency: response.data.results.results.operator.operator_currency, //ok
                    countryId: country.country_prefixes,//response.data.results.results.country_id,//ok
                    countryName: response.data.results.results.country_name,//ok
                    userAmount: response.data.results.results.user.amount_user,//ok
                    userCurrency: response.data.results.results.user.currency_user,//ok
                    userReference: response.data.results.results.user.ref,//ok
                    productId: service.product_id, //ok
                    productType: service.product_type_id,
                    productTypeName: service.product_type_name,
                    reference: ref,//ok
                    timestamp: timestamp, // ok
                    voucherPinNumber: 'Check',//ok
                    voucherPinSerial: 'Check',//ok
                    voucherPinInstruction: 'Check',//ok
                    commande: response.data.results.command,//ok
                    balanceInitial: response.data.results.results.balance.balance_initial,//ok
                    transactionAmount: response.data.results.results.balance.transaction_amount,//ok
                    transactionCommission: response.data.results.results.balance.transaction_commission, //ok
                    transactionCommissionPercentage: response.data.results.results.balance.transaction_commission_percentage,//ok
                    balanceFinal: response.data.results.results.balance.balance_final,
                    balanceCurrency: response.data.results.results.balance.balance_currency,
                    dateEff: dateString, //ok
                    statut: 1, //ok
                    beneficiaire: telephone, //ok
                    idagence: user.client.idAgence,  //ok

                };

                //console.log(data);

                saveTransaction(data);

            } else {

                setModalVisible(false);
                setTitle('transaction.transferfailed');
                setStatut(false);
                setMessage('');
                setCompleteModalOpen(true);
            }


        }).catch((error) => {

            setModalVisible(false);
            setTitle('transaction.transferfailed');
            setStatut(false);
            setMessage('');
            setCompleteModalOpen(true);

        });
    };




    const saveTransaction = (data:any) => {

        saveSochitel(data).then((response) => {
            setModalVisible(false);
            console.log(response.data);

        }).catch((error) => {

            console.log(error);
            setModalVisible(false);
        });
    };



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

            <ScrollView style={{ marginBottom: 10 }}>

                <Text style={styles.title}>{t('BuyScreen.purchasesummary')}</Text>


                <View style={{ marginTop: 0, borderBottomColor: Colors.background, borderBottomWidth: 1, paddingVertical: 15 }}>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 20,
                    }}>

                        <View>
                            <View style={{ flexDirection: 'row', alignItems:'center', justifyContent: 'center' }}>
                                <View style={{ marginRight: 10 }}>
                                    <View style={{
                                        backgroundColor: Colors.background,
                                        height: 40,
                                        width: 40,
                                        borderRadius: 20,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Ionicons name="location-outline" color={Colors.text} size={22} />
                                    </View>
                                </View>
                                <View>
                                    <Text style={{ color: Colors.text, fontWeight: 'bold' }}>{t('BuyScreen.country')}</Text>
                                </View>
                            </View>
                        </View>

                        <View>
                            <Text style={{ color: Colors.text }}>{country.country_name}</Text>
                        </View>
                    </View>
                </View>

                <View style={{ marginTop: 0, borderBottomColor: Colors.background, borderBottomWidth: 1, paddingVertical: 15 }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ marginRight: 10 }}>
                                    <View style={{
                                        backgroundColor: Colors.background,
                                        height: 40,
                                        width: 40,
                                        borderRadius: 20,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <FontAwesome name="building-o" color={Colors.text} size={22} />
                                    </View>
                                </View>
                                <View>
                                    <Text style={{ color: Colors.text, fontWeight: 'bold' }}>{t('BuyScreen.operator')}</Text>
                                </View>
                            </View>
                        </View>

                        <View>
                            <Text style={{ color: Colors.text }}>{operator.operator_name}</Text>
                        </View>
                    </View>
                </View>

                <View style={{ marginTop: 0, borderBottomColor: Colors.background, borderBottomWidth: 1, paddingVertical: 15 }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ marginRight: 10 }}>
                                    <View style={{
                                        backgroundColor: Colors.background,
                                        height: 40,
                                        width: 40,
                                        borderRadius: 20,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Ionicons name="cart-outline" color={Colors.text} size={22} />
                                    </View>
                                </View>
                                <View>
                                    <Text style={{ color: Colors.text, fontWeight: 'bold' }}>{t('BuyScreen.service')}</Text>
                                </View>
                            </View>
                        </View>

                        <View>
                            <Text style={{ color: Colors.text, textAlign: 'right' }}>{service.product_type_name}</Text>
                            <Text style={{ color: Colors.text, textAlign: 'right' }}>{service.name}</Text>
                        </View>
                    </View>
                </View>

                <View style={{ marginTop: 0, borderBottomColor: Colors.background, borderBottomWidth: 1, paddingVertical: 15 }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ marginRight: 10 }}>
                                    <View style={{
                                        backgroundColor: Colors.background,
                                        height: 40,
                                        width: 40,
                                        borderRadius: 20,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <FontAwesome name="user-o" color={Colors.text} size={22} />
                                    </View>
                                </View>
                                <View>
                                    <Text style={{ color: Colors.text, fontWeight: 'bold' }}>{t('BuyScreen.beneficiary2')}</Text>
                                </View>
                            </View>
                        </View>

                        <View>
                            <Text style={{ color: Colors.text, textAlign: 'right' }}>{telephone}</Text>
                        </View>
                    </View>
                </View>

                <View style={{ marginTop: 0, borderBottomColor: Colors.background, borderBottomWidth: 1, paddingVertical: 15 }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ marginRight: 10 }}>
                                    <View style={{
                                        backgroundColor: Colors.background,
                                        height: 40,
                                        width: 40,
                                        borderRadius: 20,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <FontAwesome name="dollar" color={Colors.text} size={22} />
                                    </View>
                                </View>
                                <View>
                                    <Text style={{ color: Colors.text, fontWeight: 'bold' }}>{t('BuyScreen.totaltopay')}</Text>
                                </View>
                            </View>
                        </View>

                        <View>
                            {
                                fixedAmount ?
                                    <View>
                                        <Text style={{ color: Colors.text, textAlign: 'right' }}> {(sochitelRate?.hpay_rate * amount).toFixed(2)} {account.compte.devise} </Text>
                                        {/*<Text style={{ color: Colors.text, textAlign: 'right' }}> {samount} {service?.currency_operator}</Text>*/}
                                    </View>
                                    :
                                    <View>
                                        <Text style={{ color: Colors.text, textAlign: 'right' }}> {(sochitelRate?.hpay_rate * amount).toFixed(2)} {account.compte.devise}</Text>
                                        {/*<Text style={{ color: Colors.text, textAlign: 'right' }}>{amount} {service?.currency_operator}</Text>*/}
                                    </View>

                            }

                        </View>
                    </View>
                </View>

            </ScrollView>


            <View style={{ justifyContent: 'flex-end', marginBottom: 0, }}>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={styles.addbutton} onPress={() => { submit(); }}>
                            <Text style={styles.addbuttonText}>{t('BuyScreen.submit')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


            <LoadingModal
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
            />


            <StatutModal
                completeModalOpen={completeModalOpen}
                closeModal={closeModal}
                success={statut}
                title={title}
                message={message}
            />


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
        height: '100%',
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

    closebutton: {
        height: 50,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        borderColor: Colors.primary,
        borderWidth: 1,
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

    closebuttonText: {
        fontWeight: 'bold',
        color: Colors.text,
        fontSize: 16,
    },

});


export default BuyRecapScreen;



