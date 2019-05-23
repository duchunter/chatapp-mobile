import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { ListItem, Left, Body, Right, Thumbnail } from 'native-base';

import InputField from 'chatmobile/src/components/InputField';

import {
  font24, font16, font15, blur, medium, bold, book
} from 'chatmobile/src/styles/common/text';
import { grey, active } from 'chatmobile/src/styles/common/color';

const styles = StyleSheet.create({
  status: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 17,
    width: 17,
    borderRadius: 10,
    padding: 2,
    backgroundColor: 'white',
    zIndex: 10
  },

  statusInner: {
    height: 13,
    width: 13,
    borderRadius: 10,
    backgroundColor: active
  }
});

export default function Contacts() {
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
          <ListItem key={index}>
            <Left style={{ maxWidth: 70 }}>
              <Thumbnail source={require('chatmobile/src/assets/img/ava.jpg')} />
              <View style={styles.status}>
                <View style={[ styles.statusInner, !group.active && { backgroundColor: grey } ]}/>
              </View>
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
