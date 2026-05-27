"use client";

import "@scalar/api-reference-react/style.css";
import { ApiReferenceReact } from "@scalar/api-reference-react";

export default function DocsPage() {
  return (
    <main className="min-h-screen">
      <ApiReferenceReact
        configuration={{
          url: process.env.NEXT_PUBLIC_OPENAPI_DOCS
            ? `${process.env.NEXT_PUBLIC_OPENAPI_DOCS}`
            : "http://localhost:8000/openapi.json",

          theme: "purple",

          metaData: {
            title: "RomexForm API Documentation",
            description:
              "API reference for RomexForm. Create forms, publish them, and collect submissions programmatically.",
          },
        }}
      />
    </main>
  );
}
