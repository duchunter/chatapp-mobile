import React, { useState } from 'react';
import { StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import {
  Container, Header, Content, Footer, Left, Body, Right, Icon, ActionSheet
} from 'native-base';
import moment from 'moment';

import Avatar from 'chatmobile/src/components/Avatar';
import InputField from 'chatmobile/src/components/InputField';
import Message from 'chatmobile/src/components/Message';
import InputModal from 'chatmobile/src/components/InputModal';

import useStore from 'chatmobile/src/hooks/useStore';
import socket from 'chatmobile/src/plugins/socket';
import alert from 'chatmobile/src/plugins/alert';

import { font16, font15, blur, medium, bold } from 'chatmobile/src/styles/common/text';

const BUTTONS = [
  { text: 'Change group name', icon: 'md-create', iconColor: 'black' },
  { text: 'Add member', icon: 'md-person-add', iconColor: 'black' },
  { text: 'Kick member', icon: 'md-walk', iconColor: 'black' },
  { text: 'Leave group', icon: 'md-trash', iconColor: 'black' },
  { text: 'Cancel', icon: 'close', iconColor: 'black' }
];

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

export default function Chat({ navigation }) {
  // State
  const [ chatText, setChatText ] = useState('');
  const [ modal, setModal ] = useState({});
  const [ visible, setVisible ] = useState(false);

  // Store
  const { state, mutations } = useStore();
  const { selectedGroup, friends, userInfo } = state;

  // Parser
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

  // Socket
  const changeName = (name) => {
    const payload = {
      group: {
        ...selectedGroup,
        id: selectedGroup._id,
        name
      }
    };
    socket.emit('update-group-chat-info', payload, isSuccess => {
      if (isSuccess) {
        alert({ text: 'Done' });
      } else {
        alert({ text: 'Something went wrong', type: 'danger' });
      }
    });
  };

  const addMember = (username) => {
    const payload = {
      username,
      groupId: selectedGroup._id
    };
    socket.emit('add-member', payload, isSuccess => {
      if (isSuccess) {
        alert({ text: 'Done' });
      } else {
        alert({ text: 'Something went wrong', type: 'danger' });
      }
    });
  };

  const kickMember = (username) => {
    const payload = {
      username,
      groupId: selectedGroup._id,
      groupName: selectedGroup.name
    };
    socket.emit('remove-member', payload, isSuccess => {
      if (isSuccess) {
        alert({ text: 'Done' });
      } else {
        alert({ text: 'Something went wrong', type: 'danger' });
      }
    });
  };

  const leaveGroup = () => {
    const payload = {
      groupId: selectedGroup._id,
      username: userInfo.username
    };
    socket.emit('remove-member', payload, isSuccess => {
      if (isSuccess) {
        alert({ text: 'Done' });
        mutations.REMOVE_GROUP(selectedGroup._id);
        navigation.goBack();
      } else {
        alert({ text: 'Something went wrong', type: 'danger' });
      }
    });
  };

  // Methods
  const showAction = () => {
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: BUTTONS.length - 1,
        title: selectedGroup.name
      },
      buttonIndex => {
        switch (buttonIndex) {
        // Change name
        case 0:
          setVisible(true);
          setModal({
            title: 'Change group name',
            label: 'GROUP NAME',
            placeholder: 'Enter new group name',
            buttonText: 'Submit',
            onSubmit: changeName,
            onClose: () => setVisible(false)
          });
          break;

        // Add member
        case 1:
          setVisible(true);
          setModal({
            title: 'Add new member',
            label: 'USERNAME',
            placeholder: 'Enter username',
            buttonText: 'Add to group',
            onSubmit: addMember,
            onClose: () => setVisible(false)
          });
          break;

        // Kick member
        case 2:
          setVisible(true);
          setModal({
            title: 'Kick a member',
            label: 'USERNAME',
            placeholder: 'Enter username',
            buttonText: 'Kick from group',
            onSubmit: kickMember,
            onClose: () => setVisible(false)
          });
          break;

        // Leave group
        case 3:
          leaveGroup();
          break;
        default:
            // Do nothing
        }
      }
    );
  };

  const submit = () => {
    if (chatText) {
      let message = {
        created: Date.now(),
        group_id: selectedGroup._id,
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
          <TouchableOpacity onPress={showAction}>
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

      <InputModal {...modal} visible={visible}/>
    </Container>
  );
}
