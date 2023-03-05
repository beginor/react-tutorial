import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root, {
    loader as rootLoader, action as rootAction
} from './routes/root';
import Contact, { loader as contactLoader } from './routes/contact';
import EditContact from './routes/edit';

import ErrorPage from './error-page';

import './app.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        loader: rootLoader,
        action: rootAction,
        children: [
            {
                path: 'contacts/:contactId',
                element: <Contact />,
                loader: contactLoader,
            },
            {
                path: 'contacts/:contactId/edit',
                element: <EditContact />,
                loader: contactLoader,
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
