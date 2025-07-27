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
import { executeSochitelTransaction, sendTransfertRequest } from '../../services/request';
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

    const { t } = useTranslation();
    const route = useRoute<any>();
    const [visible, setVisible] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    const { country, operator, service, account, telephone, amount, rate, samount, fixedAmount } = route.params;
    const [statut, setStatut] = React.useState(true);
    const [title, setTitle] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [completeModalOpen, setCompleteModalOpen] = React.useState(false);

    // console.log(account.compte.idCompte);

    const closeModal = () => {
        setCompleteModalOpen(false);
        navigation.navigate('Home');
    };

    const submit = () => {

        Alert.alert(t('transaction.Confirmthetransfer'), t('transaction.confirmmsg'), [
            {
                text: t('cancel'),
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: t('send'), onPress: () => confirmSend() },
        ]);

    };

    const confirmSend = () => {


        let montant = 0;

        if (fixedAmount) {
            montant = samount;
        } else {
            montant = (Number(amount) / Number(rate.realRate)).toFixed(2);
        }


        setModalVisible(true);
        executeSochitelTransaction(
            operator.operator_id,
            service.product_id,
            montant,
            telephone,
            '12345878879'
        ).then((response) => {

            console.log(response.data);

            if (response.data.success === true) {

                setTitle('transaction.transfercomplete');
                setMessage('');
                setStatut(true);
                setModalVisible(false);
                setCompleteModalOpen(true);


            } else {

               /* setTitle('transaction.transferfailed');
                setStatut(false);
                setModalVisible(false);
                setCompleteModalOpen(true);
                setMessage('');*/
            }


        }).catch((error) => {

            console.log(error);
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
                                    <Text style={{ color: Colors.text, fontWeight: 'bold' }}>{t('BuyScreen.amount')}</Text>
                                </View>
                            </View>
                        </View>

                        <View>
                            {
                                fixedAmount ?
                                    <View>
                                        <Text style={{ color: Colors.text, textAlign: 'right' }}>{(Number(samount) * rate.realRate).toFixed(2)} {account.compte.devise} </Text>
                                        <Text style={{ color: Colors.text, textAlign: 'right' }}> {samount} {service?.currency_operator}</Text>
                                    </View>
                                    :
                                    <View>
                                        <Text style={{ color: Colors.text, textAlign: 'right' }}> {amount} {account.compte.devise}</Text>
                                        <Text style={{ color: Colors.text, textAlign: 'right' }}>{(Number(amount) / rate.realRate).toFixed(2)} {service?.currency_operator} </Text>
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



