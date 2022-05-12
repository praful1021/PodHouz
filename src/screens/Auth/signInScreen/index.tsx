import React, {useContext, useState} from 'react';
import {Alert, Button, TextInput, View} from 'react-native';
import AuthContext from '../../../context/AuthContext';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {LoginButton} from 'react-native-fbsdk-next';

const SignInScreen = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSigningInProgress, setIsSigningInProgress] =
    useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>();

  const {signIn} = useContext(AuthContext);

  const googleSignIn = async () => {
    setIsSigningInProgress(true);
    try {
      await GoogleSignin.hasPlayServices();
      const googleUserInfo = await GoogleSignin.signIn();
      setUserInfo(googleUserInfo);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    } finally {
      setIsSigningInProgress(false);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign in" onPress={() => signIn({username, password})} />
      <GoogleSigninButton
        style={{width: 192, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={googleSignIn}
        disabled={isSigningInProgress}
      />
      <LoginButton
        testID="facebook-login"
        onLoginFinished={(error, data) => {
          Alert.alert(JSON.stringify(error || data, null, 2));
        }}
      />
    </View>
  );
};

export default SignInScreen;
