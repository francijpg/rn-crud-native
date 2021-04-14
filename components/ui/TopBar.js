import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const TopBar = ({navigation, route}) => {
  const handlePress = () => {
    navigation.navigate('NewClient');
  };

  return (
    <Icon.Button name="plus-circle" color="#FFF" onPress={() => handlePress()}>
      Client
    </Icon.Button>
  );
};

export default TopBar;
