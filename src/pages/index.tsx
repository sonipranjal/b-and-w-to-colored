import type { NextPage } from "next";
import React from "react";
import Layout from "../components/layout";
import { motion } from "framer-motion";
import { FADE_DOWN_ANIMATION_VARIANTS } from "../constants";
import Balancer from "react-wrap-balancer";
import { FaTwitter } from "react-icons/fa";
import { RxMagicWand } from "react-icons/rx";
import UploadFile from "../components/UploadFile";

const Home: NextPage = () => {
  return (
    <Layout>
      <motion.div
        className="max-w-xl px-5 lg:max-w-2xl xl:max-w-4xl xl:px-0"
        initial="hidden"
        whileInView="show"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <motion.a
          variants={FADE_DOWN_ANIMATION_VARIANTS}
          href="https://twitter.com/pranjalsoni_"
          target="_blank"
          rel="noreferrer"
          className="mx-auto mb-5 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-7 py-2 transition-colors hover:bg-blue-200"
        >
          <FaTwitter className="h-5 w-5 text-[#1d9bf0]" />
          <p className="text-sm font-semibold text-[#1d9bf0]">
            Introducing Your Next Project
          </p>
        </motion.a>
        <motion.h1
          className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem]"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer>
            Convert black & white photo to colored one
            <span className="relative whitespace-nowrap text-[#3290EE]">
              {" "}
              using AI
            </span>
          </Balancer>
        </motion.h1>
        <motion.p
          className="mx-auto mt-12 max-w-xl text-center text-lg leading-7 text-slate-700"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          Have old black and white photos? Let our AI paint them so those
          memories can live on. 100% free – paint your photos today.
        </motion.p>

        <motion.div
          variants={FADE_DOWN_ANIMATION_VARIANTS}
          className="my-12 flex justify-center"
        >
          <div className="flex items-center justify-center space-x-2 text-5xl font-bold">
            <p>Paint your photos</p>
            <RxMagicWand />
          </div>
        </motion.div>

        <motion.div
          variants={FADE_DOWN_ANIMATION_VARIANTS}
          className="flex w-full justify-center"
        >
          <UploadFile />
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default Home;
