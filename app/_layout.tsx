import { Stack } from 'expo-router';
import React, { useState } from 'react';
import tw from 'twrnc';


const RootLayout = () => {
  return (
    <Stack
    screenOptions={{
      headerShown: false,
    }}

    >
      <Stack.Screen name='index' options={ { headerShown:false
      }}  />
      
    </Stack>
  );
}

export default RootLayout;