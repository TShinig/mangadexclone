import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/home.tsx"),
    route("manga/:mangaId", "routes/manga.tsx"),
    route("manga/:mangaId/capitulos/:chapterId", "routes/capitulos.tsx"),
  ]),
] satisfies RouteConfig;
