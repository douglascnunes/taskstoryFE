import { RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/queryClient';


import router from './pages/router.jsx'


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} className="body" />
    </QueryClientProvider>
  );
};

export default App
