/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
import React from 'react';
import { SafeAreaView, Text,  StyleSheet, View, Dimensions, ScrollView, Image } from 'react-native';
import Modal from 'react-native-modal';
import { Colors } from '../../themes';
import { useTranslation } from 'react-i18next';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { addParrain } from '../../services/request';
import LoadingModal from '../LoadingModal';
import Toast from 'react-native-toast-message';

//import I18n from 'react-native-i18n';

type PropType = {
    isVisible: boolean,
    onClose: () => void,
    client: any,
    phone:string
    setEndModalVisible: (boolean) => void,
}



export default function SponsorSearchModal({ isVisible, onClose, client, phone,setEndModalVisible }: PropType) {

    const { t } = useTranslation();
    const navigation = useNavigation();
    const url = client?.photoClient === null ? '' : client?.photoClient;
    const [filePath, setFilePath] = React.useState<string>('');
    const [modalVisible, setModalVisible] = React.useState(false);

    React.useEffect(() => {
        setFilePath(client?.photoClient === null ? '' : client?.photoClient);
    }, []);

    React.useEffect(() => {
        setFilePath(client?.photoClient === null ? '' : client?.photoClient);
    }, [isVisible]);


    const cancel = () => {
        onClose();
    };


    const lauchAdd = () => {

        setModalVisible(true);
        addParrain(phone, client?.telephone).then((response: any) => {

            onClose();

            Toast.show({
                type: 'success',
                text1: t('sponsorship.success'),
                text2: t('sponsorship.sponsoradded'),
                position: 'top',
            });

            setEndModalVisible(true);

           /*setTimeout(() => {
                navigation.popToTop();
            },10000);*/


        }).catch((_error: any) => {

            console.log(_error.response.data);
            setModalVisible(false);

            if (_error.response.data.statusCode === 404) {

                onClose();
                Toast.show({
                    type: 'error',
                    text1: t('sponsorship.failure'),
                    text2: t('sponsorship.sponsorshipalreadyaexist'),
                    position: 'top',
                });

            } else {

                onClose();
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

                <ScrollView style={{flex:1} }>

                    <View style={styles.pageheader}>
                        <Text style={styles.title}>{t('sponsorship.confirmaddingsponsor')}</Text>
                        <Text style={styles.subtitle}>
                            {t('sponsorship.confirmmsg')}
                        </Text>
                    </View>

                    <View style={styles.avatar}>
                        {
                          client &&
                           <Image
                            source={filePath !== '' ? { uri: filePath } : require('../../assets/avatar.jpg')}
                            style={styles.avatarImage}
                           />
                        }
                        <Text style={{ marginTop:10, fontSize: 16, color: Colors.text, fontWeight: 'bold' }} >{client?.prenoms} {client?.nom}</Text>
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



const { width} = Dimensions.get('window');

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