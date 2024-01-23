import schemas from "@/sanity/schemas";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { table } from "@sanity/table";
import { visionTool } from "@sanity/vision";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET as string;

const config = defineConfig({
  projectId,
  dataset,
  title: "Máy Tính Việt",
  basePath: "/admin",
  plugins: [deskTool(), table(), visionTool()],
  schema: { types: schemas },
  useCdn: false,
});

export default config;
