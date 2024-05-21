import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Checkboxes: React.FC = () => {

  const CheckboxHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`${event.target.name} is ${event.target.checked ? 'checked' : 'unchecked'}`);
  };

  return (
    <div>
      <Checkbox {...label} name="구독자" onChange={CheckboxHandler} /> 구독자
      <Checkbox {...label} name="조회수" onChange={CheckboxHandler} /> 조회수 
      <Checkbox {...label} name="영상 수" onChange={CheckboxHandler} /> 영상 수
    </div>
  );
};

export default Checkboxes;
