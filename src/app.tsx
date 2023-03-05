import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root from './routes/root';

import './app.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />
    }
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
