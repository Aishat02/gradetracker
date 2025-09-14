import { motion } from "motion/react";
import { ButtonHTMLAttributes, ReactNode } from "react";

type PulseAnimation = {
  state: boolean;
  type: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  style: string;
  children: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const PulseEffect = ({
  state,
  type,
  style,
  children,
  onClick,
}: PulseAnimation) => {
  return (
    <motion.button
      disabled={state}
      type={type}
      onClick={onClick}
      animate={state ? { scale: [1, 1.05, 1] } : {}}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      className={style}
    >
      {children}
    </motion.button>
  );
};

type DotSpinner = {
  numberOfDots: number;
  speed: number;
  radius: number;
};

export const LoadingSpinner = () => {
  const spinner: DotSpinner = { numberOfDots: 10, speed: 2, radius: 10 };
  const { numberOfDots, speed, radius } = spinner;
  const dots = Array.from({ length: numberOfDots });

  return (
    (
      <div style={{ position: "relative", marginTop: "2vw" }}>
        {dots.map((_, i) => {
          const angle = (360 / numberOfDots) * i;
          return (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                left: "50%",
                width: 5,
                height: 5,
                backgroundColor: "black",
                borderRadius: "50%",
                transform: `rotate(${angle}deg) translate(${radius}px)`,
                opacity: 0.5,
              }}
              animate={{ opacity: [1, 0.5] }}
              transition={{
                duration: speed,
                repeat: Infinity,
                ease: "linear",
                delay: i * (speed / numberOfDots),
              }}
            />
          );
        })}
      </div>
    )
  );
};
