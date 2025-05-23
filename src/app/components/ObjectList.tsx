import { Box, Typography, List, ListItem } from "@mui/material";
import { useCADStore } from "../store/useCADStore";

export const ObjectList = () => {
    const objects = useCADStore((s) => s.objects);

    return (
        <Box p={2}>
            <Typography variant="h6">Objects</Typography>
            <List>
                {objects.map((obj) => (
                    <ListItem key={obj.id}>
                        {obj.shape} ({obj.width}×{obj.length}×{obj.height}) – {obj.material}
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};
