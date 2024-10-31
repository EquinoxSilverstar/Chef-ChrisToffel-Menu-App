import { MenuItem } from "./MenuItem";

// ../AppStackParamList.ts
export type AppStackParamList = {
  Home: undefined;
  ViewMenu: undefined;
  AddMenuItem: { menuItems: MenuItem[], setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>> };
  EditMenuItem: { menuItem: MenuItem };
};
