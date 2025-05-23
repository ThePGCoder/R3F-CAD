"use client";

import {
  Box,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useCADStore } from "../store/useCADStore";

export const ObjectListDrawer = () => {
  const objects = useCADStore((s) => s.objects);
  const updateObject = useCADStore((s) => s.updateObject);
  const setObjects = useCADStore((s) => s.setObjects);
  const [open, setOpen] = useState(true);

  const handleChange = (
    id: string,
    field: keyof (typeof objects)[0],
    value: string
  ) => {
    const parsed = parseFloat(value);
    if (!isNaN(parsed)) {
      updateObject(id, { [field]: parsed } as any);
    }
  };

  const handlePositionChange = (id: string, index: number, value: string) => {
    const parsed = parseFloat(value);
    if (isNaN(parsed)) return;

    const object = objects.find((o) => o.id === id);
    if (!object) return;

    const newPos = [...object.position] as [number, number, number];
    newPos[index] = parsed;
    updateObject(id, { position: newPos });
  };

  const handleDelete = (id: string) => {
    setObjects(objects.filter((obj) => obj.id !== id));
  };

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        bgcolor: "background.paper",
        borderTop: "1px solid #ccc",
        zIndex: 9,
        boxShadow: "0 -2px 10px rgba(0,0,0,0.2)",
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" px={2} py={1}>
        <Typography variant="subtitle1">Objects</Typography>
        <IconButton onClick={() => setOpen(!open)}>
          {open ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        </IconButton>
      </Box>

      <Collapse in={open}>
        <List dense sx={{ pb: 6 }}>
          {objects.map((obj) => (
            <Box key={obj.id} px={2}>
              <ListItem disableGutters>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  justifyContent="space-between"
                  width="100%"
                  flexWrap="wrap"
                >
                  <Typography fontSize={11} width={150} noWrap title={obj.id}>
                    {obj.shape} / {obj.material} – {obj.id.slice(0, 6)}…
                  </Typography>

                  <Stack direction="row" spacing={1}>
                    <TextField
                      label="W"
                      type="number"
                      size="small"
                      value={obj.width}
                      onChange={(e) => handleChange(obj.id, "width", e.target.value)}
                      sx={{ width: 60 }}
                    />
                    <TextField
                      label="L"
                      type="number"
                      size="small"
                      value={obj.length}
                      onChange={(e) => handleChange(obj.id, "length", e.target.value)}
                      sx={{ width: 60 }}
                    />
                    <TextField
                      label="H"
                      type="number"
                      size="small"
                      value={obj.height}
                      onChange={(e) => handleChange(obj.id, "height", e.target.value)}
                      sx={{ width: 60 }}
                    />
                    {["X", "Y", "Z"].map((axis, i) => (
                      <TextField
                        key={axis}
                        label={axis}
                        type="number"
                        size="small"
                        value={obj.position[i]}
                        onChange={(e) => handlePositionChange(obj.id, i, e.target.value)}
                        sx={{ width: 60 }}
                      />
                    ))}
                  </Stack>

                  <IconButton
                    size="small"
                    onClick={() => handleDelete(obj.id)}
                    sx={{ ml: 1, color: "error.main" }}
                    
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>
      </Collapse>
    </Box>
  );
};
