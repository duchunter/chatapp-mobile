import React from 'react';
import { ScrollView, Text } from 'react-native';
import { ListItem, Body, Button, ActionSheet } from 'native-base';

import useStore from 'chatmobile/src/hooks/useStore';
import socket from 'chatmobile/src/plugins/socket';
import alert from 'chatmobile/src/plugins/alert';

import { active } from 'chatmobile/src/styles/common/color';
import {
  font24, font16, blur, bold, book, white
} from 'chatmobile/src/styles/common/text';

const BUTTONS = [
  { text: 'Accept', icon: 'md-thumbs-up', iconColor: 'black' },
  { text: 'Deny', icon: 'md-thumbs-down', iconColor: 'black' },
  { text: 'Cancel', icon: 'close', iconColor: 'black' }
];

export default function Notifications() {
  const { state, mutations } = useStore();
  const { notifications } = state;

  const clearAllNotifications = () => {
    const ids = notifications.map(noti => noti._id);
    socket.emit('delete-notification', { ids }, isSuccess => {
      if (isSuccess) {
        mutations.SET_NOTIFICATIONS([]);
        alert({ text: 'Done' });
      } else {
        alert({ text: 'Somnething went wrong', type: 'danger' });
      }
    });
  };

  const handleRequest = (accepted, sender) => {
    socket.emit('handle-friend-request', { accepted, sender }, isSuccess => {
      if (isSuccess) {
        alert({ text: 'Done' });
      } else {
        alert({ text: 'Something went wrong', type: 'danger' });
      }
    });
  };

  const showAction = (sender) => {
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: BUTTONS.length - 1,
        title: 'Accept request?'
      },
      buttonIndex => {
        switch (buttonIndex) {
        // Accept
        case 0:
          handleRequest(true, sender);
          break;

        // Deny
        case 1:
          handleRequest(false, sender);
          break;
        default:
            // Do nothing
        }
      }
    );
  };

  return (
    <ScrollView>
      <Text style={[ bold, font24, { marginLeft: 15, marginVertical: 15 } ]}>
        Notifications
      </Text>

      <Button
        style={{
          marginLeft: 15,
          marginBottom: 15,
          paddingHorizontal: 15,
          backgroundColor: active
        }}
        onPress={clearAllNotifications}
      >
        <Text style={[ font16, bold, white ]}>
          Clear all
        </Text>
      </Button>

      {
        notifications.map((noti, index) => (
          <ListItem
            key={index}
            onPress={() => {
              if (noti.type === 1) {
                showAction(noti.extra_data);
              }
            }}
          >
            <Body>
              <Text style={[ font16, bold, { marginBottom: 5 } ]}>
                {noti.content}
              </Text>
              <Text note style={[ book, blur ]}>
                {
                  new Date(noti.created).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })
                }
              </Text>
            </Body>
          </ListItem>
        ))
      }
    </ScrollView>
  );
}
