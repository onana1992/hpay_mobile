/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable curly */
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
import { getHistory, getCashInHistory, getCashOutHistory, getPurchaseHistory } from '../../services/request';
import { saveBenefs, saveNewClients } from '../../store/profilSlice';
import { formatDate, formatHeure } from '../../helpers/functions';
import HistoryItem from '../../components/HistoryItem';
import { ActivityIndicator } from 'react-native';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import CashInItem from './CashInItem';


function CashinHistory() {

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
    const [purchasesHistories, setPurchasesHistories] = React.useState<any[]>([]);
    const [type, setType] = React.useState('1');


    React.useEffect(() => {
        fetchCashIn('3', '', 'desc', page, size, null, null);
    }, []);



    const fetchCashIn = (
        idClient: string,
        idCompte: string,
        sortDirection: string,
        pageN: number,
        sizeN: number,
        startDate: null | Date,
        startEnd: null | Date,
    ) => {

        getCashInHistory(
            idClient,
            idCompte,
            sortDirection,
            pageN,
            sizeN,
            startDate,
            startEnd
        ).then((response) => {

            //console.log("le contenus ", response.data.content);
            const grouped: any = {};
            setSize(response.data.numberOfElements);
            setTotalElement(response.data.totalElements);
            setTotalPages(response.data.totalPages);
            setContent([...content, ...response.data.content]);

            const newContent = [...content, ...response.data.content];

            newContent.forEach(item => {

                const date = formatDate(item.dateTransaction);
                const heure = formatHeure(item.dateTransaction);

                //console.log(heure);

                if (!grouped[date]) {
                    grouped[date] = [];
                }

                grouped[date].push({
                    id: item.id,
                    montant: item.montant,
                    total: item.total,
                    devise: item.devise, // item.deviseFrom,
                    urlPhoto: item.urlPhoto,
                    nom: item.nom,
                    prenom: item.prenoms,
                    frais: item.frais,
                    telephone: item.telephone,
                    date: date,
                    heure: heure,

                });
            });


            const DATA = Object.keys(grouped).map(date => ({
                title: date,
                data: grouped[date],
            }));

            console.log('le contenu', DATA);

            setHistories(DATA);
            setLoading(false);

        }).catch((error) => {

            //console.log(error.response);
            setLoading(false);
        });

    };



    const fetchMore = () => {
        setPage((prev) => prev + 1);
        fetchCashIn('3', '', 'desc', page + 1, size, null, null);
    };


    const EmptyCard = () => {

        return (
            <View style={styles.emptycard}>
                {
                    loading ?
                        <View>
                            <ActivityIndicator size="small" color={Colors.primary} />
                            <Text style={{ color: Colors.text }}>{t('history.loadinginprogress')}</Text>
                        </View>
                        :
                        <Text style={{ color: Colors.text }}>{t('history.notransactionscompleted')}</Text>
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
                                    <Text style={styles.morebuttonText}> {t('history.seemore')} </Text>
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

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, marginTop: 10 }}>
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
                                <Fontisto name="equalizer" size={16} color={Colors.primary} />
                            </View>

                            <View>
                                <Text style={{ color: Colors.primary, fontWeight: 600, fontSize: 16 }}>Filtre</Text>
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
                                <FontAwesome name="sort-amount-asc" size={16} color={Colors.primary} />
                            </View>

                            <View>
                                <Text style={{
                                    color: Colors.primary,
                                    fontWeight: 600,
                                    fontSize: 16,
                                }}>
                                    DESC
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    const typeItem = ({ item }: { item: any }) => {

        return (
            <TouchableOpacity>
                <Text>{item.name}</Text>
            </TouchableOpacity>
        );
    };



    return (
        <View style={styles.main}>

            <SectionList
                sections={histories}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                    <CashInItem
                        id={item.id}
                        montant={item.montant}
                        total={item.total}
                        devise={item.devise}
                        urlPhoto={item.urlPhoto}
                        nom={item.nom}
                        prenom={item.prenom}
                        frais={item.frais}
                        telephone={item.telephone}
                        date={item.date}
                        heure={item.heure}
                    />

                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: Colors.text, marginTop: 20 }}>{title}</Text>
                )}

                ListEmptyComponent={EmptyCard}
                ListFooterComponent={Footer}
                //ListHeaderComponent={Header}
            />
        </View>
    );

}

const styles = StyleSheet.create({

    main: {
        flex: 1,
        backgroundColor: '#ffffff',
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


export default CashinHistory;
