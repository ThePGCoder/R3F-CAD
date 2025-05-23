"use client";

import {
  Box,
  Modal,
  Fab,
  
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { CanvasScene } from "./components/CanvasScene";
import { ObjectForm } from "./components/ObjectForm";
import { ObjectListDrawer } from "./components/ObjectListDrawer";

export default function HomePage() {
  
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ position: "relative", width: "100vw", height: "100vh" }}>

      <CanvasScene />
<ObjectListDrawer />

      <Fab
      size="small"
        color="primary"
        aria-label="add"
        onClick={() => setOpen(true)}
        sx={{
          position: "absolute",
          top: 25,
          right: 25,
          zIndex: 10,
        }}
      >
        <AddIcon />
      </Fab>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 3,
            width: "90%",
            maxWidth: 400,
            borderRadius: 2,
          }}
        >
          <ObjectForm onClose={() => setOpen(false)} />
        </Box>
      </Modal>
    </Box>
  );
}
