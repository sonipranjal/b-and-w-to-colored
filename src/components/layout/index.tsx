import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";
import { FADE_IN_ANIMATION_SETTINGS } from "../../constants";
import useScroll from "../../hooks/use-scroll";

import Meta from "./meta";

export default function Layout({
  meta,
  children,
}: {
  meta?: {
    title?: string;
    description?: string;
    image?: string;
  };
  children: ReactNode;
}) {
  const scrolled = useScroll(50);

  return (
    <>
      <Meta {...meta} />

      <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100" />
      <header
        className={`fixed top-0 w-full ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
          <Link href="/" className="flex items-center font-display text-2xl">
            {/* <Image
              src="/logo.png"
              alt="Logo image of a chat bubble"
              width="30"
              height="30"
              className="mr-2 rounded-sm"
            ></Image> */}
            <p>BWToColor</p>
          </Link>
          <div>
            <AnimatePresence>
              <motion.a
                className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                href="https://clubofcoders.com"
                target={"_blank"}
                {...FADE_IN_ANIMATION_SETTINGS}
              >
                By Club Of Coders
              </motion.a>
            </AnimatePresence>
          </div>
        </div>
      </header>
      <main className="flex w-full flex-col items-center justify-center py-32">
        {children}
      </main>
      <div className="absolute w-full border-t border-gray-200 bg-white py-5 text-center">
        <p className="text-gray-500">
          A open source project by{" "}
          <a
            className="font-medium text-gray-800 underline transition-colors"
            href="https://twitter.com/pranjalsoni_"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pranjal Soni
          </a>
        </p>
        <p>
          Inspired from{" "}
          <a
            className="font-medium text-gray-800 underline transition-colors"
            href="https://www.restorephotos.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Restore photos
          </a>
        </p>
      </div>
    </>
  );
}
