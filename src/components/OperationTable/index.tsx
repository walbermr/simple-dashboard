import trash from "../../assets/TrashSimple.svg";
import edit from "../../assets/NotePencil.svg";

import { Container } from "./styles";
import { useOperations } from "../../hooks/useOperation";
import { Operation } from "../../database/typeorm/entities/Operation";
import { useModal } from "../../hooks/useModal";
import { NumberFormatBRL } from "../../services/NumberFormatBRL";

export function OperationTable() {
  const { operations, DeleteOperation, SetOperationToBeEdit } = useOperations();
  const { OpenEditRegisterOperationModal } = useModal();

  const opList = [...operations];

  console.log(opList)

  function handleClickDelete(opId: number) {
    DeleteOperation(opId);
  }

  function handleClickEdit(operation: Operation) {
    OpenEditRegisterOperationModal();
    SetOperationToBeEdit(operation)
  }

  function formatDate(s: string){
      return new Date(s).toLocaleDateString().toString();
  }

  function formatOperation(op: string){
    return {
      "buy": "Compra",
      "sell": "Venda",
    }[op]
  }

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Quantidade</th>
            <th>Preço</th>
            <th>Tipo</th>
            <th>Broker</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {opList.sort((a: Operation, b: Operation) => {
            return new Date(a.date) > new Date(b.date) ? 1 : -1;
          }).map((operation) => (
            <tr key={operation.id}>
              <td>{operation.ticker}</td>
              <td>{operation.quantity}</td>
              <td>{NumberFormatBRL(operation.price)}</td>
              <td>{formatOperation(operation.operationType)}</td>
              <td>{operation.broker}</td> 
              <td>{formatDate(operation.date)}</td>
              <td className="td-icons">
                <img
                  src={edit}
                  alt="edit"
                  onClick={() => handleClickEdit(operation)}
                />
                <img
                  src={trash}
                  alt="trash"
                  onClick={() => handleClickDelete(operation.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
