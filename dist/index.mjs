import { jsx, jsxs } from "react/jsx-runtime";
import { Link, NavLink } from "react-router";
import sc, { createGlobalStyle, styled } from "styled-components";
import { Component, createContext, useCallback, useContext, useEffect, useState } from "react";
//#region src/lib/components/Loading.tsx
/** Renders a accessible loading div. Necessary for dynamic import react suspend logic*/
function Loading() {
	return /* @__PURE__ */ jsx("div", {
		className: "spinner-container",
		children: /* @__PURE__ */ jsx("div", {
			className: "loading-spinner",
			role: "status",
			"aria-label": "Loading"
		})
	});
}
//#endregion
//#region src/lib/components/LinkRouterButton.tsx
const RouterLinkButton = (sc.default || sc)(Link).attrs({ className: "btn" })``;
//#endregion
//#region src/lib/components/Toast.tsx
const CloseButton = sc.button`
  background: transparent;
  border: none;
  color: inherit;
  font-size: 20px;
  cursor: pointer;
  padding: 4px;
  margin-left: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: inherit;
  }
`;
const StyledToast = sc.div`
  padding: 16px 24px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0.05);
  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 300px;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial,
    sans-serif;

  background-color: ${(props) => {
	switch (props.variant) {
		case "success": return "#28a745";
		case "warning": return "#ffc107";
		case "error": return "#dc3545";
		default: return "#007bff";
	}
}};

  color: ${(props) => props.variant === "warning" ? "#000" : "#fff"};

  transition: all 0.3s ease-in-out;
  animation: slideIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;
/** Toast warning for all situations */
const Toast = ({ isVisible, message, variant = "info", duration = 3e3, onClose }) => {
	useEffect(() => {
		if (isVisible && duration !== void 0) {
			const timer = setTimeout(() => {
				if (onClose) onClose();
			}, duration);
			return () => clearTimeout(timer);
		}
	}, [
		isVisible,
		duration,
		onClose
	]);
	if (!isVisible) return null;
	return /* @__PURE__ */ jsxs(StyledToast, {
		variant,
		role: "alert",
		"aria-live": "assertive",
		children: [/* @__PURE__ */ jsx("div", {
			style: {
				display: "flex",
				alignItems: "center"
			},
			children: /* @__PURE__ */ jsx("span", { children: message })
		}), /* @__PURE__ */ jsx(CloseButton, {
			onClick: () => onClose?.(),
			"aria-label": `Close ${variant} notification`,
			children: "×"
		})]
	});
};
//#endregion
//#region src/lib/components/ToastProvider.tsx
const ToastFlex = sc.div`
  position: fixed;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 5px;
  top: 20px;
  right: 20px;
