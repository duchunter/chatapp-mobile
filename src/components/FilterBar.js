import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

import { backgroudGrey } from 'chatmobile/src/styles/common/color';
import { font16, medium, blur, active } from 'chatmobile/src/styles/common/text';

const localStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: 50
  },

  item: {
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginHorizontal: 5
  },

  itemActive: {
    backgroundColor: backgroudGrey
  }
});

export default function FilterBar({ items, styles, onChange, value }) {
  return (
    <View style={[ localStyles.container, styles ]}>
      {
        items.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onChange(index)}
            style={[ localStyles.item, index === value && localStyles.itemActive ]}
          >
            <Text style={[ font16, medium, blur, index === value && active ]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))
      }
    </View>
  );
}
