import "@/styles/global.css";
import type {AppProps} from "next/app";
import {Amplify} from 'aws-amplify';
import {awsConfig} from "../config/aws-exports";

Amplify.configure(awsConfig);

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
