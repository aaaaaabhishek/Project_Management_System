import { BrowserRouter, Link,Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AddProject from './Component/Project/AddProject';
import ADDEmploye from './Component/Employee/ADDEmployee';
import GetEmployee from './Component/Employee/GetEmployee';
import GetAllProject from './Component/Project/GetAllProject';
import AddManager from './Component/Manager/AddManager';
import Home from './Component/Home/Home';
import LoginPage from './Component/Login/LoginPage';
import RegisterPage from './Component/Login/RegisterPage';
import GetProjectById from './Component/Project/GetProjectById';
import UpdateProject from './Component/Project/UpdateProject';
import GetAllManagers from './Component/Manager/GetAllManagers';
import GetManagerById from './Component/Manager/GetManagerById';
import UpdateManager from './Component/Manager/UpdateManager';
import UpdateEmployee from './Component/Employee/UpdateEmployee';
import GetAllEmployee from './Component/Employee/GetAllEmployee';
import PrivateRoutes from './Component/Login/PrivateRoutes';
import { AuthProvider } from './Component/Login/AuthContext';

function App() {
  return (
    <AuthProvider>

    <BrowserRouter>


      <Routes>
      <Route element={<PrivateRoutes/>}>
      <Route path='/'element={<Home/>}/>

{/* Routes for the Employee */}
      <Route path="/addEmployee" element={<ADDEmploye/>} />
        <Route path="/getEmployee/:employeeId" element={<GetEmployee/>} />
        <Route path="/updateEmployee/:employeeId" element={<UpdateEmployee/>} />
        <Route path="/getAllEmployee" element={<GetAllEmployee/>} />
         <Route path="/getEmployee" element={<GetEmployee/>} />
{/* Routes for the Project */}
        <Route path='/addProject' element={<AddProject />} />
        <Route path="/getAllProject" element={<GetAllProject/>}/>
        <Route path="/getProjectById/:projectId" element={<GetProjectById/>} />
        <Route path="/getProjectById/:projectId/modify" element={<UpdateProject/>} />
        {/* Routes for the Manager */}

        <Route path="/addManager" element={<AddManager/>}/>
        <Route path="/getManagerById/:managerId/modify" element={<UpdateManager/>} />

        <Route path="/getAllManager" element={<GetAllManagers/>}/>

        <Route path="/getManagerById/:managerId" element={<GetManagerById/>} />
        </Route>
        <Route path='/login' element={<LoginPage/>}/>
<Route path='/register' element={<RegisterPage/>}/>

      </Routes>

    </BrowserRouter>
    </AuthProvider>

  );
}

export default App;