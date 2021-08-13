import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { FaCode } from 'react-icons/fa';
import { Icon, Col, Card, Row, Carousel } from 'antd';

function LandingPage() {
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    Axios.post('/api/product/getproducts').then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setProducts(response.data.productsInfo);
      } else {
        alert('상품들을 가져오는 것을 실패하였습니다. !!');
      }
    });
  }, []);

  const renderCards = Products.map((product, index) => {
    console.log('product', product);
    return (
      <Col key={index} lg={6} md={8} sm={24}>
        <Card
          cover={
            <img
              style={{ width: '100%', maxHeight: '150px' }}
              src={`http://localhost:5000/${product.images[0]}`}
            />
          }
        >
          <Card.Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });

  return (
    <div style={{ width: '75%', margin: '3rem auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>
          Let's Travel Anywhere <Icon type='rocket' />{' '}
        </h2>
      </div>
      {/* Filter */}

      {/* Search */}

      {/* Cards */}
      <Row gutter={16}>{renderCards}</Row>
    </div>
  );
}

export default LandingPage;
