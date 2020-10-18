import React from "react";
import { Button } from "@material-ui/core";

// Not really fits in its own feature,
// but put here as an example of a second feature
// Should be inside Home.tsx I guess, or in the "chess" feature
const ButtonsRow = ({
  rotateButtonClick,
  spawnPawnButtonClick,
  resetButtonClick
}: {
  rotateButtonClick: () => void;
  spawnPawnButtonClick: () => void;
  resetButtonClick: () => void;
}) => {
  return (
    <div>
      <Button onClick={rotateButtonClick}>Rotate</Button>
      <Button onClick={spawnPawnButtonClick} style={{ margin: "1rem" }}>
        Spawn a white pawn
      </Button>
      <Button onClick={resetButtonClick}>Reset</Button>
    </div>
  );
};

export default ButtonsRow;
