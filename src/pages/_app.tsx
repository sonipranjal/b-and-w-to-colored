import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Provider as RWBProvider } from "react-wrap-balancer";
import localFont from "@next/font/local";
import { Inter } from "@next/font/google";
import cx from "classnames";
import { Analytics } from "@vercel/analytics/react";

import { api } from "../utils/api";

import "../styles/globals.css";

const sfPro = localFont({
  src: "../styles/SF-Pro-Display-Medium.otf",
  variable: "--font-sf",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <RWBProvider>
        <main className={cx(sfPro.variable, inter.variable)}>
          <Component {...pageProps} />
        </main>
      </RWBProvider>
      <Analytics />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
