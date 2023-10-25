'use client';

import { errorAPI } from '@/services/news-service';
import { IconButton, Tooltip, useToast } from '@chakra-ui/react';
import { useTransition } from 'react';
import { IoMdWarning } from 'react-icons/io';

export default function ErrorAPIButton() {
  const toast = useToast();
  const [isPending, startTransition] = useTransition();

  const handleOnClickErrorAPIButton = () => {
    startTransition(() => {
      errorAPI().catch(() => {
        toast({
          title:
            'Your API key is invalid or incorrect. Check your key, or go to https://newsapi.org to create a free API key.',
          status: 'error',
          isClosable: true,
        });
      });
    });
  };

  return (
    <Tooltip label='Error API' cursor='pointer'>
      <IconButton
        className='text-primary hover:text-white transition-all'
        isLoading={isPending}
        icon={<IoMdWarning />}
        aria-label='warning-icon'
        onClick={handleOnClickErrorAPIButton}
      />
    </Tooltip>
  );
}
