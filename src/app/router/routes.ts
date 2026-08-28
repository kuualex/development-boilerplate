import Main from '@/pages/main/main';
import Workers from '@/pages/workers/workers';

export interface IRouteDescriptor<TPath extends string> {
  Component: React.ComponentType;
  children?: IRouteDescriptor<string>[];
  path?: TPath extends string ? string : never;
}

export const routes: IRouteDescriptor<string>[] = [
  {
    Component: Workers,
    path: '/workers',
  },
  {
    Component: Main,
    path: '*',
  },
];
