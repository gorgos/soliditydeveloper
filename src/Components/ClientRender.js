import * as React from "react";

export function ClientRender({ children }) {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? children : <div></div>;
}
