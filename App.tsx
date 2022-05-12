/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-easy-toast';
import {Settings} from 'react-native-fbsdk-next';
import {RecoilRoot} from 'recoil';
import RecoilNexus from 'recoil-nexus';
import AuthContext from './src/context/AuthContext';
import SignInScreen from './src/screens/Auth/signInScreen';
import HomeScreen from './src/screens/Home';
import Colors from './src/theme/Colors';

type RootStackParamList = {
  Home: undefined;
  SignIn: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

Settings.initializeSDK();
GoogleSignin.configure();
interface Pros {
  children: any;
  onPress: () => void | undefined;
}

const CustomTabBarButton = ({children, onPress}: Pros) => (
  <TouchableOpacity style={styles.customButtonWrapper} onPress={onPress}>
    <View style={styles.customButtonView}>{children}</View>
  </TouchableOpacity>
);

const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 15,
          left: 15,
          right: 15,
          borderRadius: 15,
          height: 70,
          backgroundColor: Colors.WHITE,
          ...styles.shadow,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, focused}) => (
            <View style={styles.tabBarIconWrapper}>
              <Image
                style={[
                  styles.tabBarIcon,
                  {tintColor: focused ? 'red' : 'green'},
                ]}
                resizeMode={'contain'}
                source={require('./src/assets/images/profile.png')}
              />
              <Text style={[styles.tabBarText, {color: color}]}>Home</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Upcoming"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, focused}) => (
            <View style={styles.tabBarIconWrapper}>
              <Image
                style={[
                  styles.tabBarIcon,
                  {tintColor: focused ? 'red' : 'green'},
                ]}
                resizeMode={'contain'}
                source={require('./src/assets/images/profile.png')}
              />
              <Text style={[styles.tabBarText, {color: color}]}>Upcoming</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ADD"
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <Image
              style={styles.tabBarIcon}
              resizeMode={'contain'}
              source={require('./src/assets/images/profile.png')}
            />
          ),
          tabBarButton: (props: any) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Small Talk"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, focused}) => (
            <View style={styles.tabBarIconWrapper}>
              <Image
                style={[
                  styles.tabBarIcon,
                  {tintColor: focused ? 'red' : 'green'},
                ]}
                resizeMode={'contain'}
                source={require('./src/assets/images/profile.png')}
              />
              <Text style={[styles.tabBarText, {color: color}]}>
                Small Talk
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Audio Chat"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, focused}) => (
            <View style={styles.tabBarIconWrapper}>
              <Image
                style={[
                  styles.tabBarIcon,
                  {tintColor: focused ? 'red' : 'green'},
                ]}
                resizeMode={'contain'}
                source={require('./src/assets/images/profile.png')}
              />
              <Text style={[styles.tabBarText, {color: color}]}>
                Audio Chat
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const [state, dispatch] = React.useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        //userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data: any) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        console.log(data);
        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: async (data: any) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        console.log(data);
        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <RecoilRoot>
        <RecoilNexus />
        <NavigationContainer>
          {state.userToken == null ? (
            <Stack.Navigator>
              <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{
                  title: 'Sign in',
                  // When logging out, a pop animation feels intuitive
                  // You can remove this if you want the default 'push' animation
                  animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                }}
              />
            </Stack.Navigator>
          ) : (
            <MyTabs />
          )}
          <Toast
            ref={ref => (global['successToast'] = ref)}
            style={styles.successToastContainer}
            position="bottom"
            positionValue={200}
            fadeInDuration={750}
            fadeOutDuration={1000}
            opacity={0.8}
            textStyle={styles.toastText}
          />
          <Toast
            ref={ref => (global['errorToast'] = ref)}
            style={styles.errorToastContainer}
            position="bottom"
            positionValue={200}
            fadeInDuration={750}
            fadeOutDuration={1000}
            opacity={0.8}
            textStyle={styles.toastText}
          />
        </NavigationContainer>
      </RecoilRoot>
    </AuthContext.Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  successToastContainer: {
    backgroundColor: Colors.GRAY_FOUR,
    borderRadius: 4,
    borderLeftWidth: 4,
    borderLeftColor: Colors.toastSuccess,
    width: '92%',
    padding: 0,
  },
  errorToastContainer: {
    backgroundColor: Colors.GRAY_FOUR,
    borderRadius: 4,
    borderLeftWidth: 4,
    borderLeftColor: Colors.SWEET_RED,
    width: '92%',
    padding: 0,
  },
  toastText: {
    alignSelf: 'center',
    lineHeight: 18,
    color: Colors.WHITE,
    paddingVertical: 15,
    paddingHorizontal: 16,
    fontSize: 12,
  },
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      height: 10,
      width: 0,
    },
    shadowOpacity: 0.23,
    shadowRadius: 0.35,
    elevation: 5,
  },
  tabBarIcon: {
    height: 25,
    width: 25,
  },
  customButtonView: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.BLUE,
  },
  customButtonWrapper: {
    top: -30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7F5DF0',
    shadowOffset: {
      height: 10,
      width: 0,
    },
    shadowOpacity: 0.23,
    shadowRadius: 0.35,
    elevation: 5,
  },
  tabBarText: {
    fontSize: 12,
    marginBottom: 10,
  },
  tabBarIconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 10,
  },
});
