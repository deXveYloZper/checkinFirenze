// src/services/api.ts
import axios from 'axios';

/*
  Replace 'http://10.0.2.2:3000' with the IP/port
  where your Node.js server is accessible.
  - Android Emulator: 10.0.2.2 is a special alias for localhost
  - iOS Simulator on Mac: http://localhost:3000
  - Physical device: Use your machine's local network IP, e.g. http://192.168.X.X:3000
*/

const instance = axios.create({
  baseURL: 'http://10.0.2.2:3000',
  timeout: 5000, // 5 seconds timeout
});

export default instance;
