import { FormEvent, useState } from "react";
import Modal from "react-modal";

import closeImg from "../../assets/close.svg";

import { useModal } from "../../hooks/useModal";
import { useProducts } from "../../hooks/useProduct";
import { Container } from "./styles";

export function NewRegisterProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  const { isNewRegisterProductModalOpen, CloseNewRegisterProductModal } =
    useModal();
  const { CreateNewProduct } = useProducts();

  function handleCreateNewProduct(event: FormEvent) {
    event.preventDefault();

    const data = {
      name,
      price,
    };

    CreateNewProduct(data)
    setDefaultValue();
    CloseNewRegisterProductModal();
  }

  function setDefaultValue() {
    setName("");
    setPrice(0);
  }

  return (
    <Modal
      isOpen={isNewRegisterProductModalOpen}
      onRequestClose={CloseNewRegisterProductModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      onAfterClose={setDefaultValue}
    >
      <button
        onClick={CloseNewRegisterProductModal}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewProduct}>
        <h2>Register product</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <input
          min={0}
          type="number"
          placeholder="Price"
          onChange={(event) => setPrice(Number(event.target.value))}
          required
        />

        <button type="submit">Register</button>
      </Container>
    </Modal>
  );
}
