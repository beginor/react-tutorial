import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root from './routes/root';
import Contact from './routes/contact';

import ErrorPage from './error-page';

import './app.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />
    },
    {
        path: "contacts/:contactId",
        element: <Contact />,
      },
]);

export default function App(props: AppProps): JSX.Element {
    return (
      <div className='page-wrapper app'>
        <RouterProvider router={router} />
      </div>
    );
}

export interface AppProps {
    message?: string;
}
