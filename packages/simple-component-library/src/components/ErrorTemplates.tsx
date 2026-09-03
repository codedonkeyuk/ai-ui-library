/**
 * @module ErrorTemplates
 * @description Contains components and functions related to displaying error pages.
 */

import React from "react";

/**
 * Generates HTML content for an error page based on the provided error message.
 * @param {Error} error - The error object containing the error message.
 * @returns {string} The HTML content of the error page.
 */
const errorPageHtml = (error: Error) => `
  <div class="message-container">
    <div class="error-info">
      <h1>500 - Internal Error</h1>
      <p>
        ${error.message}
      </p>
    </div>
  </div>`;

/**
 * @interface Props
 * @description Properties for the ErrorPage component.
 */
interface Props {
  error: Error;
}

/**
 * @function ErrorPage
 * @description A React functional component that displays an error page with a message.
 * @param {Props} props - The properties of the component, including the error object.
 * @returns {React.FC<Props>} The rendered component.
 */
export const ErrorPage: React.FC<Props> = ({ error }: Props) => {
  return <div dangerouslySetInnerHTML={{ __html: errorPageHtml(error) }} />;
};

/**
 * @function handleJsError
 * @description Handles JavaScript errors by displaying an error page in the specified target element.
 * @param {Error} error - The error object containing the error message.
 * @param {HTMLElement} target - The HTML element where the error page should be displayed.
 */
export const handleJsError = (error: Error, target: HTMLElement): void => {
  target.innerHTML = errorPageHtml(error);
};
