import { FormEvent, useState } from "react";
import Modal from "react-modal";

import closeImg from "../../assets/close.svg";

import { useModal } from "../../hooks/useModal";
import { useOperations } from "../../hooks/useOperation";
import { Container } from "./styles";

import Dropdown from "../Dropdown";

export function NewRegisterOperation() {
  const [ticker, setTicker] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [broker, setBroker] = useState("");
  const [operationType, setOperationType] = useState("");
  const [date, setDate] = useState("");
  const options = [
    "Compra", "Venda"
  ];
  const defaultOption = options[0];

  const { isNewRegisterOperationModalOpen, CloseNewRegisterOperationModal } =
    useModal();
  const { CreateNewOperation } = useOperations();

  function handleCreateNewOperation(event: FormEvent) {
    event.preventDefault();

    const data = {
      ticker,
      quantity,
      price,
      operationType,
      broker,
      date,
    };

    CreateNewOperation(data)
    setDefaultValue();
    CloseNewRegisterOperationModal();
  }

  function setDefaultValue() {
    setTicker("");
    setQuantity(0);
    setPrice(0);
    setBroker("");
    setOperationType(defaultOption)
  }

  return (
    <Modal
      isOpen={isNewRegisterOperationModalOpen}
      onRequestClose={CloseNewRegisterOperationModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      onAfterClose={setDefaultValue}
    >
      <button
        onClick={CloseNewRegisterOperationModal}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewOperation}>
        <h2>Register operation</h2>

        <input
          type="text"
          placeholder="Ticker"
          value={ticker}
          onChange={(event) => setTicker(event.target.value)}
          required
        />
        <input
          min={0}
          type="number"
          placeholder="Preço"
          onChange={(event) => setPrice(Number(event.target.value))}
          required
        />
        <input
          min={1}
          type="number"
          placeholder="Quantidade"
          onChange={(event) => setQuantity(Number(event.target.value))}
          required
        />
        <input
          type="text"
          placeholder="Corretora"
          value={broker}
          onChange={(event) => setBroker(event.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Data"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          required
        />

        <Dropdown onChange={(event : any) => setOperationType(event) }/>

        <button type="submit">Register</button>
      </Container>
    </Modal>
  );
}
