import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Component, createContext, useCallback, useContext, useEffect, useId, useState } from "react";
import styled, { createGlobalStyle, styled as styled$1 } from "styled-components";
import { Link, NavLink } from "react-router";
//#region src/lib/components/Loading.tsx
/**
* Accessible loading spinner for use when components are loading. Pulls css from Loading.css.
*
* Loading.css is a separate CSS file as it needed pfor when the app is loading.
* */
function Loading() {
	return /* @__PURE__ */ jsx("div", {
		className: "message-container",
		children: /* @__PURE__ */ jsx("div", {
			className: "loading-spinner",
			role: "status",
			"aria-label": "Loading"
		})
	});
}
//#endregion
//#region src/lib/components/Toast.tsx
const CloseButton = styled.button`
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
const StyledToast = styled.div`
  padding: 16px 24px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0.05);
  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 300px;

  background-color: ${(props) => {
	switch (props.variant) {
		case "success": return "var(--toast-bg-success-color)";
		case "warning": return "var(--toast-bg-warning-color)";
		case "error": return "var(--toast-bg-error-color)";
		default: return "var(--toast-bg-info-color)";
	}
}};

  color: ${(props) => props.variant === "warning" ? "var(--toast-fg-dark-color)" : "var(--toast-fg-light-color)"};

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
const ToastFlex = styled.div`
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
const FormLabel = styled.label`
  color: var(--main-fg-color);
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.4;
`;
const FormInput = styled.input`
  width: 100%;
  padding: 0.7rem 0.8rem;

  color: var(--field-fg-color);
  background-color: var(--field-bg-color);
  border: 1px solid var(--main-bdr-color);
  border-radius: 0.35rem;

  font: inherit;
  line-height: 1.4;
  transition:
    border-color 150ms ease,
    box-shadow 150ms ease;

  &::placeholder {
    color: var(--field-placeholder-color);
  }

  &:hover {
    border-color: var(--prim-btn-bg-color);
  }

  &:focus {
    outline: none;
    border-color: var(--prim-btn-bg-color);
    box-shadow: 0 0 0 3px rgb(52 120 197 / 16%);
  }

  &:disabled {
    cursor: not-allowed;
    color: var(--field-dis-fg-color);
    background-color: var(--field-dis-bg-color);
  }
