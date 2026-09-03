import React from "react";

const errorPageHtml = (error: Error) => `
  <div class="message-container">
    <div class="error-info">
      <h1>500 - Internal Error</h1>
      <p>
        ${error.message}
      </p>
    </div>
  </div>`;

interface Props {
  error: Error;
}

export const ErrorPage: React.FC<Props> = ({ error }: Props) => {
  return <div dangerouslySetInnerHTML={{ __html: errorPageHtml(error) }} />;
};

export const handleJsError = (error: Error, target: HTMLElement): void => {
  target.innerHTML = errorPageHtml(error);
};
