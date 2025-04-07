import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming
} from 'react-native-reanimated';
import Star from './Star';

const SCREEN = {
    WIDTH: Dimensions.get('window').width,
    HEIGHT: Dimensions.get('window').height,
};

const STAR_CONFIG = {
    COUNT: 100,
    MIN_RADIUS: 1,
    MAX_RADIUS: 3,
    MIN_SPEED: 4000,
    MAX_SPEED: 6000,
    MIN_OPACITY: 0.3,
    MAX_OPACITY: 1,
} as const;

interface StarData {
    x: number;
    y: number;
    radius: number;
    speed: number;
    opacity: number;
}

const generateStars = (): StarData[] => {
    return Array.from({length: STAR_CONFIG.COUNT}, () => ({
        x: Math.random() * SCREEN.WIDTH,
        y: Math.random() * SCREEN.HEIGHT,
        radius: Math.random() * (STAR_CONFIG.MAX_RADIUS - STAR_CONFIG.MIN_RADIUS) + STAR_CONFIG.MIN_RADIUS,
        speed: Math.random() * (STAR_CONFIG.MAX_SPEED - STAR_CONFIG.MIN_SPEED) + STAR_CONFIG.MIN_SPEED,
        opacity: Math.random() * (STAR_CONFIG.MAX_OPACITY - STAR_CONFIG.MIN_OPACITY) + STAR_CONFIG.MIN_OPACITY,
    }));
};

export const StarrySky: React.FC = () => {
    const stars = generateStars();

    const offsetX = useSharedValue(SCREEN.WIDTH / 2 - 160);
    const offsetY = useSharedValue(SCREEN.HEIGHT);

    useEffect(() => {
        offsetX.value = withRepeat(
            withTiming(-offsetX.value, { duration: 1750 }),
            -1,
            true
        );

        offsetY.value = withRepeat(
            withSequence(
                withTiming(-offsetY.value, { duration: 5000 }),
                withTiming(SCREEN.HEIGHT, { duration: 0 }),
            ),
            -1,
            true
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        position: 'absolute',
        top: 100,
        left: 100,
        backgroundColor: 'gold',
        transform: [{ translateX: offsetX.value }, { translateY: offsetY.value }],
    }));

    return (
        <View style={styles.container}> 
            <Animated.View style={[styles.star, animatedStyle]} />
            
            {stars.map((star, index) => (
                <Star
                    key={index}
                    x={star.x}
                    y={star.y}
                    radius={star.radius}
                    opacity={star.opacity}
                    speed={star.speed}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    star: {
        position: 'absolute',
        width: 5,
        height: 5,
        borderRadius: 5,
        backgroundColor: 'white',
        opacity: 1,
    },
});