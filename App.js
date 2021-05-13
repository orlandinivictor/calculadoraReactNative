import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Button from './src/components/Button';
import Display from './src/components/Display';

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

const App = () => {
  const [displayValue, setDisplayValue] = useState(initialState.displayValue);
  const [clearDisplay, setClearDisplay] = useState(initialState.clearDisplay);
  const [operationVal, setOperationVal] = useState(initialState.operation);
  const [values, setValues] = useState(initialState.values);
  const [current, setCurrent] = useState(initialState.current);

  const addDigit = n => {
    const clearDisplayValue = displayValue === '0' || clearDisplay;

    if (n === '.' && !clearDisplayValue && displayValue.includes('.')) {
      return;
    }

    const currentValue = clearDisplayValue ? '' : displayValue;
    const newDisplayValue = currentValue + n;

    setDisplayValue(newDisplayValue);
    setClearDisplay(false);

    if (n !== '.') {
      const newValue = parseFloat(newDisplayValue);
      const newValues = [...values];
      newValues[current] = newValue;
      setValues(newValues);
    }
  };

  const clearMemory = () => {
    setDisplayValue(initialState.displayValue);
    setClearDisplay(initialState.clearDisplay);
    setOperationVal(initialState.operation);
    setValues(initialState.values);
    setCurrent(initialState.values);
  };

  const setOperation = operation => {
    if (current === 0) {
      setOperationVal(operation);
      setCurrent(1);
      setClearDisplay(true);
    } else {
      const equals = operation === '=';
      const newValues = [...values];

      try {
        // eslint-disable-next-line no-eval
        newValues[0] = eval(`${newValues[0]} ${operationVal} ${newValues[1]}`);
      } catch (e) {
        newValues[0] = values[0];
      }

      newValues[1] = 0;
      setDisplayValue(`${newValues[0]}`);
      setOperationVal(equals ? null : operation);
      setClearDisplay(!equals);
      setValues(newValues);
    }
  };

  return (
    <View style={styles.container}>
      <Display value={displayValue} />
      <View style={styles.buttons}>
        <Button label="AC" triple onClick={clearMemory} />
        <Button label="/" operation onClick={setOperation} />
        <Button label="7" onClick={addDigit} />
        <Button label="8" onClick={addDigit} />
        <Button label="9" onClick={addDigit} />
        <Button label="*" operation onClick={setOperation} />
        <Button label="4" onClick={addDigit} />
        <Button label="5" onClick={addDigit} />
        <Button label="6" onClick={addDigit} />
        <Button label="-" operation onClick={setOperation} />
        <Button label="1" onClick={addDigit} />
        <Button label="2" onClick={addDigit} />
        <Button label="3" onClick={addDigit} />
        <Button label="+" operation onClick={setOperation} />
        <Button label="0" double onClick={addDigit} />
        <Button label="." onClick={addDigit} />
        <Button label="=" operation onClick={setOperation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default App;
