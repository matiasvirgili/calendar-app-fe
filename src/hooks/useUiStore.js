// Este hook me va a servir para dispacth de acciones y controlar todo lo que esta en el uiStore

import { useDispatch, useSelector } from "react-redux";
import { onCloseDateModal, onOpenDateModal } from "../store/ui/uiSlice";

export const useUiStore = () => {
  // uso el dispacth para despachar acciones que defini en el reducer del uiSlice
  const dispacth = useDispatch();
  // Con el useSelector tengo acceso a todas las propiedades del uiStore
  // Estoy tomando del uiStore el isDateModalOpen
  const { isDateModalOpen } = useSelector((state) => state.ui);

  const OpenDateModal = () => {
    dispacth(onOpenDateModal());
  };
  const closeDateModal = () => {
    dispacth(onCloseDateModal());
  };
  return {
    // Voy a regresar distintas propertis
    isDateModalOpen,

    // Voy a regresar metodos para que hagan las acciones
    OpenDateModal,
    closeDateModal,
  };
};
