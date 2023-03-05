import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root from './routes/root';
import Contact from './routes/contact';

import ErrorPage from './error-page';

import './app.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "contacts/:contactId",
                element: <Contact />,
            },
        ]
    },
]);

export default function App(props: AppProps): JSX.Element {
    return (
      <div className='page-wrapper flex-row'>
        <RouterProvider router={router} />
      </div>
    );
}

export interface AppProps {
    message?: string;
}
