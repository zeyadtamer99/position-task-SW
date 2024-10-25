import { useEffect } from "react";
import { useRouteError } from "react-router-dom";

interface ErrorPageProps {
  onMount: () => void;
  onUnmount: () => void;
}

export default function ErrorPage({ onMount, onUnmount }: ErrorPageProps) {
  const error = useRouteError();
  console.error(error);

  useEffect(() => {
    onMount();
    return () => onUnmount();
  }, [onMount, onUnmount]);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        {/* @ts-ignore */}
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
