"use client";

import { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useCADStore } from "../store/useCADStore";

interface FormState {
  width: number;
  length: number;
  height: number;
  position: [number, number, number];
  shape: "box" | "cylinder" | "sphere";
  material: "wood" | "metal";
}

const defaultForm: FormState = {
  width: 1,
  length: 1,
  height: 1,
  position: [0, 0, 0],
  shape: "box",
  material: "wood",
};

interface ObjectFormProps {
  onClose?: () => void;
}

export const ObjectForm = ({ onClose }: ObjectFormProps) => {
  const addObject = useCADStore((s) => s.addObject);
  const [form, setForm] = useState<FormState>(defaultForm);
  const [positionInput, setPositionInput] = useState("0,0,0");

  const handleChange = (field: keyof FormState, value: any) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePositionChange = (value: string) => {
    setPositionInput(value);
    const parts = value.split(",").map((n) => Number(n.trim()));
    if (parts.length === 3 && parts.every((n) => !isNaN(n))) {
      handleChange("position", parts as [number, number, number]);
    }
  };

  const handleSubmit = () => {
    addObject(form);
    setForm(defaultForm);
    onClose?.();
  };

  return (
    <Box p={2}>
      
      <Stack spacing={2}>
        <Typography variant="h6">Add Object</Typography>
        <TextField
        size="small"
          label="Width"
          type="number"
          value={form.width}
          onChange={(e) => handleChange("width", +e.target.value)}
        />
        <TextField
        size="small"
          label="Length"
          type="number"
          value={form.length}
          onChange={(e) => handleChange("length", +e.target.value)}
        />
        <TextField
        size="small"
          label="Height"
          type="number"
          value={form.height}
          onChange={(e) => handleChange("height", +e.target.value)}
        />
        <TextField
        size="small"
          label="Position (X,Y,Z)"
          type="text"
          value={positionInput}
          onChange={(e) => handlePositionChange(e.target.value)}
        />
        <TextField
        size="small"
          select
          label="Shape"
          value={form.shape}
          onChange={(e) => handleChange("shape", e.target.value)}
        >
          <MenuItem value="box">Box</MenuItem>
          <MenuItem value="cylinder">Cylinder</MenuItem>
          <MenuItem value="sphere">Sphere</MenuItem>
        </TextField>
        <TextField
        size="small"
          select
          label="Material"
          value={form.material}
          onChange={(e) => handleChange("material", e.target.value)}
        >
          <MenuItem value="wood">Wood</MenuItem>
          <MenuItem value="metal">Metal</MenuItem>
        </TextField>
        <Button variant="contained" onClick={handleSubmit}>
          Add
        </Button>
      </Stack>
    </Box>
  );
};
