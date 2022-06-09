
import React  from 'react';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';


export const data02 = [
  { name: 'A1', value: 0 },
  { name: 'A1', value: 0 },
  { name: 'A2', value: 0 },
  { name: 'B1', value: 0 },
];

 const Pizza = (props) => {
  data02[0].value = parseInt(props.dados.total_fazenda) ;
  data02[1].value = parseInt(props.dados.total_hectares)  ;
  data02[2].value = props.dados.total_agricultavel;
  data02[3].value = props.dados.total_vegetacao;
  
  
    return (
      <>
      <div className="d-flex flex-wrap justify-content-around align-items-center">
        <p> total_fazenda:{ props.dados.total_fazenda}</p>
        <p> total_hectares:{ props.dados.total_hectares}</p>
        <p> total_agricultavel:{ props.dados.total_agricultavel}</p>
        <p> total_vegetacao:{ props.dados.total_vegetacao}</p>
      </div>
        <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie data={data02} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" />
          <Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label />
        </PieChart>
      </ResponsiveContainer>
        
      </>
    );
  }

export default Pizza; 