`;
const ToastContext = createContext(void 0);
/** Provider used to show and destroy toasts fired within the application. */
const ToastProvider = ({ children }) => {
	const [toasts, setToasts] = useState([]);
	const show = useCallback((options) => {
		const id = Math.random().toString(36).substring(2, 15);
		setToasts((prev) => [...prev, {
			id,
			options
		}]);
		setTimeout(() => {
			setToasts((prev) => prev.filter((t) => t.id !== id));
		}, options.duration || 3e3);
	}, []);
	const removeToast = useCallback((id) => {
		setToasts((prev) => prev.filter((t) => t.id !== id));
	}, []);
	return /* @__PURE__ */ jsxs(ToastContext.Provider, {
		value: { show },
		children: [children, toasts?.length > 0 && /* @__PURE__ */ jsx(ToastFlex, { children: toasts.map(({ id, options }) => /* @__PURE__ */ jsx(Toast, {
			isVisible: true,
			message: options.message,
			variant: options.variant,
			duration: options.duration,
			onClose: () => removeToast(id)
		}, id)) })]
	});
};
const useToast = () => {
	const context = useContext(ToastContext);
	if (!context) throw new Error("useToast must be used within a ToastProvider");
	return context;
};
//#endregion
//#region src/lib/components/ErrorTemplates.tsx
/**
* Generates HTML content for an error page based on the provided error message.
* @param {Error} error - The error object containing the error message.
* @returns {string} The HTML content of the error page.
*/
const errorPageHtml = (error) => `
  <div class="message-container">
    <div class="error-info">
      <h1>500 - Internal Error</h1>
      <p>
        ${error.message}
      </p>
    </div>
  </div>`;
/**
* @function ErrorPage
* @description A React functional component that displays an error page with a message.
* @param {Props} props - The properties of the component, including the error object.
* @returns {React.FC<Props>} The rendered component.
*/
const ErrorPage = ({ error }) => {
	return /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: errorPageHtml(error) } });
};
/**
* @function handleJsError
* @description Handles JavaScript errors by displaying an error page in the specified target element.
* @param {Error} error - The error object containing the error message.
* @param {HTMLElement} target - The HTML element where the error page should be displayed.
*/
const handleJsError = (error, target) => {
	target.innerHTML = errorPageHtml(error);
};
//#endregion
//#region src/lib/components/ErrorBoundary.tsx
/**
* @class ErrorBoundary
* @description A React component that catches and displays errors within its children.
*/
var ErrorBoundary = class extends Component {
	state = { error: null };
	/**
	* @static getDerivedStateFromError(error)
	* @param {Error} error - The error caught by the component.
	* @returns {State} The new state with the caught error.
	*/
	static getDerivedStateFromError(error) {
		return { error };
	}
	/**
	* @public componentDidCatch(error, errorInfo)
	* @param {Error} error - The error caught by the component.
	* @param {ErrorInfo} errorInfo - Additional information about the error.
	*/
	componentDidCatch(error, errorInfo) {
		console.error("ErrorBoundary caught an error", error, errorInfo);
	}
	/**
	* @public render()
	* @returns {ReactNode} The rendered component or an error page if an error is caught.
	*/
	render() {
		if (this.state.error) return /* @__PURE__ */ jsx(ErrorPage, { error: this.state.error });
		return this.props.children;
	}
};
//#endregion
//#region src/lib/components/InputCommon.tsx
const FormLabel = sc.label`
  color: #263238;
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.4;
`;
const FormInput = sc.input`
  width: 100%;
  padding: 0.7rem 0.8rem;

  color: #263238;
  background-color: #fff;
  border: 1px solid #b8c2cc;
  border-radius: 0.35rem;

  font: inherit;
  line-height: 1.4;
  transition:
    border-color 150ms ease,
    box-shadow 150ms ease;

  &::placeholder {
    color: #8996a3;
  }

  &:hover {
    border-color: #81909d;
  }

  &:focus {
    outline: none;
    border-color: #3478c5;
    box-shadow: 0 0 0 3px rgb(52 120 197 / 16%);
  }

  &:disabled {
    cursor: not-allowed;
    color: #7b8790;
    background-color: #f2f4f5;
  }
`;
//#endregion
//#region src/lib/components/Input.tsx
const FormDiv = sc.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  width: 100%;
  max-width: 28rem;
`;
const FormWarning = sc.p`
  margin: 0.1rem 0 0;
  color: #a33a3a;
  font-size: 0.825rem;
  line-height: 1.4;
`;
/**
* Input component is a accessible input field that can show various states.
* It should be be used for any singualar input item a textfield, datefield for example.
* Multiple inputs like checkboxes or radio buttons should be use InputCheckboxGroup or InputRadioGroup respectivley.
*/
function Input({ id, label, name, type, warningMessage, ...inputProps }) {
	const warningId = `${id}-warning`;
	return /* @__PURE__ */ jsxs(FormDiv, { children: [
		/* @__PURE__ */ jsx(FormLabel, {
			htmlFor: id,
			children: label
		}),
		/* @__PURE__ */ jsx(FormInput, {
			...inputProps,
			id,
			name,
			type,
			"aria-describedby": warningMessage ? warningId : void 0
		}),
		warningMessage && /* @__PURE__ */ jsx(FormWarning, {
			id: warningId,
			role: "status",
			children: warningMessage
		})
	] });
}
//#endregion
//#region src/lib/components/InputCheckboxGroup.tsx
const CheckboxFieldset = sc.fieldset`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  margin: 0;
  padding: 1rem;

  border: 1px solid #b8c2cc;
  border-radius: 0.35rem;
`;
const CheckboxLegend = sc.legend`
  padding: 0 0.25rem;

  color: #263238;
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.4;
`;
const CheckboxDiv = sc.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;
/** Renders a Fieldset containing multiple checkboxes */
function InputCheckboxGroup({ legend, checkboxes, checkboxSelected }) {
	return /* @__PURE__ */ jsxs(CheckboxFieldset, { children: [/* @__PURE__ */ jsx(CheckboxLegend, { children: legend }), checkboxes.map((checkbox) => /* @__PURE__ */ jsxs(CheckboxDiv, { children: [/* @__PURE__ */ jsx(FormInput, {
		id: `checkbox-${checkbox.id}`,
		type: "checkbox",
		checked: checkbox.selected,
		onChange: () => checkboxSelected(checkbox.id, !checkbox.selected)
	}), /* @__PURE__ */ jsx(FormLabel, {
		htmlFor: `checkbox-${checkbox.id}`,
		children: checkbox.label
	})] }, checkbox.id))] });
}
//#endregion
//#region src/lib/components/InputRadioGroup.tsx
const RadioFieldset = sc.fieldset`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  margin: 0;
  padding: 1rem;

  border: 1px solid #b8c2cc;
  border-radius: 0.35rem;
`;
const RadioLegend = sc.legend`
  padding: 0 0.25rem;

  color: #263238;
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.4;
`;
const RadioDiv = sc.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;
/** Renders a Fieldset containing multiple radio buttons */
function InputRadioGroup({ legend, radios, radioSelected }) {
	return /* @__PURE__ */ jsxs(RadioFieldset, { children: [/* @__PURE__ */ jsx(RadioLegend, { children: legend }), /* @__PURE__ */ jsx(RadioDiv, { children: radios.map((radio) => {
		const inputId = `radio-${radio.id}`;
		return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(FormInput, {
			id: inputId,
			name: "radio-group",
			type: "radio",
			checked: radio.selected,
			onChange: () => radioSelected(radio.id)
		}), /* @__PURE__ */ jsx(FormLabel, {
			htmlFor: inputId,
			children: radio.label
		})] }, radio.id);
	}) })] });
}
//#endregion
//#region src/lib/components/MainNavigation.tsx
const BREAKPOINT = "768px";
const MainNavStyled = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: #ffffff;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: relative;
  width: 100%;
  box-sizing: border-box;
