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
          <RootLayout>
            <Feed />
          </RootLayout>
        </div>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
