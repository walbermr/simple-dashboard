import { useEffect, FormEvent, useState } from "react";
import Modal from "react-modal";

import { useModal } from "../../hooks/useModal";
import { useOperations } from "../../hooks/useOperation";

import closeImg from "../../assets/close.svg";
import { Container } from "./styles";

export function EditRegisterOperation() {
  const [ticker, setTicker] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [broker, setBroker] = useState("");
  const [date, setDate] = useState("");
  const [operationType, setOperationType] = useState("");

  const { isEditRegisterOperationModalOpen, CloseEditRegisterOperationModal } =
    useModal();
  const { editOperation, EditOperation } = useOperations();

  useEffect(() => {
    setTicker(editOperation.ticker);
    setQuantity(String(editOperation.quantity));
    setPrice(String(editOperation.price));
    setBroker(editOperation.broker);
    setOperationType(editOperation.operationType)
  }, [isEditRegisterOperationModalOpen, editOperation.ticker, editOperation.quantity, editOperation.price, editOperation.broker, editOperation.operationType]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = {
      id: editOperation.id,
      ticker: ticker,
      quantity: Number(quantity),
      price: Number(price),
      operationType: operationType,
      broker: broker,
      date: date,
    };

    EditOperation(data);
    CloseEditRegisterOperationModal();
  }

  return (
    <Modal
      isOpen={isEditRegisterOperationModalOpen}
      onRequestClose={CloseEditRegisterOperationModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        onClick={CloseEditRegisterOperationModal}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>
      <Container onSubmit={handleSubmit}>
        <h2>Edit product</h2>

        <input
          type="text"
          placeholder="Ticker"
          value={ticker}
          onChange={(event) => setTicker(event.target.value)}
          required
        />
        <input
          min={1}
          value={quantity}
          type="number"
          placeholder="Quantity"
          onChange={(event) => setQuantity(event.target.value)}
          required
        />
        <input
          min={0}
          step={0.01}
          value={price}
          type="number"
          placeholder="Price"
          onChange={(event) => setPrice(event.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Broker"
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

        <button type="submit">Edit</button>
      </Container>
    </Modal>
  );
}
