import { UserDefaultState, UserState } from "./interface";

// Initial User State
export const initialState: UserState = {
  saveLocal: "localStorage",
  storeKey: "usersetting",
  user: {
    userData: {},
  },
};

// Default User State
export const defaultState: UserDefaultState = {
  saveLocal: "localStorage",
  storeKey: "usersetting",
  user: {
    userData: {},
  },
};
