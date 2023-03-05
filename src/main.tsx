import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './main.css';
import App from './app';

const page = document.querySelector('.page') as HTMLDivElement;
page.innerHTML = '';

const root = createRoot(page);
root.render(
    <StrictMode>
      <App />
    </StrictMode>
);
