import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root, { loader as rootLoader } from './routes/root';
import Contact from './routes/contact';

import ErrorPage from './error-page';

import './app.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        loader: rootLoader,
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
