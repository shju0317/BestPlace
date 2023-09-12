import { Toaster } from "react-hot-toast";
import RootLayout from "./layout/RootLayout";
import Feed from "./pages/Feed";
import ReviewWrite from "./pages/ReviewWrite";

function App() {
  return (
    <div className="App">
      <RootLayout>
        <ReviewWrite/>
        <Toaster/>
      </RootLayout>
    </div>
  );
}

export default App;
