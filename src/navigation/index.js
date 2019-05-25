import { createStackNavigator, createAppContainer } from 'react-navigation';

import Main from 'chatmobile/src/containers/Main';
import Chat from 'chatmobile/src/containers/Chat';

const AppNavigator = createStackNavigator(
  {
    Home: Main,
    Chat
  },
  {
    defaultNavigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  }
);

export default createAppContainer(AppNavigator);
