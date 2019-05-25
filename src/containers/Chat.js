import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
  Container, Header, Content, Footer, Left, Body, Right, Icon
} from 'native-base';

import Avatar from 'chatmobile/src/components/Avatar';
import InputField from 'chatmobile/src/components/InputField';
import Message from 'chatmobile/src/components/Message';

import { font16, font15, blur, medium, bold } from 'chatmobile/src/styles/common/text';

const styles = StyleSheet.create({
  header: {
    height: 70,
    backgroundColor: 'white'
  },
  content: {
    flex: 1,
    paddingHorizontal: '5%',
    paddingVertical: 10,
    justifyContent: 'flex-end'
  }
});

export default function Chat() {
  const user = {
    name: 'Duc Ha',
    active: true
  };

  return (
    <Container>
      <Header style={styles.header}>
        <Left style={{ maxWidth: 70, minWidth: 70 }}>
          <Avatar
            isActive={user.active}
            img={require('chatmobile/src/assets/img/ava.jpg')}
          />
        </Left>
        <Body>
          <Text style={[ font16, bold ]}>
            {user.name}
          </Text>
          <Text style={[ font15, medium, blur ]}>
            {
              user.active ? 'Active now' : 'Offline'
            }
          </Text>
        </Body>
        <Right>
          <TouchableOpacity>
            <Icon
              name="md-more"
              style={[ blur, { fontSize: 22, paddingRight: 10 } ]}
            />
          </TouchableOpacity>
        </Right>
      </Header>

      <Content contentContainerStyle={styles.content}>
        <Message
          avatar={require('chatmobile/src/assets/img/ava.jpg')}
          content={'We\'ve got some killer ideas kicking about already.'}
          created={'09:46 AM'}
        />
        <Message content={'Well done all. See you all at 2 for the kick-off meeting.'} />
      </Content>

      <Footer style={styles.header}>
        <InputField
          iconRight={{ name: 'md-send' }}
          placeholder="Start typing for reply..."
          style={{ borderRadius: 0 }}
        />
      </Footer>
    </Container>
  );
}