`;
//#endregion
//#region src/lib/components/Input.tsx
const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  flex: 1 1 200px;
  min-width: 0;
  width: 100%;

  input,
  select,
  textarea {
    width: 100%;
    box-sizing: border-box;
  }
`;
const FormWarning = styled.p`
  margin: 0.1rem 0 0;
  color: var(--field-warning-color);
  font-size: 0.825rem;
  line-height: 1.4;
`;
const FormDescription = styled.p`
  margin: 0.1rem 0 0;
  color: var(--field-desc-color);
  font-size: 0.825rem;
  line-height: 1.4;
`;
function Input({ id, label, name, type, description, warningMessage, required, ...inputProps }) {
	const descriptionId = useId();
	const warningId = useId();
	const describedBy = [description ? descriptionId : null, warningMessage ? warningId : null].filter(Boolean).join(" ");
	return /* @__PURE__ */ jsxs(FormDiv, { children: [
		/* @__PURE__ */ jsxs(FormLabel, {
			htmlFor: id,
			children: [label, required && " *"]
		}),
		/* @__PURE__ */ jsx(FormInput, {
			...inputProps,
			id,
			name,
			type,
			required,
			"aria-required": required,
			"aria-describedby": describedBy
		}),
		description && /* @__PURE__ */ jsx(FormDescription, {
			id: descriptionId,
			children: description
		}),
		warningMessage && /* @__PURE__ */ jsx(FormWarning, {
			id: warningId,
			role: "alert",
			children: warningMessage
		})
	] });
}
//#endregion
//#region src/lib/components/InputCheckboxGroup.tsx
const CheckboxFieldset = styled$1.fieldset`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin: 0;
  padding: 1.5rem;
  border: 1px solid var(--main-bdr-color);
  border-radius: 0.5rem;
  width: auto;
  max-width: 100%;
`;
const CheckboxLegend = styled$1.legend`
  padding: 0 0.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;
const CheckboxDiv = styled$1.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  width: 100%;
`;
const CheckboxInput = styled$1(FormInput)`
  width: auto;
  padding: 0;
  margin: 0;
  cursor: pointer;
  accent-color: var(--prim-btn-bg-color);
`;
const CheckboxLabel = styled$1(FormLabel)`
  flex-grow: 1;
  text-align: left;
  cursor: pointer;
`;
/** Renders a groupd of checkboxes */
function InputCheckboxGroup({ legend, checkboxes, checkboxSelected }) {
	return /* @__PURE__ */ jsxs(CheckboxFieldset, { children: [/* @__PURE__ */ jsx(CheckboxLegend, { children: legend }), checkboxes.map((checkbox) => /* @__PURE__ */ jsxs(CheckboxDiv, { children: [/* @__PURE__ */ jsx(CheckboxLabel, {
		htmlFor: `checkbox-${checkbox.id}`,
		children: checkbox.label
	}), /* @__PURE__ */ jsx(CheckboxInput, {
		id: `checkbox-${checkbox.id}`,
		type: "checkbox",
		checked: checkbox.selected,
		onChange: () => checkboxSelected(checkbox.id, !checkbox.selected)
	})] }, checkbox.id))] });
}
//#endregion
//#region src/lib/components/InputRadioGroup.tsx
const RadioFieldset = styled$1.fieldset`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  margin: 0;
  padding: 1.5rem;

  border: 1px solid var(--main-bdr-color);
  border-radius: 0.5rem;
  width: auto;
  max-width: 100%;
`;
const RadioLegend = styled$1.legend`
  padding: 0 0.5rem;
  color: #263238;
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.4;
`;
const RadioDiv = styled$1.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;
const RadioRow = styled$1.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  width: 100%;
`;
const StyledFormLabel = styled$1(FormLabel)`
  flex-grow: 1;
  text-align: left;
  cursor: pointer;
`;
const RadioInput = styled$1(FormInput)`
  width: auto;
  padding: 0;
  margin: 0;
  cursor: pointer;

  accent-color: var(--prim-btn-bg-color);
`;
/** Renders a Fieldset containing multiple radio buttons */
function InputRadioGroup({ legend, radios, radioSelected }) {
	return /* @__PURE__ */ jsxs(RadioFieldset, { children: [/* @__PURE__ */ jsx(RadioLegend, { children: legend }), /* @__PURE__ */ jsx(RadioDiv, { children: radios.map((radio) => {
		const inputId = `radio-${radio.id}`;
		return /* @__PURE__ */ jsxs(RadioRow, { children: [/* @__PURE__ */ jsx(StyledFormLabel, {
			htmlFor: inputId,
			children: radio.label
		}), /* @__PURE__ */ jsx(RadioInput, {
			id: inputId,
			name: "radio-group",
			type: "radio",
			checked: radio.selected,
			onChange: () => radioSelected(radio.id)
		})] }, radio.id);
	}) })] });
}
//#endregion
//#region src/lib/components/MainNavigation.tsx
const BREAKPOINT = "768px";
const MainNavStyled = styled$1.nav`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: var(--main-nav-bg-color);
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: relative;
  width: 100%;
  box-sizing: border-box;
