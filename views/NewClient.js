import React, {useEffect, useRef, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import axios from 'axios';
import {
  Button,
  Dialog,
  Headline,
  Paragraph,
  Portal,
  TextInput,
} from 'react-native-paper';
import globalStyles from '../styles/global';
import utils from '../utils';

const NewClient = ({navigation, route}) => {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [alert, setAlert] = useState(false);

  const {evaluatePlatform} = utils;
  const titleRef = useRef('register new client');

  useEffect(() => {
    if (route.params?.client) {
      titleRef.current = 'update client';

      const {name, phone, email, company} = route.params.client;

      setClientName(name);
      setClientPhone(phone);
      setClientEmail(email);
      setClientCompany(company);
    }
  }, [titleRef, route.params?.client]);

  const registerClient = async () => {
    if (
      !clientName.trim().length ||
      !clientPhone.trim().length ||
      !clientEmail.trim().length ||
      !clientCompany.trim().length
    ) {
      setAlert(true);
      return;
    }

    const name = clientName.trim();
    const phone = clientPhone.trim();
    const email = clientEmail.trim();
    const company = clientCompany.trim();
    const client = {name, phone, email, company};
    // console.log(client);
    const urlBase = evaluatePlatform(Platform.OS);

    if (route.params?.client) {
      const {id} = route.params.client;
      client.id = id;
      const url = `${urlBase}/${id}`;

      try {
        await axios.put(url, client);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await axios.post(urlBase, client);
      } catch (error) {
        console.log(error);
      }
    }

    navigation.navigate('Home');
    setClientName('');
    setClientPhone('');
    setClientEmail('');
    setClientCompany('');
  };

  return (
    <View style={globalStyles.container}>
      <Headline style={globalStyles.title}>{titleRef.current}</Headline>
      <TextInput
        label="Name"
        placeholder="Name of Individual"
        onChangeText={text => setClientName(text)}
        value={clientName}
        style={styles.input}
      />
      <TextInput
        label="Phone"
        placeholder="987456123"
        onChangeText={text => setClientPhone(text)}
        value={clientPhone}
        style={styles.input}
      />
      <TextInput
        label="Email"
        placeholder="correo@correo.com"
        onChangeText={text => setClientEmail(text)}
        value={clientEmail}
        style={styles.input}
      />
      <TextInput
        label="Company"
        placeholder="Company's Name"
        onChangeText={text => setClientCompany(text)}
        value={clientCompany}
        style={styles.input}
      />
      <Button
        icon="pencil-circle"
        mode="contained"
        onPress={() => registerClient()}>
        Save Client
      </Button>

      <Portal>
        <Dialog visible={alert} onDismiss={() => setAlert(false)}>
          <Dialog.Title>Warning</Dialog.Title>
          <Dialog.Content>
            <Paragraph>All fields are required</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setAlert(false)}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
});

export default NewClient;
