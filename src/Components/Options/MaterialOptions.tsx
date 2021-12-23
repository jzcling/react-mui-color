import { Box, Button, Paper } from "@mui/material";
import React from "react";
import { Color } from "../../Interfaces/Color";

interface MaterialOptionsProps {
  colors: Array<string>;
  parsedColor: Color;
  onSelect(color: string, keepOpen: boolean): void;
};

export const MaterialOptions = (props: MaterialOptionsProps) => {
  const { colors, parsedColor, onSelect } = props;

  return (
    <Box
      id="cp-predefined-root"
      sx={{
        mb: 2,
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        height: "142px",
        width: "455px",
        maxWidth: "100%",
        overflow: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {colors.map((color) => (
        <Button
          className="cp-predefined-button"
          key={color}
          onClick={(event) => onSelect(color, false)}
          sx={{
            minWidth: "auto",
            p: "5px",
            border: (theme) =>
              color === parsedColor?.hex.value
                ? "1px solid " + theme.palette.primary.main
                : "none",
          }}
        >
          <Paper
            className="cp-predefined-color"
            elevation={1}
            sx={{
              width: "25px",
              height: "25px",
              borderRadius: "50%",
              background: color,
            }}
          />
        </Button>
      ))}
    </Box>
  );
}