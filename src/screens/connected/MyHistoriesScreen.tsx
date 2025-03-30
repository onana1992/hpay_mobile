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
    FlatList,
    RefreshControl,
    Platform,
    PermissionsAndroid,
    ScrollView,
    Dimensions
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../themes';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Searchbar } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import { useFocusEffect } from '@react-navigation/native';
import { fetchBeficiariesRequest, fetchBeficiariesInMyContactRequest } from '../../services/request';
import { saveBenefs, saveNewClients } from '../../store/profilSlice';
import Contacts from 'react-native-contacts';
import AvartarButton from '../../components/connected/AvartarButton';


function MyHistoriesScreen({ navigation }: { navigation: any }) {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [visible, setVisible] = React.useState(false);
    const user = useSelector((state: any) => state.profil.user);
    const newClients = useSelector((state: any) => state.profil.newClients);
    const benefs = useSelector((state: any) => state.profil.benefs);
    const [filePath, setFilePath] = React.useState(null);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const [hasPermission, setHasPermission] = React.useState(false);
    const [contacts, setContacts] = React.useState<number[]>([]);
    const { height } = Dimensions.get('window');


    const EmptyCard = () => {

        return (
            <View style={styles.emptycard}>
                <Text style={{ color: Colors.text }}>Aucun transaction effectué</Text>
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

            <ScrollView>

                <View style={{}}>
                    <Text style={styles.title}>Historiques des transactions </Text>
                </View>

                <View style={{}}>
                    <EmptyCard />
                </View>
            </ScrollView>

        </View>
    );

}

const styles = StyleSheet.create({

    main: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
        paddingBottom: 0,
        paddingVertical: 10
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


});


export default MyHistoriesScreen;
