
import './App.css';
import {Route, Routes} from 'react-router-dom'
import UserPannel from './Components/UserPannel'
import EditProfile from './Components/EditProfile';


function App() {
  return (
  <>
  <Routes>
    <Route path='/user-pannel' element={<UserPannel/>} />
    <Route path='/edit-profile' element={<EditProfile/>} />

  </Routes>
  </>
  );
}

export default App;
