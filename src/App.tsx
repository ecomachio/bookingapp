import { Outlet } from "react-router-dom";
import "./App.css";

import Content from "./components/Content";
import Navigation from "./components/Navigation";
import { DarkModeProvider } from "./context/DarkModeContext";
import { ErrorBoundary } from "react-error-boundary";
import { Error } from "./pages/error";
import { AppProvider } from "./context/AppContext";
import { Suspense } from "react";
// Import other pages
// import OtherPage from './pages/otherPage';

// TODO: change the content to a layout component with the navbar and the content and a footer

function App() {
  return (
    <div className="dark:bg-gray-950">
      <AppProvider>
        <DarkModeProvider>
          <Navigation />
          <Content>
            <ErrorBoundary fallback={<Error />}>
              <Suspense fallback={<div>Loadadsasdasddsaing...</div>}>
                <Outlet />
              </Suspense>
            </ErrorBoundary>
          </Content>
        </DarkModeProvider>
      </AppProvider>
    </div>
  );
}

export default App;
