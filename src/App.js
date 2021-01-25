import logo from './logo.svg';
import './App.css';
import HomePage from './pages/HomePage';
import { ChakraProvider } from "@chakra-ui/react"

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <HomePage />
      </ChakraProvider>
    </div>
  );
}

export default App;
