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
import { saveBenef } from '../../store/profilSlice';
import { useSelector } from 'react-redux';
import ChangeRate from '../../components/transaction/ChangeRate';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TransactionFee from '../../components/transaction/TransactionFee';
import TotalToPay from '../../components/transaction/TotalToPay';
import { currencyRateRequest } from '../../services/request';
import RecipiantAmount from '../../components/transaction/RecipiantAmount';


function ConfirmTransfert({ navigation }: { navigation: any }) {

    const route = useRoute<any>();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [visible, setVisible] = React.useState(false);
    const [langageModalvisible, setLangageModalvisible] = React.useState(false);
    const accounts = useSelector((state: any) => state.profil.accounts);
    const [benefaccounts, setBenefAccounts] = React.useState<any[]>([]);
    const [benefAmount, setBenefAmount] = React.useState<string>("0.00");

    console.log(route.params)
    const {benef, amount, account, benefAccount, rate } = route.params;


    const send = () => {
        console.log("envois")
    }
   

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

                <Text style={styles.title}>Récapitulatif de votre transfert</Text>

                

                

                    <View style={{ marginTop: 30, borderBottomColor: Colors.background, borderBottomWidth: 1, paddingVertical: 20 }}>
                        <RecipiantAmount
                            name={benef?.prenoms}
                            amount={(Number(amount) * rate).toFixed(2).toString()}
                            currency={benefAccount.compte.devise}
                        />
                    </View>

                    <View style={{ marginTop: 0, borderBottomColor: Colors.background, borderBottomWidth: 1, paddingVertical: 20 }}>
                        <TransactionFee
                            amount={(Number(amount) * 0.5 / 10).toFixed(2).toString()}
                            currency={account.compte.devise}
                        />
                    </View>
                


                    <View style={{ marginTop: 0, borderBottomColor: Colors.background, borderBottomWidth: 1, paddingVertical: 20 }}>
                        <TotalToPay
                            amount={(Number(amount) + Number(amount) * 0.5 / 10).toFixed(2).toString()}
                            currency={account.compte.devise}
                        />
                    </View>
                


            </ScrollView>


            <View style={{ justifyContent: 'flex-end', marginBottom: 0, }}>
                
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity style={styles.addbutton} onPress={() => { send() }}>
                                <Text style={styles.addbuttonText}>Confirmer le transfert</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                

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
        fontSize: 26
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


export default ConfirmTransfert;



