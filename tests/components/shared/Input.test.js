import React from 'react';
import { render } from '@testing-library/react-native';
import Input from '../../../components/shared/Input';

describe('Input', () => {
  it('should render correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <Input label="Test Label" style={{}} isValid={true} textInputConfig={{ placeholder: 'Test Placeholder' }} />
    );
    const label = getByText('Test Label');
    const input = getByPlaceholderText('Test Placeholder');
    expect(label).toBeDefined();
    expect(input).toBeDefined();
  });

  it('should render an invalid input when isValid is false', () => {
    const { getByPlaceholderText} = render(
      <Input label="Test Label" style={{}} isValid={false} textInputConfig={{ placeholder: 'Test Placeholder' }} />
    );
    const input = getByPlaceholderText('Test Placeholder');
    expect(input.props.style[1].backgroundColor).toBe('red');
  });
});