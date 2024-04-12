'use client';

import { Button } from '@chakra-ui/react';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }; // error prop is an instance of JS native Error object
  reset: () => void; // function to reset the error boundary. when executed the function will try to re-render the route segment
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className='flex h-full flex-col items-center justify-center'>
      <h2 className='text-center'>Something went wrong!</h2>
      <Button
        className='mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400'
        onClick={() => reset()}
      >
        Try again
      </Button>
    </main>
  );
}
