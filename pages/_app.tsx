import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import { HeroUIProvider } from "@heroui/system";

import { Providers } from "@/components/providers";
import { fontSans, fontMono } from "@/config/fonts";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </HeroUIProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
