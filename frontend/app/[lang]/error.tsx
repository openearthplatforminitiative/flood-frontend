'use client'; // Error components must be Client Components

import { useEffect } from 'react';

const Error = ({ error }: { error: Error & { digest?: string } }) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
    </div>
  );
};

export default Error;
