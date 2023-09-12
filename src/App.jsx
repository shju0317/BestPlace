import RootLayout from "./layout/RootLayout";
import Feed from "./pages/Feed";
import ReviewWrite from "./pages/ReviewWrite";

function App() {
  return (
    <div className="App">
      <RootLayout>
        <ReviewWrite/>
      </RootLayout>
    </div>
  );
}

export default App;
