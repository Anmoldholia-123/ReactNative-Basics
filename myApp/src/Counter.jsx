
// Counter.tsx
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const Counter = () => {
  const [count, setCount] = useState(0);
  const [divide, setDivide] = useState(100);
  const [multiply, setMultiply] = useState(10);

  return (
    <View style={{ alignItems: 'center', marginTop: 50 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Count: {count}</Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 20 }}>
        <Button title="Increase" onPress={() => setCount(count + 1)} />
        <Button title="Decrease" onPress={() => setCount(count - 1)} />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 20 }}>
        <Button title="Multiply by 5" onPress={() => setMultiply(multiply * 5)} />
        <Button title="Divide by 6" onPress={() => setDivide(divide / 6)} />
      </View>

     <Text style={{ fontSize: 18, marginTop: 20 }}>Multiplication Result: {multiply}</Text> */}
      <Text style={{ fontSize: 18, marginTop: 10 }}>Division Result: {divide}</Text> */}
    </View>
  );
};

export default Counter;




