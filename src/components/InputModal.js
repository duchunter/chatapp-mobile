import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Button } from 'native-base';
import Modal from 'react-native-modal';

import InputField from './InputField';

import { font24, font22, font16, font14, bold, white } from 'chatmobile/src/styles/common/text';
import { active } from 'chatmobile/src/styles/common/color';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '5%',
    paddingVertical: 20,
    backgroundColor: 'white'
  },

  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '95%',
    marginBottom: 30,
    marginTop: 10
  },

  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: active,
    marginTop: 20
  }
});

export default function InputModal({
  visible,
  title,
  label,
  placeholder,
  buttonText,
  onSubmit,
  onClose
}) {
  const [ text, setText ] = useState('');
  return (
    <Modal
      isVisible={visible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={[ font22, bold ]}>
              {title}
            </Text>
          </View>
          <TouchableOpacity onPress={onClose}>
            <Icon name="md-close" style={[ font24 ]}/>
          </TouchableOpacity>
        </View>

        <Text style={[ font14, bold, { marginBottom: 20 } ]}>
          {label}:
        </Text>

        <InputField
          value={text}
          onChange={setText}
          onSubmit={() => {
            onSubmit(text);
            setText('');
            onClose();
          }}
          placeholder={placeholder}
        />

        <Button
          style={styles.button}
          onPress={() => {
            onSubmit(text);
            setText('');
            onClose();
          }}
        >
          <Text style={[ font16, bold, white ]}>
            {buttonText}
          </Text>
        </Button>
      </View>
    </Modal>
  );
}
