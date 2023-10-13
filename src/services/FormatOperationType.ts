import { Operation } from "../database/typeorm/entities/Operation";

export function formatOperationType(op: string){
  return {
    "buy": "Compra",
    "sell": "Venda",
  }[op]
}

export function opSortFunction(a: Operation, b: Operation){
  const dateA = new Date(a.date)
  const dateB = new Date(b.date)

  return dateA > dateB ? -1 : 1;
}
