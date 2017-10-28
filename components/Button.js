import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { button } from '../styles';

const Button = ({ children, onPress, type ='', style = {} }) => {
  const buttonStyle = [
    styles.default,
  ];

  if (type === 'white') {
    buttonStyle.push(styles.white);
  }
  buttonStyle.push(style);

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={buttonStyle}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  default: button.default,
  white: button.white,
})

export default Button;
