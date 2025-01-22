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
    ActivityIndicator
} from 'react-native';

import { Colors } from '../../themes';
import Step1 from '../../components/kyc-steps/Step1';
import Step2 from '../../components/kyc-steps/Step2';
import Step3 from '../../components/kyc-steps/Step3';
import Step4 from '../../components/kyc-steps/Step4';
//import { useSelector, useDispatch } from 'react-redux';
import { getPaysRequest } from '../../services/request';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';



function KycScreen({ navigation, user }: { navigation: any, user: any }) {

   // console.log(user);


    const { height } = Dimensions.get('window');
    const [step, setStep] = React.useState(1);
    const { t } = useTranslation();
    /*const user = useSelector((state) => state.profil.user);*/
    const [pays, setPays] = React.useState([]);
    const [isLoading, setIsloading] = React.useState(false);
    var date = new Date(user.date_naissance);


    const [data, setData] = React.useState({
        idclient: user.idclients,
        email: null,
        nom: user.nom,
        prenoms: user.prenoms,
        lieu_naissane: user.lieu_naissane,
        telephone: user.telephone,
        telephone2: null, //user.telephone2,
        sexe: user.sexe,
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


    const paysRequest = () => {

        setIsloading(true);
        getPaysRequest().then((response: any) => {

            if (response.data.success === true) {
                setPays(response.data.data);
            } else {

            }

            setIsloading(false);

        }).catch((_error: any) => {

             setIsloading(false);
            // console.log(error);
            
        })
    }


    React.useEffect(() => {

        paysRequest();

    },[])

    

    return (
        <ScrollView style={styles.main}>
            <KeyboardAvoidingView
                enabled={true}
                //behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
            >
                {
                    !isLoading ?
                        <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
                            <Step1 data={data} setData={setData} step={step} setStep={setStep} />
                            <Step2 data={data} countries={pays} setData={setData} step={step} setStep={setStep} />
                            <Step3 data={data} setData={setData} step={step} setStep={setStep} />
                            <Step4 data={data} setData={setData} step={step} setStep={setStep} />
                        </Pressable>
                        :
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: height }}>
                            <ActivityIndicator size="small" color={Colors.primary} />
                            <Text style={{ marginTop: 10, fontSize: 12, color: 'black' }}> {t('loading')} </Text>
                        </View>
                }
            </KeyboardAvoidingView>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: 10,
        paddingBottom:30
    },

});


const mapStateToProps = (state: { profil: { user: any; }; }) => {
    return {
        user: state.profil.user,
    };
};

export default connect(mapStateToProps)(KycScreen);

