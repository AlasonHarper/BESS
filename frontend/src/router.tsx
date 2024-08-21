import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';
import { Login } from './pages/auth/login';
import { Register } from './pages/auth/register';
import SidebarLayout from './layouts/SidebarLayout';
import BaseLayout from './layouts/BaseLayout';
import PrivateRoute from './components/privateRoute';
import { Dashboard } from './pages/dashboard';
import { InputParameter } from './pages/parameter/input';
import { ParameterSetting } from './pages/parameter/setting';
import { INPUT_PARAMS } from './utils/constant';
import { element } from 'prop-types';
import { CashFlow } from './pages/financial_statements/cash_flow';
import { ProfitLoss } from './pages/financial_statements/profit_loss';
import { BalanceSheet } from './pages/financial_statements/balancesheet';
import { RevenueGraphPage } from './pages/graph/revenue';
import { AdministrativeExpenseGraphPage } from './pages/graph/administrative_expense';
import { ProfitAcrossTimeGraphPage } from './pages/graph/profit_across_time';
import { BalanceSheetGraphPage } from './pages/graph/balance_sheet';
import { NetCashFlowGraphPage } from './pages/graph/net_cash_flow';
import { ElectricitySoldGraphPage } from './pages/graph/electricity_sold';
import { AverageBatteryCyclesGraphPage } from './pages/graph/average_battery_cycle';
import { CostOfSalesGraphPage } from './pages/graph/cost_of_sales';
import { ProjectValuationPage } from './pages/project_valuation';
import { propsToClassKey } from '@mui/styles';

// import SidebarLayout from 'src/layouts/SidebarLayout';
// import BaseLayout from 'src/layouts/BaseLayout';

// import SuspenseLoader from 'src/components/SuspenseLoader';
// import LogIn from './content/auth/login';
// import Register from './content/auth/register';

// const Loader = (Component) => (props) =>
//   (
//     <Suspense fallback={<SuspenseLoader />}>
//       <Component {...props} />
//     </Suspense>
//   );

// // Pages

// const Overview = Loader(lazy(() => import('src/content/overview')));

// // Dashboards

// const Crypto = Loader(lazy(() => import('src/content/dashboards/Crypto')));

// // Applications

// const Messenger = Loader(
//   lazy(() => import('src/content/applications/Messenger'))
// );
// const Transactions = Loader(
//   lazy(() => import('src/content/applications/Transactions'))
// );
// const UserProfile = Loader(
//   lazy(() => import('src/content/applications/Users/profile'))
// );
// const UserSettings = Loader(
//   lazy(() => import('src/content/applications/Users/settings'))
// );

// // Components

// const Buttons = Loader(
//   lazy(() => import('src/content/pages/Components/Buttons'))
// );
// const Modals = Loader(
//   lazy(() => import('src/content/pages/Components/Modals'))
// );
// const Accordions = Loader(
//   lazy(() => import('src/content/pages/Components/Accordions'))
// );
// const Tabs = Loader(lazy(() => import('src/content/pages/Components/Tabs')));
// const Badges = Loader(
//   lazy(() => import('src/content/pages/Components/Badges'))
// );
// const Tooltips = Loader(
//   lazy(() => import('src/content/pages/Components/Tooltips'))
// );
// const Avatars = Loader(
//   lazy(() => import('src/content/pages/Components/Avatars'))
// );
// const Cards = Loader(lazy(() => import('src/content/pages/Components/Cards')));
// const Forms = Loader(lazy(() => import('src/content/pages/Components/Forms')));

// // Status

// const Status404 = Loader(
//   lazy(() => import('src/content/pages/Status/Status404'))
// );
// const Status500 = Loader(
//   lazy(() => import('src/content/pages/Status/Status500'))
// );
// const StatusComingSoon = Loader(
//   lazy(() => import('src/content/pages/Status/ComingSoon'))
// );
// const StatusMaintenance = Loader(
//   lazy(() => import('src/content/pages/Status/Maintenance'))
// );

const routes: RouteObject[] = [
  {
    path: 'auth',
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> }
    ]
  },
  {
    path: '',
    element: (
      <PrivateRoute>
        <SidebarLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: '',
        element: <Navigate to="dashboard" replace />
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'parameters',
        children: [
          {
            path: '',
            element: <Navigate to="setting" replace />
          },
          {
            path: 'setting',
            element: <ParameterSetting />
          },
          ...INPUT_PARAMS.map((param) => ({
            path: param.id,
            element: <InputParameter param={param} />
          }))
        ]
      },
      {
        path: 'financial_statements',
        children: [
          {
            path: '',
            element: <Navigate to="cashflow" replace />
          },
          {
            path: 'cashflow',
            element: <CashFlow />
          },
          {
            path: 'profit_loss',
            element: <ProfitLoss />
          },
          {
            path: 'balance_sheet',
            element: <BalanceSheet />
          }
        ]
      },
      { path: 'valuation', element: <ProjectValuationPage /> },
      {
        path: 'graphs',
        children: [
          {
            path: '',
            element: <Navigate to="battery" replace />
          },
          {
            path: 'battery',
            children: [
              {
                path: '',
                element: <Navigate to="average_battery_cycles" replace />
              },
              {
                path: 'average_battery_cycles',
                element: <AverageBatteryCyclesGraphPage />
              },
              {
                path: 'electricity_sold',
                element: <ElectricitySoldGraphPage />
              }
            ]
          },

          {
            path: 'cashflow',
            element: <NetCashFlowGraphPage />
          },
          {
            path: 'profit_loss',
            children: [
              {
                path: '',
                element: <Navigate to="revenue" replace />
              },
              { path: 'revenue', element: <RevenueGraphPage /> },
              { path: 'cost_of_sales', element: <CostOfSalesGraphPage /> },
              {
                path: 'admin_costs',
                element: <AdministrativeExpenseGraphPage />
              },
              {
                path: 'profit_across_time',
                element: <ProfitAcrossTimeGraphPage />
              }
            ]
          },
          {
            path: 'balance_sheet',
            element: <BalanceSheetGraphPage />
          },

        ]
      }
    ]
  }
];

export default routes;
