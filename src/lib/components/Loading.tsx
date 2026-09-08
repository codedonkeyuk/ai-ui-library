import type { JSX } from "react/jsx-runtime";

/**
 * Accessible loading spinner for use when components are loading. Pulls css from Loading.css.
 *
 * Loading.css is a separate CSS file as it needed pfor when the app is loading.
 * */
export default function Loading(): JSX.Element {
  return (
    <div className="message-container">
      <div className="loading-spinner" role="status" aria-label="Loading"></div>
    </div>
  );
}
