/// <reference types="vinxi/types/client" />
import { hydrateRoot } from "react-dom/client";
import { StartClient } from "@tanstack/start";

import "@fontsource/roboto-mono/400.css";
import "@fontsource/roboto-mono/700.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "katex/dist/katex.min.css";

import { createRouter } from "~/router";

const router = createRouter();

if (document) {
	hydrateRoot(document, <StartClient router={router} />);
}
