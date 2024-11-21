import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from './src/store/store';
import Routes from './src/Routes.jsx';

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <Routes />
      </Provider>
    </SafeAreaProvider>
  );
}
