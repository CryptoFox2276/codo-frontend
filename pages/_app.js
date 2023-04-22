import App from "next/app";
import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import store from "../store/store";
import "../styles/main.css";
import Layout from "../components/layout";
import StateProvider from "../state";

function MyApp({ Component, pageProps }) {
  return (
    <StateProvider>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </StateProvider>
  );
}

export default MyApp;

// const makeStore = () => store;
// const wrapper = createWrapper(makeStore);

// export default wrapper.withRedux(MyApp);
