import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 60,
        alignSelf: 'center',
    },
    textInput: {
        borderRadius: 30,
        paddingHorizontal: 30,
        // marginVertical: 5,
        //backgroundColor: '#ddd',
    },
    passInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    forgetText: {
        color: '#0080ff',
        fontWeight: 'bold',
        paddingHorizontal: 35,
        paddingVertical: 6,
    },
    loginBtn: {
        backgroundColor: '#0080ff',
        alignItems: 'center',
        paddingVertical: 13,
        borderRadius: 30,
        marginVertical: 30,
    },
    socialBtn: {
        flexDirection: 'row',
        backgroundColor: '#a3daff',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 13,
        borderRadius: 30,
        paddingHorizontal: 30,
        marginVertical: 10,
    },
    imgIcon: {
        width: 20,
        height: 20,
    },
    joinView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 170,
        alignSelf: 'center',
        paddingVertical: 40,
    }
});

                // <TextInput
                //     placeholder="Email"
                //     keyboardType="email-address"
                //     selectTextOnFocus={true}
                //     style={[styles.textInput,{backgroundColor: data.hasFocus ? '#e85a71' : '#ddd'}]}
                //     onBlur={() => emailValidator()}
                //     onFocus={()=> setData({hasFocus:true})}
                //     onChangeText={(val) => setData({email: val})}
                //     onTextInput={()=>setData()}
                // />
                // <Text style={{color: '#e85a71'}}>{data.emailError}</Text>
                
                // const [data, setData] = useState({
                //     email: '',
                //     password: '',
                //     secureTextEntry: true,
                //     isValidUser: true,
                //     isValidPassword: true,
                //     hasFocus: false,
                //     passFocus: false,
                //     emailError: '',
                //     passError: '',
                //   });
                
                //   const textInputChange = () => {};
                
                //   const validEmail = (text) => {
                //       let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                //       if (reg.test(text) == false) {
                //           setData({email: 'Email is Not Valid'})
                //           return false;
                //       } else {
                //           setData({email: ''})
                //       }
                //   }