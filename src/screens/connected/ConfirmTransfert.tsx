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
import {sendTransfertRequest } from '../../services/request';
import RecipiantAmount from '../../components/transaction/RecipiantAmount';
import LoadingModal from '../../components/LoadingModal';
import StatutModal from  '../../components/transaction/StatutModal';
import Toast from 'react-native-toast-message';
import { Checkbox } from 'react-native-paper';
import Modal from 'react-native-modal';
import Feather from 'react-native-vector-icons/Feather';


function ConfirmTransfert({ navigation }: { navigation: any }) {

    const route = useRoute<any>();
    const [modalVisible, setModalVisible] = React.useState(false);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [visible, setVisible] = React.useState(false);
    const [langageModalvisible, setLangageModalvisible] = React.useState(false);
    const accounts = useSelector((state: any) => state.profil.accounts);
    const [benefaccounts, setBenefAccounts] = React.useState<any[]>([]);
    const [benefAmount, setBenefAmount] = React.useState<string>('0.00');
    const { benef, amount, account, benefAccount, rate, data } = route.params;
    const [checked, setChecked] = React.useState(false);
    const [completeModalOpen, setCompleteModalOpen] = React.useState(false);
    const [statut, setStatut] = React.useState(true);
    const [title, setTitle] = React.useState('');
    const [message, setMessage] = React.useState('');



    const send = () => {
        Alert.alert(t('transaction.Confirmthetransfer'), t('transaction.confirmmsg'), [
            {
                text: t('cancel'),
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: t('send'), onPress: () => confirmSend() },
        ]);
    };


    const closeModal = () =>{
            setCompleteModalOpen(false);
            navigation.navigate('Home');
    };


    const confirmSend = () => {

        console.log(data);
       setModalVisible(true);
       sendTransfertRequest(data).then((response) => {

            setTitle('transaction.transfercomplete');
            setMessage('');
            setStatut(true);
            setModalVisible(false);
            setCompleteModalOpen(true);


        }).catch((error) => {

           // console.log(error.response.data);
            setTitle('transaction.transferfailed');
            setStatut(false);
            setModalVisible(false);
            setCompleteModalOpen(true);

            if (error.response.data.statusCode === 401) {

                if (error.response.data.message === 'insufficient balance') {
                    /*Toast.show({
                        type: 'error',
                        text1: t('Error'),
                        text2: t('transaction.transfercompletedsuccessfully'),
                        position: 'top',
                    });*/
                    setMessage('transaction.insufficientbalance');
                }

                else if (error.response.data.message === 'client to not found') {
                    /*Toast.show({
                        type: 'error',
                        text1: t('Error'),
                        text2: t('transaction.customeraccountisnotvalidated'),
                        position: 'top',
                    });*/
                    setMessage('transaction.customeraccountisnotvalidated');
                }

                else if (error.response.data.message === 'compte from not found') {
                    /*Toast.show({
                        type: 'error',
                        text1: t('Error'),
                        text2: t('transaction.issueraccoundclosed'),
                        position: 'top',
                    });*/
                    setMessage('transaction.issueraccoundclosed');
                }

                else if (error.response.data.message === 'compte to not found') {
                    /*Toast.show({
                        type: 'error',
                        text1: t('Error'),
                        text2: t('transaction.benefclosedaccount'),
                        position: 'top',
                    });*/
                    setMessage('transaction.benefclosedaccount');
                }

                else if (error.response.data.message === 'montant limite par transfert dépassé') {
                    setMessage('transaction.amountexceedsauthorizedlimit');
                }

                else if (error.response.data.message === 'montant limite journalier depassé') {
                    setMessage('transaction.limithasbeenreached');
                }

                else if (error.response.data.message === 'nombre de transfert depassé') {
                    setMessage('transaction.Dailytransferlimitreached');
                }


            }


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

                <Text style={styles.title}>{t('transaction.Summaryofyourtransfer')}</Text>

                    <View style={{ marginTop: 30, borderBottomColor: Colors.background, borderBottomWidth: 1, paddingVertical: 20 }}>
                        <RecipiantAmount
                            name={benef?.prenoms}
                            amount={(Number(amount) * rate).toFixed(2).toString()}
                            currency={benefAccount.compte.devise}
                        />
                    </View>

                    <View style={{ marginTop: 0, borderBottomColor: Colors.background, borderBottomWidth: 1, paddingVertical: 20 }}>
                        <TransactionFee
                            amount={(Number(amount) * 0 / 100).toFixed(2).toString()}
                            currency={account.compte.devise}
                        />
                    </View>


                    <View style={{ marginTop: 0, borderBottomColor: Colors.background, borderBottomWidth: 1, paddingVertical: 20 }}>
                        <TotalToPay
                            amount={(Number(amount) + Number(amount) * 0 / 100).toFixed(2).toString()}
                            currency={account.compte.devise}
                        />
                    </View>

                    {/*<View style={{ marginTop: 30, flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                            <Checkbox
                                status={checked ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setChecked(!checked);
                                }}
                                color={Colors.primary}
                            />

                        <Text style={{ color: Colors.text }}>{t('transaction.confirmmsg')} </Text>

                    </View>*/}


            </ScrollView>


            <View style={{ justifyContent: 'flex-end', marginBottom: 0, }}>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View style={{ flex: 1 }}>
                    <TouchableOpacity style={styles.addbutton} onPress={() => { send(); }}>
                        <Text style={styles.addbuttonText}>{t('transaction.Confirmthetransfer')}</Text>
                        </TouchableOpacity>
                 </View>
                </View>

            </View>


            <LoadingModal
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
            />


            <StatutModal
                completeModalOpen= {completeModalOpen}
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

    closebuttonText : {
        fontWeight: 'bold',
        color: Colors.text,
        fontSize: 16,
    },

});


export default ConfirmTransfert;



