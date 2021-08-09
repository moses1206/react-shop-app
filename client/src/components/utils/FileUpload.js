import React from 'react';
import { Icon } from 'antd';
import Dropzone from 'react-dropzone';
import axios from 'axios';

export default function FileUpload() {
  const dropHandler = (files) => {
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };
    formData.append('file', files[0]);

    axios.post('/api/product/image', formData, config).then((response) => {
      if (response.data.success) {
      } else {
        alert('파일을 저장하는데 실패하였습니다.!');
      }
    });
  };

  return (
    <Dropzone onDrop={dropHandler}>
      {({ getRootProps, getInputProps }) => (
        <div
          style={{
            width: 300,
            height: 240,
            border: '1px solid lightgray',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <Icon type='plus' style={{ fontSize: '3rem' }} />
        </div>
      )}
    </Dropzone>
  );
}
