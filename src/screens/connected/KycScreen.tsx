/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable jsx-quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable react-native/no-inline-styles */

import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Pressable,
    Keyboard,
    ScrollView,
    Dimensions,
    ActivityIndicator,
    TouchableOpacity,
    Image
} from 'react-native';

import { Colors } from '../../themes';
import Step1 from '../../components/kyc-steps/Step1';
import Step2 from '../../components/kyc-steps/Step2';
import Step3 from '../../components/kyc-steps/Step3';
import Step4 from '../../components/kyc-steps/Step4';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {  saveKyc } from '../../services/request';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import LoadingModal from '../../components/LoadingModal';
import { useDispatch } from 'react-redux';
import { signIn} from '../../store/profilSlice';



function KycScreen({ navigation, user }: { navigation: any, user: any }) {


    console.log(user);
    const { height } = Dimensions.get('window');
    const [step, setStep] = React.useState(1);
    const { t } = useTranslation();
    //const [pays, setPays] = React.useState([]);
    const [isLoading, setIsloading] = React.useState(false);
    var date = new Date(user.client.dateNaissance);
    const [modalVisible, setModalVisible] = React.useState(false);
    const dispatch = useDispatch();


    const [data, setData] = React.useState({
        idclient: user.idLoginClient,
        email: null,
        nom: user.client.nom,
        prenoms: user.client.prenoms,
        lieu_naissane: user.client.lieu_naissane,
        telephone: user.username,
        telephone2: null, //user.telephone2,
        sexe: user.client.sexe,
        statut_mat: 'C', // user.date_naissance,
        date_naissance: date,
        nationalite: null,// user.date_naissance,
        pays: null,
        ville: null,
        adresse: null,
        photo_piece_recto: null,
        photo_piece_verso: null,
        num_piece: null,
        expire_piece: null,
        idtype_piece:null
    });




    const kycSaveRequest = () => {


        let form_data = new FormData();

        /*console.log('id', data.idclient);
        console.log('nom', data.nom);
        console.log('prenom', data.prenoms);
        console.log('genre', data.sexe);
        console.log('statut_mat', data.statut_mat);
        console.log('date_naiss', data.date_naissance);
        console.log('nationalite', data.nationalite);
        console.log('pays_id', data.pays);
        console.log('ville _id', data.ville);
        console.log('telephone1', data.telephone);
        console.log('telephone2', data.telephone2);
        console.log('id_type', data.idtype_piece);
        console.log('numero_id', data.num_piece);
        console.log('recto', data.photo_piece_recto);
        console.log('verso', data.photo_piece_verso);
        console.log('address', data.adresse);
        console.log('expire_piece', data.expire_piece);*/

        form_data.append('id', data.idclient);
        form_data.append('nom', data.nom);
        form_data.append('prenom', data.prenoms);
        form_data.append('genre', data.sexe);
        form_data.append('statut_mat', data.statut_mat);
        form_data.append('date_naiss', data.date_naissance);
        form_data.append('nationalite', data.nationalite);
        form_data.append('pays_id', data.pays);
        form_data.append('ville _id', data.ville);
        form_data.append('telephone1', data.telephone);
        form_data.append('telephone2', data.telephone2);
        form_data.append('id_type', data.idtype_piece);
        form_data.append('numero_id', data.num_piece);
        form_data.append('address', data.adresse);
        form_data.append('lieu_naiss', data.lieu_naissane);
        form_data.append('expire_piece', data.expire_piece);
        

     
        /*console.log(data.photo_piece_recto);
        console.log('uri ', data.photo_piece_recto.uri);
        console.log('name ', data.photo_piece_recto.fileName);
        console.log('type ', data.photo_piece_recto.type)*/

        

        if (data.photo_piece_recto != null) {
            form_data.append('recto', { uri: data.photo_piece_recto.uri, type: data.photo_piece_recto.type, name: data.photo_piece_recto.fileName });
        }

        if (data.photo_piece_verso != null) {
            form_data.append('verso', { uri: data.photo_piece_verso.uri, type: data.photo_piece_verso.type, name: data.photo_piece_verso.fileName });
        }
        
       

       // setModalVisible(true);

       saveKyc(form_data).then((response: any) => {

            if (response.data.statusCode === 200) {
                setModalVisible(false);
                dispatch(signIn(response.data.response.data));
            }

            setModalVisible(false);

            console.log(response)
           

        }).catch((_error: any) => {

            setModalVisible(false);
            //setIsloading(false);
            console.log(_error);

        })
        
        

    }


    React.useEffect(() => {
       // paysRequest();
    },[])

    

    return (
        <View style={styles.main}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between',  paddingVertical: 10 }} >
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
            </View>

            <ScrollView>

                {
                    // user.kycStatus === 'EN_ATTENTE' &&
                    user.client.valider === '0' &&
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', marginTop: 70 }}>
                        <Image
                            source={require('../../assets/synergy.png')}
                            style={styles.waitingImg}
                        />
                        <View style={{ alignItems: 'center', }}>
                            <Text style={{ color: Colors.text, textAlign: 'center', fontSize: 26, fontWeight: 'bold', paddingVertical: 10 }}>{t('kyc.processing').toLocaleUpperCase()}</Text>
                            <Text style={{ color: Colors.text, textAlign: 'center', fontSize: 14, }}>{t('kyc.processingmsg')}</Text>
                        </View>
                    </View>
                }


                {
                    //user.kycStatus === 'VALIDE' &&
                    user.client.valider === '1' &&
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', marginTop: 70 }}>
                        <Image
                            source={require('../../assets/check-mark.png')}
                            style={styles.waitingImg}
                        />
                        <View style={{ alignItems: 'center', }}>
                            <Text style={{ color: Colors.text, textAlign: 'center', fontSize: 26, fontWeight: 'bold', paddingVertical: 10 }}>{t('kyc.accountvalidated').toLocaleUpperCase()}</Text>
                            < Text style={{ color: Colors.text, textAlign: 'center', fontSize: 14, }}>{t('kyc.accountvalidatedmsg')}</Text>
                        </View>
                    </View>
                }


                {
                    // (user.kycStatus === 'NON_SOUMIS' || user.kycStatus === 'NON_VALIDE')  &&
                    user.client.valider !== '0' && user.client.valider !== '1' && 
                    <ScrollView>
                        
                            {
                                !isLoading ?
                                    <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
                                        <View style={{}}>
                                            <Text style={styles.title}>{t('kyc.completeyourregistration')}</Text>
                                            <Text style={{ color: Colors.text, fontSize: 14, }}>{t('kyc.completeyourregistrationmsg')}</Text>
                                        </View>

                                        <Step1 data={data} setData={setData} step={step} setStep={setStep} />
                                        <Step2 data={data} setData={setData} step={step} setStep={setStep} />
                                        <Step3 data={data} setData={setData} step={step} setStep={setStep} />
                                        <Step4 data={data} setData={setData} step={step} setStep={setStep} kycSaveRequest={kycSaveRequest} />

                                    </Pressable>
                                    :
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: height }}>
                                        <ActivityIndicator size="small" color={Colors.primary} />
                                        <Text style={{ marginTop: 10, fontSize: 12, color: 'black' }}> {t('loading')} </Text>
                                    </View>
                            }
                       
                    </ScrollView>
                }

                <LoadingModal setModalVisible={setModalVisible} modalVisible={modalVisible} />

            </ScrollView>


        </View>
    );
}


const styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: 20,
        paddingBottom: 20,
        backgroundColor:'#ffffff'
    },

    waitingImg: {
        height: 200,
        width: 200,
        overflow: 'hidden',
    },

     title: {
        color: Colors.text,
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'left',
        paddingVertical: 5,
        marginTop: 0,
    },

});


const mapStateToProps = (state: { profil: { user: any; }; }) => {
    return {
        user: state.profil.user,
    };
};

export default connect(mapStateToProps)(KycScreen);

