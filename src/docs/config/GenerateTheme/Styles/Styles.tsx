import basicStyles from "./BasicStyles";
import loadingStyles from "./LoadingStyles";
import buttonStyles from "./ButtonStyles";
import dialogStyles from "./DialogStyles";
import navigationStyles from "./NavigationStyles";
import textfieldStyles from "./TextfieldStyles";
import toastStyles from "./ToastStyles";
import type { ColorConfigGroup } from "../Types";

const styles: ColorConfigGroup = {
  "Basic Styles": basicStyles,
  "Loading Styles": loadingStyles,
  Dialog: dialogStyles,
  Buttons: buttonStyles,
  "Text Fields": textfieldStyles,
  Navigation: navigationStyles,
  Toast: toastStyles,
};

export default styles;
