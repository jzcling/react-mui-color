import {
  Box,
  hslToRgb,
  Paper,
  rgbToHex,
  Stack,
  TextField,
} from "@mui/material";
import React, { useCallback, useMemo } from "react";
import {
  clamp,
  defaultColor,
  defaultColors,
  getHueCoordinates,
  getSaturationCoordinates,
  hsvToRgb,
  parseColor,
} from "../Utils/ColorUtils";
import { FreeSelector } from "./Options/FreeSelector";
import { PredefinedSelector } from "./Options/PredefinedSelector";

export enum ColorPickerVariant {
  Predefined = "predefined",
  Free = "free",
}

interface ColorPickerProps {
  color: string;
  colors: Array<string>;
  onChange(color: string, keepOpen: boolean): void;
  variant: ColorPickerVariant;
  sx: Object;
};

export const ColorPicker = (props: ColorPickerProps) => {
  const { color, colors, onChange, variant, sx } = props;

  const parsedColor = useMemo(() => parseColor(color), [color]);
  const satCoords = useMemo(
    () => getSaturationCoordinates(parsedColor),
    [parsedColor]
  );
  const hueCoords = useMemo(
    () => getHueCoordinates(parsedColor),
    [parsedColor]
  );

  const handleRgbChange = useCallback(
    (component, value) => {
      const { r, g, b } = parsedColor.rgb;

      switch (component) {
        case "r":
          onChange(rgbToHex(`rgb(${value ?? 0}, ${g}, ${b})`), true);
          return;
        case "g":
          onChange(rgbToHex(`rgb(${r}, ${value ?? 0}, ${b})`), true);
          return;
        case "b":
          onChange(rgbToHex(`rgb(${r}, ${g}, ${value ?? 0})`), true);
          return;
        default:
          return;
      }
    },
    [parsedColor?.rgb]
  );

  const handleSaturationChange = useCallback(
    (event) => {
      const { width, height, left, top } = event.target.getBoundingClientRect();

      const x = clamp(event.clientX - left, 0, width);
      const y = clamp(event.clientY - top, 0, height);

      const s = (x / width) * 100;
      const v = 100 - (y / height) * 100;

      const rgb = hsvToRgb(parsedColor?.hsl.h, s, v);

      onChange(rgbToHex(rgb), true);
    },
    [parsedColor?.hsl.h]
  );

  const handleHueChange = useCallback(
    (event) => {
      const { width, left } = event.target.getBoundingClientRect();
      const x = clamp(event.clientX - left, 0, width);
      const h = Math.floor((x / width) * 360);

      const hsl = `hsl(${h}, ${parsedColor?.hsl.s}, ${parsedColor?.hsl.l})`;
      const rgb = hslToRgb(hsl);

      onChange(rgbToHex(rgb), true);
    },
    [parsedColor?.hsl.s, parsedColor?.hsl.l]
  );

  return (
    <Box
      sx={{
        m: 1,
        overflow: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        ...sx,
      }}
    >
      {variant === "predefined" ? (
        <PredefinedSelector
          colors={colors}
          parsedColor={parsedColor}
          onSelect={onChange}
        />
      ) : (
        <FreeSelector
          parsedColor={parsedColor}
          satCoords={satCoords}
          hueCoords={hueCoords}
          handleSaturationChange={handleSaturationChange}
          handleHueChange={handleHueChange}
        />
      )}

      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={1}>
          <Paper
            elevation={1}
            sx={{
              width: "25px",
              height: "25px",
              borderRadius: "50%",
              background: color,
            }}
          />
          <TextField
            size="small"
            label="Hex"
            value={parsedColor?.hex.value}
            onChange={(event) => {
              var val = event.target.value;
              if (val?.slice(0, 1) !== "#") {
                val = "#" + val;
              }
              onChange(val, true);
            }}
            sx={{ width: "95px" }}
          />
        </Stack>

        <Stack direction="row" spacing={1}>
          <TextField
            size="small"
            label="R"
            value={parsedColor.rgb.r}
            onChange={(event) => handleRgbChange("r", event.target.value)}
            sx={{ width: "60px" }}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />
          <TextField
            size="small"
            label="G"
            value={parsedColor.rgb.g}
            onChange={(event) => handleRgbChange("g", event.target.value)}
            sx={{ width: "60px" }}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />
          <TextField
            size="small"
            label="B"
            value={parsedColor.rgb.b}
            onChange={(event) => handleRgbChange("b", event.target.value)}
            sx={{ width: "60px" }}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />
        </Stack>
      </Stack>
    </Box>
  );
}

ColorPicker.defaultProps = {
  color: defaultColor,
  colors: defaultColors,
  onChange: (color: string, keepOpen: boolean) => {},
  variant: "predefined",
  sx: {},
};
