import React from 'react';
import { Button, Icon } from 'native-base';

import { active } from 'chatmobile/src/styles/common/color';

export default function AddButton({ onPress }) {
  return (
    <Button
      onPress={onPress}
      style={{
        position: 'absolute',
        zIndex: 10,
        top: 40,
        right: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 50,
        maxHeight: 50,
        minWidth: 50,
        maxWidth: 50,
        borderRadius: 30,
        backgroundColor: active
      }}
    >
      <Icon name="md-add" style={{ color: 'white' }}/>
    </Button>
  );
}
