import { createContext } from "react";
import { CSSProperties, ReactNode } from "react";

type TooltipContextType = {
  openTooltip?: ({ content, style }: { content: ReactNode, style: CSSProperties }) => void;
  closeTooltip?: () => void;
};

// Here, we're assigning the value returned from createContext()
const TooltipContext = createContext<TooltipContextType>({});

export default TooltipContext;