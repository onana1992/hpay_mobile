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
    ScrollView, Platform
} from 'react-native';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { Colors } from '../../themes';
import { useTranslation } from 'react-i18next';
import NoConnectedHeader from '../../components/NoConnectedHeader';
import LoadingModal from '../../components/LoadingModal';
import StepCompnent from '../../components/StepCompnent';
import { TextInput as Input} from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import SponsorSearchModal from '../../components/SponsorSearchModal';
import { searchClientByPhoneRequest } from '../../services/request';
import { telValidator } from '../../helpers/telValidator';
import Toast from 'react-native-toast-message';
import { useRoute } from '@react-navigation/native';



function ParrainageScreen({ navigation}: {navigation:any}) {

    const route = useRoute<any>();
    const { t } = useTranslation();
    const [modalVisible, setModalVisible] = React.useState(false);
    const [telephone, setTelephone] = React.useState({ value: '', error: '' });
    const [recipantCountry, setRecipantCountry] = React.useState({ label: '🇨🇦 Canada', value: 'ca', indicator: "1" });
    const [client, setClient] = React.useState(null);
    const { phone, idclient } = route.params;

    console.log(route.params);

    //const idclient = 43;
    //const phone = '14388833743';

    const COUNTRIES = [
        { label: '🇨🇦 Canada', value: 'ca', indicator: "1" },
        { label: '🇨🇲 Cameroun', value: 'cm', indicator: '237' },
        { label: "🇨🇮 Cote d'ivoire", value: 'ci', indicator: "225" },
        { label: "🇭🇹 Haiti", value: 'ht', indicator: "509" },
        { label: "🇹🇬 Togo", value: 'tg', indicator: "228" },
        { label: '🇸🇳 Senegal', value: 'sn', indicator: '221' },
        { label: '🇨🇭 Suisse', value: 'ch', indicator: '41' },
        { label: '🇬🇲 Gambie', value: 'gm', indicator: '220' },
        { label: '🇲🇱 Mali', value: 'ml', indicator: '223' },
        { label: '🇧🇯 Benin', value: 'bj', indicator: '229' },
        { label: '🇬🇦 Gabon', value: 'ga', indicator: '241' },
        { label: '🇺🇸 États-Unis', value: 'us', indicator: '1' },
        { label: '🇨🇩 Congo RD', value: 'cd', indicator: '243' },
        { label: '🇩🇴 République Dominicaine', value: 'do', indicator: '1' },
        { label: '🇬🇹 Guatemala', value: 'gt', indicator: '502' },
        { label: '🇨🇬 République du Congo', value: 'cg', indicator: '242' },
        { label: '🇫🇷 France', value: 'fr', indicator: '33' },
        { label: '🇧🇪 Belgique', value: 'be', indicator: '32' },
        { label: '🇳🇬 Nigeria', value: 'ng', indicator: '234' },
        { label: '🇨🇱 Chili', value: 'cl', indicator: '56' },
        { label: '🇨🇴 Colombie', value: 'co', indicator: '57' },
        { label: '🇱🇧 Liban', value: 'lb', indicator: '961' },
        { label: '🇵🇪 Panama', value: 'pa', indicator: '507' },
        { label: '🇹🇼 Taïwan', value: 'tw', indicator: '886' }
    ];

    const [sponsorModalVisible, setSponsorModalVisible] = React.useState<boolean>(false);


    const pass = () => {
        navigation.popToTop();
    }


    const indicator = ()=>{
        return '+' + recipantCountry.indicator;
    }


    const lauchSponsorSearch = () => {


        const telError = telValidator(telephone.value);
       
        if (telError) {
            setTelephone({ ...telephone, error: t(`${telError}`) })
            return
        }

       
        setModalVisible(true);
        searchClientByPhoneRequest(recipantCountry.indicator + telephone.value).then((response: any) => {

            setModalVisible(false);
            setClient(response.data.response.data);
            setSponsorModalVisible(true);

        }).catch((_error: any) => {

            console.log(_error);

            setModalVisible(false);

            if (_error.response.status === 404) {
                Toast.show({
                    type: 'error',
                    text1: t('sponsorship.failure'),
                    text2: t('sponsorship.clientnotfound'),
                    position: 'top'
                });
            } else {


            }

        })


    }

     
    return (
   
        <KeyboardAvoidingView
            enabled={true}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.main}
        >
            <NoConnectedHeader navigation={navigation} />
            <ScrollView >

                <View style={{ alignItems:'flex-start' }}>
                           
                    <StepCompnent step={7} />

                    <View style={styles.pageheader}>
                        <Text style={styles.title}>{t('sponsorship.title')}</Text>
                        <Text style={styles.subtitle}>
                            {t('sponsorship.titlemsg')}
                        </Text>
                    </View>

                    <View style={{  alignContent: 'flex-end', justifyContent: 'flex-end',}}>
                         <Text style={styles.inputTitleText}>{t('sponsorship.sponsorcountry')}*</Text>
                          <View style={{ flexDirection: 'row', width: '100%',  }}>
                          <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                itemTextStyle={{ color: 'black' }}
                                iconStyle={styles.iconStyle}
                                data={COUNTRIES}
                                search
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="Selectionez un pays"
                                searchPlaceholder={t('rechercher')}
                                value={recipantCountry}
                                onChange={(item) => {
                                    setRecipantCountry(item);
                                }}
                            />
                               
                        
                        </View>
                    </View>


                    <View style={{  alignContent: 'flex-end', justifyContent: 'flex-end',  marginTop:20}}>
                         <Text style={styles.inputTitleText}>{t('sponsorship.sponsoryourphone')}*</Text>
                          <View style={{ flexDirection: 'row', width: '100%',  }}>
                                <TextInput
                                    label={t('sponsorship.entrersponsorphonenumber')}
                                    returnKeyType="done"
                                    value={telephone.value}
                                    inputMode="numeric"
                                    error={!!telephone.error}
                                    errorText={telephone.error}
                                    onChangeText={(text: string) => setTelephone({ value: text, error: '' })}
                                    description={undefined}
                                    left={<Input.Affix textStyle={{ color: Colors.text }} text={indicator()} />}
                                
                                />
                               
                        
                        </View>
                    </View>

                </View>



            </ScrollView>
            <View style={{ marginTop: 10, width: '100%', justifyContent:'flex-end' }}>
                    <Button
                        mode="contained"
                        onPress={() => { lauchSponsorSearch()   }}>
                        {t('sponsorship.addassponsor')}
                    </Button>

                    <Button
                        mode="outlined"
                        onPress={() => { pass() }}>
                        {t('emailscreen.pass')}
                    </Button>
                </View>
            <LoadingModal setModalVisible={setModalVisible} modalVisible={modalVisible} />
            <SponsorSearchModal
                isVisible={sponsorModalVisible}
                onClose={() => setSponsorModalVisible(false)}
                client={client}
                phone={phone}
            />
        </KeyboardAvoidingView> 
    );
}

const styles = StyleSheet.create({

    main: {
        backgroundColor: '#ffff',
        flex: 1,
        padding: 20,
    },

    content: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
    },

    forgotPassword: {
        
        alignItems: 'flex-end',
        marginBottom: 24,
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

     inputTitleText: {
        textAlign: 'left',
        color: Colors.text,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    pageheader: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItem: 'flex-start',
        marginBottom: 30,
        marginTop: 30
    },

    step: {
        flexDirection: 'row',
        height: 20,
        width: '100%'
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

    placeholderStyle: {
        fontSize: 16,
        color: 'gray',
    },


    selectedTextStyle: {
        fontSize: 16,
        color: 'black',
    },


    iconStyle: {
        width: 20,
        height: 20,
    },


    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color: 'black',
    },

     iconImage: {
        height: 120,
        width: 120,
        overflow: 'hidden',
        marginBottom: 10,
    },

     dropdown: {
        width: '100%',
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
        marginTop: 10,
    },

    error: {
        fontSize: 13,
        color: '#BA001A',
        paddingTop: 4,
    },

});

export default ParrainageScreen;


