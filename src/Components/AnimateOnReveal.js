import * as React from "react";

const initialTransforms = {
  zoomIn: "scale(0.92)",
  fadeInLeft: "translate3d(-24px, 0, 0)",
  fadeInRight: "translate3d(24px, 0, 0)",
  fadeInDown: "translate3d(0, -24px, 0)",
  fadeInUp: "translate3d(0, 24px, 0)",
};

export function AnimateOnReveal({ animation, children }) {
  const initialTransform = initialTransforms[animation];
  const ref = React.useRef(null);
  const [isRevealed, setIsRevealed] = React.useState(false);

  React.useEffect(() => {
    if (!initialTransform) return undefined;

    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setIsRevealed(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [initialTransform]);

  if (!initialTransform) {
    return children;
  }

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const style = prefersReducedMotion
    ? undefined
    : {
        opacity: isRevealed ? 1 : 0,
        transform: isRevealed
          ? "translate3d(0, 0, 0) scale(1)"
          : initialTransform,
        transition: "opacity 600ms ease, transform 600ms ease",
        willChange: "opacity, transform",
      };

  return (
    <div ref={ref} style={style}>
      {children}
    </div>
  );
}
