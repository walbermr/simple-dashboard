import trash from "../../assets/TrashSimple.svg";
import edit from "../../assets/NotePencil.svg";

import { Container } from "./styles";
import { useOperations } from "../../hooks/useOperation";
import { Operation } from "../../database/typeorm/entities/Operation";
import { useModal } from "../../hooks/useModal";
import { NumberFormatBRL } from "../../services/NumberFormatBRL";
import { formatOperationType, opSortFunction } from "../../services/FormatOperationType";
import { formatDate } from "../../services/FormatDate";

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

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Ativo</th>
            <th>Quantidade</th>
            <th>Preço</th>
            <th>Tipo</th>
            <th>Broker</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {opList.sort(opSortFunction).map((operation) => (
            <tr key={operation.id}>
              <td>{operation.ticker}</td>
              <td>{operation.quantity}</td>
              <td>{NumberFormatBRL(operation.price)}</td>
              <td>{formatOperationType(operation.operationType)}</td>
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
