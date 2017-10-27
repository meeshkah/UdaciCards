import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { blue, white } from '../utils/colors';

const Button = ({ children, onPress, style = {} }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.default, style]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  default: {
    textAlign: 'center',
    backgroundColor: blue,
    color: white,
    borderRadius: Platform.OS === 'ios' ? 8 : 1,
    overflow: 'hidden',
    fontSize: 24,
    padding: 10,
    marginTop: 12,
  }
})

export default Button;
