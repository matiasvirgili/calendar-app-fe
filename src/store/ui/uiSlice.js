// El uiSlice sirve para manejar informacion como por ejemplo si el modal esta abierto o si esta cerrado

import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: { isDateModalOpen: false },
  reducers: {
    onOpenDateModal: (state) => {
      // codigo mutante que se usa asi cuando usamos toolkit
      // sino tendriamos que hacer un return del state anterior y pasarle el true
      state.isDateModalOpen = true;
    },
    onCloseDateModal: (state) => {
      state.isDateModalOpen = false;
    },
  },
});

export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;
