/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import { Colors } from '../../themes';
import { useNavigation } from '@react-navigation/native'; 


interface MyComponentProps {
    profilUrl: null | any;
    prenom: string;
}



const AvartarButton: React.FC<MyComponentProps> = ({ profilUrl, prenom }) => {

    const navigation = useNavigation();

    const getInitials = (phrase: string) => {
        const words = phrase.split(' '); // Divise la phrase en mots
        if (words.length < 2) {
            // Si la phrase a moins de 2 mots, retourner les initiales du premier mot
            return words[0][0].toUpperCase();
        }

        // Retourne les initiales des deux premiers mots en majuscule
        return words[0][0].toUpperCase() + words[1][0].toUpperCase();
    };


    return (
        <TouchableOpacity style={{justifyContent: 'flex-start' }} onPress={() => { navigation.navigate('ProfilScreen'); }} >
            <View style={styles.avatar} >
                {profilUrl != null ?
                    <Image
                        source={{ uri: profilUrl }}
                        style={styles.avatarImage}
                    />
                    :
                    <View style={{}}>
                        <Text style={{ color: Colors.text, fontWeight: 'bold', fontSize: 16 }}>{getInitials(prenom)}</Text>
                    </View>

                }
            </View>
        </TouchableOpacity>


    );
};


export default AvartarButton;

const styles = StyleSheet.create({

    main: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },


    avatarImage: {
        height: 50,
        width: 50,
        overflow: 'hidden',
        borderColor: '#ffffff',
        borderWidth: 1,
        borderRadius: 25,
    },


    avatar: {
        width: 40,
        height: 40,
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e6e4e0',
    },


});