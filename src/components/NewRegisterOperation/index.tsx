import { FormEvent, useState } from "react";
import Modal from "react-modal";

import closeImg from "../../assets/close.svg";

import { useModal } from "../../hooks/useModal";
import { useOperations } from "../../hooks/useOperation";
import { Container } from "./styles";

export function NewRegisterOperation() {
  const [ticker, setTicker] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [broker, setBroker] = useState("");

  const { isNewRegisterOperationModalOpen, CloseNewRegisterOperationModal } =
    useModal();
  const { CreateNewOperation } = useOperations();

  function handleCreateNewOperation(event: FormEvent) {
    event.preventDefault();

    const data = {
      ticker,
      quantity,
      price,
      broker,
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
          placeholder="Price"
          onChange={(event) => setPrice(Number(event.target.value))}
          required
        />
        <input
          min={1}
          type="number"
          placeholder="Quantity"
          onChange={(event) => setQuantity(Number(event.target.value))}
          required
        />
        <input
          type="text"
          placeholder="Broker"
          value={broker}
          onChange={(event) => setBroker(event.target.value)}
          required
        />

        <button type="submit">Register</button>
      </Container>
    </Modal>
  );
}
