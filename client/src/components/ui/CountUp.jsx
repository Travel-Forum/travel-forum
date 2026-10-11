import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";

const CountUp = ({ value, duration = 1.2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [isInView, value, duration]);

  return <span ref={ref}>{display}</span>;
};

export default CountUp;