import axios from "axios";
import { z } from "zod";
import { env } from "../../../env/server.mjs";

import { createTRPCRouter, publicProcedure } from "../trpc";

type REPLICATE_RESPONSE = {
  id: string;
  version: string;
  urls: {
    get: string;
    cancel: string;
  };
  created_at: string | null;
  started_at: string | null;
  completed_at: string | null;
  status: "starting" | "processing" | "succeeded" | "failed" | "canceled";
  input: any;
  output?: { image: string }[];
};

export const aiRouter = createTRPCRouter({
  paintImage: publicProcedure
    .input(z.object({ imageUrl: z.string().url() }))
    .mutation(async ({ input: { imageUrl } }) => {
      const { data: startPredictionData }: { data: REPLICATE_RESPONSE } =
        await axios.post(
          env.REPLICATE_API,
          {
            version: env.REPLICATE_API_VERSION,
            input: {
              image: imageUrl,
              mode: "Real Gray Colorization",
              classes: "88",
            },
          },
          {
            headers: {
              Authorization: `Token ${env.REPLICATE_TOKEN}`,
            },
          }
        );

      const endpointUrl = startPredictionData.urls.get;

      // GET request to get the status of the image restoration process & return the result when it's ready
      let coloredImage = null;
      while (!coloredImage) {
        // Loop in 1s intervals until the alt text is ready
        console.log("polling for result...");

        const { data: finalResponse }: { data: REPLICATE_RESPONSE } =
          await axios.get(endpointUrl, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${env.REPLICATE_TOKEN}`,
            },
          });

        if (finalResponse.status === "succeeded") {
          coloredImage = finalResponse.output;
        } else if (finalResponse.status === "failed") {
          break;
        } else {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }

      return coloredImage
        ? { images: coloredImage.map((val) => val.image) }
        : { message: "failed to paint image" };
    }),
});
