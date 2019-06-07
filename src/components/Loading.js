import React from 'react';
import { View } from 'react-native';
import { Spinner } from 'native-base';

import { active } from 'chatmobile/src/styles/common/color';

export default function Loading() {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      zIndex: 10,
      backgroundColor: 'white'
    }}>
      <Spinner color={active}/>
    </View>
  );
}
