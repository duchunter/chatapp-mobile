import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'native-base';

import { backgroudGrey, grey } from 'chatmobile/src/styles/common/color';
import { font16, book } from 'chatmobile/src/styles/common/text';

const localStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: backgroudGrey,
    width: '100%',
    minHeight: 50,
    borderRadius: 5,
    paddingHorizontal: 10
  },

  icon: {
    width: 22,
    fontSize: 22,
    color: grey,
    marginHorizontal: 5
  },

  input: {
    flex: 8
  }
});

export default function Input({
  iconLeft,
  iconRight,
  onChange,
  onSubmit,
  placeholder,
  style,
  value
}) {
  return (
    <View style={[ localStyles.container, style ]}>
      {
        iconLeft && (
          <TouchableOpacity onPress={iconLeft.onPress}>
            <Icon {...iconLeft} style={localStyles.icon}/>
          </TouchableOpacity>
        )
      }

      <TextInput
        onEndEditing={onSubmit}
        onChangeText={val => {
          if (onChange) {
            onChange(val);
          }
        }}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={grey}
        style={[ book, font16, localStyles.input ]}
      />

      {
        iconRight && (
          <TouchableOpacity onPress={iconRight.onPress}>
            <Icon {...iconRight} style={localStyles.icon}/>
          </TouchableOpacity>
        )
      }
    </View>
  );
}
