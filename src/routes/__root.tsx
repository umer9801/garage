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
      { title: "Sleek Automotive And Fleet Specialists" },
      {
        name: "description",
        content:
          "Expert automotive care and fleet management across Greater Manchester. Honest pricing, quality workmanship.",
      },
      { name: "author", content: "Sleek Automotive And Fleet Specialists" },
      { property: "og:title", content: "Sleek Automotive And Fleet Specialists" },
      {
        property: "og:description",
        content: "Expert automotive care and fleet management across Greater Manchester.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
    ],
    links: [
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
      {
        rel: "stylesheet",
        href: appCss,
      },
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

  // Load BMG chatbot script — creates "Book with Sleek Automotive" button
  // Opens chatbot for booking appointments
  useEffect(() => {
    if (isAdmin) return;
    if (document.querySelector('script[data-key="emb_7e316fcec9eb42dd80907068c226467f"]')) {
      console.log("BMG chatbot script already loaded");
      return;
    }
    
    console.log("Loading BMG chatbot script...", {
      userAgent: navigator.userAgent,
      isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
      screenWidth: window.innerWidth,
    });
    
    const script = document.createElement("script");
    script.src = "https://bookmygarage.com/embed/chat.js";
    script.setAttribute("data-key", "emb_7e316fcec9eb42dd80907068c226467f");
    script.async = true;
    
    // Force reload on mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      script.src = `https://bookmygarage.com/embed/chat.js?t=${Date.now()}`;
      console.log("Mobile detected - forcing fresh script load");
    }
    
    script.onload = () => {
      console.log("✅ BMG chatbot script loaded successfully");
      
      // Ensure chatbot widget is visible with high z-index and mobile-friendly positioning
      setTimeout(() => {
        const style = document.createElement("style");
        style.textContent = `
          /* BookMyGarage chatbot widget visibility - Desktop & Mobile */
          iframe[src*="bookmygarage.com"] {
            z-index: 999999 !important;
            position: fixed !important;
            bottom: 20px !important;
            right: 20px !important;
          }
          div[id*="bmg-chat"],
          div[class*="bmg-chat"],
          div[id*="bmg"],
          div[class*="bmg"],
          .bmg-widget-container {
            z-index: 999999 !important;
            position: fixed !important;
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
          }
          
          /* Mobile specific - ensure widget button is visible and touchable */
          @media (max-width: 768px) {
            iframe[src*="bookmygarage.com"],
            div[id*="bmg-chat"],
            div[class*="bmg-chat"] {
              bottom: 100px !important;
              right: 10px !important;
              pointer-events: all !important;
            }
          }
        `;
        document.head.appendChild(style);
        console.log("BMG chatbot visibility styles applied (desktop + mobile)");
        
        // Force widget visibility check after 2 seconds
        setTimeout(() => {
          const bmgElements = document.querySelectorAll('[id*="bmg"], [class*="bmg"], iframe[src*="bookmygarage"]');
          console.log(`Found ${bmgElements.length} BMG elements:`, bmgElements);
          
          if (bmgElements.length === 0) {
            console.warn("⚠️ No BMG elements found - widget may not have loaded");
          }
          
          bmgElements.forEach((el) => {
            const element = el as HTMLElement;
            element.style.display = 'block';
            element.style.visibility = 'visible';
            element.style.opacity = '1';
            element.style.zIndex = '999999';
            console.log("Forced visibility on element:", element.tagName, element.id || element.className);
          });
        }, 2000);
      }, 1000);
    };
    
    script.onerror = (error) => {
      console.error("❌ BMG chatbot script failed to load:", error);
    };
    
    document.body.appendChild(script);
    console.log("BMG chatbot script tag added to body");
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
