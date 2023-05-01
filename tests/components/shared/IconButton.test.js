import React from "react";
import {render, screen, fireEvent} from '@testing-library/react-native';
import IconButton from "../../../components/shared/IconButton";

describe('IconButton', () => {
    it('renders correctly', () => {
        render(
            <IconButton icon="md-checkmark-circle" size={32} color="green" />,
          );

        expect(screen.getByRole('button')).toBeDefined();
    });
    it('calls onPress when pressed', () => {
        const onPressMock = jest.fn();
        
        render(
          <IconButton onPress={onPressMock} icon="md-checkmark-circle" size={32} color="green" />,
        );
        
        fireEvent.press(screen.getByRole('button'));
        expect(onPressMock).toHaveBeenCalled();
      });
  });