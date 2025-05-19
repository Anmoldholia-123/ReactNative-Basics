import { AppRegistry } from 'react-native';
import App from './App'; // Import the main App
import { name as appName } from './app.json'; // Import app name

AppRegistry.registerComponent(appName, () => App);
