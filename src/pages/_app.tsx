import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { createTheme, MantineProvider } from "@mantine/core";
import Navbar from "~/components/Navbar";

const theme = createTheme({
  /** Put your mantine theme override here */
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={GeistSans.className}>
      <MantineProvider theme={theme}>
        <Navbar />
        <Component {...pageProps} />
      </MantineProvider>
    </main>
  );
};

export default api.withTRPC(MyApp);
