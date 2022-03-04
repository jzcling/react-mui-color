import { terser } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import replace from "@rollup/plugin-replace";
import analyze from "rollup-plugin-analyzer";
import pkg from "./package.json";
import { sizeSnapshot } from "rollup-plugin-size-snapshot";
import autoExternal from "rollup-plugin-auto-external";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

const config = [
  {
    input: "src/index.ts",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        exports: "named",
        // sourcemap: true,
      },
      {
        file: pkg.module,
        format: "es",
        exports: "named",
        // sourcemap: true,
      },
    ],
    plugins: [
      replace({
        "process.env.NODE_ENV": JSON.stringify("production"),
      }),
      json(),
      resolve(),
      commonjs({
        exclude: ["src/**"],
        include: ["node_modules/**"],
      }),
      typescript({ tsconfig: "./tsconfig.json" }),
      analyze({ summaryOnly: true, limit: 10 }),
      sizeSnapshot(),
      terser(),
      autoExternal(),
    ],
    external: [/@mui\//, /@babel\/runtime/],
  },
  {
    input: "src/index.ts",
    output: [
      {
        file: `dist/${pkg.name}.min.js`,
        format: "umd",
        name: "ColorPicker",
        exports: "named",
        // sourcemap: true,
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    ],
    plugins: [
      replace({
        "process.env.NODE_ENV": JSON.stringify("production"),
      }),
      json(),
      resolve(),
      commonjs({
        exclude: ["src/**"],
        include: ["node_modules/**"],
      }),
      typescript({ tsconfig: "./tsconfig.json" }),
      analyze({ summaryOnly: true, limit: 10 }),
      sizeSnapshot(),
      terser(),
    ],
    external: ["react", "react-dom"],
  },
  {
    input: "dist/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()],
  },
];

export default config;
