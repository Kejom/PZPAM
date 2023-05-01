import React from 'react';
import { render} from '@testing-library/react-native';
import Accordian from '../../../components/shared/Accordian';
import { Text } from 'react-native';

describe('Accordian', () => {
    it('renders correctly', () => {
        const { toJSON } = render(
          <Accordian title="Title">
            <Text>Content</Text>
          </Accordian>
        );
        expect(toJSON()).toMatchSnapshot();
      });
  });