/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import { Colors } from '../../themes';
import { useTranslation } from 'react-i18next';



type PropType = {
    isVisible: boolean,
    onClose: () => void,
    qrcode: string,
    devise:string
}


export default function AccountQrCode({ isVisible, onClose, qrcode, devise }: PropType) {

    const { t, i18n } = useTranslation();
    //console.log(qrcode)


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


                <View style={{ marginTop: 10 }}>
                    <Text style={styles.title}>Code QR de votre compte {devise} </Text>
                </View>

                <View style={{ alignContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <Image
                        source={{ uri: qrcode }}
                        style={styles.QRImage}
                    />
                </View>

                <View style={{ marginTop: 10, alignItems: 'center' }}>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 16,
                        color: Colors.text
                    }}>
                        Invitez le marchand à scanner votre code QR afin d'effectuer un dépot ou un paiement sur votre compte
                    </Text>
                </View>

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
        height: 470,
    },


    QRImage: {
        height: 250,
        width: 250,
        overflow: 'hidden',
    },


    title: {
        color: Colors.text,
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'left',
        paddingVertical: 5,
    },


});