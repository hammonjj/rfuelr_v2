import { useSwipeable } from "react-swipeable";

interface SwipeContainerProps {
  children?: React.ReactNode;
  callback?: (eventData: any, msg: string) => void;
}

export default function SwipeContainer(props: SwipeContainerProps) {
  const handlers = useSwipeable({
    onSwipedLeft: (eventData) => {
      props.callback?.(eventData, "left");
    },
    onSwipedRight: (eventData) => {
      props.callback?.(eventData, "right");
    },
    preventScrollOnSwipe: true,
  });

  return (
    <div {...handlers}>
      {props.children}
    </div>
  )
}