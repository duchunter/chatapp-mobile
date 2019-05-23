import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ListItem, Left, Body, Right, Thumbnail, Icon } from 'native-base';

import InputField from 'chatmobile/src/components/InputField';
import FilterBar from 'chatmobile/src/components/FilterBar';

import { font24, font16, font15, blur, medium, bold } from 'chatmobile/src/styles/common/text';
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

export default function Contacts(props) {
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
            <Left style={{ maxWidth: 70 }}>
              <Thumbnail source={require('chatmobile/src/assets/img/ava.jpg')} />
              <View style={styles.status}>
                <View style={[ styles.statusInner, !user.active && { backgroundColor: grey } ]}/>
              </View>
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
