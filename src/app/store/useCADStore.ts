import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

export interface CADObject {
    id: string;
    width: number;
    length: number;
    height: number;
    position: [number, number, number];
    shape: "box" | "cylinder" | "sphere";
    material: "wood" | "metal";
}

interface CADState {
  objects: CADObject[];
  addObject: (obj: Omit<CADObject, "id">) => void;
  setObjects: (objects: CADObject[]) => void;
  updateObject: (id: string, updates: Partial<CADObject>) => void;
}

export const useCADStore = create<CADState>((set) => ({
  objects: [],
  addObject: (obj) =>
    set((state) => ({
      objects: [...state.objects, { ...obj, id: uuidv4() }],
    })),
  setObjects: (objects) => set({ objects }),
  updateObject: (id, updates) =>
    set((state) => ({
      objects: state.objects.map((obj) =>
        obj.id === id ? { ...obj, ...updates } : obj
      ),
    })),
}));

