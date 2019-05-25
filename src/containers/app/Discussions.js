import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { ListItem, Left, Body, Right } from 'native-base';

import InputField from 'chatmobile/src/components/InputField';
import Avatar from 'chatmobile/src/components/Avatar';

import {
  font24, font16, font15, blur, medium, bold, book
} from 'chatmobile/src/styles/common/text';

export default function Discussions({ navigation }) {
  const groups = [
    {
      name: 'Group chat',
      active: true
    },
    {
      name: 'Group chat 1',
      active: true
    },
    {
      name: 'Group chat 2',
      active: false
    }
  ];

  return (
    <ScrollView>
      <View style={{ margin: 15 }}>
        <InputField
          iconLeft={{ name: 'md-search' }}
          placeholder="Search for conversations..."
        />
      </View>

      <Text style={[ bold, font24, { marginLeft: 15, marginVertical: 15 } ]}>
        Discussions
      </Text>

      {
        groups.map((group, index) => (
          <ListItem
            key={index}
            onPress={() => {
              navigation.navigate('Chat');
            }}
          >
            <Left style={{ maxWidth: 70, minWidth: 70 }}>
              <Avatar
                isActive={group.active}
                img={require('chatmobile/src/assets/img/ava.jpg')}
              />
            </Left>
            <Body>
              <Text style={[ font16, bold ]}>
                {group.name}
              </Text>
              <Text style={[ font15, medium ]}>
                A chat message, this is a test
              </Text>
            </Body>
            <Right>
              <Text note style={[ book, blur ]}>3:43 pm</Text>
            </Right>
          </ListItem>
        ))
      }
    </ScrollView>
  );
}
