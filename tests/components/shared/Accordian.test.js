import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Accordian from '../../../components/shared/Accordian';
import { Text } from 'react-native';

describe('Accordian', () => {
    it('should render correctly', () => {
      const {getByText } = render(
        <Accordian title="Test Title" style={{}}><Text>Test Content</Text></Accordian>
      );

      const title = getByText('Test Title');
      expect(title).toBeDefined();

    });
  });