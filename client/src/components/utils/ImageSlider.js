import React from 'react';
import { Carousel } from 'antd';

export default function ImageSlider(props) {
  return (
    <div>
      <Carousel autoplay>
        {props.images.map((image, index) => (
          <div key={index}>
            <img
              style={{ width: '280px', height: '150px', objectFit: 'cover' }}
              src={`http://localhost:5000/${image}`}
              alt='Carousel'
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
