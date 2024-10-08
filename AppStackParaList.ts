import { MenuItem } from "./MenuItem";

export type AppStackParamList = {
  Home: undefined;
  AddMenuItem: undefined;
  ViewMenu: undefined;

  EditMenuItem: { menuItem: MenuItem };

};
