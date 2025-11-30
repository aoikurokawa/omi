"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const theme = createTheme();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif' }}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <main style={{ paddingBottom: "80px" }}>{children}</main>
            <Footer title="AOI" description="Portfolio" />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
