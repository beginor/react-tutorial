import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './app.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <div>Hello world!</div>
        )
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
