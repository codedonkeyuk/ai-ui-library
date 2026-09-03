import type { JSX } from "react/jsx-runtime";

/** Renders a accessible loading div. Necessary for dynamic import react suspend logic*/
export default function Loading(): JSX.Element {
  return (
    <div className="spinner-container">
      <div className="loading-spinner" role="status" aria-label="Loading"></div>
    </div>
  );
}
