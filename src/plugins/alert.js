import { Toast } from 'native-base';

export default function alert({ type, text }) {
  Toast.show({
    text,
    position: 'top',
    type: type || 'success'
  });
}
