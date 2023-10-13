import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';
import { Container } from "./styles";
import { useOperations } from '../../hooks/useOperation';
import { opSortFunction } from '../../services/FormatOperationType';
import { Operation } from '../../database/typeorm/entities/Operation';

interface Ticker {
  totalInvested: number,
  quantity: number,
}

export function ChartPage(){
  function toMonthYearKey(d: Date){
    return (d.getMonth() + 1).toString()+"/"+d.getFullYear().toString();
  }

  const { operations } = useOperations();
  operations.sort(opSortFunction)
  let data:any = [];
  let portfolio: {[key: string]: Ticker} = {};

  function updateProfits(ops: Operation[]) {
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
      let monthYear = toMonthYearKey(date);
      
      if (lastMonthYear !== monthYear){
        monthlyProfits[lastMonthYear] = monthProfit;
        monthProfit = 0
      }

      if(op.operationType === "buy"){
        if(op.ticker in portfolio){
          let t: Ticker = portfolio[op.ticker];
          t.quantity += op.quantity
          t.totalInvested += op.quantity * op.price
        }
        else{
          let ticker: Ticker = {
            totalInvested: (op.quantity * op.price),
            quantity: op.quantity,
          }
          portfolio[op.ticker] = ticker
        }
      }
      else if(op.operationType === "sell"){
        let t: Ticker = {totalInvested: 0, quantity: 0}
        if (op.ticker in portfolio){
          t = portfolio[op.ticker]
        }
        let meanPrice = (t.totalInvested / t.quantity)
        monthProfit += (op.price - meanPrice) * op.quantity

        t.quantity -= op.quantity
        t.totalInvested -= op.quantity * meanPrice
        portfolio[op.ticker] = t
        monthlyProfits[monthYear] += monthProfit
      }

      lastMonthYear = monthYear;
    }

    console.log(monthProfit)
    monthlyProfits[lastMonthYear] = monthProfit;
    console.log(monthlyProfits)

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

  data = updateProfits(operations)
  console.log(data)

  return (
    <Container>
        <BarChart width={600} height={300} data={data}>
            <Bar type="monotone" dataKey="profit" fill="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="monthYear" />
            <YAxis />
            <Tooltip />
        </BarChart>
    </Container>
  );
}