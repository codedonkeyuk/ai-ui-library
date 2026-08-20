import type { JSX } from "react/jsx-runtime";

export default function Loading(): JSX.Element {
  return (
    <div className="spinner-container">
      <div className="loading-spinner" role="status" aria-label="Loading"></div>
    </div>
  );
}
