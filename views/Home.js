import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {FlatList, View} from 'react-native';
import {Button, FAB, Headline, List} from 'react-native-paper';
import globalStyles from '../styles/global';

const Home = ({navigation}) => {
  const [clients, setClients] = useState([]);
  const [consultAPI, setConsultAPI] = useState(true);

  // console.log(!!clients.length);
  useEffect(() => {
    const getApiClients = async () => {
      try {
        const {data} = await axios.get('http://localhost:8000/clients');
        setClients(data);
        setConsultAPI(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (consultAPI) {
      getApiClients();
    }
  }, [consultAPI]);

  return (
    <View style={globalStyles.container}>
      <Button
        icon="plus-circle"
        onPress={() => navigation.navigate('NewClient', {setConsultAPI})}>
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
                setConsultAPI,
              })
            }
          />
        )}
      />

      <FAB
        icon="plus"
        style={globalStyles.fab}
        onPress={() => navigation.navigate('NewClient', {setConsultAPI})}
      />
    </View>
  );
};

export default Home;
