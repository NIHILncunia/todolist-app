import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { CookiesProvider } from 'react-cookie';
import { HomePage, SignInPage, SignUpPage } from './pages';

import '@/styles/tailwind.css';

const queryClient = new QueryClient();

const QueryApp = (
  <QueryClientProvider client={queryClient}>
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signin' element={<SignInPage />} />
          <Route path='/signup' element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
    <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
  </QueryClientProvider>
);

const root = createRoot(document.querySelector('#root'));
root.render(QueryApp);
