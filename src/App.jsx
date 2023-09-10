import RootLayout from "./layout/RootLayout";
import Feed from "./pages/Feed";
import Review from "./pages/Review";

function App() {
  return (
    <div className="App">
      <RootLayout>
        <Review/>
      </RootLayout>
    </div>
  );
}

export default App;
