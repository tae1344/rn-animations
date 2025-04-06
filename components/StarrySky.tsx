import React from 'react';
import {Canvas, Circle} from '@shopify/react-native-skia';
import {useSharedValue, useDerivedValue} from 'react-native-reanimated';
import {Dimensions} from 'react-native';

// Constants
const SCREEN = {
    WIDTH: Dimensions.get('window').width,
    HEIGHT: Dimensions.get('window').height,
};

const STAR_CONFIG = {
    COUNT: 100,
    MIN_RADIUS: 0.5,
    MAX_RADIUS: 2,
    MIN_SPEED: 0.2,
    MAX_SPEED: 0.7,
    MIN_OPACITY: 0.5,
    MAX_OPACITY: 1,
    ANIMATION_DURATION: 3000,
} as const;

// Types
interface Star {
    x: number;
    y: number;
    radius: number;
    speed: number;
    opacity: number;
}

const generateStars = (): Star[] => {
    return Array.from({length: STAR_CONFIG.COUNT}, () => ({
        x: Math.random() * SCREEN.WIDTH,
        y: Math.random() * SCREEN.HEIGHT,
        radius: Math.random() * (STAR_CONFIG.MAX_RADIUS - STAR_CONFIG.MIN_RADIUS) + STAR_CONFIG.MIN_RADIUS,
        speed: Math.random() * (STAR_CONFIG.MAX_SPEED - STAR_CONFIG.MIN_SPEED) + STAR_CONFIG.MIN_SPEED,
        opacity: Math.random() * (STAR_CONFIG.MAX_OPACITY - STAR_CONFIG.MIN_OPACITY) + STAR_CONFIG.MIN_OPACITY,
    }));
};

export const StarrySky: React.FC = () => {
    const stars = useSharedValue<Star[]>(generateStars());

    const animatedStars = useDerivedValue(() => {
        'worklet';
        const currentStars = [...stars.value];
        const updatedStars = currentStars.map((star: Star) => {
            const newY = star.y - star.speed;
            
            if (newY < 0) {
                return {
                    ...star,
                    y: SCREEN.HEIGHT,
                    x: Math.random() * SCREEN.WIDTH,
                    opacity: Math.random() * (STAR_CONFIG.MAX_OPACITY - STAR_CONFIG.MIN_OPACITY) + STAR_CONFIG.MIN_OPACITY,
                };
            }
            
            return {
                ...star,
                y: newY,
            };
        });
        
        stars.value = updatedStars;
        return updatedStars;
    });

    return (
        <Canvas style={{flex: 1, backgroundColor: 'black'}}>
            {animatedStars.value.map((star: Star, index: number) => (
                <Circle
                    key={index}
                    cx={star.x}
                    cy={star.y}
                    r={star.radius}
                    color="white"
                    opacity={star.opacity}
                />
            ))}
        </Canvas>
    );
};
