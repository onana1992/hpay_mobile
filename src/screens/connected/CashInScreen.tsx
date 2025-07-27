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
import AccountSelect from '../../components/transaction/AccountSelect';
import { useRoute } from '@react-navigation/native';



function CashInScreen({ navigation }: { navigation: any }) {

    const route = useRoute<any>();
    const { accountParm } = route.params || {id:0};
    const accounts = useSelector((state: any) => state.profil.accounts);
    const [account, setAccount] = React.useState<any>(accounts[0]);


   React.useEffect(() => {

        if (accountParm) {
            setAccount(accountParm);
        }

    }, []);


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
                        <Ionicons name="close" color={Colors.text} size={24} />
                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView>

                <View style={{}}>
                    <Text style={styles.title}>Ajoutez de l'argent</Text>
                </View>

                <View style={{marginTop:10}}>
                    <Text style={{ fontSize: 16, color: Colors.text, fontWeight: 600 }}>Quel compte souhaitez vous recharger ?</Text>
                </View>

                <AccountSelect
                    account={account}
                    setAccount={setAccount}
                    accounts={accounts}
                    title="Quel compte souhaitez-vous Recharger ?"
                />


                <View style={{ marginTop: 10, borderBottomColor: Colors.background , borderBottomWidth:1, paddingBottom:15}}>
                    <Text style={{ fontSize: 16, color: Colors.text, fontWeight: 600 }}>Choissez un mode recharge</Text>
                </View>


                <TouchableOpacity style={{
                    flexDirection: 'row',
                    flex: 1,
                    padding: 5,
                    marginTop: 10,
                    alignItems: 'center'
                }}
                    onPress={() => {navigation.navigate('InteractCashinScreen')}} 
                >
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <Image source={ require('../../assets/interrac.jpg') } style={styles.mode} />
                    </View>

                    <View style={{  flex: 4 , }}>
                        <Text style={{ fontWeight: 'bold', color: Colors.text }}>VIREMENT INTERAC</Text>
                        <Text style={{  color: Colors.text }}>Disponible dans les 5 minutes.</Text>
                    </View>

                    <View style={{ flexDirection: 'row', flex: 1,justifyContent:'flex-end' }}>
                        <Text style={{ fontWeight: 'bold', color: Colors.text }}>
                            <Feather name="chevron-right" size={18} color={Colors.gray} />
                        </Text>
                    </View>
                </TouchableOpacity>



                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        flex: 1,
                        padding: 5,
                        marginTop: 20,
                        alignItems: 'center'
                    }} onPress={() => { navigation.navigate('SellerCashInScreen') }}>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <View style={{
                            width: 40,
                            height: 40,
                            backgroundColor: Colors.background,
                            borderRadius: 20,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Ionicons name="storefront-outline" size={22} color={Colors.text} />
                         </View>
                    </View>

                    <View style={{ flex: 4, }}>
                        <Text style={{ fontWeight: 'bold', color: Colors.text }}>RECHARGEMENT EN ESPÈCE </Text>
                        <Text style={{ color: Colors.text }}>Disponible instananément.</Text>
                    </View>

                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
                        <Text style={{ fontWeight: 'bold', color: Colors.text }}>
                            <Feather name="chevron-right" size={18} color={Colors.gray} />
                        </Text>
                    </View>
                </TouchableOpacity>

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
