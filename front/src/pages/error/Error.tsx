import React from "react";
import { useRouteError } from "react-router-dom";
import NotPage from "../../assets/no-results.png"
import NotFoundPage from "../../assets/NotFound.png"

interface RouterError {
  status: number;
  message: string;
}

interface ErrorPageProps {
  error?: RouterError;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ error }) => {
  const routeError = useRouteError() as RouterError;
  const displayError = error || routeError;

  let title = 'An error occurred!';
  let message = 'Something went wrong!';

  if (displayError && displayError.status === 500) {
    message = displayError.message;
  }

  if (displayError && displayError.status === 404) {
    title = 'Not found!';
    message = 'Could not find resource or page.';
  }

  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: '#f8f9fa'  // 배경색 추가 (선택사항)
      }}>
        <div style={{
          textAlign: 'center',
          padding: '20px',
          borderRadius: '8px',
     
       
        }}>
          
          {error?.status === 404 && <img src={NotPage}></img>}
          <div style={{display:"flex", justifyContent:"center"}}>{error?.status === 400 && <img src={NotFoundPage} width={300}></img>}</div>
          <h2 className="mt-4">{error?.message}</h2>
        </div>
      </div>
  );
};

export default ErrorPage;