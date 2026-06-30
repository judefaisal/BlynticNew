import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

interface LottiePlayerProps {
  animationData?: any; // Parsed JSON object
  loadAnimation?: () => Promise<any>; // Dynamic import function
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
}

const LottiePlayer: React.FC<LottiePlayerProps> = ({ 
  animationData, 
  loadAnimation, 
  className, 
  loop = true, 
  autoplay = true 
}) => {
  const [data, setData] = useState<any>(animationData);
  const [loading, setLoading] = useState<boolean>(!animationData && !!loadAnimation);

  useEffect(() => {
    if (animationData) {
      setData(animationData);
      setLoading(false);
    }
  }, [animationData]);

  useEffect(() => {
    if (loadAnimation && !animationData) {
      setLoading(true);
      loadAnimation()
        .then((module) => {
          setData(module.default || module);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to load dynamic Lottie animation", err);
          setLoading(false);
        });
    }
  }, [loadAnimation, animationData]);

  if (loading || !data) {
    return <div className={`${className} bg-gray-100/10 animate-pulse rounded-2xl`} />;
  }

  return (
    <div className={className}>
      <Lottie 
        animationData={data} 
        loop={loop} 
        autoplay={autoplay} 
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default LottiePlayer;