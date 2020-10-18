import React from 'react';
import { Button, } from '@material-ui/core';

const ButtonsRow = ({
  rotateButtonClick,
  spawnPawnButtonClick,
  resetButtonClick,
}: {
  rotateButtonClick: () => void,
  spawnPawnButtonClick: () => void,
  resetButtonClick: () => void,
}) => {

  return (
    <div>
      <Button
        onClick={rotateButtonClick}
      >
        Rotate
      </Button>
      <Button
        onClick={spawnPawnButtonClick}
        style={{ margin: '1rem', }}
      >
        Spawn a white pawn
      </Button>
      <Button
        onClick={resetButtonClick}
      >
        Reset
      </Button>
    </div>
  );
};

export default ButtonsRow;