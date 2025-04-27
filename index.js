/* eslint-disable prettier/prettier */
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import './src/localization/i18n';
import firebase from '@react-native-firebase/app';

firebase.initializeApp();



AppRegistry.registerComponent(appName, () => App);
