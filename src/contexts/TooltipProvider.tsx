import { CSSProperties, ReactNode, useMemo } from "react";
import TooltipContext from "./TooltipContext";

type TooltipProviderProps = {
  children: ReactNode;
  openTooltip: ({ content, style }: { content: ReactNode, style: CSSProperties }) => void;
  closeTooltip: () => void;
};

//Used in the CustomTooltip wrapper above
export default function TooltipProvider({ children, openTooltip, closeTooltip }: TooltipProviderProps) {
  const tooltipContext = useMemo(() => {
    return {
      openTooltip: openTooltip,
      closeTooltip: closeTooltip
    };
  }, [openTooltip, closeTooltip]);

  return (
    <TooltipContext.Provider value={tooltipContext}>
      {children}
    </TooltipContext.Provider>
  );
}