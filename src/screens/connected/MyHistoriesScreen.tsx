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
    SectionList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../themes';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getHistory } from '../../services/request';
import { saveBenefs, saveNewClients } from '../../store/profilSlice';
import { formatDate, formatHeure } from '../../helpers/functions';
import HistoryItem from '../../components/HistoryItem';
import { ActivityIndicator } from 'react-native';


function MyHistoriesScreen({ navigation }: { navigation: any }) {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [visible, setVisible] = React.useState(false);
    const user = useSelector((state: any) => state.profil.user);
    const [content, setContent] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [page, setPage] = React.useState<number>(0);
    const [totalPages, setTotalPages] = React.useState<number>(0);
    const [size, setSize] = React.useState<number>(8);
    const [totalElement, setTotalElement] = React.useState<number>(0);
    const [histories, setHistories] = React.useState<any[]>([]);

    React.useEffect(() => {

        fetchHistory(user?.client?.id,'','desc',page,size);

    }, []);


    const fetchHistory = (
        idClient: string,
        idCompte: string,
        sortDirection: string,
        pageN: number,
        sizeN:number) => {

        getHistory(
            idClient,
            idCompte,
            sortDirection,
            pageN,
            sizeN
        ).then((response) => {

            //console.log(response.data.content);
            const grouped: any = {};
            setSize(response.data.numberOfElements);
            setTotalElement(response.data.totalElements);
            setTotalPages(response.data.totalPages);

            setContent([...content, ...response.data.content]);
            const newContent = [...content, ...response.data.content];

            newContent.forEach(item => {
                const date = formatDate(item.dateInitiale);
                const heure = formatHeure(item.dateInitiale);

                if (!grouped[date]) {
                    grouped[date] = [];
                }

                grouped[date].push({
                    id: item.idVirementInterne,
                    montant: item.montant,
                    total: item.total,
                    devise: item.deviseFrom,
                    raison: item.virementRaison,
                    clientFrom: item.clientFrom,
                    clientTo: item.clientTo,
                    compteFrom: item.compteFrom,
                    compteTo: item.compteTo,
                    numVirement: item.virementNum,
                    heure: heure,
                    tauxConversion: item.tauxConversion,
                    montantTo: item.montantTo,
                    montantFrom: item.montantFrom,
                });
            });

            const DATA = Object.keys(grouped).map(date => ({
                title: date,
                data: grouped[date],
            }));

            setHistories(DATA);
            setLoading(false);


        }).catch((error) => {

            console.log(error.response);
            setLoading(false);
        });

    };


    const fetchMore = () => {
        setPage((prev) => prev + 1);
        fetchHistory(user?.client?.id, '', 'desc', page + 1, size);
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
                    <Text style={{ color: Colors.text }}>Aucune transaction effectué</Text>
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



    const Header = () => {

        return (
            <View style={{}}>
                <Text style={styles.title}>Historiques des transactions </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, marginTop:10 }}>
                    <View>
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                                borderWidth: 2,
                                borderColor: Colors.primary,
                                padding:10,
                                width: 120,
                                borderRadius: 10,


                            }}
                        >
                            <View>
                                <Fontisto name="equalizer" size={18} color={Colors.primary}/>
                            </View>

                            <View>
                                <Text style={{ color: Colors.primary, fontWeight: 600, fontSize:18 }}>Filtre</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                                borderWidth: 2,
                                borderColor: Colors.primary,
                                padding: 10,
                                width: 120,
                                borderRadius: 10,


                            }}
                        >
                            <View>
                                <FontAwesome name="sort-amount-asc" size={18} color={Colors.primary} />
                            </View>

                            <View>
                                <Text style={{
                                    color: Colors.primary,
                                    fontWeight: 600,
                                    fontSize: 18,
                                }}>DESC</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
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

            <SectionList
                sections={histories}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (

                    <HistoryItem
                        user={user}
                        clientFrom={item.clientFrom}
                        clientTo={item.clientTo}
                        compteFrom={item.compteFrom}
                        compteTo={item.compteTo}
                        montant={item.montant}
                        devise={item.devise}
                        heure={item.heure}
                        index={index}
                        size={size}
                        taux={item.tauxConversion}
                        montantFrom={item.montantFrom}
                        montantTo={item.montantTo}
                    />
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: Colors.text, marginTop: 20 }}>{title}</Text>
                )}

                ListEmptyComponent={EmptyCard}
                ListFooterComponent={Footer}
                ListHeaderComponent={Header}
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
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
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


export default MyHistoriesScreen;
