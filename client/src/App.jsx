import FrontPage from './components/FrontPage';
import { Routes, Route } from 'react-router';
import Guest from './components/Guest';
import Login from './components/Login';
function App() {

    return (
        <>
        <Routes>
            <Route path='/react-regular-exam' element={<FrontPage />} />
            <Route path='/react-regular-exam/guest' element={<Guest />} />
            <Route path='/react-regular-exam/login' element={<Login />}></Route>
        </Routes>
            
        </>
        
    )
}

export default App
