import { createSlice } from "@reduxjs/toolkit";
import { appWatchStorageName } from '../../globals/globals';

function getWatch(){
  let watchFromStorage = localStorage.getItem(appWatchStorageName);
  if(watchFromStorage === null){
      watchFromStorage = [];
  }else{
      watchFromStorage = JSON.parse(watchFromStorage);
  }
  return watchFromStorage;
}

const initialState = {
    items: getWatch(),
}

function getIndex(item, arr){
    return arr.findIndex(arrItem => arrItem.id === item.id);
}

export const watchSlice = createSlice({
  name: 'watch',
  initialState,
  reducers: {
    addWatchItem: (state, action) => {
      const newWatch = [...state.items, action.payload];
      localStorage.setItem(appWatchStorageName, JSON.stringify(newWatch));
      state.items = newWatch;
    },
    deleteWatchItem: (state, action) => {
      const itemsCopy = state.items;
      itemsCopy.splice(getIndex(action.payload, state.items), 1);
      localStorage.setItem(appWatchStorageName, JSON.stringify(itemsCopy));
      state.items = itemsCopy;
    }
  },
});

// Action creators are generated for each case reducer function
export const { addWatchItem, deleteWatchItem } = watchSlice.actions

export default watchSlice.reducer;
