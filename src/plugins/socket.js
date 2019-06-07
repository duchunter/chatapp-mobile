import io from 'socket.io-client';
import { SERVER } from 'chatmobile/src/config';

const socket = io(SERVER);

export default socket;
