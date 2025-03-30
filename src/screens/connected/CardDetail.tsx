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
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useRoute } from '@react-navigation/native';



function CardDetail({ navigation }: { navigation: any }) {


    const route = useRoute<any>();
    const { account } = route.params;

    console.log(account);


    const cancel = () => {
        navigation.goBack();
    };


    const deleteCard = () => {
        Alert.alert('', 'Voulez-vous vraiment retirer cette carte ?', [
            {
                text: 'Non',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Oui', onPress: () => confirmDelete() },
        ]);
    };


    const confirmDelete = () => {
        
    }



    const EmptyCard = () => {
        return (
            <View style={styles.emptycard}>

                <View style={{ flex: 1, flexDirection:'row' }}>
                    <View style={{ flex: 1, flexDirection: 'row', height: 40, alignItems: 'flex-start' }}>
                        <Image
                            source={account.icon}
                            style={{
                                height: 40,
                                width: 40,
                                overflow: 'hidden',
                                borderWidth: 1,
                                borderRadius: 20,
                            }}
                        />
                        {/*<Text style={{ marginLeft: 5, fontWeight: 'bold', fontSize: 17, color: Colors.text }}>
                             {account.compte.devise}
                        </Text>*/}

                     </View>
                </View>


                <View style={{flex:3, alignItems:'center', justifyContent:'center'}}>
                    <Text style={{ color: Colors.text }}> Aucune carte enregistrée </Text>
                </View>

               
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
                    <Text style={styles.title}>Carte</Text>
                </View>

                <View>

                    <View style={{ paddingVertical: 20 }}>
                        <Text style={{
                            color: Colors.text,
                            fontSize: 22,
                            fontWeight: 'bold'
                        }}>Gestion de la carte </Text>
                    </View>


                    <TouchableOpacity style={styles.addrow} onPress={() => { navigation.navigate('AddCardScreen', {account :account}); }} >

                        <View style={{
                            flex: 1,
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                        }}>
                            <View style={{
                                borderColor: Colors.background,
                                borderWidth: 1,
                                height: 40,
                                width: 40,
                                borderRadius: 20,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <AntDesign name="plus" size={22} color={Colors.text} />
                            </View>

                        </View>

                        <View style={{
                            flex: 3,
                            alignItems: 'flex-start',
                            justifyContent: 'center'
                        }}>
                            <Text style={styles.addrowText}>Ajouter une carte à votre compte</Text>
                        </View>

                        <View style={{
                            flex: 1,
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                        }}>
                            <Ionicons name="chevron-forward-outline" size={16} color={Colors.gray} />
                        </View>
                    </TouchableOpacity>



                    <TouchableOpacity style={styles.addrow} onPress={() => { navigation.navigate('ModifierCardScreen', { account: account }); }} >

                        <View style={{
                            flex: 1,
                            alignItems: 'flex-start',
                            justifyContent: 'center'
                        }}>
                            <View style={{
                                borderColor: Colors.background,
                                borderWidth: 1,
                                height: 40,
                                width: 40,
                                borderRadius: 20,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <AntDesign name="shrink" size={22} color={Colors.text} />
                            </View>

                        </View>

                        <View style={{
                            flex: 3,
                            alignItems: 'flex-start',
                            justifyContent: 'center'
                        }}>
                            <Text style={styles.addrowText}>Modifier la carte lié à votre compte</Text>
                        </View>

                        <View style={{
                            flex: 1,
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                        }}>
                            <Ionicons name="chevron-forward-outline" size={16} color={Colors.gray} />
                        </View>
                    </TouchableOpacity>



                    <TouchableOpacity
                        style={styles.addrow}
                        onPress={() => { deleteCard() }} >

                        <View style={{
                            flex: 1,
                            alignItems: 'flex-start',
                            justifyContent: 'center'
                        }}>
                            <View style={{
                                borderColor: Colors.background,
                                borderWidth: 1,
                                height: 40,
                                width: 40,
                                borderRadius: 20,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <AntDesign name="delete" size={22} color={Colors.text} />
                            </View>

                        </View>

                        <View style={{
                            flex: 3,
                            alignItems: 'flex-start',
                            justifyContent: 'center'
                        }}>
                            <Text style={styles.addrowText}> Supprimer la carte </Text>
                        </View>

                        <View style={{
                            flex: 1,
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                        }}>
                            <Ionicons name="chevron-forward-outline" size={16} color={Colors.gray} />
                        </View>
                    </TouchableOpacity>




                    <TouchableOpacity style={styles.addrow} onPress={() => { navigation.navigate('ModifyCardPinScreen', { account: account }); }} >

                        <View style={{
                            flex: 1,
                            alignItems: 'flex-start',
                            justifyContent: 'center'
                        }}>
                            <View style={{
                                borderColor: Colors.background,
                                borderWidth: 1,
                                height: 40,
                                width: 40,
                                borderRadius: 20,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Feather name="code" size={22} color={Colors.text} />
                            </View>

                        </View>

                        <View style={{
                            flex: 3,
                            alignItems: 'flex-start',
                            justifyContent: 'center'
                        }}>
                            <Text style={styles.addrowText}>Modifier le code Pin</Text>
                        </View>

                        <View style={{
                            flex: 1,
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                        }}>
                            <Ionicons name="chevron-forward-outline" size={16} color={Colors.gray} />
                        </View>
                    </TouchableOpacity>


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


    addrow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
    },

    addrowText: {
        fontSize: 16,
        color: Colors.text,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
    }


});


export default CardDetail;
