import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
// import Swiper from 'react-native-swiper';

import Login from '../Login/index';

const slides = [
  {
    key: 'one',
    text: 'Choose your favorite dishes from the nearest restorant or cafe',
    image: require('../../../assets/images/img1.jpg'),
  },
  {
    key: 'two',
    text: 'Taste fresh delicious meals anytime and anywhere',
    image: require('../../../assets/images/img2.jpg'),
  },
  {
    key: 'three',
    text: 'We also deliver food and drinks from the nearest supermarket',
    image: require('../../../assets/images/img3.jpg'),
  },
];

class IntroSlider extends Component {
  state = {
    showRealApp: false,
  };
  _renderItem = ({item}) => {
    return (
      <View style={styles.slide}>
      <View style={styles.slideImg}>
        <Image source={item.image} style={styles.image} />
      </View>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };
  _renderNextButton = () => {
    return (
      <TouchableOpacity style={styles.btn}>
        <Text>NEXT</Text>
      </TouchableOpacity>
    )
  }
  _renderSkipButton = () => {
    return (
      <TouchableOpacity>
        <Text>SKIP</Text>
      </TouchableOpacity>
    )
  }
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({showRealApp: true});
  };
  render() {
    if (this.state.showRealApp) {
      return <Login />;
    } else {
      return (
        <AppIntroSlider
          activeDotStyle={{width: 25, backgroundColor: '#0080ff'}}
          renderItem={this._renderItem}
          data={slides}
          // renderNextButton={this._renderNextButton}
          // renderSkipButton={this._renderSkipButton}
          bottomButton={this._renderNextButton}
          showSkipButton={this._renderSkipButton}
          onDone={this._onDone}
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    flex: 1,
  },
  slideImg: {
    width: 400,
    height: 350,
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
    shadowColor: '#0080ff',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 50,
    elevation: 60,
  },
  image: {
    // flex: 1,
    width: '99%',
    height: '99%',
    resizeMode: 'stretch',
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 150,
  },
  text: {
    flex: 1,
    paddingTop: 80,
    width: 205,
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0080ff',
    lineHeight: 23,
  },
  btn: {
    backgroundColor: '#0080ff',
  },
});

export default IntroSlider;
