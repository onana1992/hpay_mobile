/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, View, Image, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import { Colors } from '../themes';
import { useTranslation } from 'react-i18next';
import { ApiContext } from '../../App';


type PropType = {
    isVisible: boolean,
    onClose: () => void,
    referees: any[]
}




export default function RefereeModal({ isVisible, onClose, referees }: PropType) {

    const { t } = useTranslation();
    const { photoUrl } = React.useContext(ApiContext);

    const getPhotoUrl = (name: string) => {
        return photoUrl + '/' + name;
    };

    function getInitials(phrase: string) {
        const words = phrase.split(' '); // Divise la phrase en mots
        if (words.length < 2) {
            // Si la phrase a moins de 2 mots, retourner les initiales du premier mot
            return words[0][0].toUpperCase();
        }

        // Retourne les initiales des deux premiers mots en majuscule
        return words[0][0].toUpperCase() + words[1][0].toUpperCase();
    }



    return (
        <Modal
            isVisible={isVisible}
            onBackButtonPress={onClose}
            onBackdropPress={onClose}
            onSwipeComplete={onClose} // Handle swipe to close
            swipeDirection={['down']}
            animationIn="slideInUp" // Optional: animation for modal entry
            animationOut="slideOutDown" // Optional: animation for modal exit
            style={styles.modal}>
            <SafeAreaView style={styles.content}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 0 }}>
                    <View style={{ height: 5, width: 40, borderRadius: 5, backgroundColor: Colors.background }}>
                    </View>
                </View>


                <View style={{ marginTop: 10, marginBottom:20 }}>
                    <Text style={styles.title}>{t('sponsorTab.yoursponsoredcustomers')}</Text>
                </View>

                <FlatList
                    data={referees}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.item} >

                            <View style={{ flexDirection: 'row' }}>

                                <View style={{ flex: 1 }}>
                                    <View style={styles.benefavatar}>
                                        {item.photoClient != null ?
                                            <Image
                                                source={{ uri: getPhotoUrl(item.photoClient) }}
                                                style={styles.avatarImage}
                                            />
                                            :
                                            <View>
                                                <Text style={{ color: Colors.text, fontWeight: 'bold', fontSize: 16 }}>{getInitials(item.prenoms)}</Text>
                                            </View>
                                        }
                                    </View>
                                </View>


                                <View style={{ flex: 3 }}>
                                    <Text style={styles.name}>{item.prenoms} {item.nom}</Text>
                                    <Text style={styles.phone}>{item.telephone}</Text>
                                </View>

                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Ionicons name="chevron-forward-outline" size={16} color={Colors.gray} />
                                </View>

                            </View>

                        </TouchableOpacity>
                    )}

                />

            </SafeAreaView>
        </Modal>
    );
}

const styles = StyleSheet.create({

    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },

    content: {
        backgroundColor: '#ffffff',
        padding: 20,
        height: 490,
    },


    title: {
        color: Colors.text,
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'left',
        paddingVertical: 5,
    },

    avatar: {
        width: 40,
        height: 40,
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e6e4e0',
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
    },

    display: {
        marginTop: 5,
        padding: 5,
        backgroundColor: Colors.background,
        borderRadius: 20,
    },

    item: {
        paddingVertical: 10,
    },

    name: {
        fontWeight: 'bold',
        fontSize: 16,
        color: Colors.text,
    },

    phone: {
        fontSize: 12,
        color: 'gray',
    },


    benefavatar: {
        width: 50,
        height: 50,
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },


    avatarImage: {
        width: 50,
        height: 50,
        overflow: 'hidden',
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderRadius: 25,
    },

    emptycard: {
        backgroundColor: '#e6e4e0',
        padding: 20,
        borderRadius: 10,
        height: 160,
        alignItems: 'center',
        justifyContent: 'center',
    },


});