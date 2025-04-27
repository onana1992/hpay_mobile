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
    KeyboardAvoidingView
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


function FilterBeneficiaireScreen({ navigation }: { navigation: any }) {

    const inputRef = React.useRef(null);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [visible, setVisible] = React.useState(false);
    const user = useSelector((state: any) => state.profil.user);
    const newClients = useSelector((state: any) => state.profil.newClients);
    const benefs = useSelector((state: any) => state.profil.benefs);
    const [filteredData, setFilteredData] = React.useState(benefs);
    const [filePath, setFilePath] = React.useState(null);
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const [hasPermission, setHasPermission] = React.useState(false);
    const [contacts, setContacts] = React.useState<number[]>([]);
    const [searchQuery, setSearchQuery] = React.useState('');


    React.useEffect(() => {
        // Focus on the input when the screen is loaded

        setTimeout(()=>{
             if (inputRef.current) {
                inputRef.current.focus();  // Focus on the TextInput
             }
        },500);

    }, []);



   /* useFocusEffect(
        React.useCallback(() => {
            checkPermissions();
            getBeneficiaries();
            fetchContacts();
            return () => {

            };

        }, [])
    );*/


    function getInitials(phrase: string) {
        const words = phrase.split(' '); // Divise la phrase en mots
        if (words.length < 2) {
            // Si la phrase a moins de 2 mots, retourner les initiales du premier mot
            return words[0][0].toUpperCase();
        }

        // Retourne les initiales des deux premiers mots en majuscule
        return words[0][0].toUpperCase() + words[1][0].toUpperCase();
    }



    const EmptyCard = () => {

        return (
            <View style={styles.emptycard}>
                <Text style={{ color: Colors.text }}>Aucun beneficiaire trouvé</Text>
            </View>
        );

    };


    const filterBenef = (query:string) => {
        setSearchQuery(query);
        console.log(searchQuery);

        if (query) {
            let newFilteredData = benefs.filter((item:any) =>
                item.prenoms.toLowerCase().includes(query.toLowerCase()) ||
                item.nom.toLowerCase().includes(query.toLowerCase()) ||
                item.telephone.toLowerCase().includes(query.toLowerCase()) 
            );

            setFilteredData(newFilteredData);
        } else {
            setFilteredData(benefs); // Reset the list when search is cleared
        }
    };


    const Header = () => {

        return (
            <View style={{} }>
            </View>
        );


    };


    return (
        <KeyboardAvoidingView
            enabled={true}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.main}
        >

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }} >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                    <TouchableOpacity style={{
                        justifyContent: 'center',
                        backgroundColor: '#e6e4e0',
                        height: 40,
                        width: 40,
                        alignItems: 'center',
                        borderRadius: 20,
                    }} onPress={() => { navigation.goBack(); }} >
                        <View>
                            <Ionicons name="chevron-back" color={Colors.text} size={24} />
                        </View>
                    </TouchableOpacity>

                    <View>

                    </View>
                </View>

                <View>

                </View>
            </View>

            <View>
                <View>
                    <Text style={styles.title}>{t('benef.search')}</Text>
                </View>

                <View style={{ marginTop: 10, flexDirection: 'row', width: '100%' }}>
                    <Searchbar
                        placeholder={t('benef.Firstnamelastnamenumber')}
                        iconColor={Colors.text}
                        placeholderTextColor="gray"
                        value={searchQuery}
                        ref={inputRef}
                        onChangeText={filterBenef}
                        onIconPress={() => { console.log('')}}
                        onSubmitEditing={() => { console.log('') }}
                        style={{ flex: 1, color:Colors.text, backgroundColor: '#ffffff', borderColor: 'gray', borderWidth: 1 }}
                    />
                </View>


                <View style={{ marginBottom: 20, marginTop: 20 }}>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{
                            fontWeight: 'bold',
                            color: Colors.text,
                            fontSize: 22,
                        }}>
                            {t('benef.searchresult')}
                        </Text>
                    </View>
                </View>
            </View>


            <FlatList
                data={filteredData}
                keyExtractor={item => item.id.toString()}
                ListHeaderComponent={Header}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item} onPress={() => { navigation.navigate('ProfilBenefScreen', { client: item }); }} >

                        <View style={{ flexDirection: 'row' }}>

                            <View style={{ flex: 1 }}>
                                <View style={styles.benefavatar}>
                                    {filePath ?
                                        <Image
                                            source={filePath ? { uri: filePath } : require('../../assets/avatar.jpg')}
                                            style={styles.avatarImage}
                                        />
                                        :
                                        <View>
                                            <Text style={{ color: Colors.text, fontWeight: 'bold', fontSize: 16 }}>{getInitials(item.prenoms)}</Text>
                                        </View>
                                    }
                                </View>
                            </View>


                            <View style={{ flex: 3 }}>
                                <Text style={styles.name}>{item.prenoms} {item.nom}</Text>
                                <Text style={styles.phone}>{item.telephone}</Text>
                            </View>

                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Ionicons name="chevron-forward-outline" size={16} color={Colors.gray} />
                            </View>

                        </View>

                    </TouchableOpacity>
                )}

                ListEmptyComponent={<EmptyCard />}
            />


        </KeyboardAvoidingView>
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

    addrow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
    },

    addrowText: {
        fontSize: 16,
        color: Colors.text,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
    },

    display: {
        marginTop: 5,
        padding: 5,
        backgroundColor: Colors.background,
        borderRadius: 20,
    },

    item: {
        paddingVertical: 10,
    },

    name: {
        fontWeight: 'bold',
        fontSize: 16,
        color: Colors.text,
    },

    phone: {
        fontSize: 12,
        color: 'gray',
    },

    benefavatar: {
        width: 50,
        height: 50,
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },

    avatarImage: {
        height: 100,
        width: 100,
        overflow: 'hidden',
        borderColor: Colors.primary,
        borderWidth: 1,
        borderRadius: 30,
    },

    emptycard: {
        backgroundColor: '#e6e4e0',
        padding: 20,
        borderRadius: 10,
        height: 160,
        alignItems: 'center',
        justifyContent: 'center',
    },


    inputText: {
    color: 'blue',  // Set the input text color here
  },



});


export default FilterBeneficiaireScreen;
