import { Toaster } from "react-hot-toast";
import { RouterProvider } from 'react-router-dom';
import router from '@/routes';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import RootLayout from "./layout/RootLayout";
import Feed from "./pages/Feed";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Toaster/>
          <RouterProvider router={router} />
        </div>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
