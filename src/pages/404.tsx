import { useRouteError } from "react-router-dom";

interface MyError {
  statusText?: string;
  message?: string;
  // Add other fields as necessary
}

export default function NotFound() {
const error = useRouteError() as MyError;


  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}