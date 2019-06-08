import React, { useState, useEffect } from 'reactn';
import SInfo from 'react-native-sensitive-info';

import alert from 'chatmobile/src/plugins/alert';
import useStore from 'chatmobile/src/hooks/useStore';

export default function useSocket(socket) {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isError, setIsError ] = useState(false);
  const { mutations } = useStore();

  useEffect(() => {
    SInfo.getItem('username', {}).then(user => {
      if (!user) {
        setIsError(true);
        return;
      }

      socket.emit('user-connected', { username: 'test1' }, (data) => {
        let { username, name, avatar, friends, notifications, groups } = data;
        mutations.SET_ALL_INFO({
          friends,
          groups,
          notifications,
          userInfo: { username, name, avatar }
        });
        setIsLoading(false);
      });
    });

    socket.on('chat-message', message => {
      mutations.ADD_NEW_MESSAGE(message);
    });

    socket.on('friend-online', username => {
      mutations.UPDATE_FRIEND_STATUS({ username, active: true });
    });

    socket.on('friend-offline', username => {
      mutations.UPDATE_FRIEND_STATUS({ username, active: false });
    });

    socket.on('friend-update-profile', info => {
      mutations.UPDATE_FRIEND_PROFILE(info);
    });

    socket.on('notification', noti => {
      mutations.ADD_NOTIFICATION(noti);
      if (noti.type === 2) {
        mutations.REMOVE_GROUP(noti.extra_data);
      }
    });

    socket.on('update-friend-list', friends => {
      mutations.SET_FRIENDS(friends);
    });

    socket.on('new-group-chat', group => {
      mutations.ADD_GROUP(group);
    });

    socket.on('update-group-chat', group => {
      mutations.UPDATE_GROUP(group);
    });

    socket.on('added-to-group', group => {
      mutations.ADD_GROUP(group);
    });

    socket.on('disconnect', () => {
      SInfo.getItem('username', {}).then(user => {
        if (user) {
          alert({
            text: 'You are disconnected, please check your connection',
            type: 'danger'
          });
        }
      });
    });
  }, []);

  return { isLoading, isError };
}
