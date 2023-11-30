import App from "next/app";
import { Provider } from "react-redux";
import { PrimeReactProvider } from 'primereact/api';
import store from "../store/store";
import "../styles/main.css";
import Layout from "../components/layout";
import StateProvider from "../state";

function MyApp({ Component, pageProps }) {
  return (
    <StateProvider>
      <Provider store={store}>
      <PrimeReactProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PrimeReactProvider>
      </Provider>
    </StateProvider>
  );
}

export default MyApp;

// const makeStore = () => store;
// const wrapper = createWrapper(makeStore);

// export default wrapper.withRedux(MyApp);
