import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';
import { PieChart, Pie, Sector } from "recharts";
import React, { useCallback, useState } from "react";
import { Container } from "./styles";
import { useOperations } from '../../hooks/useOperation';
import { opSortFunction } from '../../services/FormatOperationType';
import { Operation } from '../../database/typeorm/entities/Operation';
import { NumberFormatBRL } from '../../services/NumberFormatBRL';

interface OperationHistory {
  opDate: Date[];
  buyPrice: number[];
  buyAmount: number[];
  sellPrice: number[];
  sellAmount: number[];
  opProfit: number[];
}; // mover para processamento do bd

interface Ticker {
  totalInvested: number,
  quantity: number,
  history: OperationHistory,
};

const renderActiveShape = (props: any) => {
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
      >{NumberFormatBRL(value)}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

function toMonthYearKey(d: Date){
  return (d.getMonth() + 1).toString()+"/"+d.getFullYear().toString();
}


function updatePortfolio(ops: Operation[], portfolio: {[key: string]: Ticker}) {
  let monthProfit = 0;
  let monthlyProfits: {[key: string]: number} = {};

  if(ops.length === 0) return;

  let firstDate = new Date(ops[ops.length - 1].date);
  firstDate = new Date(firstDate.getFullYear(), firstDate.getMonth(), 1)

  let lastDate = new Date(ops[0].date);
  lastDate = new Date(lastDate.getFullYear(), lastDate.getMonth(), 1)

  let curr = firstDate;
  while (curr <= lastDate) {
    monthlyProfits[toMonthYearKey(curr)] = 0;
    if (curr.getMonth() == 11) {
        curr = new Date(curr.getFullYear() + 1, 0, 1);
    } else {
        curr = new Date(curr.getFullYear(), curr.getMonth() + 1, 1);
    }
  }

  ops.reverse()
  let lastMonthYear = toMonthYearKey(firstDate);
  for (let index = 0; index < ops.length; index++) {
    const op = ops[index];

    let date = new Date(op.date);
    let buyPrice = 0
    let buyAmount = 0
    let sellPrice = 0
    let sellAmount = 0
    let opProfit = 0

    let monthYear = toMonthYearKey(date);
    
    if (lastMonthYear !== monthYear){
      monthlyProfits[lastMonthYear] = monthProfit;
      monthProfit = 0
    }

    if(!(op.ticker in portfolio)){
      let ticker: Ticker = {
        totalInvested: 0,
        quantity: 0,
        history: {
          opDate: [],
          buyAmount: [],
          buyPrice: [],
          sellAmount: [],
          sellPrice: [],
          opProfit: [],
        },
      }

      portfolio[op.ticker] = ticker
    }

    let t: Ticker = portfolio[op.ticker]

    if(op.operationType === "buy"){
      t.quantity += op.quantity
      t.totalInvested += op.quantity * op.price

      buyPrice = op.price
      buyAmount = op.quantity
    }
    else if(op.operationType === "sell"){
      let meanPrice = (t.totalInvested / t.quantity)
      opProfit = (op.price - meanPrice) * op.quantity

      monthProfit += opProfit

      t.quantity -= op.quantity
      t.totalInvested -= op.quantity * meanPrice

      portfolio[op.ticker] = t
      monthlyProfits[monthYear] += monthProfit

      sellPrice = op.price
      sellAmount = op.quantity
    }

    t.history.buyAmount.push(buyAmount)
    t.history.buyPrice.push(buyPrice)
    t.history.sellAmount.push(sellAmount)
    t.history.sellPrice.push(sellPrice)
    t.history.opProfit.push(opProfit)
    t.history.opDate.push(date)

    lastMonthYear = monthYear;
  }

  // console.log(monthProfit)
  monthlyProfits[lastMonthYear] = monthProfit;
  // console.log(monthlyProfits)

  var data = []
  for (let [key, value] of Object.entries(monthlyProfits)) {
    data.push({
        "monthYear": key,
        "profit": value,
      }
    )
  }

  return data
}

function getPieData(portfolio: {[key: string]: Ticker}){
  var pieData = [];
  console.log(portfolio)

  for (const key in portfolio) {
    pieData.push({
        "name": key,
        "value": portfolio[key].totalInvested,
      }
    )
  }

  return pieData;
}

export function ChartPage(){
  const { operations } = useOperations();
  operations.sort(opSortFunction)
  let data: any = [];
  let pieData: any = [];
  let portfolio: {[key: string]: Ticker} = {};
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_: any, index: any) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );


  data = updatePortfolio(operations, portfolio)
  pieData = getPieData(portfolio)
  console.log(pieData)

  return (
    <Container>
        <BarChart width={600} height={300} data={data}>
            <Bar type="monotone" dataKey="profit" fill="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="monthYear" />
            <YAxis />
            <Tooltip />
        </BarChart>

        <PieChart width={900} height={300}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={pieData}
            cx={300}
            cy={200}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
          />
        </PieChart>
    </Container>
  );
}