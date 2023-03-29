import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IRuralProducerDatas } from "../../types/IRuralProducerDatas";


const defaultItem: IRuralProducerDatas = {
  id: "",
  doc: "",
  nome: "",
  nomeFazenda: "",
  cidade: "",
  uf: "",
  culturaPlantada: "",
  areaTotal: "",
  areaVegetacao: "",
  areaAgricultavel: "",
};


const ruralProducerSlice = createSlice({
  name: "ruralProducer",
  initialState: {
    datas: [],
    item: defaultItem,
    hasAdd: false
  },
  reducers: {
    setData(state, action: PayloadAction<any | IRuralProducerDatas[]>) {
      state.datas = action.payload;
    },
    addItem(state, action: PayloadAction<IRuralProducerDatas>) {
      const itemNew: IRuralProducerDatas = action.payload;
      const datas = JSON.parse(JSON.stringify(state.datas));
      datas.push(itemNew)
      state.datas = datas;
    },
    updateItem(state, action: PayloadAction<IRuralProducerDatas>) {
      const itemNew: IRuralProducerDatas = action.payload;
      const datas: any|IRuralProducerDatas[] = JSON.parse(JSON.stringify(state.datas));
      state.datas = datas.map((item:IRuralProducerDatas) => {
        if (itemNew.id === item.id) {
          item = itemNew
        }
        return item;
      });
    },
    removeItem(state, action: PayloadAction<IRuralProducerDatas>) {
      const item: IRuralProducerDatas = action.payload;
      const datas: any|IRuralProducerDatas[] = JSON.parse(JSON.stringify(state.datas));
      state.datas = datas.filter(({ id }:IRuralProducerDatas) => item.id !== id);
    },

  }
})

export const {
  setData,
  addItem,
  updateItem,
  removeItem
} = ruralProducerSlice.actions;
export default ruralProducerSlice.reducer