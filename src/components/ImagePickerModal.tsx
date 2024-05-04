/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
import React from 'react';
import { SafeAreaView, Text, Pressable, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import { Colors } from '../themes'
//import I18n from 'react-native-i18n';


type PropType = {
    isVisible: boolean,
    onClose: () => void,
    captureImage: (photo: string) => {},
    chooseFile: () => void
}

export default function ImagePickerModal({ isVisible, onClose, captureImage, chooseFile }: PropType) {
    return (
        <Modal
            isVisible={isVisible}
            onBackButtonPress={onClose}
            onBackdropPress={onClose}
            style={styles.modal}>
            <SafeAreaView style={styles.buttons}>
                <Pressable style={styles.button} onPress={() => { chooseFile('photo'); }}>
                    <Ionicons style={styles.buttonIcon} name="image-sharp" size={30} color={Colors.primary} />
                    <Text style={styles.buttonText}>Galerie</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => { captureImage('photo'); }}>
                    <Ionicons style={styles.buttonIcon} name="camera" size={30} color={Colors.primary} />
                    <Text style={styles.buttonText}>Camera</Text>
                </Pressable>
            </SafeAreaView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },

    buttonIcon: {
        width: 30,
        height: 30,
        margin: 5,
    },

    buttons: {
        backgroundColor: 'white',
        flexDirection: 'row',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },

    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        fontSize: 14,
        fontWeight: '500',
        color: 'black',

    },
});