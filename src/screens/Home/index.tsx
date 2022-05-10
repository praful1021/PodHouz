import React from 'react';
import {Button, Text, View} from 'react-native';
import AuthContext from '../../context/AuthContext';

const HomeScreen = () => {
  const {signOut} = React.useContext(AuthContext);

  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Sign out" onPress={() => signOut()} />
    </View>
  );
};

export default HomeScreen;
