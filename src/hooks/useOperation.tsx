import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";

import toast from "react-hot-toast";

import { createConnection, getRepository } from "typeorm";

import { Operation } from "../database/typeorm/entities/Operation";

import ConnectionObject from "../services/connectionObject";
import { QueryResponse } from "../services/QueryResponse";

interface OperationContextData {
  operations: Operation[];
  editOperation: Operation;
  CreateNewOperation: (operation: any) => void;
  EditOperation: (operation: any) => void;
  DeleteOperation: (operationId: number) => void;
  SetOperationToBeEdit: (operation: Operation) => void;
}

interface OperationProviderProps {
  children: ReactNode;
}

const OperationContext = createContext<OperationContextData>(
  {} as OperationContextData
);

export function OperationProvider({ children }: OperationProviderProps) {
  const [operations, setOperations] = useState<Operation[]>([]);
  const [editOperation, setEditOperation] = useState<Operation>({} as Operation);

  useEffect(() => {
    async function LoadOperations() {
      createConnection(ConnectionObject).catch(console.error);

      QueryResponse("SELECT * FROM operation").then((result: Operation[]) => {
        setOperations(result);
      });
    }
    LoadOperations();
  }, []);

  console.log(operations);

  async function CreateNewOperation(operation: any) {
    const toastId = toast.loading("Loading...");
    try {
      getRepository(Operation).save(operation);
      setOperations([...operations, operation]);
      toast.success("Operação cadastrado!");

    } catch (error) {
      toast.error("Falha ao cadastrar produto!");
      console.log(error);

    } finally {
      toast.dismiss(toastId);
    }
    return;
  }

  async function DeleteOperation(operationId: number) {
    const toastId = toast.loading("Loading...");
    try {
      const filteredOperation = operations.filter(
        (operation) => operation.id !== operationId
      );

      QueryResponse(`DELETE FROM operation WHERE id==${operationId}`);
      setOperations(filteredOperation);
      toast.success("Operação deletado!");

    } catch (error) {
      console.log(error);
      toast.error("Falha ao deletar operação!");

    } finally {
      toast.dismiss(toastId);
    }
    return;
  }

  async function EditOperation(operation: Operation) {
    const toastId = toast.loading("Loading...");
    try {
      const updatedOperation = operations.map((p) =>
        p.id === operation.id ? operation : p
      );

      QueryResponse(
        `UPDATE operation SET ticker = '${operation.ticker}', price = '${operation.price}', quantity = '${operation.quantity}', broker = '${operation.broker}', operationType = '${operation.operationType}', date = '${operation.date}', WHERE id=${operation.id}`
      );
      setOperations(updatedOperation);
      toast.success("Operação editado!");

    } catch (error) {
      console.log(error)
      toast.error("Falha ao editar produto!");

    }finally {
      toast.dismiss(toastId);
    }
  }

  function SetOperationToBeEdit(operation: Operation) {
    setEditOperation(operation);
  }

  return (
    <OperationContext.Provider
      value={{
        operations,
        editOperation,
        CreateNewOperation,
        DeleteOperation,
        EditOperation,
        SetOperationToBeEdit,
      }}
    >
      {children}
    </OperationContext.Provider>
  );
}

export function useOperations(): OperationContextData {
  const context = useContext(OperationContext);

  return context;
}
