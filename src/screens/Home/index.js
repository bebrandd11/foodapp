import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

const Home = () => {
    return (
        <ScrollView horizontal>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ width: 100,height:200, backgroundColor: '#519D9E' }} />
                <View style={{ width: 200,height:200, backgroundColor: '#30A9DE' }} />
                <View style={{ width: 300,height:200, backgroundColor: '#38CD79' }} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({});

export default Home;