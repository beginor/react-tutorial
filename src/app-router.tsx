import { createBrowserRouter } from 'react-router-dom';

import Root, {
    loader as rootLoader, action as rootAction
} from './routes/contact/list';
import Index from './routes/contact/index';
import Contact, {
    loader as contactLoader
} from './routes/contact/details';
import EditContact, { action as editAction } from './routes/contact/edit';
import { action as destroyAction } from './routes/contact/delete';
import { action as favoriteAction } from './controls/favorite';

import ErrorPage from './error-page';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        loader: rootLoader,
        action: rootAction,
        children: [
            {
                errorElement: <ErrorPage />,
                children: [
                    {
                        index: true,
                        element: <Index />
                    },
                    {
                        path: 'contacts/:contactId',
                        element: <Contact />,
                        loader: contactLoader,
                        action: favoriteAction,
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
                ],
            },
        ]
    },
]);

export { router }
