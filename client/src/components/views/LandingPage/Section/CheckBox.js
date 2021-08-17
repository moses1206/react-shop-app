import React from 'react';
import { Collapse, Checkbox } from 'antd';

const { Panel } = Collapse;

export default function CheckBox(props) {
  const renderCheckboxLists = () =>
    props.list &&
    props.list.map((value, index) => (
      <React.Fragment key={index}>
        <Checkbox onChange>
          <span>{value.name}</span>
        </Checkbox>
      </React.Fragment>
    ));

  return (
    <div>
      <Collapse defaultActiveKey={['1']}>
        <Panel header='This is panel header 1' key='1'>
          {renderCheckboxLists()}
          <Checkbox>Checkbox</Checkbox>
        </Panel>
      </Collapse>
      ,
    </div>
  );
}
