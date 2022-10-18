import "reflect-metadata";

import { Toaster } from "react-hot-toast";
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { NewRegisterProduct } from "./components/NewRegisterProduct";

import Modal from "react-modal";

import { ModalProvider } from "./hooks/useModal";
import { GlobalStyle } from "./styles/global";
import { ProductProvider } from "./hooks/useProduct";
import { EditRegisterProduct } from "./components/EditRegisterProduct";

Modal.setAppElement("#root");

export function App() {

  return (
    <ProductProvider>
      <ModalProvider>
        <Header />

        <Dashboard />

        <NewRegisterProduct />
        <EditRegisterProduct />

        <GlobalStyle />
        <Toaster position="top-center" />
      </ModalProvider>
    </ProductProvider>
  );
}

