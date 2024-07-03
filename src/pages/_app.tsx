import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";
import { Notifications } from "@mantine/notifications";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { MantineProvider } from "@mantine/core";
import Navbar from "~/components/Navbar";
import theme from "~/styles/theme";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={GeistSans.className}>
      <MantineProvider theme={theme}>
        <Notifications />
        <Navbar />
        <Component {...pageProps} />
      </MantineProvider>
    </main>
  );
};

export default api.withTRPC(MyApp);
