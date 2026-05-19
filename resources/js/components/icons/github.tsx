import React from 'react';

const GithubLogoOutlineIcon = ({
  size = 20,
  color = '#000000',
  strokeWidth = 0.25,
  background = 'transparent',
  opacity = 1,
  rotation = 0,
  shadow = 0,
  flipHorizontal = false,
  flipVertical = false,
  padding = 0,
  ...props
}) => {
  const transforms = [];

  if (rotation !== 0) {
      transforms.push(`rotate(${rotation}deg)`);
  }
  
  if (flipHorizontal) {
    transforms.push('scaleX(-1)');
    }

  if (flipVertical) {
    transforms.push('scaleY(-1)')
  }

  const viewBoxSize = 24 + (padding * 2);
  const viewBoxOffset = -padding;
  const viewBox = `${viewBoxOffset} ${viewBoxOffset} ${viewBoxSize} ${viewBoxSize}`;

  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width={size} height={size} style={{ opacity: opacity, backgroundColor: background }}><path  d="M32 0C14 0 0 14 0 32c0 21 19 30 22 30c2 0 2-1 2-2v-5c-7 2-10-2-11-5c0 0 0-1-2-3c-1-1-5-3-1-3c3 0 5 4 5 4c3 4 7 3 9 2c0-2 2-4 2-4c-8-1-14-4-14-15q0-6 3-9s-2-4 0-9c0 0 5 0 9 4c3-2 13-2 16 0c4-4 9-4 9-4c2 7 0 9 0 9q3 3 3 9c0 11-7 14-14 15c1 1 2 3 2 6v8c0 1 0 2 2 2c3 0 22-9 22-30C64 14 50 0 32 0"/></svg>
  );
};

export default GithubLogoOutlineIcon;