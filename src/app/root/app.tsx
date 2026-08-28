import { BrowserRouter } from 'react-router-dom';

import AppRouter from '../router/app-router';

export default function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}
