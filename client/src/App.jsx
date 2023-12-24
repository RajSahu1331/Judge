
import { Route, Routes } from 'react-router-dom';

import Login from './components/Authentication/Login.jsx'

import SignUp from './components/Authentication/SignUp.jsx'

import Home from './components/Home/home.jsx';
import ProblemPage from './components/Problem/ProblemPage.jsx';

import SubmissionPage from './components/Submission/SubmissionPage.jsx'


const App = () => {

  return (

    <Routes path='/'>
      <Route path='signup' element={<SignUp />} />
      <Route path='login' element={<Login />} />
      <Route path='home' element={<Home />} />
      <Route path='problem/:_id' element={<ProblemPage />} />
      <Route path='submit/:problemName' element={<SubmissionPage />} />
    </Routes>
    // </UserContextProvider>
  )

}
export default App;