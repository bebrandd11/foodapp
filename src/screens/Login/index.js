import React, { useState, useEffect } from 'react';
import {
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';

//Icon Path
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Login = () => {
  const navigation = useNavigation();

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '712593053086-fihj7mdt93rfq8rd2ggq4netlqarmtrs.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      // hostedDomain: '', // specifies a hosted domain restriction
      // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      // accountName: '', // [Android] specifies an account name on the device that should be used
      // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
  }, []);

  const googleLogin = async () => {
    try {
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return await auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log({ error });
    }
  }

  const fbLogin = async () => {
    try {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

      // Sign-in the user with the credential
      return await auth().signInWithCredential(facebookCredential);
    } catch (error) {
      console.log({ error });
    }
  }

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // this.setState({ userInfo });
      console.log(userInfo);
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [data, setData] = useState({
    email: '',
    password: '',
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    hasFocus: false,
    passFocus: false,
    emailError: '',
    passError: '',
  });

  const textInputChange = () => { };

  const validEmail = (text) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      setData({ ...data, emailError: 'please enter the valid email' });
      return false;
    } else {
      setData({ ...data, emailError: '' });
    }
  };

  const emailValidator = () => {
    if (data.email == '') {
      setData({ ...data, emailError: 'please enter the email' });
    } else {
      setData({ ...data, emailError: '' });
    }
  };

  const passwordValidator = () => {
    if (data.password == '') {
      setData({ ...data, passError: 'please enter the Password' });
    } else {
      setData({ ...data, passError: '' });
    }
  };

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const onSubmit = () => {
    // if(isValide){
    //   navigation.navigate('Home')
    // }
    isValide()
  };

  const isValide = () => {
    // const {email,password} = data
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email == "") {
      alert('please enter the email');
    } else if (reg.test(email) == false) {
      alert('please enter the valid email')
    } else if (password == "") {
      alert('please enter the password');
    } else if (password.length < 8) {
      alert('please enter minimum 8 charecter')
    } else {
      navigation.navigate('Home')
    }
  };

  const renderMainView = () => {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {renderHeader()}
          {renderTextInput()}
          {renderForgetPassword()}
          {renderLoginButton()}
          {renderSocialButton()}
          {renderJoin()}
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const renderHeader = () => {
    return (
      <View>
        <Text style={styles.headerText}>Log in</Text>
      </View>
    );
  };

  const renderTextInput = () => {
    return (
      <View>
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          selectTextOnFocus={true}
          style={[
            styles.textInput,
            { backgroundColor: data.hasFocus ? '#e85a71' : '#ddd' },
          ]}
          value={email}
          onFocus={() => setData({ hasFocus: true })}
          // onBlur={() => emailValidator()}
          onChangeText={(val) => setEmail(val)}
        // onChangeText={(text) => validEmail(text)}
        />
        <Text style={{ color: '#e85a71' }}>{data.emailError}</Text>
        <View
          style={[
            styles.passInput,
            styles.textInput,
            {
              backgroundColor: data.passFocus ? '#e85a71' : '#ddd',
              borderRadius: 30,
            },
          ]}>
          <TextInput
            placeholder="Password"
            keyboardType="default"
            secureTextEntry={data.secureTextEntry ? true : false}
            value={password}
            onFocus={() => setData({ passFocus: true })}
            // onBlur={() => passwordValidator()}
            onChangeText={(val) => setPassword(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <MaterialCommunityIcons name="eye-off" size={25} />
            ) : (
                <MaterialCommunityIcons name="eye" size={25} />
              )}
          </TouchableOpacity>
        </View>
        <Text style={{ color: '#e85a71' }}>{data.passError}</Text>
      </View>
    );
  };

  const renderForgetPassword = () => {
    return (
      <TouchableOpacity onPress={() => { }}>
        <Text style={styles.forgetText}>Forget Password ?</Text>
      </TouchableOpacity>
    );
  };

  const renderLoginButton = () => {
    return (
      <TouchableOpacity style={styles.loginBtn} onPress={() => onSubmit()}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Log in</Text>
      </TouchableOpacity>
    );
  };

  const renderSocialButton = () => {
    return (
      <View>
        {/* <GoogleSigninButton
          style={{width: 192, height: 48}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn}
        /> */}
        <TouchableOpacity style={[styles.socialBtn, { marginTop: 80 }]} onPress={() => googleLogin()}>
          <View />
          <Text style={{ color: '#0080ff', fontWeight: 'bold' }}>
            Log in with Google
          </Text>
          <Image
            source={require('../../../assets/icons/google.png')}
            style={styles.imgIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialBtn} onPress={() => fbLogin()}>
          <View />
          <Text style={{ color: '#0080ff', fontWeight: 'bold' }}>
            Log in with Facebook
          </Text>
          <Image
            source={require('../../../assets/icons/facebook.png')}
            style={styles.imgIcon}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderJoin = () => {
    return (
      <View style={styles.joinView}>
        <Text style={{ color: '#aaa', fontWeight: 'bold' }}>Not a member?</Text>
        <TouchableOpacity>
          <Text style={{ color: '#0080ff', fontWeight: 'bold' }}>Join now</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return renderMainView();
};

export default Login;

// const isValide = () => {
//   const {emailError} = email
//   const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   if (email == "") {
//     console.log(emailError);
//     alert( 'please enter the email');
//     setEmail({...email, emailError: 'please enter the email' });
//   } else if (reg.test(email) == false) {
//     alert({emailError: 'please enter the valid email'})
//     setEmail({...email, emailError: 'please enter the valid email' });
//   } else if (password == "") {
//     alert({emailError: 'please enter the password'});
//   } else if (password.length < 8) {
//     alert({emailError: 'please enter minimum 8 charecter'})
//   } else {
//     navigation.navigate('Home')
//   }
// };
// const setEmailValidator = () => {
//   const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   if (email == "") {
//     setEmail({...email, emailError: 'please enter the email' });
//   } else if (reg.test(email) == false) {
//     setEmail({...email, emailError: 'please enter the valid email' });
//   } else {
//     setEmail({...email, emailError: '' });
//   }
// }
// const setPasswordValidator = () => {
//   if (password == "") {
//     setPassword({...password, passError: 'please enter the password' });
//   } else if (password.length < 8) {
//     setPassword({...password, passError: 'please enter minimum 8 charecter' });
//   } else {
//     setPassword({...password, passError: '' });
//   }
// }