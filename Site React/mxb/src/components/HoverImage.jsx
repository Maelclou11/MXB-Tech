import React, { useState } from 'react';

const HoverImage = (props) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    let { offsetX, offsetY } = e.nativeEvent;
    offsetY = offsetY - 200;
    setPosition({ x: offsetX, y: offsetY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const transformImage = () => {
    const { x, y } = position;
    const moveX = -x / 20;
    const moveY = -y / 20;
    return `translate(${moveX}px, ${moveY}px)`;
  };

  return (
    <img
      src={props.src}
      alt={props.alt}
      className="hover-image"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformImage() }}
    />
  );
};

export default HoverImage;
