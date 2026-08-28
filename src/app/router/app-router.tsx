import { Route, Routes } from 'react-router-dom';

import { type IRouteDescriptor, routes } from './routes';

export default function AppRouter() {
  const renderRoutes = (routesList: IRouteDescriptor<string>[]) => {
    return routesList.map((route) => (
      <Route key={`Route-${route.path}`} path={route.path} element={<route.Component />}>
        {route.children && renderRoutes(route.children)}
      </Route>
    ));
  };

  return <Routes>{renderRoutes(routes)}</Routes>;
}
