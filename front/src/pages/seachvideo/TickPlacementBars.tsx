import * as React from 'react';

import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';


interface ChartProps {
    data: Array<{ y: number, [key: string]: any }>; // 또는 다른 적절한 유형으로 대체할 수 있음
}






//  const valueFormatter = (value: number | null) => {
//     if (value === null) return "0회";
//     return `${value.toLocaleString('en')}회`;
//   };
  

// const chartSetting = {
 
//   series: [{ dataKey: 'y', label: '조회수 ', valueFormatter }],
//   height: 300,
//   sx: {
//     [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
//       transform: 'translateX(-10px)',
//     },
//   },
// };

// const  TickPlacementBars: React.FC<ChartProps> = ({ data })=> {
//   return (
//     <div style={{ width: '80%' ,textAlign:"center", margin:"0px auto"}}>
    
//       <BarChart
//         width={1500}
//         dataset={data[0].data}
//         xAxis={[
//           { scaleType: 'band', dataKey: 'x',  },
//         ]}
       
//         {...chartSetting}
//       />
//     </div>
//   );
// }
// export default TickPlacementBars;




const chartSetting = {
  xAxis: [
    {
      label: '조회수',
    },
  ],
  width: 1500,
  height: 800,
};

const valueFormatter = (value: number | null) => {
    if (value === null) return "0회";
    return `${value.toLocaleString('en')}회`;
  };
  

const  TickPlacementBars: React.FC<ChartProps> = ({ data })=> {
  return (
    
    <BarChart
      dataset={data[0].data}
      yAxis={[{ scaleType: 'band', dataKey: 'x' }]}
      series={[{ dataKey: 'y', label: 'Seoul rainfall', valueFormatter }]}
      layout="horizontal"
      {...chartSetting}
    />
  );
}
export default TickPlacementBars

