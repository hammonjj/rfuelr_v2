import { CSSProperties, ReactNode, useState } from "react";
import useMousePosition from "@hooks/useMousePosition.jsx";
import TooltipProvider from "@contexts/TooltipProvider.jsx";

type TooltipType = {
  open: boolean;
  content: ReactNode | null;
  style: CSSProperties | null;
};

export default function CustomTooltip({ children }: { children: ReactNode }) {
  const emptyTooltip: TooltipType = {
    open: false,
    content: null,
    style: null
  };

  const [tooltip, setTooltip] = useState(emptyTooltip);

  const openTooltip = ({ content, style }: { content: ReactNode | null, style: CSSProperties | null }) => {
    setTooltip({
      open: true,
      content: content,
      style: style
    });
  };

  const closeTooltip = () => {
    setTooltip(emptyTooltip);
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Tooltip tooltip={tooltip} />
      <TooltipProvider openTooltip={openTooltip} closeTooltip={closeTooltip}>
        {children}
      </TooltipProvider>
    </div>
  );
}

const Tooltip = ({ tooltip }: { tooltip: TooltipType }) => {
  const position = useMousePosition();
  const left = tooltip.open ? position.x : -9999;
  const top = tooltip.open ? position.y : -9999;

  return (
    <div
      style={{
        position: "fixed",
        left: left + 5,
        top: top + 5,
        zIndex: 9999,
        ...tooltip.style
      }}
    >
      {tooltip.content}
    </div>
  );
};
