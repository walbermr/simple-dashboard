import { useEffect, FormEvent, useState } from "react";
import Modal from "react-modal";

import { useModal } from "../../hooks/useModal";
import { useProducts } from "../../hooks/useProduct";

import closeImg from "../../assets/close.svg";
import { Container } from "./styles";

export function EditRegisterProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const { isEditRegisterProductModalOpen, CloseEditRegisterProductModal } =
    useModal();
  const { editProduct, EditProduct } = useProducts();

  useEffect(() => {
    setName(editProduct.name);
    setPrice(String(editProduct.price));
  }, [isEditRegisterProductModalOpen, editProduct.name, editProduct.price]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = {
      id: editProduct.id,
      name,
      price: Number(price),
    };

    EditProduct(data);
    CloseEditRegisterProductModal();
  }

  return (
    <Modal
      isOpen={isEditRegisterProductModalOpen}
      onRequestClose={CloseEditRegisterProductModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        onClick={CloseEditRegisterProductModal}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>
      <Container onSubmit={handleSubmit}>
        <h2>Edit product</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <input
          min={0}
          value={price}
          type="number"
          placeholder="Price"
          onChange={(event) => setPrice(event.target.value)}
          required
        />

        <button type="submit">Edit</button>
      </Container>
    </Modal>
  );
}
