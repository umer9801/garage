import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteShell } from "../components/site-shell";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              window.location.reload();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Sleek Automotive Bolton | MOT, Servicing & Car Repairs Manchester" },
      {
        name: "description",
        content:
          "Trusted garage in Bolton & Manchester. MOT testing, full servicing, diagnostics, brakes, tyres & repairs. Book online or call 01617 063 645. Walkden M38 9AL.",
      },
      { name: "robots", content: "index, follow" },
      { name: "author", content: "Sleek Automotive And Fleet Specialists" },
      { property: "og:site_name", content: "Sleek Automotive" },
      { property: "og:title", content: "Sleek Automotive Bolton | MOT, Servicing & Car Repairs" },
      { property: "og:description", content: "Trusted garage in Bolton & Manchester. MOT testing, servicing, diagnostics, brakes & repairs." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.sleekautomotive.uk/" },
      { property: "og:image", content: "https://www.sleekautomotive.uk/logo.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Sleek Automotive Bolton | MOT & Car Servicing" },
      { name: "twitter:description", content: "Trusted garage in Bolton & Manchester. MOT testing, servicing, diagnostics & repairs." },
    ],
    links: [
      { rel: "canonical", href: "https://www.sleekautomotive.uk/" },
      { rel: "icon", href: "/logo.png", type: "image/png", sizes: "32x32" },
      { rel: "shortcut icon", href: "/logo.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/logo.png", sizes: "180x180" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAdmin = pathname.startsWith("/admin");

  // Load BMG chatbot script — creates floating chat button bottom-right
  useEffect(() => {
    if (isAdmin) return;
    if (document.querySelector('script[data-key="emb_7e316fcec9eb42dd80907068c226467f"]')) {
      return;
    }
    
    const script = document.createElement("script");
    script.src = "https://bookmygarage.com/embed/chat.js";
    script.setAttribute("data-key", "emb_7e316fcec9eb42dd80907068c226467f");
    script.async = true;
    document.body.appendChild(script);
  }, [isAdmin]);

  return (
    <QueryClientProvider client={queryClient}>
      {isAdmin ? (
        <Outlet />
      ) : (
        <SiteShell>
          <Outlet />
        </SiteShell>
      )}
    </QueryClientProvider>
  );
}
