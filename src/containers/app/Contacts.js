import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { ListItem, Left, Body, Right, Icon, ActionSheet } from 'native-base';

import InputField from 'chatmobile/src/components/InputField';
import FilterBar from 'chatmobile/src/components/FilterBar';
import Avatar from 'chatmobile/src/components/Avatar';

import alert from 'chatmobile/src/plugins/alert';
import socket from 'chatmobile/src/plugins/socket';
import useStore from 'chatmobile/src/hooks/useStore';

import { font24, font16, font15, blur, medium, bold } from 'chatmobile/src/styles/common/text';

const BUTTONS = [
  { text: 'Send message', icon: 'md-chatbubbles', iconColor: '#2c8ef4' },
  { text: 'Delete contact', icon: 'md-trash', iconColor: '#f42ced' },
  { text: 'Cancel', icon: 'close', iconColor: '#25de5b' }
];

export default function Contacts({ setPage }) {
  const [ filterMode, setFilterMode ] = useState(0);
  const [ filterText, setFilterText ] = useState('');
  const { state } = useStore();
  const { friends, userInfo } = state;

  const showAction = (user) => {
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: 2,
        title: user.name
      },
      buttonIndex => {
        switch (buttonIndex) {
        // Create new group chat
        case 0:
          const group = {
            name: `${userInfo.name} and ${user.name}`,
            members: [ userInfo.username, user.username ]
          };
          socket.emit('create-group-chat', group, () => {
            alert({ text: 'Done' });
            setPage(1);
          });
          break;

        // Unfriend
        case 1:
          socket.emit('unfriend', { username: user.username }, isSuccess => {
            if (isSuccess) {
              alert({ text: 'Done' });
            } else {
              alert({ text: 'Something went wrong', type: 'danger' });
            }
          });
          break;
        default:
            // Do nothing
        }
      }
    );
  };

  const getFilteredList = () => {
    const listByName = friends.filter(user => {
      return user.name.toLowerCase().includes(filterText.toLowerCase());
    });
    switch (filterMode) {
    case 1:
      return listByName.filter(user => user.active);
    case 2:
      return listByName.filter(user => !user.active);
    default:
      return listByName;
    }
  };

  return (
    <ScrollView>
      <View style={{ margin: 15 }}>
        <InputField
          iconLeft={{ name: 'md-search' }}
          placeholder="Search for people..."
          onChange={setFilterText}
        />
      </View>

      <View>
        <FilterBar
          items={[ 'All', 'Online', 'Offline' ]}
          onChange={setFilterMode}
          value={filterMode}
        />
      </View>

      <Text style={[ bold, font24, { marginLeft: 15, marginVertical: 15 } ]}>
        Contacts
      </Text>

      {
        getFilteredList().map((user, index) => (
          <ListItem key={index}>
            <Left style={{ maxWidth: 70, minWidth: 70 }}>
              <Avatar
                isActive={user.active}
                img={
                  user.avatar && user.avatar !== 'default'
                    ? { uri: user.avatar }
                    : require('chatmobile/src/assets/img/avatar.png')
                }
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
              <TouchableOpacity onPress={() => showAction(user)}>
                <Icon name="md-more" style={{ fontSize: 22 }}/>
              </TouchableOpacity>
            </Right>
          </ListItem>
        ))
      }
    </ScrollView>
  );
}
