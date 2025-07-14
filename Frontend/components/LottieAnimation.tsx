import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

const LottieAnimation = () => {
  return (
    <div style={{ width: '300px', height: '300px' }}>
      <Player
        autoplay
        loop
        src="/animation.json" 
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default LottieAnimation;