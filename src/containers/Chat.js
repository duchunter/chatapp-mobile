import React, { useState } from 'react';
import { StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import {
  Container, Header, Content, Footer, Left, Body, Right, Icon
} from 'native-base';
import moment from 'moment';

import Avatar from 'chatmobile/src/components/Avatar';
import InputField from 'chatmobile/src/components/InputField';
import Message from 'chatmobile/src/components/Message';

import useStore from 'chatmobile/src/hooks/useStore';
import socket from 'chatmobile/src/plugins/socket';

import { font16, font15, blur, medium, bold } from 'chatmobile/src/styles/common/text';

const styles = StyleSheet.create({
  header: {
    height: 70,
    backgroundColor: 'white'
  },
  content: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'flex-end'
  }
});

export default function Chat() {
  const [ chatText, setChatText ] = useState('');
  const { state } = useStore();
  const { selectedGroup, friends, userInfo } = state;

  const getActiveStatus = () => {
    return selectedGroup.members.some(username => {
      let friend = friends.find(user => user.username === username);
      return friend && friend.active;
    });
  };

  const getSender = (username) => {
    return friends.find(user => user.username === username);
  };

  const getAvatar = (sender) => {
    if (sender === userInfo.username) {
      return null;
    }

    const user = getSender(sender);
    if (user && user.avatar && user.avatar !== 'default') {
      return { uri: user.avatar };
    }

    return require('chatmobile/src/assets/img/avatar.png');
  };

  const submit = () => {
    if (chatText) {
      let message = {
        created: Date.now(),
        group_id: selectedGroup,
        sender: userInfo.username,
        content: chatText
      };

      setChatText('');
      socket.emit('chat-text', { message });
    }
  };

  return (
    <Container>
      <Header style={styles.header}>
        <Left style={{ maxWidth: 70, minWidth: 70 }}>
          <Avatar
            isActive={getActiveStatus()}
            name={selectedGroup.name}
          />
        </Left>
        <Body>
          <Text style={[ font16, bold ]}>
            {selectedGroup.name}
          </Text>
          <Text style={[ font15, medium, blur ]}>
            {
              getActiveStatus() ? 'Active now' : 'Offline'
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
        <FlatList
          style={{ flex: 1, paddingHorizontal: '5%' }}
          inverted={true}
          data={selectedGroup.messages}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <Message
              avatar={getAvatar(item.sender)}
              content={item.content}
              created={moment(item.created).format('h:mm A')}
            />
          )}
        />
      </Content>

      <Footer style={styles.header}>
        <InputField
          iconRight={{ name: 'md-send', onPress: submit }}
          placeholder="Start typing for reply..."
          style={{ borderRadius: 0 }}
          onChange={setChatText}
          onSubmit={submit}
          value={chatText}
        />
      </Footer>
    </Container>
  );
}
