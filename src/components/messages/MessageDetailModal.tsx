/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */

import React from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../themes';
import { useTranslation } from 'react-i18next';


type PropType = {
    open: boolean,
    closeModal: (val: boolean) => void,
    message: any
}


const MessageDetailModal = ({ open, closeModal, message }: PropType) => {

    const { t } = useTranslation();

    function transformDateTime(datetime: string) {
        // Créer un objet Date à partir de la chaîne ISO
        const date = new Date(datetime);

        // Extraire la date et l'heure sous forme de chaînes
        const dateString = date.toLocaleDateString('fr-FR');  // Format 'dd/mm/yyyy'
        const timeString = date.toLocaleTimeString('fr-FR');  // Format 'hh:mm:ss'

        // Retourner une chaîne combinée
        return `${dateString}`;

        //  ${ timeString }
    }


    return (
        <Modal
            backdropOpacity={0.8}
            isVisible={open}
            onRequestClose={() => {
                closeModal();
            }}
        >

            <View style={styles.modal}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }} >
                    <TouchableOpacity style={{
                        justifyContent: 'center',
                        backgroundColor: '#e6e4e0',
                        height: 40,
                        width: 40,
                        alignItems: 'center',
                        borderRadius: 20,
                    }} onPress={() => { closeModal(); }} >
                        <View>
                            <Ionicons name="close" color={Colors.text} size={24} />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',marginTop:20 }}>
                    <View style={styles.messageContent}>
                        <Text style={ styles.subject}>{message?.sujet}</Text>
                        <Text style={styles.preview}>{message?.sujetMessage}</Text>
                        <Text style={styles.date}>{transformDateTime(message?.sujetDate)}</Text>
                    </View>
                </View>

                <View style={{ flex: 1, justifyContent: 'flex-end' }}>

                    <View style={{ paddingVertical: 10 }}>
                        <TouchableOpacity style={styles.closebutton} onPress={() => { closeModal(); }}>
                            <Text style={styles.closebuttonText}>{t('transaction.close')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>


        </Modal>
    );
};

const styles = StyleSheet.create({

    modal: {
        width: Dimensions.get('window').width - 0,
        height: Dimensions.get('window').height - 0,
        backgroundColor: 'white',
        alignSelf: 'center',
        padding: 20,
        borderRadius: 10,
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

    messageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.1,
        borderBottomColor:Colors.gray,
        paddingVertical: 10,
    },


    messageContent: {
        flex: 1,
    },

    sender: {
        fontWeight: '600',
        fontSize: 14,
        color: '#2e3a59',
    },

    unread: {
        color: '#007bff',
    },

    subject: {
        fontSize: 22,
        fontWeight: '700',
        color: Colors.text,
        marginTop: 2,
        borderBottomColor: Colors.gray,
    },

    subjectRead: {
        fontSize: 20,
        fontWeight: '400',
        color: Colors.text,
        marginTop: 2,
        borderBottomColor: Colors.gray,
    },

    preview: {
        fontSize: 16,
        color: Colors.text,
        marginTop: 2,
    },

    date: {
        fontSize: 12,
        color: Colors.text,
        marginTop: 6,
    },

});


export default MessageDetailModal;
