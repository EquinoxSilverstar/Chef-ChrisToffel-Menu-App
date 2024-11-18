import { MenuItem } from "./MenuItem";

export type AppStackParamList = {
  Home: undefined;
  ViewMenu: undefined;
  AddMenuItem: { menuItems: MenuItem[], setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>> };
  EditMenuItem: { menuItem: MenuItem };
};
