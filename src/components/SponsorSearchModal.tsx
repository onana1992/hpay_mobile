/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
import React from 'react';
import { SafeAreaView, Text, Pressable, StyleSheet, View, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native';
import Modal from 'react-native-modal';
import { Colors } from '../themes';
import { useTranslation } from 'react-i18next';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

//import I18n from 'react-native-i18n';


type PropType = {
    isVisible: boolean,
    onClose: () => void,
}



export default function SponsorSearchModal({ isVisible, onClose }: PropType) {

    const { t } = useTranslation();
    const [code, setCode] = React.useState('');
    const navigation = useNavigation();
    const [filePath, setFilePath] = React.useState<string>('');

    const cancel = () => {
        onClose();
    };

    const next = () => {
        onClose();
        navigation.navigate('PhotoScreen');
    };

    return (
        <Modal
            isVisible={isVisible}
            onBackButtonPress={onClose}
            onBackdropPress={onClose}
            style={styles.modal}>
            <SafeAreaView style={styles.content}>

                <ScrollView>

                    <View style={styles.pageheader}>
                        <Text style={styles.title}>Confirmer l'ajout du parrain</Text>
                        <Text style={styles.subtitle}>
                            Le membre lié au numéro entré a été trouver, veuillez entrer confirme pour l'ajouté comme parrain
                        </Text>
                    </View>

                    <View style={styles.avatar}>
                        <Image
                            source={filePath ? { uri: filePath } : require('../assets/avatar.jpg')}
                            style={styles.avatarImage}
                        />
                        <Text style={{ fontSize: 16, color: Colors.text, fontWeight:'bold' }} >Joe junior Onana</Text>
                        <Text style={{ fontSize: 14, color: Colors.gray }}>+14388833759</Text>
                    </View>



                </ScrollView>



                <View style={styles.footer}>

                    <Button
                        mode="contained"
                        onPress={() => { next(); }}>
                        {t('sponsorship.confirm')}
                    </Button>

                    <Button
                        mode="outlined"
                        onPress={() => { cancel(); }}>
                        {t('sponsorship.cancel')}
                    </Button>

                </View>

            </SafeAreaView>
        </Modal>
    );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },

    content: {
        backgroundColor: '#ffffff',
        width: '100%',
        height: 550,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        padding: 20,
        position: 'relative',
    },

    pageheader: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItem: 'flex-start',
        marginBottom: 30,
        marginTop: 30,
    },

    step: {
        flexDirection: 'row',
        height: 20,
        width: '100%',
    },

    title: {
        color: Colors.text,
        fontSize: 22,
        fontWeight: 500,
        textAlign: 'left',
        paddingVertical: 0,
    },

    subtitle: {
        color: Colors.gray,
        fontSize: 14,
        fontStyle: 'italic',
        marginTop: 0,
    },

    row: {
        flexDirection: 'row',
        marginTop: 4,
    },

    forgot: {
        fontSize: 13,
        color: Colors.text,
    },

    link: {
        fontWeight: 'bold',
        color: Colors.primary,
    },

    footer: {
        position: 'absolute',
        bottom: 10,
        paddingVertical: 10,
        borderRadius: 5,
        width: width,
        paddingHorizontal: 20,
    },

    avatar: {
        alignItems: 'center',
    },

    avatarImage: {
        height: 100,
        width: 100,
        overflow: 'hidden',
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 50,
    },


});