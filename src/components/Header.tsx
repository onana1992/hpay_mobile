/* eslint-disable semi */
/* eslint-disable prettier/prettier */

import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Colors } from '../themes';

const Header: React.FC<any> = (props) => {
    return <Text style={styles.header} {...props} />
}

const styles = StyleSheet.create({
    header: {
        fontSize: 22,
        color: Colors.text,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});



export default Header;
