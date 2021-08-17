import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Icon, Col, Card, Row, Button } from 'antd';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Section/CheckBox';
import { continents } from './Section/Datas';

function LandingPage() {
  const [Products, setProducts] = useState([]);

  const [Skip, setSkip] = useState(0);
  // eslint-disable-next-line
  const [Limit, setLimit] = useState(4);

  const [PostSize, setPostSize] = useState(0);

  const getProducts = (body) => {
    Axios.post('/api/product/getproducts', body).then((response) => {
      if (response.data.success) {
        if (body.loadMore) {
          setProducts([...Products, ...response.data.productsInfo]);
        } else {
          setProducts(response.data.productsInfo);
        }
        setPostSize(response.data.postLength);
      } else {
        alert('상품들을 가져오는 것을 실패하였습니다. !!');
      }
    });
  };

  useEffect(() => {
    let body = {
      skip: Skip,
      limit: Limit,
    };

    getProducts(body);
    // eslint-disable-next-line
  }, []);

  const loadMoreHandler = () => {
    let skip = Skip + Limit;

    let body = {
      skip: skip,
      limit: Limit,
      loadMore: true,
    };

    getProducts(body);
    setSkip(skip);
  };

  const renderCards = Products.map((product, index) => {
    return (
      <Col key={index} lg={6} md={8} sm={24}>
        <Card cover={<ImageSlider images={product.images} />}>
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

      {/* CheckBox */}
      <CheckBox list={continents} />

      {/* RadioBox */}

      {/* Search */}

      {/* Cards */}
      <Row gutter={[16, 16]}>{renderCards}</Row>
      <br />

      {PostSize >= Limit && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={loadMoreHandler}>더보기</Button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
