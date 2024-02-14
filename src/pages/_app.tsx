import React from "react";
import Head from "next/head";
import "@/styles/core.css";
import "@/styles/globals.css";
import "@/styles/pages.css";
import "@/styles/auth.css";
import type { AppProps } from "next/app";
import store from "../store/store";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Hifi Pay</title>
      </Head>
      <Provider store={store}>
        <div className="root">
          <Component {...pageProps} />
        </div>
      </Provider>
    </>
  );
}
