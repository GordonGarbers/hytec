import React from 'react';

export const Background = () => {
  return (
    <div>
      <div
        style={{
          backgroundColor: 'rgba(200, 205, 197, .3)',
          clipPath: 'polygon(90% 100%, 100% 100%, 100% 0%, 70% 0%)',
          zIndex: '0',
        }}
        className="w-100 h-100 position-fixed"
      ></div>

      <div
        style={{
          backgroundColor: 'rgba(215, 215, 215,.4)',
          clipPath: 'polygon(60% 100%, 100% 100%, 100% 0%, 80% 0%)',
          zIndex: '0',
        }}
        className="w-100 h-100 position-fixed"
      ></div>

      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255,.6)',
          clipPath: 'polygon(0% 100%, 40% 100%, 10% 0%, 0% 0%)',
          zIndex: '0',
        }}
        className="w-100 h-100 position-fixed"
      ></div>

      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255,.6)',
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 80% 0%)',
          zIndex: '0',
        }}
        className="w-100 h-100 position-fixed"
      ></div>

      <div
        style={{
          backgroundColor: 'rgba(234, 234, 235, .4)',
          clipPath: 'polygon(0% 100%, 70% 100%, 100% 0%, 0% 0%)',
          zIndex: '-1',
        }}
        className="w-100 h-100 position-fixed"
      ></div>

      <div
        style={{
          backgroundColor: 'rgb(244, 244, 245)',
          clipPath: 'polygon(0% 30%, 100% 50%, 100% 0%, 0% 0%)',
          zIndex: '-1',
        }}
        className="w-100 h-100 position-fixed"
      ></div>

      <div
        style={{
          backgroundColor: 'rgb(238, 238, 238)',
          clipPath: 'polygon(0% 30%, 100% 10%, 100% 0%, 0% 0%)',
          zIndex: '-1',
        }}
        className="w-100 h-100 position-fixed"
      ></div>
    </div>
  );
};
