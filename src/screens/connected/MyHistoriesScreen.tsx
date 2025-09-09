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
import { getHistory, getCashInHistory, getCashOutHistory,getPurchaseHistory } from '../../services/request';
import { saveBenefs, saveNewClients } from '../../store/profilSlice';
import { formatDate, formatHeure } from '../../helpers/functions';
import HistoryItem from '../../components/HistoryItem';
import { ActivityIndicator } from 'react-native';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import VirementHistory from '../../components/history/VirementHistory';
import CashInItem from '../../components/history/CashInItem';
import CashOutHistory from '../../components/history/CashOutHistory';
import CashinHistory from '../../components/history/CashinHistory';
import HpayStoreHistory from '../../components/history/HpayStoreHistory';



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
    const [purchasesHistories, setPurchasesHistories] = React.useState<any[]>([]);
    const [type, setType] = React.useState('1');

    const types = [
        {
            id: '1',
            name: t('history.internaltransfer') ,
        },

        {
            id: '2',
            name: t('history.hpaystorepurchases'),

        },

        {
            id: '3',
            name: t('history.cashin'),
        },

        {
            id: '4',
            name: t('history.cashout'),
        },

    ];

    const changeType = (item: any) => {

        setType(item.id);

        if (item.id == '1') {
           // fetchHistory(user?.client?.id, '', 'desc', page, size);
        }

        if (item.id == '2') {
           // fetchSochitel(user?.client?.id, '', 'desc', page, size, null, null);
        }

        else if (item.id == '3') {
           // fetchCashIn(user?.client?.id, '', 'desc', page, size, null, null);
        }

        else if (item.id == '4') {
           // fetchCashOut(user?.client?.id, '', 'desc', page, size, null, null);
        }
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

            <View>
                <Text style={styles.title}>Historiques des transactions</Text>
            </View>

            <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                padding: 0,
            }}>
                {types.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={{
                            borderWidth: 1,
                            borderColor: item.id == type ? Colors.primary : Colors.text,
                            padding: 10,
                            marginHorizontal: 10,
                            marginLeft: 0,
                            marginTop: 10,
                            borderRadius: 5,
                        }}
                        onPress={() => { changeType(item); }}
                    >
                        <Text style={{ color: Colors.text }}>{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>


                {
                    type == '1' &&
                    <VirementHistory/>

                }

                {
                    type == '2' &&
                    <HpayStoreHistory />

                }


                {
                    type == '3' &&
                    <CashinHistory/>
                }


                {
                   type == '4' &&
                    <CashOutHistory />
                }




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
