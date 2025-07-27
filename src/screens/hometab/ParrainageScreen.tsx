/* eslint-disable react-hooks/exhaustive-deps */
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../themes';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import QrCodeModal from '../../components/QrCodeModal';
import AvartarButton from '../../components/connected/AvartarButton';
import { Share, Button } from 'react-native';
import { getParrainees } from '../../services/request';
import RefereeModal from '../../components/RefereeModal';
import { ApiContext } from '../../../App';


function ParrainageScreen({ navigation }: { navigation: any }) {


    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = React.useState(false);
    const user = useSelector((state: any) => state.profil.user);
    const [filePath, setFilePath] = React.useState(null);
    const [code, setCode] = React.useState(user.client.parrainCode.codeParrainage);
    const [point, setPoint] = React.useState(0);
    const [nber, setNbre] = React.useState(0);
    const [referees, setReferees] = React.useState([]);
    const [modal1Visible, setModal1Visible] = React.useState(false);
    const { photoUrl } = React.useContext(ApiContext);

    const handleCopy = () => {
        Clipboard.setString(code); // Copy the text to clipboard
    };

    const getPhotoUrl = (name: string) => {
        return photoUrl + '/' + name;
    };


    React.useEffect(() => {
        const HPayAccount = user.client.comptes.find((compte: { typeCompte: { idTypeCompte: number; }; }) =>
            compte.typeCompte && compte.typeCompte.idTypeCompte === 2
        );
        setPoint(HPayAccount.solde);

    }, []);



    React.useEffect(() => {

        getParrainees(user.client.id).then((response) => {

            setNbre(response.data.length);
            setReferees(response.data);

        }).then((error) => {


        });


    }, []);




    const shareDeepLink = async () => {
        try {
            const result = await Share.share({
                message: `Telécharger l'application HPay https://play.google.com/store/apps/details?id=com.hpay.cash&pcampaignid=web_share et utilisé mon code de parrainage ${code} pour  beneficier d'un bonus de ....`
,
            });

            if (result.action === Share.sharedAction) {
               // console.log('Link shared');
            }
        } catch (error) {
            //console.error(error.message);
        }
    };



    const whatsappShare = async () => {

        const message = encodeURIComponent(
            `Telécharger l'application HPay https://play.google.com/store/apps/details?id=com.hpay.cash&pcampaignid=web_share et utilisé mon code de parrainage ${code} pour  beneficier d'un bonus de ....`
        );

        const url = `whatsapp://send?text=${message}`;
        Linking.openURL(url);
    };


    const shareBySMS = () => {
        const message = `Telécharger l'application HPay https://play.google.com/store/apps/details?id=com.hpay.cash&pcampaignid=web_share et utilisé mon code de parrainage ${code} pour  beneficier d'un bonus de ....`;
        const url = `sms:?body=${encodeURIComponent(message)}`;
        Linking.openURL(url);
    };


    return (
        <View style={styles.main}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                <AvartarButton
                    prenom={user.client.prenoms}
                    profilUrl={getPhotoUrl(user.client.photoClient)}
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

                        <TouchableOpacity style={[styles.shareButton, { backgroundColor: '#25d366' }]} onPress={() => { whatsappShare(); }}>
                            <Ionicons name="logo-whatsapp" size={25} color="#ffffff" />
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.shareButton, { backgroundColor: '#003366' }]} onPress={() => { shareBySMS(); }}>
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


                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        width: '100%',
                        marginTop: 40,
                        marginBottom: 10,
                        borderWidth: 0.8,
                        borderColor: Colors.text,
                        height: 70,
                        padding: 10,
                        alignItems: 'center',
                        borderRadius: 10,
                    }}
                    disabled={nber === 0}
                    onPress={() => { setModal1Visible(true);}}
                >
                    <View style={{ flex: 1, }}>
                        <View style={{
                            backgroundColor: Colors.background,
                            height: 40,
                            width: 40,
                            borderRadius: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <FontAwesome name="users" color={Colors.text} size={22} />
                        </View>
                    </View>

                    <View style={{ flex: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                        {nber > 1 && <Text style={{ color: Colors.text, fontSize: 16, fontWeight: 'bold' }}> {nber} {t('sponsorTab.referredcustomers')}</Text>}
                        { (nber === 0 || nber === 1)  && <Text style={{ color: Colors.text, fontSize: 16, fontWeight: 'bold' }}> {nber} {t('sponsorTab.referredcustomer')}</Text>}
                        <Text style={{ color: Colors.text, fontSize: 16 }} > <MaterialIcons name="chevron-right" color={Colors.text} size={22} /> </Text>
                    </View>


                </TouchableOpacity>

                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    marginTop: 10,
                    marginBottom: 20,
                    borderWidth: 0.8,
                    borderColor: Colors.text,
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
                            borderRadius: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <FontAwesome5 name="coins" color={Colors.text} size={22} />
                        </View>
                    </View>

                    <View style={{ flex: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: Colors.text, fontSize: 16, fontWeight: 'bold' }}>{t('sponsorTab.totalwon')}</Text>
                        <Text style={{ color: Colors.text, fontSize: 16 }} > {point.toFixed(2)} HPC</Text>
                    </View>

                </View>

            </ScrollView>


            <QrCodeModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                qrcode={user.client.parrainCode.qrcode}
            />

            <RefereeModal
                isVisible={modal1Visible}
                onClose={() => setModal1Visible(false)}
                referees={referees}
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
