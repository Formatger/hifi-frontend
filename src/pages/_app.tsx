import React, { useEffect, useState } from "react";
import Head from "next/head";
import "@/styles/core.css";
import "@/styles/globals.css";
import "@/styles/pages.css";
import "@/styles/auth.css";
import "@/styles/modal.css";
import type { AppProps } from "next/app";
import store from "../store/store";
import { Provider } from "react-redux";
import { setHasApiKeys } from "@/store/slice/apiKeySlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Hifi</title>
      </Head>
      <Provider store={store}>
        <div className="root">
          <Component {...pageProps} />
        </div>
      </Provider>
    </>
  );
}
