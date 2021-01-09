import React, {useEffect} from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'

//Icon Path
import Ionicons from 'react-native-vector-icons/Ionicons';

const Splash = ({navigation}) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Slider');
        }, 3000);
    }, [])
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../../assets/images/food1.jpg')} style={styles.imageBackground}>
                <View style={styles.imageCover}>
                    <Ionicons name="ios-fast-food" size={150} color="#FFF"/>
                    <Text style={{fontSize: 50,color: '#FFF'}}>FoodApp</Text>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBackground: {
        flex: 1,
    },
    imageCover: {
        flex: 1,
        backgroundColor: '#0080ff',
        opacity: 0.8,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Splash;