/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component, setGlobal } from 'reactn';
import { Root } from 'native-base';

setGlobal({
  userInfo: {},
  friends: [],
  groups: [],
  notifications: [],
  selectedGroup: {}
});

import AppContainer from 'chatmobile/src/navigation';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Root>
        <AppContainer/>
      </Root>
    );
  }
}
