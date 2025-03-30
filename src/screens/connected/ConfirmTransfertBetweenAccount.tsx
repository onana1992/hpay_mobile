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
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../themes';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import TransactionFee from '../../components/transaction/TransactionFee';
import TotalToPay from '../../components/transaction/TotalToPay';


function ConfirmTransfertBetweenAccount({ navigation }: { navigation: any }) {

    const route = useRoute<any>();
    

    console.log(route.params)
    const { benef, amount, account, benefAccount, rate } = route.params;


    const send = () => {
      //  console.log("envois")
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

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>

                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ marginRight: 10 }}>
                                    <View style={{
                                        backgroundColor: Colors.background,
                                        height: 40,
                                        width: 40,
                                        borderRadius: 20,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <FontAwesome5 name="coins" color={Colors.text} size={22} />
                                    </View>
                                </View>
                                <View>
                                    <Text style={{ color: Colors.text, fontWeight: 'bold' }}>Montant transféré </Text>
                                    <Text style={{ color: Colors.text, fontWeight: 'bold' }}>En {benefAccount.compte.devise}</Text>
                                </View>
                            </View>
                        </View>

                        <View>
                            <Text style={{ color: Colors.text, fontWeight: 'bold' }}>{amount} {benefAccount.compte.devise}</Text>
                        </View>

                    </View>

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


export default ConfirmTransfertBetweenAccount;