`;
const UlStyled = styled$1.ul`
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
    background-color: var(--main-nav-bg-color);
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
      background-color: var(--main-nav-bg-color);
      padding: 2rem;
      z-index: 99;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      overflow-y: auto;
      gap: 0.5rem;
    `}
  }
`;
const LiStyled = styled$1.li`
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
const LinkStyled = styled$1(NavLink)`
  text-decoration: none;
  color: var(--main-fg-color);
  font-weight: 500;
  font-size: 1rem;
  display: inline-block;
  position: relative;
  transition: color 0.2s ease-in-out;
  border-radius: 4px;
  padding: 0.25rem 0;

  &:hover {
    color: var(--prim-btn-hvr-color);
  }

  &:focus-visible {
    outline: 2px solid #0066cc;
    outline-offset: 4px;
  }

  &.active {
    color: var(--prim-btn-hvr-color);
    font-weight: 600;

    &::after {
      content: "";
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: var(--prim-btn-hvr-color);
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
const HamburgerButton = styled$1.button`
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
    outline: 2px solid var(--prim-btn-hvr-color);
    outline-offset: 4px;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: var(--main-fg-color);
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
//#region src/lib/components/Table.tsx
const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  margin: 16px 0;
  border: 1px solid var(--main-bdr-color);
  border-radius: 8px;

  &:focus-visible {
    outline: 2px solid var(--prim-btn-bg-color);
    outline-offset: 2px;
  }
`;
const ScreenReaderNotice = styled.span`
  border: 0;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;
`;
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: sans-serif;
  font-size: 14px;
  text-align: left;
`;
const StyledTableHead = styled.thead`
  background-color: var(--alt1-bg-color);
  border-bottom: 2px solid var(--main-bdr-color);
`;
const StyledTableBody = styled.tbody`
  & > tr:not(:last-child) {
    border-bottom: 1px solid var(--main-bdr-color);
  }
  & > tr:nth-child(even) {
    background-color: var(--alt2-bg-color);
  }
`;
const StyledTableFooter = styled.tfoot`
  background-color: var(--alt1-bg-color);
  border-top: 2px solid var(--main-bdr-color);
  font-weight: bold;
`;
const StyledTR = styled.tr`
  transition: background-color 0.2s ease;
  &:hover {
    background-color: var(--main-hover-color);
  }
`;
const StyledTH = styled.th`
  padding: 12px 16px;
  font-weight: 600;
  background-color: inherit;
`;
const StyledTD = styled.td`
  padding: 12px 16px;
`;
function CellWrapper({ cell, scope }) {
	if (cell.type === "header") return /* @__PURE__ */ jsx(StyledTH, {
		colSpan: cell.colspan,
		rowSpan: cell.rowspan,
		scope,
		children: cell.data
	});
	return /* @__PURE__ */ jsx(StyledTD, {
		colSpan: cell.colspan,
		rowSpan: cell.rowspan,
		children: cell.data
	});
}
function Table({ data, thead = [], tfoot = [], id }) {
	const instructionId = `table-scroll-instruction-${id}`;
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(ScreenReaderNotice, {
		id: instructionId,
		children: "This table features horizontal overflow. Use the left and right arrow keys to scroll across additional data columns."
	}), /* @__PURE__ */ jsx(TableContainer, {
		tabIndex: 0,
		role: "region",
		"aria-label": "Data Table Scroll Container",
		"aria-describedby": instructionId,
		children: /* @__PURE__ */ jsxs(StyledTable, { children: [
			thead.length > 0 && /* @__PURE__ */ jsx(StyledTableHead, { children: thead.map((row, rowIndex) => /* @__PURE__ */ jsx(StyledTR, { children: row.map((cell, colIndex) => /* @__PURE__ */ jsx(StyledTH, {
				colSpan: cell.colspan,
				rowSpan: cell.rowspan,
				scope: "col",
				children: cell.data
			}, `thead-${rowIndex}-${colIndex}`)) }, `thead-${rowIndex}`)) }),
			/* @__PURE__ */ jsx(StyledTableBody, { children: data.map((row, rowIndex) => /* @__PURE__ */ jsx(StyledTR, { children: row.map((cell, colIndex) => /* @__PURE__ */ jsx(CellWrapper, {
				cell,
				scope: cell.type === "header" ? "row" : void 0
			}, `tbody-${rowIndex}-${colIndex}`)) }, `tbody-${rowIndex}`)) }),
			tfoot.length > 0 && /* @__PURE__ */ jsx(StyledTableFooter, { children: tfoot.map((row, rowIndex) => /* @__PURE__ */ jsx(StyledTR, { children: row.map((cell, colIndex) => /* @__PURE__ */ jsx(CellWrapper, {
				cell,
				scope: cell.type === "header" ? "row" : void 0
			}, `tfoot-${rowIndex}-${colIndex}`)) }, `tfoot-${rowIndex}`)) })
		] })
	})] });
}
//#endregion
//#region src/lib/components/Button.tsx
const StyledButton = styled.button`
  background-color: ${(props) => props.$primary ? "var(--prim-btn-bg-color)" : "var(--sec-btn-bg-color)"};
  color: ${(props) => props.$primary ? "var(--prim-btn-fg-color)" : "var(--sec-btn-fg-color)"};
  border: 1px solid
    ${(props) => props.$primary ? "var(--prim-btn-bdr-color)" : "var(--sec-btn-bdr-color)"};
  padding: ${(props) => {
	switch (props.$size) {
		case "small": return "5px 10px";
		case "large": return "15px 30px";
		default: return "10px 20px";
	}
}};
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: ${(props) => {
	switch (props.$size) {
		case "small": return "14px";
		case "large": return "18px";
		default: return "16px";
	}
}};
  margin: 4px 2px;
  cursor: ${(props) => props.$disabled ? "not-allowed" : "pointer"};
  border-radius: 5px;
  opacity: ${(props) => props.$disabled ? "0.6" : "1"};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.$primary ? "var(--prim-btn-hvr-color)" : "var(--sec-btn-hvr-color)"};
  }
