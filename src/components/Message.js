import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Left, Body } from 'native-base';

import Avatar from 'chatmobile/src/components/Avatar';

import { active, backgroudGrey } from 'chatmobile/src/styles/common/color';
import { font14, font16, book, white, blur } from 'chatmobile/src/styles/common/text';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10
  },
  contentContainer: {
    backgroundColor: backgroudGrey,
    padding: '5%',
    borderRadius: 6
  },
  time: {
    paddingTop: 5
  }
});

export default function Message({ avatar, content, created }) {
  return (
    <View style={styles.container}>
      {
        avatar && (
          <Left style={{ maxWidth: 70, minWidth: 70 }}>
            <Avatar img={avatar}/>
          </Left>
        )
      }
      <Body style={{ alignItems: avatar ? 'flex-start' : 'flex-end' }}>
        <View style={[ styles.contentContainer, !avatar && { backgroundColor: active } ]}>
          <Text style={[ font16, book, !avatar && white ]}>
            {content.replace('\n', '')}
          </Text>
        </View>

        {
          created && (
            <Text style={[ font14, book, blur, styles.time ]}>
              {created}
            </Text>
          )
        }
      </Body>
    </View>
  );
}
