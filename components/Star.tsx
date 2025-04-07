import React, { useEffect } from 'react';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
    Easing,
} from 'react-native-reanimated';
import {Dimensions, StyleSheet} from 'react-native';

const SCREEN = {
    WIDTH: Dimensions.get('window').width,
    HEIGHT: Dimensions.get('window').height,
};

interface StarProps {
    x: number;
    y: number;
    radius: number;
    opacity: number;
    speed: number;
}   

const Star: React.FC<StarProps> = ({x, y, radius, opacity, speed}) => {
    const offsetX = useSharedValue(x);
    const offsetY = useSharedValue(y);

    useEffect(() => {
        // Start from current position and move up
        const moveUp = withTiming(-50, {
            duration: speed,
            easing: Easing.linear,
        });

        // Instantly move to bottom (no visible transition)
        const resetPosition = withTiming(SCREEN.HEIGHT + 50, {
            duration: 0,
        });

        // Create a smooth infinite sequence
        offsetY.value = withRepeat(
            withSequence(moveUp, resetPosition),
            -1,
            true
        );

        // Slight horizontal movement for more natural feel
        offsetX.value = withRepeat(
            withTiming(x + (Math.random() * 20 - 10), {
                duration: speed * 2,
                easing: Easing.inOut(Easing.sin),
            }),
            -1,
            true
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {translateX: offsetX.value},
                {translateY: offsetY.value}
            ],
            width: radius * 2,
            height: radius * 2,
            borderRadius: radius,
            backgroundColor: 'white',
            opacity: opacity,
        };
    });

    return <Animated.View style={[styles.star, animatedStyle]} />;
};

const styles = StyleSheet.create({
    star: {
        position: 'absolute',
    },
});

export default Star;