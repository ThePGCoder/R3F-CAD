"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid, Environment } from "@react-three/drei";
import { useCADStore, CADObject } from "../store/useCADStore";
import { Box, Typography } from "@mui/material";

const ObjectMesh = ({ obj }: { obj: CADObject }) => {
  const color = obj.material === "wood" ? "saddlebrown" : "gray";

  const adjustedY = obj.position[1] + obj.height / 2;
  const meshPosition: [number, number, number] = [
    obj.position[0],
    adjustedY,
    obj.position[2],
  ];

  switch (obj.shape) {
    case "box":
      return (
        <mesh position={meshPosition}>
          <boxGeometry args={[obj.width, obj.height, obj.length]} />
          <meshStandardMaterial color={color} metalness={1} roughness={0.2} />
        </mesh>
      );
    case "cylinder":
      return (
        <mesh position={meshPosition}>
          <cylinderGeometry args={[obj.width / 2, obj.width / 2, obj.height, 32]} />
          <meshStandardMaterial color={color} metalness={1} roughness={0.2} />
        </mesh>
      );
    case "sphere":
      return (
        <mesh position={meshPosition}>
          <sphereGeometry args={[obj.width / 2, 32, 32]} />
          <meshStandardMaterial color={color} metalness={1} roughness={0.2} />
        </mesh>
      );
    default:
      return null;
  }
};

export const CanvasScene = () => {
  const objects = useCADStore((state) => state.objects);

  return (
    <Box sx={{ width: "100vw", height: "100vh", position: "relative" }}>
      {/* Logo overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 20,
          pointerEvents: "none",
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
      <img src="/logo.png" alt="R3F-CAD" width={30} height={30} />
      <Typography
        
        sx={{
          
          
          color: "white",
          textShadow: "0 1px 2px rgba(0,0,0,0.4)",
        }}
      >
        R3F-CAD
      </Typography>
    </Box>
      </Box>

      {/* 3D Canvas */}
      <Canvas camera={{ position: [10, 10, 10], fov: 50 }} style={{ width: "100%", height: "100%" }}>
        <color attach="background" args={["#2D3748"]} />
        <fog attach="fog" args={["#2D3748", 15, 60]} />

        <OrbitControls makeDefault />
        <Environment preset="studio" />
        <Grid
          args={[100, 100]}
          sectionSize={1}
          sectionColor="#4A5568"
          cellSize={1}
          cellThickness={0.5}
          cellColor="#4A5568"
          fadeDistance={50}
          fadeStrength={1}
          infiniteGrid
        />

        {objects.map((obj) => (
          <ObjectMesh key={obj.id} obj={obj} />
        ))}
      </Canvas>
    </Box>
  );
};
