/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
/*import { theme } from '../core/theme'*/

import React from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'



const Button = ({ ...props})=> {
    return (
        <PaperButton
            children={undefined}
            style={[
                styles.button,
                props.mode === 'contained' && { backgroundColor: '#ef5924'}             
            ]}
            labelStyle={props.mode === 'contained' ? styles.text : styles.text_outline}
            {...props}
        />
    )
}

const styles = StyleSheet.create({

    button: {
        width: '100%',
        marginVertical: 10,
        paddingVertical: 2,
        borderRadius: 5,
        
    },

    text: {
        //fontWeight: 'bold',
        fontSize: 16,
        lineHeight: 26,
        color: "white"

    },

    text_outline: {
        //fontWeight: 'bold',
        fontSize: 16,
        color: 'black',
        lineHeight: 26,

    },

    button2: {
        backgroundColor: '#ef5924',
        color: 'white'
    }
})


export default Button;
