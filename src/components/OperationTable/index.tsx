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

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Broker</th>
          </tr>
        </thead>
        <tbody>
          {opList.map((operation) => (
            <tr key={operation.id}>
              <td>{operation.ticker}</td>
              <td>{operation.quantity}</td>
              <td>{NumberFormatBRL(operation.price)}</td>
              <td>{operation.broker}</td>
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
