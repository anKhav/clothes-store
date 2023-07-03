import "./App.css";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {persistor, store} from "./store.ts";
import {PersistGate} from "redux-persist/integration/react";
import AppRouter from "./routes/AppRouter.tsx";
import "./App.css";

function App() {
  return (
      <BrowserRouter>
          <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                  <AppRouter/>
              </PersistGate>
          </Provider>
      </BrowserRouter>
  );
}

export default App;
