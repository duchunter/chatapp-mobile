import React from 'react';
import { ScrollView, Text } from 'react-native';
import { ListItem, Left, Body, Thumbnail } from 'native-base';

import {
  font24, font16, blur, bold, book
} from 'chatmobile/src/styles/common/text';

export default function Contacts() {
  const notifications = [
    {
      content: 'Test has accepted your friend request'
    },
    {
      content: 'You have been added to group chat'
    }
  ];

  return (
    <ScrollView>
      <Text style={[ bold, font24, { marginLeft: 15, marginVertical: 15 } ]}>
        Notifications
      </Text>

      {
        notifications.map((noti, index) => (
          <ListItem key={index}>
            <Left style={{ maxWidth: 70 }}>
              <Thumbnail source={require('chatmobile/src/assets/img/ava.jpg')} />
            </Left>
            <Body>
              <Text style={[ font16, bold ]}>
                {noti.content}
              </Text>
              <Text note style={[ book, blur ]}>
                Oct 17, 2018
              </Text>
            </Body>
          </ListItem>
        ))
      }
    </ScrollView>
  );
}
