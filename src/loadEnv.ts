import dotenv from "dotenv";
export const loadEnv = () => {
  dotenv.config();
  if (!process.env.HAVE_ENV) {
    dotenv.config({
      path: "/home/gravy/docker/wiki.gravy.cc-scraper/.env",
    });
  }
};
