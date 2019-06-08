import React, { useEffect } from 'react';
import { Container, Content } from 'native-base';
import SInfo from 'react-native-sensitive-info';

import Loading from 'chatmobile/src/components/Loading';

export default function StartScreen({ navigation }) {
  useEffect(() => {
    SInfo.getItem('username', {}).then(user => {
      if (user) {
        navigation.navigate('App');
      } else {
        navigation.navigate('Login');
      }
    });
  }, []);

  return (
    <Container>
      <Content contentContainerStyle={{ flex: 1 }}>
        <Loading />
      </Content>
    </Container>
  );
}
