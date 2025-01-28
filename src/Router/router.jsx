import React from 'react';
import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayOut from '../MainlayOut/MainlayOut';
import Home from '../Pages/Home/Home';
import Error from '../Error/Error';
import Login from '../Shared/Login/Login';
import SignUp from '../Shared/SignUP/SignUp';
import Footer from '../Shared/Footer/Footer';
import Dashborad from '../Dashborad/Dashborad';
import EmployeeLogin from '../Employee/EmployeeLogin.jsx'
import PrivateRoute from '../Provider/PrivateRoute/PrivateRoute.jsx'
import EmployeeNavbar from '../Dashborad/EmployeeNavbar/EmployeeNavbar.jsx';
import ManagerLogin from '../Dashborad/Manager/ManagerLogin.jsx';
import ManagerNavbar from '../Dashborad/ManagerNavbar/ManagerNavbar.jsx';
import AddAsset from '../Dashborad/AddAsset/AddAsset.jsx';
import AllRequest from '../Dashborad/AllRequest/AllRequest.jsx';
import MyEmployee from '../Dashborad/MyEmployee/MyEmployee.jsx';
import ManagerHome from '../Dashborad/ManagerHome/ManagerHome.jsx';
import AddEmployee from '../Dashborad/AddEmployee/AddEmployee.jsx';
import AssetList from '../Dashborad/AssetList/AssetList.jsx';
import EmployeeDashboard from '../EmployeeDashboard/EmployeeDashboard.jsx';
import EmployeeHome from '../EmployeeDashboard/EmployeeHome/EmployeeHome.jsx';
import MyAssets from '../EmployeeDashboard/MyAssets/MyAssets.jsx';
import MyTeam from '../EmployeeDashboard/MyTeam/MyTeam.jsx';
import AssetRequest from '../EmployeeDashboard/AssetRequest/AssetRequest.jsx';
import UpdateAsset from '../Dashborad/UpdateAsset/UpdateAsset.jsx';
import ManagerProfile from '../Dashborad/ManagerProfile/ManagerProfile.jsx';
import UpdateProfile from '../Dashborad/UpdateProfile/UpdateProfile.jsx';
import ManagerRoute from '../ManagerRoute/ManagerRoute.jsx';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut></MainLayOut>,
    errorElement: <Error></Error>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
       {
        path: 'login',
        element: <Login></Login>
      },
      {
        path:'signUp',
        element:<SignUp></SignUp>
      },
      {
        path: 'employeeLogin',
        element:<EmployeeLogin></EmployeeLogin>
      },
      {
        path: 'managerLogin',
        element:<ManagerLogin></ManagerLogin>
      },
      {
        path: 'footer',
        element: <Footer></Footer>
      }
    ]
  },
  //manager route
  {
    path: '/dashboards',
    element: <Dashborad></Dashborad>,
    children: [
      {
        path:'/dashboards',
        element:<ManagerHome></ManagerHome>
      },
      {
        path: 'addAsset',
        element: <AddAsset></AddAsset>
      },
      {
        path:'allRequest',
        element:<AllRequest></AllRequest>,
      },
      {
        path:'myEmployee',
        element:<MyEmployee></MyEmployee>
      },
      {
        path:'addEmployee',
        element:<AddEmployee></AddEmployee>
      },{
        path:'assetList',
        element: <AssetList></AssetList>
      },
      {
        path:'managerProfile',
        element:<ManagerProfile></ManagerProfile>
      },
      {
        path:'updateProfile/:id',
        element:<UpdateProfile></UpdateProfile>,
        loader:({params}) =>fetch(`https://asset-track-pro-server-pink.vercel.app/users/${params.id}`)
      },
      {
        path:'updateAsset/:id',
        element:<UpdateAsset></UpdateAsset>,
        loader:({params}) =>fetch(`https://asset-track-pro-server-pink.vercel.app/assets/${params.id}`)
      }
    ]
  },
  // employee route
  {
    path:'/employee-dashboard',
    element:<EmployeeDashboard></EmployeeDashboard>,
    children:[
      {
        path:'/employee-dashboard',
        element:<EmployeeHome></EmployeeHome>
      },
      {
        path:'myAssets',
        element:<MyAssets></MyAssets>
      },
      {
        path:'myTeam',
        element:<MyTeam></MyTeam>
      },
      {
        path:'AssetRequest',
        element:<AssetRequest></AssetRequest>
      }
    ]
  }
  
]);

