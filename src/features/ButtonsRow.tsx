import React from "react";
import { Button } from "@material-ui/core";

// Does not really deserve its own feature,
// but put here as an example of a second feature
const ButtonsRow = ({
  items
}: {
  items: { label: string; callback: () => void }[];
}) => {
  return (
    <div>
      {items.map((item) => (
        <Button
          key={item.label}
          onClick={item.callback}
          style={{ margin: "1rem" }}
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
};

export default ButtonsRow;
