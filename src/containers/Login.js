import React, { useState } from 'react';
import { Container, Content, Form, Item, Input, Label, Text, Button } from 'native-base';

import login from 'chatmobile/src/api/login';

import { font24, font16, book, bold, white } from 'chatmobile/src/styles/common/text';
import { active } from 'chatmobile/src/styles/common/color';

export default function Login({ navigation }) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const signin = () => {
    login({ username, password }).then((isSuccess) => {
      if (isSuccess) {
        navigation.navigate('App');
      }
    });
  };

  return (
    <Container>
      <Content contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: '5%'
      }}>
        <Text style={[ font24, bold ]}>
          Log in
        </Text>

        <Form>
          <Item floatingLabel>
            <Label style={[ book, font16 ]}>
              Username
            </Label>
            <Input
              value={username}
              onChangeText={setUsername}
              style={[ book, font16 ]}
            />
          </Item>
          <Item floatingLabel last>
            <Label style={[ book, font16 ]}>
              Password
            </Label>
            <Input
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
              style={[ book, font16 ]}
            />
          </Item>
        </Form>

        <Button
          onPress={signin}
          style={{
            marginTop: 40,
            backgroundColor: active,
            width: '100%',
            justifyContent: 'center'
          }}
        >
          <Text style={[ font16, bold, white ]}>
            Log in
          </Text>
        </Button>

        <Button
          transparent
          onPress={() => navigation.navigate('Signup')}
          style={{
            width: '100%',
            justifyContent: 'center',
            marginTop: 10
          }}
        >
          <Text uppercase={false} style={[ font16, book ]}>
            Don't have an account?
          </Text>
        </Button>
      </Content>
    </Container>
  );
}
