import FrontPage from './components/FrontPage';
import { Routes, Route } from 'react-router';
import Guest from './components/Guest';

function App() {

    return (
        <>
        <Routes>
            <Route path='/react-regular-exam' element={<FrontPage />} />
            <Route path='/react-regular-exam/guest' element={<Guest />} />
        </Routes>
            
        </>
        
    )
}

export default App
