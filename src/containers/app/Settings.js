import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { ListItem, Left, Body, Right, Thumbnail, Icon } from 'native-base';

import {
  font24, font16, font15, font18, blur, bold, book
} from 'chatmobile/src/styles/common/text';

const styles = StyleSheet.create({
  infoContainer: {
    alignItems: 'center',
    marginVertical: 20
  }
});

export default function Settings() {
  const userInfo = {
    name: 'Duc Ha',
    username: 'testuser',
    ava: require('chatmobile/src/assets/img/ava.jpg')
  };


  return (
    <ScrollView>
      <View style={styles.infoContainer}>
        <Thumbnail large source={userInfo.ava} />
        <Text style={[ font18, bold, { marginTop: 10, marginBottom: 2 } ]}>
          {userInfo.name}
        </Text>
        <Text style={[ font15, book, blur ]}>
          {userInfo.username}
        </Text>
      </View>

      <Text style={[ bold, font24, { marginLeft: 15, marginBottom: 15 } ]}>
        Settings
      </Text>

      <ListItem>
        <Left style={{ maxWidth: 40, minWidth: 40 }}>
          <Icon
            name="account-outline"
            type="MaterialCommunityIcons"
            style={[ blur, { transform: [ { scaleX: 2 }, { scaleY: 2 } ] } ]}
          />
        </Left>
        <Body>
          <Text style={[ font16, bold, { marginBottom: 5 } ]}>
            My Account
          </Text>
          <Text note style={[ book, blur ]}>
            Update your profile details
          </Text>
        </Body>
        <Right>
          <Icon name="angle-right" type="FontAwesome" />
        </Right>
      </ListItem>

      <ListItem>
        <Left style={{ maxWidth: 40, minWidth: 40 }}>
          <Icon
            name="power-off"
            type="FontAwesome"
            style={[ blur, { transform: [ { scaleX: 1.5 }, { scaleY: 1.5 } ] } ]}
          />
        </Left>
        <Body>
          <Text style={[ font16, bold, { marginBottom: 5 } ]}>
            Sign out
          </Text>
          <Text note style={[ book, blur ]}>
            Log out of your account
          </Text>
        </Body>
      </ListItem>
    </ScrollView>
  );
}