`;
function Button({ children, primary = false, disabled = false, size = "medium", type = "button", ariaLabel, ...props }) {
	return /* @__PURE__ */ jsx(StyledButton, {
		type,
		$primary: primary,
		$disabled: disabled,
		$size: size,
		disabled,
		"aria-label": ariaLabel,
		"aria-disabled": disabled ? "true" : "false",
		...props,
		children
	});
}
function ButtonLink({ href, children, primary = false, size = "medium", ariaLabel, ariaCurrent, ...props }) {
	return /* @__PURE__ */ jsx(StyledButton, {
		as: "a",
		href,
		$primary: primary,
		$size: size,
		"aria-label": ariaLabel,
		"aria-current": ariaCurrent,
		...props,
		children
	});
}
function ButtonRouterLink({ to, children, primary = false, size = "medium", ariaLabel, ariaCurrent, ...props }) {
	return /* @__PURE__ */ jsx(StyledButton, {
		as: Link,
		to,
		$primary: primary,
		$size: size,
		"aria-label": ariaLabel,
		"aria-current": ariaCurrent,
		...props,
		children
	});
}
//#endregion
//#region src/lib/components/Tabs.tsx
const TabBar = styled.div.attrs({ role: "tablist" })`
  display: inline-flex;
  gap: 4px;
  background-color: var(--card-bg-color);
  justify-content: flex-start;
  align-items: flex-end;
  position: relative;

  border-bottom: 1px solid var(--main-bdr-color);

  margin-bottom: -1px;
`;
const Tab = styled.button`
  padding: 10px 20px;
  border: none;
  background: var(--sec-btn-bg-color);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 6px 6px 0 0;
  color: var(--sec-btn-fg-color);
  position: relative;
  background-color: ${(props) => props.$isActive ? "var(--card-bg-color)" : "var(--sec-btn-bg-color)"};
  border-bottom: 1px solid var(--main-bdr-color);
  &::after {
    content: "";
    position: absolute;
    bottom: -1px; /* This covers the 1px border of the container */
    left: 0;
    right: 0;
    height: 1px;
    background-color: inherit; /* Matches the tab's background */
  }

  &:focus {
    outline: none;
  }

  &:hover {
    color: var(--prim-btn-fg-color);
    background-color: var(--prim-btn-hvr-color);
    border-bottom: 1px solid transparent;
  }

  ${(props) => props.$isActive && `
      color: var(--prim-btn-fg-color);
      background-color: var(--prim-btn-hvr-color);
      border-bottom: 1px solid transparent;
      /* If the active tab has a different color, 
         ensure the pseudo-element matches it */
      &::after {
        background-color: var(--prim-btn-hvr-color);
      }
    `}
