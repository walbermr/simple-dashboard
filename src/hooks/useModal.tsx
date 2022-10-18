import { createContext, ReactNode, useContext, useState } from "react";

interface ModalContextData {
  isNewRegisterProductModalOpen: boolean;
  OpenNewRegisterProductModal: () => void;
  CloseNewRegisterProductModal: () => void;
  isEditRegisterProductModalOpen: boolean;
  OpenEditRegisterProductModal: () => void;
  CloseEditRegisterProductModal: () => void;
}

interface ModalProviderProps {
  children: ReactNode;
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData);

export function ModalProvider({ children }: ModalProviderProps) {
  const [isNewRegisterProductModalOpen, setIsNewRegisterProductModalOpen] =
    useState(false);

  const [isEditRegisterProductModalOpen, setIsEditRegisterProductModalOpen] =
    useState(false);

  function OpenNewRegisterProductModal() {
    setIsNewRegisterProductModalOpen(true);
  }

  function CloseNewRegisterProductModal() {
    setIsNewRegisterProductModalOpen(false);
  }

  function OpenEditRegisterProductModal() {
    setIsEditRegisterProductModalOpen(true);
  }

  function CloseEditRegisterProductModal() {
    setIsEditRegisterProductModalOpen(false);
  }

  return (
    <ModalContext.Provider
      value={{
        isNewRegisterProductModalOpen,
        OpenNewRegisterProductModal,
        CloseNewRegisterProductModal,
        isEditRegisterProductModalOpen,
        OpenEditRegisterProductModal,
        CloseEditRegisterProductModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal(): ModalContextData {
  const context = useContext(ModalContext);

  return context;
}
