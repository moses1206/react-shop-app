import React, { useEffect } from 'react';
import Axios from 'axios';
import { FaCode } from 'react-icons/fa';

function LandingPage() {
  useEffect(() => {
    Axios.post('/api/product/getproducts').then((response) => {
      if (response.data.success) {
        console.log(response.data);
      } else {
        alert('상품들을 가져오는 것을 실패하였습니다. !!');
      }
    });
  }, []);

  return <div>LandingPage</div>;
}

export default LandingPage;
