import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import router from "@/routes";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <Toaster />
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <div className="App">
            <RouterProvider router={router} />
          </div>
        </QueryClientProvider>
      </HelmetProvider>
    </>
  );
}

export default App;
