/* eslint-disable @typescript-eslint/no-unused-vars */
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
} from 'react-native';
/*import { Colors } from 'react-native/Libraries/NewAppScreen';*/
import { useTranslation } from 'react-i18next';
import TextInput from '../../components/TextInput';
import { RadioButton } from 'react-native-paper';
import { Colors } from '../../themes';
import Button from '../../components/Button';
import { DatePickerInput } from 'react-native-paper-dates';
import { PaperSelect } from 'react-native-paper-select';
import {
         firstNameValidator,
         familyNameValidator,
         dateNaissValidator,
         nationalityValidator,
} from '../../helpers/kycValidators';
import DateInput from '../../components/DateInput';
import { Dropdown } from 'react-native-element-dropdown';
import { getPaysRequest } from '../../services/request';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Step1 = ({ data, setData, step, setStep }: { data:any, setData:any, step:any, setStep:any } )=> {



    const [familyname, setFamilyName] = React.useState({ value: data.nom, error: '' });
    const [firstName, setFirstName] = React.useState({ value: data.prenoms, error: '' });
    const [nationality, setNationality] = React.useState({ value: '', error: '' });
    const [sex, setSex] = React.useState({ value: data.sexe, error: '' });
    const [statut_mat, setstatut_mat] = React.useState({ value: data.statut_mat, error: '' });
    var date = new Date(data.date_naissance);
    const [date_naissance, setDate_naissance] = React.useState<{ value: Date | undefined, error: string }>({ value: data.date_naissance, error: '' });
    const { t } = useTranslation();

    function formatDateToYMD(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }



    const [country, setCountry] = React.useState({ label: '🇨🇦 Canada', value: 'ca', indicator: "1" });
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



    const onBack = () => {
        setStep((PrevStep: number) => {
            return PrevStep - 1;
        })
    };



    const [gender, setGender] = React.useState({
        value: '',
        list: [
            { _id: '1', value: t('identitycreen.single') },
            { _id: '2', value: t('identitycreen.married') },
            { _id: '3', value: t('identitycreen.divorce') },
        ],
        selectedList: [],
        error: '',
    });



    function formatDate(val: any) {
        if (Number(val) > 9) {
            return val
        } else {
            return '0' + val;
        }
    }



    const onValid = () => {

      
        const familyNameError  = firstNameValidator(familyname.value);
        const firstNameError = familyNameValidator(firstName.value);
        const dateNaissError = dateNaissValidator(formatDateToYMD(date_naissance.value));
        const nationalityError = nationalityValidator(nationality.value);


        if (firstNameError || familyNameError || nationalityError || dateNaissError) {

            setFamilyName({ ...familyname, error: t(`${familyNameError}`) });
            setFirstName({ ...firstName, error: t(`${firstNameError}`) });
            setDate_naissance({ ...date_naissance, error: t(`${dateNaissError}`) });
            setNationality({ ...nationality, error: t(`${nationalityError}`) });

            return;
        }


        const dataNaissString = date_naissance.value?.getFullYear() + '-' + formatDate(date_naissance.value?.getMonth()) + '-' + formatDate(date_naissance.value?.getDate());


        setData(
            {
                ...data,
                nom: familyname.value,
                prenoms: firstName.value, //user.prenoms,
                sexe: sex.value,// user.sexe,
                statut_mat: statut_mat.value, // user.date_naissance,
                date_naissance: dataNaissString, // user.date_naissance,
                nationalite: nationality.value // user.date_naissance,
            }

        );

        //console.log(data);
        setStep(2);
    }

   


    return (
        <View style={styles.main}>
            <KeyboardAvoidingView
                enabled={true}
               // behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
            >

                <View style={{
                    width: '100%',
                    backgroundColor: '#e6e4e0',
                    flexDirection: 'row',
                    justifyContent:'space-between',
                    alignItems:'center',
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    borderRadius: 10,
                    height: 50,
                    paddingHorizontal: 10
                }}>
                    <View style={{justifyContent: 'center'}}>
                        <Text style={{ fontSize: 16, color: Colors.text, fontWeight: 'bold' }}>1. {t('kyc.identitydetails')}</Text>
                    </View>

                    <View style={{ justifyContent:'center'}}>
                       <Ionicons name="checkmark-done-outline" size={20} color={step > 1 ? Colors.primary :'gray'}/>
                    </View>

                </View>

                {
                    step === 1 &&
                    <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>

                        <View style={{ justifyContent: 'center', padding: 10 }}>
                            
                        
                            <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start', marginTop: 10}}>
                                <View style={styles.inputTitle}>
                                    <Text style={styles.inputTitleText}>{t('identitycreen.firstname')}*</Text>
                                </View>

                                <TextInput
                                    label={t('identitycreen.yourfirstname')}
                                    returnKeyType="next"
                                    value={firstName.value}
                                    onChangeText={(text: string) => setFirstName({ value: text, error: '' })}
                                    error={!!firstName.error}
                                    errorText={firstName.error}
                                    autoCapitalize="none"
                                    description={undefined}
                                />
                            </View>

                            <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start', marginTop: 10 }}>
                                    <View style={styles.inputTitle}>
                                        <Text style={styles.inputTitleText} >{t('identitycreen.familyname')}</Text>
                                    </View>
                                    <TextInput
                                        label={t('identitycreen.familyname')}
                                        returnKeyType="next"
                                        value={familyname.value}
                                        onChangeText={(text: string) => setFamilyName({ value: text, error: '' })}
                                        error={!!familyname.error}
                                        errorText={familyname.error}
                                        autoCapitalize="none"
                                        description={undefined}
                                    />
                                </View>


                            <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start', marginTop: 10 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10 }}>
                                    <Text style={styles.inputTitleText}>{t('identitycreen.sex')}*</Text>
                                </View>
                                <View style={{ flexDirection: 'row',marginTop: -10  }}>
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' ,}}>
                                        <View style={{}}>
                                            <RadioButton
                                                value="first"
                                                status={sex.value === 'M' ? 'checked' : 'unchecked'}
                                                onPress={() => setSex({ value: 'M', error: '' })}
                                                color={Colors.primary}
                                            />
                                        </View>

                                        <View>
                                            <Text style={{ color: Colors.text }}>{t('identitycreen.male')}</Text>
                                        </View>
                                    </View>

                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                        <View>
                                            <RadioButton
                                                value="second"
                                                status={sex.value === 'F' ? 'checked' : 'unchecked'}
                                                onPress={() => setSex({ value: 'F', error: '' })}
                                                color={Colors.primary}
                                            />
                                        </View>

                                        <View>
                                            <Text style={{ color: Colors.text }} >{t('identitycreen.female')}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start', marginTop: 10 }}>
                                <View style={styles.inputTitle}>
                                    <Text style={styles.inputTitleText}>{t('identitycreen.statut')}*</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 10 , }}>
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center',  marginTop: -10  }}>
                                        <View>
                                            <RadioButton
                                                value="bachelor"
                                                status={statut_mat.value === 'C' ? 'checked' : 'unchecked'}
                                                onPress={() => setstatut_mat({ value: 'C', error: '' })}
                                                color={Colors.primary}
                                            />
                                        </View>

                                        <View>
                                            <Text style={{ color: Colors.text }}>{t('identitycreen.single')}</Text>
                                        </View>
                                    </View>

                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                        <View>
                                            <RadioButton
                                                value="married"
                                                status={statut_mat.value === 'M' ? 'checked' : 'unchecked'}
                                                onPress={() => setstatut_mat({ value: 'M', error: '' })}
                                                color={Colors.primary}
                                            />
                                        </View>

                                        <View>
                                            <Text style={{ color: Colors.text }} >{t('identitycreen.married')}</Text>
                                        </View>
                                    </View>

                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                        <View>
                                            <RadioButton
                                                value="devorce"
                                                status={statut_mat.value === 'D' ? 'checked' : 'unchecked'}
                                                onPress={() => setstatut_mat({ value: 'D', error: '' })}
                                                color={Colors.primary}
                                            />
                                        </View>

                                        <View>
                                            <Text style={{ color: Colors.text }} >{t('identitycreen.divorce')}</Text>
                                        </View>
                                    </View>

                            </View>
                          </View>


                          <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start', marginTop: 10 }}>
                              <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start', }}>
                                  <View style={styles.inputTitle}>
                                        <Text style={styles.inputTitleText}>{t('identitycreen.dateofbirth')}*</Text>
                                  </View>
                             
                                        <DateInput
                                            label={t('identitycreen.dateofbirth')}
                                            value={date_naissance.value}
                                            onChange={(d: Date | undefined) => setDate_naissance({ value: d, error: '' })}
                                            hasError={!!date_naissance.error}
                                            errorText={date_naissance.error}
                                            maximumDate={new Date()}
                                            validRange={{
                                                endDate: new Date()
                                            }}
                                        />
                              
                               </View>
                          </View>



                           <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start', marginTop: 10 }}>

                                <View style={styles.inputTitle}>
                                    <Text style={styles.inputTitleText}>{t('identitycreen.yourNationality')}*</Text>
                                </View>

                                <TextInput
                                    label={t('identitycreen.yourNationality')}
                                    returnKeyType="next"
                                    value={nationality.value}
                                    onChangeText={(text: string) => setNationality({ value: text, error: '' })}
                                    error={!!nationality.error}
                                    errorText={nationality.error}
                                    autoCapitalize="none"
                                    description={undefined}
                                />

                                {/*<Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    searchPlaceholderTextColor='gray'
                                    itemTextStyle={{ color: 'black' }}
                                    iconStyle={styles.iconStyle}
                                    data={COUNTRIES}
                                    search
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Selectionez un pays"
                                    searchPlaceholder={t('rechercher')}
                                    value={country}
                                    onChange={(item) => {
                                        setCountry(item)
                                    }}
                                />*/}

                            </View>

                            <View style={{ flexDirection: 'row', flex: 1, marginTop:20 }}>

                                <View style={{ flex: 1,  }}>
                                    <Button
                                        mode="contained"
                                        onPress={() => { onValid() }}>
                                        {t('kyc.next')}
                                    </Button>
                                </View>

                                <View style={{ flex: 1, }}>
                                    
                                </View>

                            </View>
                        </View>
                    </Pressable>
                }
               
            </KeyboardAvoidingView>
        </View>
    );
}


const styles = StyleSheet.create({
    main: {
        backgroundColor: '#ffff',
        flex: 1,
        marginTop: 20,
        borderRadius: 5,
        marginBottom: 0,
    },

    inputTitle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginVertical: -10,
        marginTop: 10
    },

    inputTitleText: {
        flex: 1,
        textAlign: 'left',
        color: Colors.text,
        fontWeight: 'bold',
        marginBottom: 15,
        fontSize: 14
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

   
});


export default Step1;

