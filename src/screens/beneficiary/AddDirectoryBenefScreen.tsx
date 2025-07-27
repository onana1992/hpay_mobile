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
    FlatList,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../themes';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Searchbar } from 'react-native-paper';
import { Checkbox } from 'react-native-paper';
import { addBenefListRequest } from '../../services/request';
import Toast from 'react-native-toast-message';
import { saveNewClients } from '../../store/profilSlice';
import { ApiContext } from '../../../App';
import AvartarButton from '../../components/connected/AvartarButton';


function AddDirectoryBenefScreen({ navigation }: { navigation: any }) {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [visible, setVisible] = React.useState(false);
    const user = useSelector((state: any) => state.profil.user);
    const newClients = useSelector((state: any) => state.profil.newClients);
    const [filePath, setFilePath] = React.useState(null);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [list, setList] = React.useState<any>([]);
    const [allChecked, setAllChecked] = React.useState<boolean>(false);
    const benefs = useSelector((state: any) => state.profil.benefs);
    const [filteredData, setFilteredData] = React.useState(benefs);
    const { photoUrl } = React.useContext(ApiContext);

    const getPhotoUrl = (name: string) => {
        return photoUrl + '/' + name;
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




    const checkItem = (item:any) => {

        const result = list.map((it: any) => {

            if (it.id === item.id) {
                return {
                    ...it,
                    checked: !it.checked,
                };

            }

            return it;

        });


        setList([]);
        setList(result);
    };


    function getInitials(phrase: string) {
        const words = phrase.split(' '); // Divise la phrase en mots
        if (words.length < 2) {
            // Si la phrase a moins de 2 mots, retourner les initiales du premier mot
            return words[0][0].toUpperCase();
        }

        // Retourne les initiales des deux premiers mots en majuscule
        return words[0][0].toUpperCase() + words[1][0].toUpperCase();
    }


    const checkAll = () => {

        if (allChecked) {
            const result = list.map((it: any) => {
                    return {
                        ...it,
                        checked: false,
                    };

            });

            setAllChecked(!allChecked);
            setList(result);
        } else {

            const result = list.map((it: any) => {

                return {
                    ...it,
                    checked: true,
                };


            });

            setAllChecked(!allChecked);
            setList(result);

        }

    };




    const getListId = () => {

        const checkedClients = list.filter((elt: any) => elt.checked);
        const result = checkedClients.map((it: any) => {

            return Number(it.id);

        });

        return result;

    };



    const addContact = () => {

        //console.log(getListId());

        if (getListId().length > 0){

          addBenefListRequest(user.idLoginClient, getListId()).then((response: any) => {

            //console.log(response.data);
               /*Toast.show({
                    type: 'success',
                    text1: t('success'),
                    text2: t('benef.addlistsuccess'),
                    position: 'top',
               });*/

              Toast.show({
                  type: 'succesMessage',
                  props: { text: t('benef.addlistsuccess') },
              });

               navigation.goBack();

        }).catch((_error: any) => {


            //console.log(_error);


        });

        }

    };




    React.useEffect(() => {

        const result =  newClients.map((item:any) => {
            return {
                id: item.id.toString(),
                nom: item.nom,
                prenoms: item.prenoms,
                photo: item.photo,
                telephone: item.telephone,
                checked: false,
            };

        });

        setList(result);

    }, []);





    const Header = () => {

        return (
            <View>
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.title}>{t('benef.Addthebeneficiariespresentinyourcontacts')}</Text>
                </View>

                <View style={{ marginTop: 10, flexDirection: 'row', width: '100%' }}>
                    <Searchbar
                        placeholder={t('benef.Firstnamelastnamenumber')}
                        iconColor={Colors.text}
                        placeholderTextColor="gray"
                        value={searchQuery}
                        onChangeText={filterBenef}
                        onIconPress={() => { console.log('')}}
                        onSubmitEditing={() => { console.log('') }}
                        style={{ flex: 1, backgroundColor: '#ffffff', borderColor: 'gray', borderWidth: 1 }}
                    />
                </View>

                <View style={{ marginBottom: 30, marginTop: 20, flexDirection: 'row', width:'100%' }}>

                    <View style={{ marginTop: 20, flex:2 }}>
                        <Text style={{ fontWeight: 'bold', color: Colors.text, fontSize: 16 }}>{newClients.length} {t('benef.contactsinyourdirectoryuseHpay')}</Text>
                    </View>

                    <View style={{ marginTop: 20, flex: 1, alignItems:'flex-end' }}>
                        <Checkbox
                            status={allChecked ? 'checked' : 'unchecked'}
                            color={Colors.primary}
                            onPress={() => {
                                checkAll();
                            }}
                        />
                    </View>

                </View>


            </View>
        );



    };


    return (
        <KeyboardAvoidingView
            enabled={true}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.main}
        >

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
                        <Ionicons name="close-outline" color={Colors.text} size={24} />
                    </View>
                </TouchableOpacity>
            </View>



            <FlatList
                data={list}
                keyExtractor={item => item.id}
                ListHeaderComponent={Header}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item}>

                        <View style={{ flexDirection: 'row' }}>

                            <View style={{ flex: 1, }}>
                                <View style={styles.benefavatar}>

                                    {item.photo != null ?
                                        <Image
                                            source={{ uri: getPhotoUrl(item.photo) }}
                                            style={styles.avatarImage}
                                        />
                                        :
                                        <View>
                                            <Text style={{ color: Colors.text, fontWeight: 'bold', fontSize: 16 }}>{ getInitials(item.prenoms) }</Text>
                                        </View>
                                    }
                                </View>
                            </View>


                            <View style={{ flex: 3 }}>
                                <Text style={styles.name}>{item.prenoms} {item.nom} </Text>
                                <Text style={styles.phone}>{item.photoClient} {item.telephone}</Text>

                            </View>

                            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                                <Checkbox
                                    status={item.checked ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        checkItem(item);
                                    }}
                                    color={Colors.primary}
                                />
                            </View>

                        </View>

                    </TouchableOpacity>
                )}

            />

            <View style={{
                justifyContent: 'flex-end',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                paddingTop: 10,
            }}>
                <View style={{ flexDirection: 'row', width: '100%' }}>

                    <View style={{ flex: 1, marginRight: 20 }}>
                        <TouchableOpacity style={styles.cancelbutton} onPress={() => { navigation.goBack(); }} >
                            <Text style={styles.cancelbuttonText}>{t('benef.cancel')}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 1 }}>
                        <TouchableOpacity disabled={getListId().length === 0} style={styles.addbutton} onPress={() => { addContact(); } }>
                            <Text style={styles.addbuttonText}>{t('benef.add')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


        </KeyboardAvoidingView>
    );

}

const styles = StyleSheet.create({

    main: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
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
        alignItems: 'center',
        justifyContent: 'center',
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
        width: 50,
        height: 50,
        overflow: 'hidden',
        borderColor: Colors.primary,
        borderWidth: 1,
        borderRadius: 30,
    },

    cancelbutton: {
        height: 50,
        backgroundColor: Colors.background,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    addbutton: {
        height: 50,
        backgroundColor: Colors.primary,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    cancelbuttonText: {
        color: Colors.text,
        fontWeight: 'bold',
        fontSize: 16,
    },

    addbuttonText: {
        fontWeight: 'bold',
        color: '#ffffff',
        fontSize: 16,
    },



});


export default AddDirectoryBenefScreen;
