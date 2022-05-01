import { Button, Dialog } from "@mui/material";
import React, { useState, useContext } from "react";

const CreateOrderModal = () => {
  const [openSign, setOpenSign] = useState(false);
  const handleClickOpen = () => {
    setOpenSign(true);
  };
  const handleClickClose = () => {
    setOpenSign(false);
  };

  return (
    <div>
      <Button color="inherit" onClick={handleClickOpen}>
        Заказать
      </Button>
      <Dialog open={openSign} onClose={handleClickClose}></Dialog>
    </div>
  );
};

export default CreateOrderModal;
