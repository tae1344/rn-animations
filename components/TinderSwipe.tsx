import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import TinderSwipeCard from './TinderSwipeCard';


const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = height * 0.65;

const cards = [
  require('../assets/images/taro-card.png'),
  require('../assets/images/taro-card.png'),
  require('../assets/images/taro-card.png'),
  require('../assets/images/taro-card.png'),
  require('../assets/images/taro-card.png'),
];

export default function TinderSwipe() {
  const [cardIndex, setCardIndex] = useState(0);

  const nextCard = () => {
    setCardIndex((prev) => (prev + 1) % cards.length);
  };

  return (
    <View style={styles.container}>
      {cards.reverse().map((card, index) => {
        const isTop = index === 0;
        const zIndex = cards.length - index;
        return (
          <TinderSwipeCard key={cardIndex + index} image={card} onSwipeOff={nextCard} />
        );
        // return isTop ? (
        //   <TinderSwipeCard key={cardIndex + index} image={card} onSwipeOff={nextCard} />
        // ) : (
        //   <View key={cardIndex + index} style={[styles.card, { zIndex }]}> 
        //     <Image source={card} style={styles.image} />
        //   </View>
        // );
      })}
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    backgroundColor: '#fff',
    overflow: 'hidden',
    elevation: 5
  },
  image: {
    width: '100%',
    height: '100%'
  }
});
