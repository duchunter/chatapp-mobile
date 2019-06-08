import axios from 'axios';
import SInfo from 'react-native-sensitive-info';
import { SERVER } from 'chatmobile/src/config';

import alert from 'chatmobile/src/plugins/alert';

export default async function signIn(payload) {
  try {
    // Send user info to get token
    let response = await axios.post(`${SERVER}/signin`, payload);
    await SInfo.setItem('username', response.data.username, {});
    return true;
  } catch (e) {
    if (e.response && e.response.data) {
      alert({ text: e.response.data.message, type: 'danger' });
    } else if (e.message) {
      alert({ text: e.message, type: 'danger' });
    } else {
      alert({ text: e.toString(), type: 'danger' });
    }

    return false;
  }
}
