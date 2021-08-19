import React, { useState } from 'react';
import { Collapse, Checkbox } from 'antd';

const { Panel } = Collapse;

export default function CheckBox(props) {
  const [Checked, setChecked] = useState([]);

  const handleToggle = (value) => {
    // 누른 것의 Index를 구하고
    // IndexOf는 값이 있다면 그 숫자의 위치를 반환하고 없으면 -1 를 반환한다.
    const currentIndex = Checked.indexOf(value);

    // 전체 Checked된 State에서 현재 누른 Checked가 이미 있다면
    const newChecked = [...Checked];

    // State에 값이 없다면
    if (currentIndex === -1) {
      // State에 index를 넣어준다.
      newChecked.push(value);
    } else {
      // 값이 있다면 빼준다
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    props.handleFilters(newChecked);
  };

  const renderCheckboxLists = () =>
    props.list &&
    props.list.map((value, index) => (
      <React.Fragment key={index}>
        <Checkbox
          onChange={() => handleToggle(value._id)}
          checked={Checked.indexOf(value._id) === -1 ? false : true}
        />
        <span>{value.name}</span>
      </React.Fragment>
    ));

  return (
    <div>
      <Collapse defaultActiveKey={['1']}>
        <Panel header='This is panel header 1' key='1'>
          {renderCheckboxLists()}
        </Panel>
      </Collapse>
      ,
    </div>
  );
}
