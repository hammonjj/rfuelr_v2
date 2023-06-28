import TooltipContext from "@contexts/TooltipContext";
import { useContext } from "react";

export function useTooltipContext() {
  const tooltipContext = useContext(TooltipContext);
  return tooltipContext;
}