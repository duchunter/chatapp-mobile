import React, { useState } from 'react';
import { Container, Tab, Tabs, TabHeading, Icon } from 'native-base';

import Contacts from 'chatmobile/src/containers/app/Contacts';
import Discussions from 'chatmobile/src/containers/app/Discussions';
import Notifications from 'chatmobile/src/containers/app/Notifications';

import { active, blur } from 'chatmobile/src/styles/common/text';

export default function TabsExample() {
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
      child: Notifications
    }
  ];

  return (
    <Container>
      <Tabs
        page={page}
        onChangeTab={(data) => setPage(data.i)}
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
              {tab.child()}
            </Tab>
          ))
        }
      </Tabs>
    </Container>
  );
}
