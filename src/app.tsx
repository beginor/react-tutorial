import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root, {
    loader as rootLoader, action as rootAction
} from './routes/root';
import Contact, { loader as contactLoader } from './routes/contact';
import EditContact, { action as editAction } from './routes/edit';
import { action as destroyAction } from './routes/destroy';

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
                action: editAction,
            },
            {
                path: 'contacts/:contactId/destroy',
                action: destroyAction,
                errorElement: <div>Oops! There was an error.</div>,
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
