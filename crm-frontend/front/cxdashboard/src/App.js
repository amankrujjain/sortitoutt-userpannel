
import './App.css';
import {Route, Routes} from 'react-router-dom'
import UserPannel from './Components/UserPannel'
import EditProfile from './Components/EditProfile';
import CreateOrders from './Components/CreateOrders';
import NavBar from './Components/NavBar';


function App() {
  return (
  <>
  <NavBar/>
  <Routes>
    <Route path='/' element={<UserPannel/>} />
    <Route path='/edit-profile' element={<EditProfile/>} />
    <Route path='/create-order' element={<CreateOrders/>}/>
  </Routes>
  </>
  );
}

export default App;
