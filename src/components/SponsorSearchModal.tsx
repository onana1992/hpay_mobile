/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
import React from 'react';
import { SafeAreaView, Text,  StyleSheet, View, Dimensions, ScrollView, Image } from 'react-native';
import Modal from 'react-native-modal';
import { Colors } from '../themes';
import { useTranslation } from 'react-i18next';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { addParrain } from '../services/request';
import LoadingModal from './LoadingModal';
import Toast from 'react-native-toast-message';


//import I18n from 'react-native-i18n';


type PropType = {
    isVisible: boolean,
    onClose: () => void,
    client: any,
    phone:string
}



export default function SponsorSearchModal({ isVisible, onClose, client, phone }: PropType) {

    console.log(client?.username);

    const { t } = useTranslation();
    const navigation = useNavigation();
    const url = client?.client.photoClient == null ? '' : client.client.photoClient;
    const [filePath, setFilePath] = React.useState<string>('');
    const [modalVisible, setModalVisible] = React.useState(false);



    React.useEffect(() => {
        var updatedUrl = null;
        if (url !== null) {
            updatedUrl = url.replace("localhost", "10.0.0.133");
             setFilePath(updatedUrl);
        } else {
            updatedUrl = null;
        }

    }, [isVisible]);


    const cancel = () => {
        onClose();
    };


    const lauchAdd = () => {

        setModalVisible(true);
        addParrain(phone,client?.username).then((response: any) => {

            // console.log(response)
            setModalVisible(false);
            navigation.popToTop();

        }).catch((_error: any) => {

            console.log(_error.response.data);
            setModalVisible(false);

            if (_error.response.data.statusCode === 404) {
                Toast.show({
                    type: 'error',
                    text1: t('sponsorship.failure'),
                    text2: t('sponsorship.sponsorshipalreadyaexist'),
                    position: 'top',
                });
            } else {


            }

        });

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
                        <Text style={styles.title}>{t('sponsorship.confirmaddingsponsor')}</Text>
                        <Text style={styles.subtitle}>
                            {t('sponsorship.confirmmsg')}
                        </Text>
                    </View>

                    <View style={styles.avatar}>
                        <Image
                            source={filePath ? { uri: filePath } : require('../assets/avatar.jpg')}
                            style={styles.avatarImage}
                        />
                        <Text style={{ marginTop:10, fontSize: 16, color: Colors.text, fontWeight: 'bold' }} >{client?.client.prenoms} {client?.client.nom}</Text>
                        <Text style={{ fontSize: 14, color: Colors.gray }}>{client?.login}</Text>
                    </View>

                </ScrollView>



                <View style={styles.footer}>

                    <Button
                        mode="contained"
                        onPress={() => { lauchAdd(); }}>
                        {t('sponsorship.confirm')}
                    </Button>

                    <Button
                        mode="outlined"
                        onPress={() => { cancel(); }}>
                        {t('sponsorship.cancel')}
                    </Button>

                </View>

            </SafeAreaView>
            <LoadingModal setModalVisible={setModalVisible} modalVisible={modalVisible} />
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
        height: 580,
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
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'left',
        paddingVertical: 5,
        marginTop: 0,
    },

    subtitle: {
        fontSize: 14,
        color: Colors.text,
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
        height: 120,
        width: 120,
        overflow: 'hidden',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 60,
    },



});