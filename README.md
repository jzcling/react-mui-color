# React Material UI Color Picker

A color picker built on top of Material UI. Two picker options available:

- predefined: Self-defined colors or default to Material Design colors
- free: Free selection from a color pad based on hue and saturation

## Installation

```
npm install --save react-mui-color
```

The following packages are peer dependencies and must be installed in your project for this package to work.

```
@emotion/react
@emotion/styled
@mui/material
```

## Usage Example

```jsx
import React from "react";
import { ColorPicker } from "react-mui-color";

export default function MyColorPicker(props) {
  const [color, setColor] = useState("#ffffff");

  const handleFontColorChange = (color) => {
    setColor(color);
    // handle close parent if required
  };

  return (
    <ColorPicker
      variant="predefined"
      color={color}
      colors={["#000000", "#ffffff"]}
      onChange={handleFontColorChange}
      sx={{
        "& #cp-predefined-root": {
          width: "300px",
        },
      }}
    />
  );
}
```

## Props

| Prop         | Type     | Default         | Description                                                                                    |
| ------------ | -------- | --------------- | ---------------------------------------------------------------------------------------------- |
| variant      | `string` | `predefined`    | `predefined` or `free`                                                                         |
| initialColor | `string` | `#181d23`       | Hex, RGB or HSL color value in string.                                                         |
| color        | `string` | undefined       | Hex, RGB or HSL color value in string. If undefined, component is uncontrolled                 |
| colors       | `array`  | See below       | Array of colors to be displayed as options in predefined picker. Not used for `variant="free"` |
| onChange     | `func`   | `(color) => {}` | Method to handle color selection                                                               |
| sx           | `object` | `{}`            | Material UI system prop to pass, mainly for styling                                            |

## Predefined Material Design Colors

```js
[
  "#000000",
  grey[900],
  grey[700],
  grey[500],
  grey[400],
  grey[300],
  grey[100],
  "#ffffff",
  red[700],
  red[500],
  red[300],
  red[100],
  pink[700],
  pink[500],
  pink[300],
  pink[100],
  purple[700],
  purple[500],
  purple[300],
  purple[100],
  indigo[700],
  indigo[500],
  indigo[300],
  indigo[100],
  blue[700],
  blue[500],
  blue[300],
  blue[100],
  cyan[700],
  cyan[500],
  cyan[300],
  cyan[100],
  teal[700],
  teal[500],
  teal[300],
  teal[100],
  green[700],
  green[500],
  green[300],
  green[100],
  lime[700],
  lime[500],
  lime[300],
  lime[100],
  amber[700],
  amber[500],
  amber[300],
  amber[100],
  orange[700],
  orange[500],
  orange[300],
  orange[100],
];
```
