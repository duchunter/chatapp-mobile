import React, { useGlobal } from 'reactn';

export default function useStore() {
  const [ global ] = useGlobal();
  const [ userInfo, setUserInfo ] = useGlobal('userInfo');
  const [ friends, setFriends ] = useGlobal('friends');
  const [ groups, setGroups ] = useGlobal('groups');
  const [ notifications, setNotifications ] = useGlobal('notifications');
  const [ selectedGroup, setSelectedGroup ] = useGlobal('selectedGroup');

  const mutations = {
    SET_ALL_INFO(payload) {
      setUserInfo(payload.userInfo);
      setFriends(payload.friends);
      setGroups(payload.groups);
      setNotifications(payload.notifications);
    },

    SET_USER_INFO(payload) {
      setUserInfo(payload);
    },

    SET_FRIENDS(payload) {
      setFriends(payload);
    },

    SET_GROUPS(payload) {
      setGroups(payload);
    },

    SET_SELECTED_GROUP(group) {
      setSelectedGroup(group);
    },

    ADD_GROUP(group) {
      let newGroups = [ ...global.groups ];
      newGroups.unshift(group);
      setGroups(newGroups);
    },

    UPDATE_GROUP(group) {
      let groupIndex = 0;
      let newGroups = [ ...global.groups ];
      let target = newGroups.find((g, index) => {
        if (g._id === group._id) {
          groupIndex = index;
          return true;
        }
        return false;
      });

      if (target) {
        newGroups[ groupIndex ] = group;
        if (!group.messages) {
          newGroups[ groupIndex ].messages = target.messages;
        }

        if (group._id === global.selectedGroup._id) {
          setSelectedGroup(newGroups[ groupIndex ]);
        }
      }

      setGroups(newGroups);
    },

    REMOVE_GROUP(groupId) {
      setGroups(global.groups.filter(group => group._id !== groupId));
    },

    SET_NOTIFICATIONS(payload) {
      setNotifications(payload);
    },

    ADD_NOTIFICATION(noti) {
      let notis = [ ...global.notifications ];
      notis.unshift(noti);
      setNotifications(notis);
    },

    ADD_NEW_MESSAGE(message) {
      let groupIndex = 0;
      let group = global.groups.find((g, index) => {
        if (g._id === message.group_id) {
          groupIndex = index;
          return true;
        }
        return false;
      });

      if (group) {
        group.messages.unshift(message);

        let newGroups = [ ...global.groups ];
        newGroups[ groupIndex ] = group;

        if (group._id === global.selectedGroup._id) {
          setSelectedGroup(group);
        }
        setGroups(newGroups);
      }
    },

    UPDATE_FRIEND_STATUS({ username, active }) {
      if (username === global.userInfo.username) {
        return;
      }

      let friendIndex = 0;
      let friend = friends.find((user, index) => {
        if (user.username === username) {
          friendIndex = index;
          return true;
        }
        return false;
      });

      if (friend) {
        let friendList = [ ...gloabal.friends ];
        friendList[ friendIndex ].active = active;
        setFriends(friendList);
      }
    },

    UPDATE_FRIEND_PROFILE({ username, name, avatar }) {
      let friendIndex = 0;
      let friend = gloabal.friends.find((user, index) => {
        if (user.username === username) {
          friendIndex = index;
          return true;
        }
        return false;
      });

      if (friend) {
        let friendList = [ ...global.friends ];
        friendList[ friendIndex ].name = name;
        friendList[ friendIndex ].avatar = avatar;
        setFriends(friendList);
      }
    }
  };

  return {
    mutations,
    state: {
      userInfo,
      groups,
      friends,
      notifications,
      selectedGroup
    }
  };
}
