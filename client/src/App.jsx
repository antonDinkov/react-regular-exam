import FrontPage from './components/Front Page/FrontPage';
import { Routes, Route } from 'react-router';
import Guest from './components/Guest Page/Guest';
import Login from './components/Login Page/Login';
import LoginNext from './components/Login Page/LoginNext';
import Create from './components/CreateAccount page/Create';
import { FormDataProvider } from '../context/UserContext';
import CreateNext from './components/CreateAccount page/CreateNext';
import Welcome from './components/Social media/Welcome page/Welcome';
import Layout from './components/Social media/Layout';
import Main from './components/Social media/Welcome page/Main';
function App() {

    return (
        <FormDataProvider>
            <Routes>
                <Route path='/react-regular-exam' element={<FrontPage />} />
                <Route path='/react-regular-exam/guest' element={<Guest />} />
                <Route path='/react-regular-exam/login' element={<Login />}></Route>
                <Route path='/react-regular-exam/login/pass' element={<LoginNext />}></Route>
                <Route path='/react-regular-exam/create' element={<Create />}></Route>
                <Route path='/react-regular-exam/create/submit' element={<CreateNext />}></Route>
                {/* <Route path='/react-regular-exam/welcome' element={<Welcome />}></Route> */}
                <Route path='/react-regular-exam/post' element={<Welcome />}></Route>
                <Route path="/react-regular-exam/*" element={<Welcome />}>
                    <Route path="welcome" element={<Main />} />
                </Route>
            </Routes>
        </FormDataProvider>

    )
}

export default App
