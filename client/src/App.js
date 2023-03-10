import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Write from './pages/Write';
import Home from './pages/Home';
import Single from './pages/Single';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Apply from './pages/Apply';
import Winners from './pages/Winners';
import Gdpr from './pages/Gdpr';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Adminprocess from './pages/Adminprocess';
import NotFound from './pages/NotFound';
import './style.scss';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/post/:id',
        element: <Single />,
      },
      {
        path: '/write',
        element: <Write />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/apply',
        element: <Apply />,
      },
      {
        path: '/winners',
        element: <Winners />,
      },
      {
        path: '/Gdpr',
        element: <Gdpr />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/admin',
        element: <Admin />,
      },
      {
        path: '/adminprocess',
        element: <Adminprocess />,
      },
      // This should be last path
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return (
    <div className='app'>
      <div className='container'>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
