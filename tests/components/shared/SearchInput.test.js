import React from "react";
import {render, screen, fireEvent} from '@testing-library/react-native';
import SearchInput from "../../../components/shared/SearchInput";

describe('SearchInput', () => {
    it('should call onValueChange when text is entered', () => {
      const onValueChange = jest.fn();
      const { getByPlaceholderText } = render(
        <SearchInput value="" onValueChange={onValueChange} />
      );
      const input = getByPlaceholderText('Szukaj...');
      fireEvent.changeText(input, 'test');
      expect(onValueChange).toHaveBeenCalledWith('test');
    });
  
    it('should call onValueChange with an empty string when clear button is pressed', () => {
      const onValueChange = jest.fn();
      const { getByRole } = render(
        <SearchInput value="test" onValueChange={onValueChange} />
      );
      const clearButton = getByRole('button');
      fireEvent.press(clearButton);
      expect(onValueChange).toHaveBeenCalledWith('');
    });
  });