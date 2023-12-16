// import './App.css'
import LoginForm from './components/LoginForm.jsx'
import HomePage from './pages/HomePage.jsx'
import { Route, Routes } from 'react-router-dom'
import PrivateRoutes from "./components/PrivateRoutes.jsx"
import LandingPage from './pages/LandingPage.jsx'
import RegisterForm from './components/RegisterForm.jsx'
import FormPost from './pages/FormPost.jsx'
import Profile from './pages/ProfilePage.jsx'
import UpdatePost from './pages/UpdatePost.jsx'
import NotFoundPage from './pages/404Page.jsx'

function AppRouter() {
  return (
    <Routes>
    {/* Rutas Protegidas */}
    <Route element={<PrivateRoutes />}>
      <Route path="/home" element={<HomePage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/new" element={<FormPost />} />
      <Route path="/update/:postId" element={<UpdatePost />} />
      {/* <Route path="/playlist/:playlistId" element={<MusicPage />} /> */}
      {/* <Route path="/music/:playlistId" element={<NewMusicPage />} /> */}
    </Route>
    {/* Rutas Públicas */}
    <Route path='/' element={ <LandingPage />} />
    <Route path="/login" element={<LoginForm />} />
    <Route path="/register" element={<RegisterForm />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
  )
}

export default AppRouter;
