import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import AppProviders from "@/AppProviders";
import AppRoutes from "@/AppRoutes";

export const render = (url: string) => {
  const helmetContext: Record<string, unknown> = {};
  const appHtml = renderToString(
    <AppProviders helmetContext={helmetContext}>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </AppProviders>
  );

  return {
    appHtml,
    helmetContext,
  };
};
