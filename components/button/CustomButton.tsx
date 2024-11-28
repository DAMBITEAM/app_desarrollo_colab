import * as React from 'react';
import { Button, PaperProvider } from 'react-native-paper';
import { View, Text } from 'react-native';
import tw from 'twrnc';


interface Props {
    content: string;
    onPress: () => void;
    textColor: string;
    backgroundColor: string;
    borderColor: string;
    width: string;
    height: string;
    disabled: boolean;


}

const CustomButton = ({ content, onPress, textColor, backgroundColor, borderColor, width, height, disabled }: Props) => (
    <PaperProvider>
        <View style={tw`w-${width}`}>
            <Button style={tw`  bg-${backgroundColor} border-${borderColor} w-${width} h-${height} border-2 `} mode="contained" onPress={() => { onPress() }} disabled={disabled}>
                <Text style={tw` text-${textColor} text-center text-xl font-bold   `}>
                    {content}
                </Text>

            </Button>
        </View>
    </PaperProvider>
);

export default CustomButton;