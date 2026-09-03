import React from "react";
import { createGlobalStyle } from "styled-components";
import globalStyles from "./global.css?inline";

const GlobalStyle: React.ComponentType = createGlobalStyle`${globalStyles}`;

export default GlobalStyle;
