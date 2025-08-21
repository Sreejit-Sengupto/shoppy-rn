import React, { ReactNode, useEffect } from 'react';
import { View, Animated } from 'react-native';
import { Loader2 } from 'lucide-react-native'; // Use lucide-react-native
import { Easing } from 'react-native-reanimated';

const SpinningLoader = ({ children }: { children: ReactNode }) => {
    const spinValue = new Animated.Value(0);

    // Animate the rotation
    useEffect(() => {
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 1000, // Duration of one full rotation in ms
                useNativeDriver: true, // Improves performance
                easing: Easing.linear, // Smooth linear rotation
            })
        ).start();
    }, [spinValue]);

    // Interpolate the rotation value (0 to 1) to degrees (0 to 360)
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View className="items-center justify-center">
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
                {/* <Loader2 size={24} color="#FFFFFF" /> */}
                {children}
            </Animated.View>
        </View>
    );
};

export default SpinningLoader;