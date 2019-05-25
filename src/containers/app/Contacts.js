import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { ListItem, Left, Body, Right, Icon } from 'native-base';

import InputField from 'chatmobile/src/components/InputField';
import FilterBar from 'chatmobile/src/components/FilterBar';
import Avatar from 'chatmobile/src/components/Avatar';

import { font24, font16, font15, blur, medium, bold } from 'chatmobile/src/styles/common/text';

export default function Contacts() {
  const [ filterMode, setFilterMode ] = useState(0);
  const users = [
    {
      name: 'Kumar Pratik',
      active: true
    },
    {
      name: 'Kumar Pratik 1',
      active: true
    },
    {
      name: 'Kumar Pratik 2',
      active: false
    }
  ];

  return (
    <ScrollView>
      <View style={{ margin: 15 }}>
        <InputField
          iconLeft={{ name: 'md-search' }}
          placeholder="Search for people..."
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
        users.map((user, index) => (
          <ListItem key={index}>
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
                <Icon name="md-more" style={{ fontSize: 22 }}/>
              </TouchableOpacity>
            </Right>
          </ListItem>
        ))
      }
    </ScrollView>
  );
}
