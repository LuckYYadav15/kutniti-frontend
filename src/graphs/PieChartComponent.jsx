import React, { useCallback, useState, useEffect } from "react";
import { PieChart, Pie, Sector, Cell } from "recharts";



const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{` ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`( ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function PieChartComponent() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [shouldRender, setShouldRender] = useState(false);
  const [data, setData]= useState([
    { name: "Positive", value: 0, color: "#5b8f47" }, // Add color property
    { name: "Negative", value: 0, color: "#ff2b47" },
    { name: "Neutral", value: 0, color: "#5b8fa9" },
    { name: "test", value: 0, color: "#5b8fa9" }
  ])
    




  useEffect(() => {
    const fetchData = async () => {
      console.log("Data fetched");
      try {
        let a = await localStorage.getItem("hoveredPositive");
        let b=await localStorage.getItem("hoveredNegative");
        let c = await localStorage.getItem("hoveredNeutral");

        

        const updatedData = [
          { name: "Positive", value: parseInt(a) || 0, color: "#00f050" },
          { name: "Negative", value: parseInt(b) || 0, color: "#ff2b47" },
          { name: "Neutral", value: parseInt(c) || 0, color: "#fff000" },
          { name: "test", value: 0, color: "#ffc658" }
        ];
        setData(updatedData);
        setShouldRender(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

    window.addEventListener('storage', fetchData);
    

    return () => {
      // Clean up the event listener
      window.removeEventListener('storage', fetchData);
    };
  }, []);

  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );


  return shouldRender ? (
    <div>
   
    <PieChart width={420} height={300}>
    <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx={200}
          cy={150}
          innerRadius={50}
          outerRadius={100}
          dataKey="value"
          onMouseEnter={onPieEnter}
          
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
    </PieChart>

      </div>
  ):null;
}
