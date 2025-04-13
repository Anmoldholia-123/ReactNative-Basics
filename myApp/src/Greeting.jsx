// Greeting.tsx
import React from 'react';
import { Text, View } from 'react-native';

interface GreetingProps {
  name: string;
}

//const Greeting: React.FC<GreetingProps> = ({ name }) => {
  return (
    <View>
      <Text style={{ fontSize: 20 }}>Hello, {name}!</Text>
    </View>
  );
};

export default Greeting;
