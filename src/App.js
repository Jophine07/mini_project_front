import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import AdminLogin from './components/AdminLogin';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserLogin from './components/UserLogin';
import UserSignUp from './components/UserSignUp';
import UserDashBoard from './components/UserDashBoard';
import AdminDashBoard from './components/AdminDashBoard';
import AddTurf from './components/AddTurf';
import BookingHistory from './components/BookHistory';
import Prediction from './components/Prediction';
import OrderFood from './components/OrderFood';
import Bookings from './components/Bookings';
import Search from './components/Search';
import ViewOrders from './components/ViewOrders';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/adminlogin' element={<AdminLogin/>}/>
        <Route path='/userlogin' element={<UserLogin/>}/>
        <Route path='/usersignup' element={<UserSignUp/>}/>
        <Route path='/UserDashBoard' element={<UserDashBoard/>}/>
        <Route path='/AdminDashBoard' element={<AdminDashBoard/>}/>
        <Route path='/addturf' element={<AddTurf/>}/>
        <Route path='/bookinghistory' element={<BookingHistory/>}/>
        <Route path='/Prediction' element={<Prediction/>}/>
        <Route path='/orderfood' element={<OrderFood/>}/>
        <Route path='/bookings' element={<Bookings/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/vieworders' element={<ViewOrders/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
