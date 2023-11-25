import logo from './logo.svg';
import './App.css';
import Register from './components/Register';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import UploadFile from './components/UploadFile';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/upload' element={<UploadFile/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
