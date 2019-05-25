import React, { useState } from 'react';
import { Container, Tab, Tabs, TabHeading, Icon } from 'native-base';

import Contacts from 'chatmobile/src/containers/app/Contacts';
import Discussions from 'chatmobile/src/containers/app/Discussions';
import Notifications from 'chatmobile/src/containers/app/Notifications';
import Settings from 'chatmobile/src/containers/app/Settings';

import { active, blur } from 'chatmobile/src/styles/common/text';

export default function Main({ navigation }) {
  const [ page, setPage ] = useState(0);
  const tabs = [
    {
      icon: 'account-circle',
      child: Contacts
    },
    {
      icon: 'chat-bubble-outline',
      child: Discussions
    },
    {
      icon: 'notifications-none',
      child: Notifications
    },
    {
      icon: 'settings',
      child: Settings
    }
  ];

  return (
    <Container>
      <Tabs
        page={page}
        onChangeTab={({ i }) => {
          setTimeout(() => {
            setPage(i);
          }, 0);
        }}
        tabBarPosition="bottom"
        tabBarUnderlineStyle={{ backgroundColor: active.color }}
      >
        {
          tabs.map((tab, index) => (
            <Tab
              key={index}
              heading={
                <TabHeading style={{ backgroundColor: 'white' }}>
                  <Icon
                    type="MaterialIcons"
                    name={tab.icon}
                    style={[ page === index ? active : blur ]}
                  />
                </TabHeading>
              }
            >
              {tab.child({ navigation })}
            </Tab>
          ))
        }
      </Tabs>
    </Container>
  );
}