`;
const UlStyled = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  flex-direction: column;
  gap: 0.5rem;

  @media (min-width: 769px) {
    ${(props) => props.$main && `
      flex-direction: row;
      gap: 2rem;
    `}
  }

  ${(props) => !props.$main && `
    position: absolute;
    top: 100%;
    right: 0;
    background-color: #ffffff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    min-width: 150px;
    border-radius: 4px;
    display: none;
    z-index: 10;
  `}

  @media (max-width: ${BREAKPOINT}) {
    ${(props) => props.$main && `
      display: ${props.$isOpen ? "flex" : "none"};
      flex-direction: column;
      position: fixed;
      top: 60px;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ffffff;
      padding: 2rem;
      z-index: 99;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      overflow-y: auto;
      gap: 0.5rem;
    `}
  }
`;
const LiStyled = styled.li`
  position: relative;
  margin: 0;

  @media (min-width: 769px) {
    &:hover > ${UlStyled}, &:focus-within > ${UlStyled} {
      display: flex;
    }
  }

  @media (max-width: ${BREAKPOINT}) {
    width: 100%;

    > ${UlStyled} {
      position: static;
      display: flex;
      box-shadow: none;
      padding: 0.5rem 0 0 1rem;
      border-left: 2px solid #eeeeee;
    }
  }
`;
const LinkStyled = styled(NavLink)`
  text-decoration: none;
  color: #333333;
  font-weight: 500;
  font-size: 1rem;
  display: inline-block;
  position: relative;
  transition: color 0.2s ease-in-out;
  border-radius: 4px;
  padding: 0.25rem 0;

  &:hover {
    color: #0066cc;
  }

  &:focus-visible {
    outline: 2px solid #0066cc;
    outline-offset: 4px;
  }

  &.active {
    color: #0066cc;
    font-weight: 600;

    &::after {
      content: "";
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #0066cc;
      border-radius: 2px;
    }
  }

  @media (max-width: ${BREAKPOINT}) {
    font-size: 1.2rem;
    width: 100%;

    &.active::after {
      bottom: 0;
      left: -1rem;
      width: 3px;
      height: 100%;
    }
  }
`;
const HamburgerButton = styled.button`
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 100;
  border-radius: 4px;

  &:focus-visible {
    outline: 2px solid #0066cc;
    outline-offset: 4px;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: #333333;
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    &:first-child {
      transform: ${(props) => props.$isOpen ? "rotate(45deg)" : "rotate(0)"};
    }

    &:nth-child(2) {
      opacity: ${(props) => props.$isOpen ? "0" : "1"};
      transform: ${(props) => props.$isOpen ? "translateX(20px)" : "translateX(0)"};
    }

    &:nth-child(3) {
      transform: ${(props) => props.$isOpen ? "rotate(-45deg)" : "rotate(0)"};
    }
  }

  @media (max-width: ${BREAKPOINT}) {
    display: flex;
  }
`;
const RenderLinks = ({ links, main = false, isOpen = false, onLinkClick }) => /* @__PURE__ */ jsx(UlStyled, {
	$main: main,
	$isOpen: isOpen,
	id: main ? "main-nav-list" : void 0,
	children: links.map(({ to, name, sublinks }, index) => /* @__PURE__ */ jsxs(LiStyled, { children: [/* @__PURE__ */ jsx(LinkStyled, {
		to,
		end: to === "/",
		onClick: onLinkClick,
		children: name
	}), sublinks != null && /* @__PURE__ */ jsx(RenderLinks, {
		links: sublinks,
		onLinkClick
	})] }, `${to}-${index}`))
});
/**
* Main navigation for use on a website, which should be added ot a page header. Its been designed to be responsive and respect every platform. So it renders the menu options on a desktop and hamburger on a mobile device.
*/
function MainNavigation({ links }) {
	const [isOpen, setIsOpen] = useState(false);
	const toggleMenu = () => setIsOpen((prev) => !prev);
	const closeMenu = () => setIsOpen(false);
	return /* @__PURE__ */ jsxs(MainNavStyled, {
		"aria-label": "Main Navigation",
		children: [/* @__PURE__ */ jsxs(HamburgerButton, {
			$isOpen: isOpen,
			onClick: toggleMenu,
			"aria-label": isOpen ? "Close Menu" : "Open Menu",
			"aria-expanded": isOpen,
			"aria-controls": "main-nav-list",
			children: [
				/* @__PURE__ */ jsx("div", {}),
				/* @__PURE__ */ jsx("div", {}),
				/* @__PURE__ */ jsx("div", {})
			]
		}), /* @__PURE__ */ jsx(RenderLinks, {
			links,
			main: true,
			isOpen,
			onLinkClick: closeMenu
		})]
	});
}
//#endregion
//#region src/lib/styles/global/GlobalStyle.tsx
const GlobalStyle = createGlobalStyle`${":root {\n  --font-body: clamp(1rem, .95rem + .2vw, 1.125rem);\n  --font-h3: clamp(1.25rem, 1.1rem + .6vw, 1.75rem);\n  --font-h2: clamp(1.5rem, 1.3rem + 1vw, 2.25rem);\n  --font-h1: clamp(2rem, 1.6rem + 1.8vw, 3.5rem);\n  --line-height-body: 1.6;\n  --line-height-heading: 1.25;\n}\n\nbody {\n  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;\n  font-size: var(--font-body);\n  line-height: var(--line-height-body);\n  color: #1a1a1a;\n  -webkit-font-smoothing: antialiased;\n}\n\nh1 {\n  font-size: var(--font-h1);\n  line-height: var(--line-height-heading);\n  font-weight: 800;\n}\n\nh2 {\n  font-size: var(--font-h2);\n  line-height: var(--line-height-heading);\n  font-weight: 700;\n}\n\nh3 {\n  font-size: var(--font-h3);\n  line-height: var(--line-height-heading);\n  font-weight: 600;\n}\n\n.container {\n  background-color: var(--container-bg);\n  justify-content: center;\n  align-items: flex-start;\n  width: 100%;\n  height: 100%;\n  display: flex;\n}\n\n.page {\n  width: 1200px;\n}\n\n@media (width <= 1200px) {\n  .page {\n    width: 100%;\n  }\n}\n\n.error-info {\n  border: 2px solid #000;\n  padding: 15px;\n}\n\n.btn {\n  text-align: center;\n  vertical-align: middle;\n  color: #fff;\n  cursor: pointer;\n  user-select: none;\n  box-sizing: border-box;\n  background-color: #06c;\n  border: none;\n  border-radius: 8px;\n  justify-content: center;\n  align-items: center;\n  width: auto;\n  min-height: 48px;\n  padding: 0 24px;\n  font-family: inherit;\n  font-size: 16px;\n  font-weight: 600;\n  text-decoration: none;\n  transition: background-color .2s, transform .1s;\n  display: inline-flex;\n}\n\n.btn:hover {\n  background-color: #0052a3;\n}\n\n.btn:active {\n  transform: scale(.98);\n}\n\n.button-bar {\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  gap: 12px;\n  width: 100%;\n  display: flex;\n}\n\n.button-bar.start {\n  justify-content: flex-start;\n}\n\n.button-bar.center {\n  justify-content: center;\n}\n\n@media (width <= 600px) {\n  .button-bar {\n    flex-direction: column;\n  }\n\n  .btn {\n    width: 100%;\n    display: flex;\n  }\n}\n"}`;
//#endregion
export { ErrorBoundary, ErrorPage, GlobalStyle, Input, InputCheckboxGroup, InputRadioGroup, RouterLinkButton as LinkRouterButton, Loading, MainNavigation, Toast, ToastProvider, handleJsError, useToast };

//# sourceMappingURL=index.mjs.map