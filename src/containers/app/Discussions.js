import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { ListItem, Left, Body, Right } from 'native-base';
import moment from 'moment';

import InputField from 'chatmobile/src/components/InputField';
import Avatar from 'chatmobile/src/components/Avatar';

import useStore from 'chatmobile/src/hooks/useStore';

import {
  font24, font16, font15, blur, medium, bold, book
} from 'chatmobile/src/styles/common/text';

export default function Discussions({ navigation }) {
  const [ filterText, setFilterText ] = useState('');
  const { state, mutations } = useStore();
  const { groups, friends } = state;

  const getFilteredList = () => {
    return groups.filter(group => {
      return group.name.toLowerCase().includes(filterText.toLowerCase());
    });
  };

  const getActiveStatus = (group) => {
    return group.members.some(username => {
      let friend = friends.find(user => user.username === username);
      return friend && friend.active;
    });
  };

  return (
    <ScrollView>
      <View style={{ margin: 15 }}>
        <InputField
          iconLeft={{ name: 'md-search' }}
          placeholder="Search for conversations..."
          onChange={setFilterText}
        />
      </View>

      <Text style={[ bold, font24, { marginLeft: 15, marginVertical: 15 } ]}>
        Discussions
      </Text>

      {
        getFilteredList().map((group, index) => (
          <ListItem
            key={index}
            onPress={() => {
              mutations.SET_SELECTED_GROUP(group);
              navigation.navigate('Chat');
            }}
          >
            <Left style={{ maxWidth: 70, minWidth: 70 }}>
              <Avatar
                isActive={getActiveStatus(group)}
                name={group.name}
              />
            </Left>
            <Body>
              <Text style={[ font16, bold ]}>
                {group.name}
              </Text>
              <Text style={[ font15, medium ]}>
                {
                  group.messages && group.messages.length > 0
                    ? group.messages[ 0 ].content
                    : 'Start by typing something'
                }
              </Text>
            </Body>
            <Right>
              <Text note style={[ book, blur ]}>
                {
                  group.messages && group.messages.length > 0
                    ? moment(group.messages[ 0 ].created).fromNow()
                    : ''
                }
              </Text>
            </Right>
          </ListItem>
        ))
      }
    </ScrollView>
  );
}
