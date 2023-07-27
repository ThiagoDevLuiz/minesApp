import React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import params from '../params';
import Mine from './Mine';
import Flag from './Flag';

export default props => {
  const { mined, opened, nearMines, exploded, flagged } = props;

  const styleField = [styles.field];
  if (opened) styleField.push(styles.opened);
  if (exploded) styleField.push(styles.exploded);
  if (flagged) styleField.push(styles.flagged);
  if (!opened && !exploded) styleField.push(styles.regular);

  let color = null;
  if (nearMines > 0) {
    if (nearMines == 1) color = '#2A28D7';
    if (nearMines == 2) color = '#2B520F';
    if (nearMines > 2 && nearMines < 6) color = '#F9060A';
    if (nearMines >= 6) color = '#F221A9';
  }

  let showNumberOfMines = !mined && opened && nearMines > 0;
  let showMine = mined && opened;
  let showFlag = !opened && flagged;

  return (
    <TouchableWithoutFeedback
      onPress={props.onOpen}
      onLongPress={props.onSelect}>
      <View style={styleField}>
        {showNumberOfMines && (
          <Text style={[styles.label, { color: color }]}>{nearMines}</Text>
        )}
        {showMine && <Mine />}
        {showFlag && <Flag />}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  field: {
    height: params.blockSize,
    width: params.blockSize,
    borderWidth: params.borderSize,
  },
  regular: {
    backgroundColor: '#999',
    borderLeftColor: '#ccc',
    borderTopColor: '#ccc',
    borderRightColor: '#333',
    borderBottomColor: '#333',
  },
  opened: {
    backgroundColor: '#999',
    borderColor: '#777',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: 'bold',
    fontSize: params.fontSize,
  },
  exploded: {
    backgroundColor: 'red',
    borderColor: 'red',
  },
  flagged: {},
});
