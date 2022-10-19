import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";

import toast from "react-hot-toast";

import { createConnection, getRepository } from "typeorm";

import { Product } from "../database/typeorm/entities/Product";

import ConnectionObject from "../services/connectionObject";
import { QueryResponse } from "../services/QueryResponse";

interface ProductContextData {
  products: Product[];
  editProduct: Product;
  CreateNewProduct: (product: any) => void;
  EditProduct: (product: any) => void;
  DeleteProduct: (productId: number) => void;
  SetProductToBeEdit: (product: Product) => void;
}

interface ProductProviderProps {
  children: ReactNode;
}

const ProductContext = createContext<ProductContextData>(
  {} as ProductContextData
);

export function ProductProvider({ children }: ProductProviderProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [editProduct, setEditProduct] = useState<Product>({} as Product);

  useEffect(() => {
    async function LoadProducts() {
      createConnection(ConnectionObject).catch(console.error);

      QueryResponse("SELECT * FROM product").then((result: Product[]) => {
        setProducts(result);
      });
    }
    LoadProducts();
  }, []);

  console.log(products);

  async function CreateNewProduct(product: any) {
    const toastId = toast.loading("Loading...");
    try {
      getRepository(Product).save(product);
      setProducts([...products, product]);
      toast.success("Produto cadastrado!");

    } catch (error) {
      toast.error("Falha ao cadastrar produto!");
      console.log(error);

    } finally {
      toast.dismiss(toastId);
    }
    return;
  }

  async function DeleteProduct(productId: number) {
    const toastId = toast.loading("Loading...");
    try {
      const filteredProducts = products.filter(
        (product) => product.id !== productId
      );

      QueryResponse(`DELETE FROM product WHERE id==${productId}`);
      setProducts(filteredProducts);
      toast.success("Produto deletado!");

    } catch (error) {
      console.log(error);
      toast.error("Falha ao deletar produto!");

    } finally {
      toast.dismiss(toastId);
    }
    return;
  }

  async function EditProduct(product: any) {
    const toastId = toast.loading("Loading...");
    try {
      const updatedProduct = products.map((p) =>
        p.id === product.id ? product : p
      );

      QueryResponse(
        `UPDATE product SET name = '${product.name}', price = '${product.price}' WHERE id==${product.id}`
      );
      setProducts(updatedProduct);
      toast.success("Produto editado!");

    } catch (error) {
      console.log(error)
      toast.error("Falha ao editar produto!");

    }finally {
      toast.dismiss(toastId);
    }
  }

  function SetProductToBeEdit(product: Product) {
    setEditProduct(product);
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        editProduct,
        CreateNewProduct,
        DeleteProduct,
        EditProduct,
        SetProductToBeEdit,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts(): ProductContextData {
  const context = useContext(ProductContext);

  return context;
}
