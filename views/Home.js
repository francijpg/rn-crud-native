import React, {useState, useCallback} from 'react';
import axios from 'axios';
import {FlatList, Platform, View} from 'react-native';
import {Button, FAB, Headline, List} from 'react-native-paper';
import globalStyles from '../styles/global';
import utils from '../utils';
import {useFocusEffect} from '@react-navigation/native';

const Home = ({navigation}) => {
  const [clients, setClients] = useState([]);
  const {evaluatePlatform} = utils;

  useFocusEffect(
    useCallback(() => {
      const getApiClients = async () => {
        try {
          const url = evaluatePlatform(Platform.OS);
          const {data} = await axios.get(url);
          setClients(data);
        } catch (error) {
          console.log(error);
        }
      };

      getApiClients();
    }, [evaluatePlatform]),
  );

  return (
    <View style={globalStyles.container}>
      <Button
        icon="plus-circle"
        onPress={() => navigation.navigate('NewClient')}>
        New Client
      </Button>

      <Headline style={globalStyles.title}>
        {clients.length > 0 ? 'Clients' : "There aren't Clients yet"}
      </Headline>

      <FlatList
        data={clients}
        keyExtractor={client => client.id.toString()}
        renderItem={({item}) => (
          <List.Item
            title={item.name}
            description={item.company}
            onPress={() =>
              navigation.navigate('ClientDetail', {
                item,
              })
            }
          />
        )}
      />

      <FAB
        icon="plus"
        style={globalStyles.fab}
        onPress={() => navigation.navigate('NewClient')}
      />
    </View>
  );
};

export default Home;