`;
const TabContent = styled.div`
  padding: 40px 20px;
  animation: fadeIn 0.4s ease-out;
  border: 1px solid var(--main-bdr-color);
  border-top: none;
  background-color: var(--card-bg-color);
`;
const getSafeId = (route) => {
	return route.replace(/^\/|\/$/g, "").replace(/\//g, "-") || "home";
};
function Tabs({ tabs, activeTabId, onTabChange, children }) {
	const panelId = getSafeId(activeTabId);
	return /* @__PURE__ */ jsxs("div", {
		role: "region",
		"aria-label": "Content Section",
		children: [/* @__PURE__ */ jsx(TabBar, { children: tabs.map((tab) => {
			const safeId = getSafeId(tab.id);
			return /* @__PURE__ */ jsx(Tab, {
				onClick: () => onTabChange(tab.id),
				$isActive: tab.id === activeTabId,
				role: "tab",
				"aria-selected": tab.id === activeTabId,
				"aria-controls": `panel-${panelId}`,
				id: `tab-${safeId}`,
				tabIndex: tab.id === activeTabId ? 0 : -1,
				children: tab.label
			}, safeId);
		}) }), /* @__PURE__ */ jsx(TabContent, {
			id: `panel-${panelId}`,
			role: "tabpanel",
			"aria-labelledby": `tab-${panelId}`,
			"aria-live": "polite",
			children
		})]
	});
}
//#endregion
//#region src/lib/styles/global/GlobalStyle.tsx
const GlobalStyle = createGlobalStyle`${":root {\n  --main-bg-color: #121212;\n  --main-fg-color: #fff;\n  --main-bdr-color: #2d2d2d;\n  --main-hover-color: #2a2a2a;\n  --card-bg-color: #1e1e1e;\n  --card-fg-color: #f4f4f5;\n  --dialog-bg-color: #252525;\n  --dialog-fg-color: #fff;\n  --alt1-bg-color: #1a1a1a;\n  --alt2-bg-color: #222;\n  --prim-btn-bg-color: #007bff;\n  --prim-btn-fg-color: #fff;\n  --prim-btn-hvr-color: #0056b3;\n  --prim-btn-bdr-color: transparent;\n  --sec-btn-bg-color: #ccc;\n  --sec-btn-fg-color: #000;\n  --sec-btn-hvr-color: #999;\n  --sec-btn-bdr-color: transparent;\n  --dis-btn-bg-color: transparent;\n  --dis-btn-fg-color: transparent;\n  --field-bg-color: #fff;\n  --field-fg-color: #000;\n  --field-warning-color: #a33a3a;\n  --field-desc-color: #666;\n  --field-placeholder-color: #8996a3;\n  --field-dis-bg-color: #f2f4f5;\n  --field-dis-fg-color: #7b8790;\n  --main-nav-bg-color: #fff;\n  --toast-bg-success-color: #28a745;\n  --toast-bg-warning-color: #ffc107;\n  --toast-bg-error-color: #dc3545;\n  --toast-bg-info-color: #007bff;\n  --toast-fg-light-color: #fff;\n  --toast-fg-dark-color: #000;\n  --font-body: clamp(1rem, .95rem + .2vw, 1.125rem);\n  --font-h3: clamp(1.25rem, 1.1rem + .6vw, 1.75rem);\n  --font-h2: clamp(1.5rem, 1.3rem + 1vw, 2.25rem);\n  --font-h1: clamp(2rem, 1.6rem + 1.8vw, 3.5rem);\n  --line-height-body: 1.6;\n  --line-height-heading: 1.25;\n}\n\n@media (prefers-color-scheme: dark) {\n  :root {\n    --main-bg-color: #000;\n    --main-fg-color: #fff;\n    --main-bdr-color: #fff;\n    --main-hover-color: #2a2a2a;\n    --card-bg-color: #000;\n    --card-fg-color: #fff;\n    --dialog-bg-color: #000;\n    --dialog-fg-color: #fff;\n    --alt1-bg-color: #1e1e1e;\n    --alt2-bg-color: #252525;\n    --prim-btn-bg-color: #3b82f6;\n    --prim-btn-fg-color: #fff;\n    --prim-btn-hvr-color: #2563eb;\n    --prim-btn-bdr-color: transparent;\n    --sec-btn-bg-color: #27272a;\n    --sec-btn-fg-color: #f4f4f5;\n    --sec-btn-hvr-color: #3f3f46;\n    --sec-btn-bdr-color: #fff;\n    --dis-btn-bg-color: #ffffff0d;\n    --dis-btn-fg-color: #ffffff61;\n    --dis-btn-hvr-color: #ffffff0d;\n    --dis-btn-bdr-color: transparent;\n    --field-bg-color: #1a1a1a;\n    --field-fg-color: #fff;\n    --field-warning-color: #ef4444;\n    --field-desc-color: #a1a1aa;\n    --field-placeholder-color: #71717a;\n    --field-dis-bg-color: #121212;\n    --field-dis-fg-color: #52525b;\n    --main-nav-bg-color: #000;\n    --toast-bg-success-color: #1e4620;\n    --toast-bg-warning-color: #855d00;\n    --toast-bg-error-color: #661a21;\n    --toast-bg-info-color: #0c3a66;\n    --toast-fg-light-color: #fff;\n    --toast-fg-dark-color: #fff;\n  }\n}\n\nbody {\n  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;\n  font-size: var(--font-body);\n  line-height: var(--line-height-body);\n  color: var(--main-fg-color);\n  -webkit-font-smoothing: antialiased;\n}\n\nh1 {\n  font-size: var(--font-h1);\n  line-height: var(--line-height-heading);\n  font-weight: 800;\n}\n\nh2 {\n  font-size: var(--font-h2);\n  line-height: var(--line-height-heading);\n  font-weight: 700;\n}\n\nh3 {\n  font-size: var(--font-h3);\n  line-height: var(--line-height-heading);\n  font-weight: 600;\n}\n\n.container {\n  background-color: var(--container-bg);\n  justify-content: center;\n  align-items: flex-start;\n  width: 100%;\n  height: 100%;\n  display: flex;\n}\n\n.page {\n  width: 1200px;\n}\n\n@media (width <= 1200px) {\n  .page {\n    width: 100%;\n  }\n}\n\n.error-info {\n  border: 2px solid var(--main-bdr-color);\n  background-color: var(--dialog-bg-color);\n  color: var(--dialog-fg-color);\n  padding: 15px;\n}\n\n.button-bar {\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  gap: 12px;\n  width: 100%;\n  display: flex;\n}\n\n.button-bar.start {\n  justify-content: flex-start;\n}\n\n.button-bar.center {\n  justify-content: center;\n}\n\n@media (width <= 600px) {\n  .button-bar {\n    flex-direction: column;\n  }\n\n  .btn {\n    width: 100%;\n    display: flex;\n  }\n}\n"}`;
//#endregion
export { Button, ButtonLink, ButtonRouterLink, ErrorBoundary, ErrorPage, GlobalStyle, Input, InputCheckboxGroup, InputRadioGroup, Loading, MainNavigation, Table, Tabs, Toast, ToastProvider, handleJsError, useToast };

//# sourceMappingURL=index.mjs.map