import "reflect-metadata";

import { Toaster } from "react-hot-toast";
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { NewRegisterProduct } from "./components/NewRegisterProduct";

import Modal from "react-modal";

import { ModalProvider } from "./hooks/useModal";
import { GlobalStyle } from "./styles/global";
import { OperationProvider } from "./hooks/useOperation";
import { EditRegisterOperation } from "./components/EditRegisterOperation";
import { NewRegisterOperation } from "./components/NewRegisterOperation";

Modal.setAppElement("#root");

export function App() {

  return (
    <OperationProvider>
      <ModalProvider>
        <Header />

        <Dashboard />

        <NewRegisterOperation />
        <EditRegisterOperation />

        <GlobalStyle />
        <Toaster position="top-center" />
      </ModalProvider>
    </OperationProvider>
  );
}

