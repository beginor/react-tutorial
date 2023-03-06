import { RouterProvider } from 'react-router-dom';

import { router } from './app-router';

import './app.css';

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
