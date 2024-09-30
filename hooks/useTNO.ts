import { TNOContext } from "@/contexts/tno-context";
import { useContext } from "react";

export function useTNO() {
  return useContext(TNOContext);
}
