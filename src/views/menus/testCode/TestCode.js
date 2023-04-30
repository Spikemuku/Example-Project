import React, { useEffect } from "react";
import TestCodeComponent from "./TestCodeComponent";
import TestCodeCom2 from "./TestCodeCom2";
import MyChart from './MyChart';
 
const TestCode=()=>{

  
    return(
        <div>
            <TestCodeCom2 name="Mg Mg" age="12" address="Yangon"/>
            <TestCodeComponent name="Sara"/>
            <TestCodeComponent name="Nice"/>
            <TestCodeCom2 name="Ma Ma" age="13" address="Singapore"/>           
        </div>
    )
}

function App() {
  const chartData = [
    { category: 'Category 1', value: 10 },
    { category: 'Category 2', value: 20 },
    { category: 'Category 3', value: 30 },
    { category: 'Category 4', value: 40 },
    { category: 'Category 5', value: 50 }
  ];

  return (
    <div className="App">
      <MyChart title="My Chart" type="bar" height={350} seriesName="Series 1" data={chartData} />
    </div>
  );
}

export default TestCode; 

