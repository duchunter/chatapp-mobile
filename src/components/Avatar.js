import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Thumbnail } from 'native-base';

import { grey, active } from 'chatmobile/src/styles/common/color';

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
  }
});

export default function Avatar({ isActive, img }) {
  return (
    <View>
      <Thumbnail source={img} />
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
