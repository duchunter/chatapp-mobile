import React, { useState } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { ListItem, Left, Body, Right, Thumbnail, Icon } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import SInfo from 'react-native-sensitive-info';

import InputModal from 'chatmobile/src/components/InputModal';

import useStore from 'chatmobile/src/hooks/useStore';
import socket from 'chatmobile/src/plugins/socket';
import alert from 'chatmobile/src/plugins/alert';

import {
  font24, font16, font15, font18, blur, bold, book
} from 'chatmobile/src/styles/common/text';

const styles = StyleSheet.create({
  infoContainer: {
    alignItems: 'center',
    marginVertical: 20
  }
});

export default function Settings({ navigation }) {
  const [ visible, setVisible ] = useState(false);
  const [ modal, setModal ] = useState({});

  const { state, mutations } = useStore();
  const { userInfo } = state;

  const submitChanges = (data) => {
    const changes = {
      username: userInfo.username,
      avatar: data.avatar || userInfo.avatar,
      name: data.name || userInfo.name,
      password: data.password || null
    };

    socket.emit('update-user-info', { info: changes }, isSuccess => {
      if (isSuccess) {
        delete changes.password;
        mutations.SET_USER_INFO(changes);
        alert({ text: 'Profile updated' });
      } else {
        alert({ text: 'Something went wrong', type: 'danger' });
      }
    });
  };

  const options = [
    {
      icon: { name: 'md-images' },
      title: 'Change avatar',
      desc: 'Upload new image',
      action: () => {
        ImagePicker.showImagePicker(null, (response) => {
          if (response.error) {
            alert({ text: response.error, type: 'danger' });
            return;
          }

          if (response.data) {
            submitChanges({ avatar: 'data:image/jpeg;base64,' + response.data });
            return;
          }
        });
      }
    },
    {
      icon: { name: 'account-outline', type: 'MaterialCommunityIcons' },
      title: 'Change name',
      desc: 'Update your display name',
      action: () => {
        setModal({
          title: 'Change name',
          label: 'NAME',
          placeholder: 'Enter your name',
          buttonText: 'Apply',
          onClose: () => setVisible(false),
          onSubmit: (name) => submitChanges({ name })
        });
        setVisible(true);
      }
    },
    {
      icon: { name: 'md-key' },
      title: 'Change password',
      desc: 'Update your password',
      action: () => {
        setModal({
          title: 'Change password',
          label: 'PASSWORD',
          placeholder: 'Enter your password',
          buttonText: 'Apply',
          onClose: () => setVisible(false),
          onSubmit: (password) => submitChanges({ password })
        });
        setVisible(true);
      }
    },
    {
      icon: { name: 'power-off', type: 'FontAwesome' },
      title: 'Sign out',
      desc: 'Log out of your account',
      action: () => {
        SInfo.deleteItem('username', {}).then(() => {
          navigation.navigate('Login');
        });
      }
    }
  ];

  return (
    <ScrollView>
      <View style={styles.infoContainer}>
        <Thumbnail
          large
          source={
            userInfo.avatar && userInfo.avatar !== 'default'
              ? { uri: userInfo.avatar }
              : require('chatmobile/src/assets/img/avatar.png')
          }
        />
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

      {
        options.map(item => (
          <ListItem
            onPress={item.action}
            key={item.title}
          >
            <Left style={{ maxWidth: 40, minWidth: 40 }}>
              <Icon
                {...item.icon}
                style={[ blur, {
                  transform: [ { scaleX: 2 }, { scaleY: 2 }, { translateX: 4 } ]
                } ]}
              />
            </Left>
            <Body>
              <Text style={[ font16, bold, { marginBottom: 5 } ]}>
                {item.title}
              </Text>
              <Text note style={[ book, blur ]}>
                {item.desc}
              </Text>
            </Body>
            <Right>
              <Icon name="angle-right" type="FontAwesome" />
            </Right>
          </ListItem>
        ))
      }

      <InputModal
        {...modal}
        visible={visible}
      />

    </ScrollView>
  );
}
