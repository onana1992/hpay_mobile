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
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AccountSelect from '../../components/transaction/AccountSelect';
import CopyInput from '../../components/transaction/CopyInput';
import AccountQrCode from '../../components/transaction/AccountQrCode';



function SellerCashInScreen({ navigation }: { navigation: any }) {

    const user = useSelector((state: any) => state.profil.user);
    const accounts = useSelector((state: any) => state.profil.accounts);
    const [account, setAccount] = React.useState<any>(accounts[0]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [code, setCode] = React.useState(user.client.parrainCode.codeParrainage);



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
                    <Text style={styles.title}>Recharge en espèce</Text>
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

                {/*<View style={{ marginTop: 10, borderBottomColor: Colors.background, borderBottomWidth: 1, paddingBottom: 15 }}>
                    <Text style={{ fontSize: 16, color: Colors.text, fontWeight: 600 }}>Instructions</Text>
                </View>*/}

                <View>
                    <Text style={{ fontSize: 14, color: Colors.text, }}>
                        Pour effectuer une recharge en espèce de votre compte  {account.compte.devise}, veuillez vous rendre chez un de nos marchand et
                        présenté le code QR associer au compte:
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


export default SellerCashInScreen;
