import React from 'react';
import { useMutation } from '@tanstack/react-query';
import UrlForm from '../components/UrlForm';
import UrlResult from '../components/UrlResult';
import { shortenUrl } from '../api/urlApi';

const HomePage = () => {
  const mutation = useMutation({
    mutationFn: shortenUrl,
  });

  return (
    <main className="flex flex-col gap-10">
      <UrlForm 
        onSubmit={({ url, customName }) => mutation.mutateAsync({ originalUrl: url, customAlias: customName })}
        isLoading={mutation.isPending} 
      />
      
      {mutation.isSuccess && mutation.data && (
        <UrlResult url={mutation.data} />
      )}
    </main>
  );
};

export default HomePage;
