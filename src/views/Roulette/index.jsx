import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const SpinButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  font-size: 16px;
  z-index: 10;
`;

const WheelContainer = styled.div`
  position: relative;
  width: 500px;
  height: 500px;
  border: 2px solid #000;
  border-radius: 50%;
  overflow: hidden;
`;

const Wheel = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  transition: transform 3s ease-out;
`;

const Segment = styled.div`
  position: absolute;
  height: 100%;
  top: 50%;
  left: 50%;
  transform-origin: 50% 50%;
//   background-color: ${(props) => props.color || '#ccc'};
//   clip-path: polygon(0 0, 100% 50%, 0 100%);
  transform: translate(-50%, -50%) rotate(${(props) => props.angle}deg);
`;

const Label = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
`;

const labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

const RouletteWheel = () => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [startRound, setStartRound] = useState(1)
  const singleAngle = (360 / labels.length)

  const startSpin = () => {
    setSpinning(true);
    setResult(null);
  };

  useEffect(() => {
    let timeout;

    if (spinning) {
      const randomAngle = Math.round(Math.random() * 12);
      const totalAngle = (360 * startRound) + (randomAngle * singleAngle);

      timeout = setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * labels.length);
        setResult(labels[randomIndex]);
        setStartRound(startRound + 1)
        setSpinning(false);
      }, 3000);

      // 设置旋转角度
      document.getElementById('roulette-wheel').style.transform = `rotate(${totalAngle}deg)`;
    }

    return () => clearTimeout(timeout);
  }, [spinning]);

  const calculateAngle = (index) => singleAngle * index;

  return (
    <WheelContainer>
      <SpinButton onClick={startSpin} disabled={spinning}>
        {spinning ? 'Spinning...' : 'Start Spin'}
      </SpinButton>
      <Wheel id="roulette-wheel">
        {labels.map((label, index) => (
          <Segment key={index} color={`hsl(${(index * 360) / labels.length}, 70%, 70%)`} angle={calculateAngle(index)}>
            <Label>{label}</Label>
          </Segment>
        ))}
      </Wheel>
      {result && <p>Result: {result}</p>}
    </WheelContainer>
  );
};

export default RouletteWheel;
