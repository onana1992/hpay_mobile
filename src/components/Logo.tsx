/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */

import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
    return <Image source={require('../assets/logo.jpg')} style={styles.image} />
}

const styles = StyleSheet.create({
    image: {
        width: 140,
        height: 140,
        marginBottom: 8,
    },
})
