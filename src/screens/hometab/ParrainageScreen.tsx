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
    Clipboard,
    Linking,

} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../../themes';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import QrCodeModal from '../../components/QrCodeModal';
import AvartarButton from '../../components/connected/AvartarButton';
import { Share, Button } from 'react-native';


function ParrainageScreen({ navigation }: { navigation: any }) {


    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = React.useState(false);
    const user = useSelector((state: any) => state.profil.user);
    const [filePath, setFilePath] = React.useState(null);
    const [code, setCode] = React.useState(user.client.parrainCode.codeParrainage);

    const handleCopy = () => {
        Clipboard.setString(code); // Copy the text to clipboard
    };


    const shareDeepLink = async () => {
        try {
            const result = await Share.share({
                message: 'Open this link: myapp://open/screen1',
            });

            if (result.action === Share.sharedAction) {
                console.log('Link shared');
            }
        } catch (error) {
            console.error(error.message);
        }
    };



    const whatsappShare = async () => {

        const message = encodeURIComponent(
            `Telécharger l'application HPay hpayapp://open/screen1 et utilisé mon code de parrainage HPAY_45453 et beneficier d'un bonus de 10$`
        );

        const url = `whatsapp://send?text=${message}`;
        Linking.openURL(url);



        /*const shareOptions = {
            title: 'Share via',
            message: 'some message',
            url: 'some share url',
            social: Share.Social.WHATSAPP,
            whatsAppNumber: "9199999999",  // country code + phone number
            filename: 'test', // only for base64 file in Android
        };

        try {
            const result = await Share.shareSingle(shareOptions);
            console.log('Share success:', result);
        } catch (error) {
            console.log('Error =>', error);
        }*/
    };




    return (
        <View style={styles.main}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                <AvartarButton
                    prenom={user.client.prenoms}
                    profilUrl={user.client.photoClient}
                />

                <View >


                </View>
            </View>

            <ScrollView>
                <View style={{ marginTop: 0 }}>
                    <Text style={styles.title}>{t('sponsorTab.sponsorship')} </Text>
                    {/*<Text style={styles.subtitle}>Partager votre code de parrainage à vos amis.Vous gagnez des points de recompenses  lorsqu'un nouveau membre s'incrit avec le code.  </Text>*/}
                </View>

                <View style={styles.card}>

                    <Text style={{ fontSize: 16, color: Colors.text, paddingVertical:15, fontWeight:'bold' }}>
                        {t('sponsorTab.shareyourcode')}
                    </Text>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: '#ffffff',
                        height: 55,
                        borderRadius: 10,
                        paddingHorizontal : 10,
                    }}>

                        <View>
                            <Text style={{ color: Colors.text, fontSize:16 }}>{code}</Text>
                        </View>

                        <TouchableOpacity onPress={() => { handleCopy(); }  }>
                            <Ionicons name="copy-outline" size={22} color={Colors.text} />
                        </TouchableOpacity>

                    </View>


                    <View style={{ flexDirection: 'row', marginTop: 20, justifyContent:'center' }}>

                        <TouchableOpacity style={[styles.shareButton, { backgroundColor: '#25d366' }]} onPress={() => { whatsappShare(); } }>
                            <Ionicons name="logo-whatsapp" size={25} color="#ffffff" />
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.shareButton, { backgroundColor: '#003366' }]}>
                            <MaterialCommunityIcons name="message-text-outline" size={25} color="#ffffff" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.shareButton} onPress={() => { setModalVisible(true); }}>
                            <Ionicons name="qr-code-outline" size={25} color={Colors.text} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.shareButton} onPress={() => { shareDeepLink(); } }>
                            <Ionicons name="share-social-outline" size={25} color={Colors.text} />
                        </TouchableOpacity>

                    </View>


                </View>

                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    marginTop: 40,
                    marginBottom: 20,
                    borderWidth: 0.8,
                    borderColor: Colors.background,
                    height: 70,
                    padding: 10,
                    alignItems: 'center',
                    borderRadius: 10,
                }}>
                    <View style={{ flex: 1, }}>
                        <View style={{
                            backgroundColor: Colors.background,
                            height: 40,
                            width: 40,
                            borderRadius:20,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <FontAwesome5 name="coins" color={Colors.text} size={22} />
                        </View>
                    </View>

                    <View style={{ flex: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: Colors.text, fontSize:16, fontWeight:'bold' }}>Total gagné</Text>
                        <Text style={{ color: Colors.text, fontSize: 16 }} >0.0 HPC</Text>
                    </View>
                </View>

            </ScrollView>


            <QrCodeModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
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
        paddingVertical: 10,
    },

    title: {
        color: Colors.text,
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'left',
        paddingVertical: 5,
        marginTop: 10,
    },

    subtitle: {
        color: Colors.text,
        textAlign: 'left',
        paddingVertical: 5,
        marginTop: 0,
        fontSize:14,
    },

    avatarImage: {
        height: 100,
        width: 100,
        overflow: 'hidden',
        borderColor: Colors.primary,
        borderWidth: 1,
        borderRadius: 30,
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

    card: {
        backgroundColor: '#e6e4e0',
        padding: 20,
        marginTop: 20,
        borderRadius:10,
    },

    shareButton: {
        backgroundColor: '#ffffff',
        height: 50,
        width: 50,
        margin: 10,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent:'center',
    },


});


export default ParrainageScreen;
