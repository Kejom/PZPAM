import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import MainNavigation from './screens/MainNavigation';



export default function App() {

  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <MainNavigation/>
      </Provider>
    </>
  );
}
