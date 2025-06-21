import { useContext } from "react";
import ThemeContext from "../ThemeContext/ThemeContext";


export function useTheme() {
  return useContext(ThemeContext);
}