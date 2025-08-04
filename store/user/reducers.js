import { createSlice } from "@reduxjs/toolkit";
import { initialState, defaultState } from "./state";
import { updateStorage, getStorage } from "../../utilities/setting";
import _ from "lodash";

const createUserObj = (state) => {
  return {
    saveLocal: state.saveLocal,
    storeKey: state.storeKey,
    user: _.cloneDeep(state.user),
  };
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const json = getStorage(state.storeKey);
      if (json === "none") state.saveLocal = "none";
      if (json !== null && json !== "none") {
        state.saveLocal = json.saveLocal;
        state.user = { userData: action.payload };
      }
      updateStorage(state.saveLocal, state.storeKey, createUserObj(state));
    },
    reset_state: (state, action) => {
      state.user = defaultState.user;
      updateStorage(state.saveLocal, state.storeKey, createUserObj(state));
    },
    saveLocal: (state, action) => {
      if (typeof action.payload !== typeof undefined) {
        state.saveLocal = action.payload;
      }
      const userObj = {
        saveLocal: state.saveLocal,
        storeKey: state.storeKey,
        user: _.cloneDeep(state.user),
      };
      updateStorage(state.saveLocal, state.storeKey, userObj);
    },
  },
});

export default userSlice.reducer;
