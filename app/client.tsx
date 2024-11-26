/// <reference types="vinxi/types/client" />
import { hydrateRoot } from "react-dom/client";
import { StartClient } from "@tanstack/start";

import { createRouter } from "~/router";

const router = createRouter();

if (document) {
	hydrateRoot(document, <StartClient router={router} />);
}
