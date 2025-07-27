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
    Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../themes';
import { useSelector } from 'react-redux';
import AccountSelect from '../../components/transaction/AccountSelect';
import CopyInput from '../../components/transaction/CopyInput';



function CashInScreen({ navigation }: { navigation: any }) {


    const accounts = useSelector((state: any) => state.profil.accounts);
    const [account, setAccount] = React.useState<any>(accounts[0]);


    const cancel = () => {
        navigation.goBack();
    };

    const confirmCancel = () => {
        navigation.goBack();
    };


    const EmptyCard = () => {

        return (
            <View style={styles.emptycard}>
                <Text style={{ color: Colors.text }}>Aucun message reçu</Text>
            </View>
        );

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
                }} onPress={() => { cancel() }} >
                    <View>
                        <Ionicons name="chevron-back" color={Colors.text} size={24} />
                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView>

                <View style={{}}>
                    <Text style={styles.title}>Recharge via Interac</Text>
                </View>

                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: 16, color: Colors.text, fontWeight: 600 }}>Quel compte souhaitez vous recharger ?</Text>
                </View>

                <AccountSelect
                    account={account}
                    setAccount={setAccount}
                    accounts={accounts}
                    title="Quel compte souhaitez-vous Recharger ?"
                />

               

                <View>
                    <Text style={{ fontSize: 14, color: Colors.text,  }}>
                        Pour effectuer une recharge de votre compte {account.compte.devise} via interac, veuillez utliser les information ci-dessous : 
                    </Text>
                </View>

                <View style= {{ marginTop: 10 }}>
                    <Text style ={{ fontSize: 16, color: Colors.text, fontWeight: 600 }}>Email</Text>
                    <CopyInput
                        value="recharge@hpay.cash"
                    />
                </View>

                
                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 16, color: Colors.text, fontWeight: 600 }}>Question de sécurité</Text>
                    <CopyInput
                        value="1245862467"
                    />
                </View>


                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 16, color: Colors.text, fontWeight: 600 }}>Reponse</Text>
                    <CopyInput
                        value="D78S584"
                    />
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
        paddingVertical: 10
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

    mode: {
        height: 40,
        width: 40,
        overflow: 'hidden',
        borderWidth: 1,
        borderRadius: 20,
    },


});


export default CashInScreen;
