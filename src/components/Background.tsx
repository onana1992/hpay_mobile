/* eslint-disable semi */
/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable react-native/no-inline-styles */

import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView } from 'react-native';
/*import { theme } from '../core/theme'*/

export default function Background({ children }): React.JSX.Element {
    return (
        /*<ImageBackground
            source={require('../assets/background_dot.png')}
            resizeMode="repeat"
            style={styles.background}
        >*/

            <KeyboardAvoidingView style={styles.container} behavior="padding">
                {children}
            </KeyboardAvoidingView>
        /*</ImageBackground>*/
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        // backgroundColor: theme.colors.surface,
    },

    container: {
        flex: 1,
        width: '100%',
        padding: 20,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
})
