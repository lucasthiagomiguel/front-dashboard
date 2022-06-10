
import React  from 'react';
import { PieChart, Pie, ResponsiveContainer,Tooltip } from 'recharts';


export const data02 = [
  { name: 'total_fazenda', value: 0 },
  { name: 'total_hectares', value: 0 },
  { name: 'total_agricultavel', value: 0 },
  { name: 'total_vegetacao', value: 0 },
];
export const data01 = [
  
];


 const Pizza = (props) => {
  data02[0].value = parseInt(props.dados.total_fazenda) ;
  data02[1].value = parseInt(props.dados.total_hectares)  ;
  data02[2].value = props.dados.total_agricultavel;
  data02[3].value = props.dados.total_vegetacao;
  var estadoo = props.dados.estado?.map((number,i) =>
    data01.push({
      name:  number.estado,
      value:parseInt(number.total_estado) 
    })
  )
  console.log(data01)
  
  
    return (
      <>
      <div className="d-flex flex-wrap justify-content-around align-items-center">
        <p> total_fazenda:{ props.dados.total_fazenda}</p>
        <p> total_hectares:{ props.dados.total_hectares}</p>
        <p> total_agricultavel:{ props.dados.total_agricultavel}</p>
        <p> total_vegetacao:{ props.dados.total_vegetacao}</p>
        {props.dados.estado?.map((number,i) =>
          <p key={i}>estado:{number.estado} total_estado:{number.total_estado}</p>
        )}
      </div>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={data02}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            />
            <Pie dataKey="value" data={data01} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" label />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        
      </>
    );
  }

export default Pizza; 
