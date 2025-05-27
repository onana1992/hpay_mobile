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
    Text,
    FlatList,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../themes';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getMessage, markAsReadRequest, readMessage, getNumberMessageNonlu } from '../../services/request';
import MessageDetailModal from '../../components/messages/MessageDetailModal';
import LoadingModal from '../../components/LoadingModal';
import { savenotReadMessage } from '../../store/profilSlice';





function MyMessageScreen({ navigation }: { navigation: any }) {

    const { t } = useTranslation();
    const [messages, setMessages] = React.useState<any[]>([]);
    const { height } = Dimensions.get('window');
    const [loading, setLoading] = React.useState(true);
    const [page, setPage] = React.useState<number>(0);
    const [size, setSize] = React.useState<number>(6);
    const user = useSelector((state: any) => state.profil.user);
    const [messageModal, setMessageModal] = React.useState(false);
    const [actualMessage, setActualMessage] = React.useState<any | null>(null);
    const [totalPages, setTotalPages] = React.useState<number>(0);
    const [totalElement, setTotalElement] = React.useState<number>(0);
    const [modalVisible, setModalVisible] = React.useState(false);
    const dispatch = useDispatch();


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


    function truncateText(text:string) {
        if (text.length > 100) {
            return text.slice(0, 100) + '...';
        }

        return text;
    }



    const fetchMessage = (
        idClient: string,
        pageN: number,
        sizeN: number) => {

        console.log(idClient);

        getMessage(idClient, pageN, sizeN)
            .then((response) => {

              //  console.log(response.data.content);

            setMessages([...messages, ...response.data.content]);
            setTotalElement(response.data.totalElements);
            setTotalPages(response.data.totalPages);
            //setMessage(DATA);
            setLoading(false);


        }).catch((error) => {

            console.log(error);

        });

    };



    const readMessageRequest = (idMessage:any) => {

        readMessage(idMessage).then((response) => {

            const newMassagesList = messages.map(msg => {
                if (msg.id === idMessage) {
                    return {
                        ...msg,
                        lu: '1',
                    };
                }
                return msg;
            });

            setMessages(newMassagesList);

        }).catch((error) => {

            console.log(error);

        });

    };


    const openModal = (message: any) => {
        setActualMessage(message);
        setMessageModal(true);
        readMessageRequest(message.id);
    };



    const markAllAsRead = () => {

        setModalVisible(true);
        markAsReadRequest(user?.client?.id).then((response) => {

            setModalVisible(false);
            const newMassagesList = messages.map(msg => {
                    return {
                        ...msg,
                        lu: '1',
                    };
            });

            setMessages(newMassagesList);

        }).catch((error) => {

            setModalVisible(false);

        });

    };


    const fetchNotReadNumber = () => {
        getNumberMessageNonlu(user?.client?.id).then((response) => {

           dispatch(savenotReadMessage(response.data.nonLu));

        }).catch((error) => {
           // console.log(error);
        });
    };


    React.useEffect(() => {
        fetchMessage(user?.client?.id, page, size);
        fetchNotReadNumber();
    }, []);



    const fetchMore = () => {
        setPage((prev) => prev + 1);
        fetchMessage(user?.client?.id, page + 1, size);
    };


    const EmptyCard = () => {

        return (
            <View style={styles.emptycard}>
                {
                    loading ?
                        <View>
                            <ActivityIndicator size="small" color={Colors.primary} />
                            <Text style={{ color: Colors.text }}>Chargement en cours ...</Text>
                        </View>
                        :
                        <Text style={{ color: Colors.text }}>Aucun message reçu</Text>
                }
            </View>
        );

    };


    const Footer = () => {

        return (
            <View>
                {
                    totalPages > page + 1 &&
                    < View style={{ flexDirection: 'row', width: '100%', marginTop: 20 }}>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity style={styles.morebutton} onPress={() => { fetchMore(); }}>
                                <Text style={styles.morebuttonText}> Voir plus </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </View>
        );

    };



    const MessageItem = ({ message }: {message:any}) =>{

        return (
            <TouchableOpacity style={styles.messageContainer} onPress={() => { openModal(message); } }>
                <View style={styles.messageContent}>
                    <Text style={message.lu === '1' ? styles.subjectRead : styles.subject }>{message.sujet}</Text>
                    <Text style={styles.preview}>{truncateText(message.sujetMessage)}</Text>
                    <Text style={styles.date}>{transformDateTime(message.sujetDate)}</Text>
                </View>

                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Ionicons name="chevron-forward-outline" size={16} color={Colors.gray} />
                </View>
            </TouchableOpacity>
        );

    };


    const Header = () => {
        return (
            <View style={{ marginBottom: 0 }}>
                <Text style={styles.title}>Mes messages</Text>
                {
                    messages.length>0 &&
                    <TouchableOpacity
                        onPress={() => { markAllAsRead(); }}
                        style={{
                            borderColor: Colors.primary,
                            borderWidth: 2,
                            padding: 10,
                            borderRadius: 10,
                            width: 180,
                            marginTop: 15,
                        }}
                    >
                        <Text style={{ color: Colors.text, fontWeight: 'bold' }}>Marque tout comme lu</Text>
                    </TouchableOpacity>

                }

            </View>
        );
    };


    return (
        <View style={styles.main}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }} >
                <TouchableOpacity style={{
                    justifyContent: 'center',
                    backgroundColor: '#e6e4e0',
                    height: 40,
                    width: 40,
                    alignItems: 'center',
                    borderRadius: 20,
                }} onPress={() => { navigation.goBack() }} >
                    <View>
                        <Ionicons name="chevron-back" color={Colors.text} size={24} />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{flex:1}}>

                <FlatList
                    data={messages}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <MessageItem message={item} />}
                    ListEmptyComponent={EmptyCard}
                    ListFooterComponent={Footer}
                    ListHeaderComponent={Header}
                 />

            </View>

            <MessageDetailModal
                open={messageModal}
                closeModal={() => { setMessageModal(false); } }
                message={actualMessage}
            />

            <LoadingModal
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
            />

        </View>
    );

}

const styles = StyleSheet.create({

    main: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
        paddingBottom: 0,
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

    emptycard: {
        marginTop: 20,
        backgroundColor: '#e6e4e0',
        padding: 20,
        borderRadius: 10,
        height: 160,
        width:'100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    messageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.3,
        paddingVertical: 10,
        borderBottomColor: Colors.gray,
    },


    messageContent: {
        flex: 6,
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
        fontSize: 20,
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
        fontSize: 14,
        color: Colors.text,
        marginTop: 2,
    },

    date: {
        fontSize: 12,
        color: Colors.text,
        marginTop:2,
    },

    morebutton: {
        height: 50,
        backgroundColor: Colors.primary,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    morebuttonText: {
        fontWeight: 'bold',
        color: '#ffffff',
        fontSize: 16,
    },


});


export default MyMessageScreen;
