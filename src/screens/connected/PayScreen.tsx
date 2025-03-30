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
import { useSelector, useDispatch } from 'react-redux';
import AccountSelect from '../../components/transaction/AccountSelect';
import AccountQrCode from '../../components/transaction/AccountQrCode';
import { useRoute } from '@react-navigation/native';



function PayScreen({ navigation }: { navigation: any }) {

    const route = useRoute<any>();
    const { accountParm } = route.params || { id: 0 };
    const user = useSelector((state: any) => state.profil.user);
    const accounts = useSelector((state: any) => state.profil.accounts);
    const [account, setAccount] = React.useState<any>(accounts[0]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [code, setCode] = React.useState(user.client.parrainCode.codeParrainage);


    React.useEffect(() => {

        if (accountParm) {
            setAccount(accountParm);
        }

    }, []);


    const cancel = () => {
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
                    <Text style={styles.title}>Effectuer un paiement</Text>
                </View>

                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: 16, color: Colors.text, fontWeight: 600 }}>Quel compte souhaitez vous effectuer le paiement ?</Text>
                </View>

                <AccountSelect
                    account={account}
                    setAccount={setAccount}
                    accounts={accounts}
                    title="Quel compte souhaitez-vous Recharger ?"
                />

                {/*<View style={{ marginTop: 10, borderBottomColor: Colors.background, borderBottomWidth: 1, paddingBottom: 15 }}>
                    <Text style={{ fontSize: 16, color: Colors.text, fontWeight: 600 }}>Instructions</Text>
                </View>*/}

                <View>
                    <Text style={{ fontSize: 14, color: Colors.text, }}>
                        Pour effectuer une paiement via votre compte en devise  {account.compte.devise}, veuillez présenter au marchand 
                        le code QR associer au compte:
                    </Text>
                </View>

            </ScrollView>

            <View style={{ justifyContent: 'flex-end', marginBottom: 0, }}>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={styles.addbutton} onPress={() => { setModalVisible(true); }}>
                            <Text style={styles.addbuttonText}>Afficher le code QR</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <AccountQrCode
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                devise={account.compte.devise}
                qrcode={user.client.parrainCode.qrcode}
            />
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

    addbutton: {
        height: 50,
        backgroundColor: Colors.primary,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },



    addbuttonText: {
        fontWeight: 'bold',
        color: '#ffffff',
        fontSize: 16,
    },


});


export default PayScreen;
