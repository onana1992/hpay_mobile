/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
import React from 'react';
import { SafeAreaView, Text, StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import { Colors } from '../themes';
import { useTranslation } from 'react-i18next';
import QRCode from 'react-native-qrcode-svg';



type PropType = {
    isVisible: boolean,
    onClose: () => void,
    cardNum: string
}


export default function CardQrCode({ isVisible, onClose, cardNum }: PropType) {

    const {t} = useTranslation();

   // console.log(qrcode)


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

                {/*<View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end',  }}>
                    <TouchableOpacity style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 20,
                    }} onPress={() => { onClose(); }} >
                        <View>
                            <Ionicons name="close-outline" color={Colors.text} size={34} />
                        </View>
                    </TouchableOpacity>
                </View>*/}

                <View style={{ marginTop: 10 }}>
                    <Text style={styles.title}>{t('account.cardqrcode')}</Text>
                </View>

                <View style={{ alignContent: 'center', alignItems: 'center', marginTop: 40, marginBottom: 40 }}>
                    <QRCode
                        value={cardNum}
                        size={220} // You can adjust the size of the QR code
                        color="black" // The color of the QR code
                        backgroundColor="white" // The background color
                    />
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
        height: 370,
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