import React from 'react';
import { render} from '@testing-library/react-native';
import AddAlbumModal from '../../../components/albums/AddAlbumModal';
import { Provider } from 'react-redux';
import configureStore from "redux-mock-store"

describe('AddAlbumModal', () => {
    const mockStore = configureStore([]);
    const store = mockStore({
        users: {
          loggedUserId: '123',
        },
      });
  
    it('renders correctly', () => {
      const { toJSON } = render(
        <Provider store={store}>
          <AddAlbumModal isVisible={true} onClose={() => {}} />
        </Provider>
      );
      expect(toJSON()).toMatchSnapshot();
    });
  });