import trash from "../../assets/TrashSimple.svg";
import edit from "../../assets/NotePencil.svg";

import { Container } from "./styles";
import { useProducts } from "../../hooks/useProduct";
import { Product } from "../../database/typeorm/entities/Product";
import { useModal } from "../../hooks/useModal";
import { NumberFormatBRL } from "../../services/NumberFormatBRL";

export function ProductTable() {
  const { products, DeleteProduct, SetProductToBeEdit } = useProducts();
  const { OpenEditRegisterProductModal } = useModal();

  const desProduct = [...products].reverse();

  function handleClickDelete(produtId: number) {
    DeleteProduct(produtId);
  }

  function handleClickEdit(product: Product) {
    OpenEditRegisterProductModal();
    SetProductToBeEdit(product)
  }

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {desProduct.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{NumberFormatBRL(product.price)}</td>
              <td className="td-icons">
                <img
                  src={edit}
                  alt="edit"
                  onClick={() => handleClickEdit(product)}
                />
                <img
                  src={trash}
                  alt="trash"
                  onClick={() => handleClickDelete(product.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
