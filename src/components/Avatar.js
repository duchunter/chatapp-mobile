import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Thumbnail } from 'native-base';

import { grey, active } from 'chatmobile/src/styles/common/color';
import { font24, bold } from 'chatmobile/src/styles/common/text';

const styles = StyleSheet.create({
  status: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 17,
    width: 17,
    borderRadius: 10,
    padding: 2,
    backgroundColor: 'white',
    zIndex: 10
  },

  statusInner: {
    height: 13,
    width: 13,
    borderRadius: 10,
    backgroundColor: active
  },

  textAva: {
    minHeight: 50,
    maxHeight: 50,
    minWidth: 50,
    maxWidth: 50,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: grey,
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default function Avatar({ isActive, img, name }) {
  return (
    <View>
      {
        img ? (
          <Thumbnail source={img} />
        ) : (
          <View style={styles.textAva}>
            <Text style={[ bold, font24, { lineHeight: 24 } ]}>
              {name[ 0 ].toUpperCase()}
            </Text>
          </View>
        )
      }
      {
        isActive !== null && (
          <View style={styles.status}>
            <View style={[ styles.statusInner, !isActive && { backgroundColor: grey } ]}/>
          </View>
        )
      }
    </View>
  );
}

Avatar.defaultProps = {
  isActive: null
};
