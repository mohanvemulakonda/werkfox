import { registerRoot } from 'remotion';
import React from 'react';
import { Composition } from 'remotion';
import { ProductTourComposition } from '../app/home-final/remotion/ProductTour';

const FPS = 30;

const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ProductTour"
        component={ProductTourComposition}
        durationInFrames={48 * FPS}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="ProductTour-Square"
        component={ProductTourComposition}
        durationInFrames={48 * FPS}
        fps={FPS}
        width={1080}
        height={1080}
      />
    </>
  );
};

registerRoot(RemotionRoot);
