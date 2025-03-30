import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SignInScreen from '../screens/SignInScreen';
import { useSelector, useDispatch } from 'react-redux';
import SignUpScreen from '../screens/signup/SignUpScreen';
import TelVerificationScreen from '../screens/signup/TelVerificationScreen';
import CountryScreen from '../screens/signup/CountryScreen';
import IdentityScreen from '../screens/signup/IdentityScreen';
import EmailScreen from '../screens/signup/EmailScreen';
import ParrainageScreen from '../screens/signup/ParrainageScreen';
import TabNavigator from './TabNavigator';
import PhotoProfilScreen from '../screens/signup/PhotoProfilScreen';
import RecoverScreen from '../screens/password/RecoverScreen';
import VerificationScreen from '../screens/password/VerificationScreen';
import NewPasswordScreen from '../screens/password/NewPasswordScreen';
import ProfilScreen from '../screens/hometab/ProfilScreen';
import kycScreen from '../screens/connected/KycScreen';
import AddBeneficiariesScreen from '../screens/beneficiary/AddBeneficiariesScreen';
import AddDirectoryBenefScreen from '../screens/beneficiary/AddDirectoryBenefScreen';
import ProfilBenefScreen from '../screens/beneficiary/ProfilBenefScreen';
import { Colors } from '../themes';
import AccountScreen from '../screens/connected/AccountScreen';
import TransfertScreen from '../screens/connected/TransfertScreen';
import ChooseBenefScreen from '../screens/connected/ChooseBenefScreen';
import { saveBenef } from '../store/profilSlice';
import ConfirmTransfert from '../screens/connected/ConfirmTransfert';
import TransfertBetweenAccount from '../screens/connected/TransfertBetweenAccount';
import ConfirmTransfertBetweenAccount from '../screens/connected/ConfirmTransfertBetweenAccount';
import FilterBeneficiaireScreen from '../screens/beneficiary/FilterBeneficiaireScreen';
import MyMessageScreen from '../screens/connected/MyMessageScreen';
import CashInScreen from '../screens/connected/CashInScreen';
import InteractCashinScreen from '../screens/connected/InteractCashinScreen';
import SellerCashInScreen from '../screens/connected/SellerCashInScreen';
import PayScreen from '../screens/connected/PayScreen';
import CardDetail from '../screens/connected/CardDetail';
import AddCardScreen from '../screens/card/AddCardScreen';
import ModifierCardScreen from '../screens/card/ModifierCardScreen';
import ModifyCardPinScreen from '../screens/card/ModifyCardPinScreen';
import MyInfoPersoScreen from '../screens/connected/MyInfoPersoScreen';
import MyHistoriesScreen from '../screens/connected/MyHistoriesScreen';
import ChangePasswordScreen from '../screens/connected/ChangePasswordScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
    
    const user = useSelector((state: any) => state.profil.user);
    const dispatch = useDispatch();
    dispatch(saveBenef(null));

    //console.log(user);
    return (
        <NavigationContainer>
            {user !== null ?
                <Stack.Navigator>

                    <Stack.Screen
                        name="Tab"
                        component={TabNavigator}
                        options={{ headerShown: false }} />

                    <Stack.Screen
                        name="ProfilScreen"
                        component={ProfilScreen}
                        options={{
                            title: 'Profil',
                            headerShown: false,
                            headerTintColor: '#fff',
                            headerTitleAlign: 'left',
                            headerTitleStyle: {},
                            headerStyle: {
                                backgroundColor: Colors.primary,
                            },
                        }} />

                    <Stack.Screen
                        name="kyc"
                        component={kycScreen}
                        options={{
                            title: 'Conformite Kyc',
                            headerShown: false,
                            headerTintColor: '#fff',
                            headerTitleAlign: 'left',
                            headerTitleStyle: {},
                            headerStyle: {
                                backgroundColor: Colors.primary,
                            },
                        }} />

                    <Stack.Screen
                        name="AddBeneficiariesScreen"
                        component={AddBeneficiariesScreen}
                        options={{ headerShown: false }} />

                    <Stack.Screen
                        name="AddDirectoryBenefScreen"
                        component={AddDirectoryBenefScreen}
                        options={{ headerShown: false }} />

                    <Stack.Screen
                        name="ProfilBenefScreen"
                        component={ProfilBenefScreen}
                        options={{ headerShown: false }} />

                    <Stack.Screen
                        name="AccountScreen"
                        component={AccountScreen}
                        options={{ headerShown: false }} />


                    <Stack.Screen
                        name="TransfertScreen"
                        component={TransfertScreen}
                        options={{ headerShown: false }} />

                    <Stack.Screen
                        name="ChooseBenefScreen"
                        component={ChooseBenefScreen}
                        options={{ headerShown: false }} />

                    <Stack.Screen
                        name="ConfirmTransfert"
                        component={ConfirmTransfert}
                        options={{ headerShown: false }} />

                    <Stack.Screen
                        name="TransfertBetweenAccount"
                        component={TransfertBetweenAccount}
                        options={{ headerShown: false }} />

                    <Stack.Screen
                        name="ConfirmTransfertBetweenAccount"
                        component={ConfirmTransfertBetweenAccount}
                        options={{ headerShown: false }} />

                    <Stack.Screen
                        name="FilterBeneficiaireScreen"
                        component={FilterBeneficiaireScreen}
                        options={{ headerShown: false }} />

                    <Stack.Screen
                        name="MyMessageScreen"
                        component={MyMessageScreen}
                        options={{ headerShown: false }} />

                    <Stack.Screen
                        name="CashInScreen"
                        component={CashInScreen}
                        options={{ headerShown: false }} />

                    <Stack.Screen
                        name="InteractCashinScreen"
                        component={InteractCashinScreen}
                        options={{ headerShown: false }} />

                    <Stack.Screen
                        name="SellerCashInScreen"
                        component={SellerCashInScreen}
                        options={{ headerShown: false }} />

                    <Stack.Screen
                        name="PayScreen"
                        component={PayScreen}
                        options={{ headerShown: false }} />

                    <Stack.Screen
                        name="CardDetail"
                        component={CardDetail}
                        options={{ headerShown: false }} />

                    <Stack.Screen
                        name="AddCardScreen"
                        component={AddCardScreen}
                        options={{ headerShown: false }} />

                    <Stack.Screen
                        name="ModifierCardScreen"
                        component={ModifierCardScreen}
                        options={{ headerShown: false }} />

                    <Stack.Screen
                        name="ModifyCardPinScreen"
                        component={ModifyCardPinScreen}
                        options={{ headerShown: false }} />


                    <Stack.Screen
                        name="MyInfoPersoScreen"
                        component={MyInfoPersoScreen}
                        options={{ headerShown: false }} />


                    <Stack.Screen
                        name="MyHistoriesScreen"
                        component={MyHistoriesScreen}
                        options={{ headerShown: false }} />

                    <Stack.Screen
                        name="ChangePasswordScreen"
                        component={ChangePasswordScreen}
                        options={{ headerShown: false }} />

              

                </Stack.Navigator>

                :

                <Stack.Navigator>

                    {/*<Stack.Screen
                             name="StartPage"
                             component={StartScreen}
                             options={{ headerShown: false }}
                        />*/}


                    <Stack.Screen
                        name="SignIn"
                        component={SignInScreen}
                        options={{ headerShown: false }} />


                    <Stack.Screen
                        name="CountryScreen"
                        component={CountryScreen}
                        options={{ headerShown: false }} />


                    <Stack.Screen
                        name="SignUp"
                        component={SignUpScreen}
                        options={{ headerShown: false }} />



                    <Stack.Screen
                        name="TelVerification"
                        component={TelVerificationScreen}
                        options={{ headerShown: false }} />



                    <Stack.Screen
                        name="Identity"
                        component={IdentityScreen}
                        options={{ headerShown: false }} />


                    <Stack.Screen
                        name="Email"
                        component={EmailScreen}
                        options={{ headerShown: false }} />


                    <Stack.Screen
                        name="PhotoScreen"
                        component={PhotoProfilScreen}
                        options={{ headerShown: false }} />


                    <Stack.Screen
                        name="Recover"
                        component={RecoverScreen}
                        options={{ headerShown: false }} />


                    <Stack.Screen
                        name="Verification"
                        component={VerificationScreen}
                        options={{ headerShown: false }} />


                    <Stack.Screen
                        name="NewPassword"
                        component={NewPasswordScreen}
                        options={{ headerShown: false }} />



                    <Stack.Screen
                        name="ParrainageScreen"
                        component={ParrainageScreen}
                        options={{ headerShown: false }} />



                </Stack.Navigator>}

        </NavigationContainer>
    );
}
