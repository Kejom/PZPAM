import React from "react";
import {render, fireEvent} from '@testing-library/react-native';
import Button from "../../../components/shared/Button";

describe('Button', () => {
    it('renders correctly', () => {
      const {getByText} = render(<Button>Press me</Button>);
      expect(getByText('Press me')).toBeDefined();
    });

    it('calls onPress when pressed', () => {
        const onPressMock = jest.fn();
        const {getByText} = render(
          <Button onPress={onPressMock}>Press me</Button>,
        );
        fireEvent.press(getByText('Press me'));
        expect(onPressMock).toHaveBeenCalled();
      });
})