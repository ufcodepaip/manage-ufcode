import './App.css';
import Navbar from './common/navbar'
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes/Routes';
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes />
    </BrowserRouter>
  )
}

export default App;
