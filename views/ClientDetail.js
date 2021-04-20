import axios from 'axios';
import React from 'react';
import {Alert, Platform, StyleSheet, View} from 'react-native';
import {Button, FAB, Headline, Subheading, Text} from 'react-native-paper';
import globalStyles from '../styles/global';
import utils from '../utils';

const ClientDetail = ({navigation, route}) => {
  const {name, phone, email, company, id} = route.params.item;
  const {evaluatePlatform} = utils;

  const showConfirmation = () => {
    Alert.alert(
      'Do you want to delete this client?',
      'A contact will be deleted. This cannot be recovered',
      [
        {text: 'Yes, Delete', onPress: () => deleteClient()},
        {text: 'Cancel', style: 'cancel'},
      ],
    );
  };
  const deleteClient = async () => {
    const urlBase = evaluatePlatform(Platform.OS);
    const url = `${urlBase}/${id}`;

    try {
      await axios.delete(url);
    } catch (error) {
      console.log(error);
    }

    navigation.navigate('Home');
  };
  return (
    <View style={globalStyles.container}>
      <Headline style={globalStyles.title}>{name}</Headline>
      <Text style={styles.text}>
        Company: <Subheading>{company}</Subheading>{' '}
      </Text>
      <Text style={styles.text}>
        Email: <Subheading>{email}</Subheading>{' '}
      </Text>
      <Text style={styles.text}>
        Phone: <Subheading>{phone}</Subheading>{' '}
      </Text>

      <Button
        style={styles.button}
        mode="contained"
        icon="cancel"
        onPress={() => showConfirmation()}>
        Delete Client
      </Button>

      <FAB
        icon="pencil"
        style={globalStyles.fab}
        onPress={() =>
          navigation.navigate('NewClient', {
            client: route.params.item,
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginBottom: 20,
    fontSize: 18,
  },
  button: {
    marginTop: 100,
    backgroundColor: 'red',
  },
});

export default ClientDetail;
