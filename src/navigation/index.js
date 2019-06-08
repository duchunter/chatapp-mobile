import { createStackNavigator, createAppContainer } from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';

import Main from 'chatmobile/src/containers/Main';
import Chat from 'chatmobile/src/containers/Chat';
import Login from 'chatmobile/src/containers/Login';
import Signup from 'chatmobile/src/containers/Signup';
import StartScreen from 'chatmobile/src/containers/StartScreen';

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

const MainNavigator = createAnimatedSwitchNavigator(
  {
    StartScreen,
    Login,
    Signup,
    App: AppNavigator
  },
  {
    defaultNavigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  }
);

export default createAppContainer(MainNavigator);
