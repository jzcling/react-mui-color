import { Box, Stack } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

export default function FreeSelector(props) {
  const {
    parsedColor,
    satCoords,
    hueCoords,
    handleSaturationChange,
    handleHueChange,
  } = props;

  return (
    <Stack
      id="cp-free-root"
      spacing={1}
      sx={{
        mb: 2,
        width: "455px",
        maxWidth: "100%",
      }}
    >
      <Box
        id="cp-saturation"
        sx={{
          width: "100%",
          height: "142px",
          backgroundColor: `hsl(${parsedColor.hsl.h}, 100%, 50%)`,
          backgroundImage:
            "linear-gradient(transparent,black),linear-gradient(to right,white,transparent)",
          borderRadius: "4px",
          userSelect: "none",
          position: "relative",
          cursor: "crosshair",
        }}
        onClick={handleSaturationChange}
      >
        <Box
          id="cp-saturation-indicator"
          sx={{
            width: "15px",
            height: "15px",
            border: "2px solid #ffffff",
            borderRadius: "50%",
            backgroundColor: parsedColor.hex.value,
            transform: "translate(-7.5px, -7.5px)",
            position: "absolute",
            left: (satCoords?.[0] ?? 0) + "%",
            top: (satCoords?.[1] ?? 0) + "%",
          }}
        />
      </Box>
      <Box
        id="cp-hue"
        sx={{
          width: "100%",
          height: "12px",
          backgroundImage:
            "linear-gradient(to right,#ff0000,#ffff00,#00ff00,#00ffff,#0000ff,#ff00ff,#ff0000)",
          borderRadius: "999px",
          position: "relative",
          cursor: "crosshair",
        }}
        onClick={handleHueChange}
      >
        <Box
          id="cp-hue-indicator"
          sx={{
            width: "15px",
            height: "15px",
            border: "2px solid #ffffff",
            borderRadius: "50%",
            backgroundColor: parsedColor.hex.value,
            transform: "translate(-7.5px, -2px)",
            position: "absolute",
            left: (hueCoords ?? 0) + "%",
          }}
        />
      </Box>
    </Stack>
  );
}

FreeSelector.propTypes = {
  parsedColor: PropTypes.object,
  satCoords: PropTypes.array,
  hueCoords: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleSaturationChange: PropTypes.func,
  handleHueChange: PropTypes.func,
};
