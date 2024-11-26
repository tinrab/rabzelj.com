/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as IndexHomeImport } from "./routes/_index/_home";
import { Route as IndexHomeIndexImport } from "./routes/_index/_home/index";

// Create/Update Routes

const IndexHomeRoute = IndexHomeImport.update({
	id: "/_index/_home",
	getParentRoute: () => rootRoute,
} as any);

const IndexHomeIndexRoute = IndexHomeIndexImport.update({
	id: "/",
	path: "/",
	getParentRoute: () => IndexHomeRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
	interface FileRoutesByPath {
		"/_index/_home": {
			id: "/_index/_home";
			path: "";
			fullPath: "";
			preLoaderRoute: typeof IndexHomeImport;
			parentRoute: typeof rootRoute;
		};
		"/_index/_home/": {
			id: "/_index/_home/";
			path: "/";
			fullPath: "/";
			preLoaderRoute: typeof IndexHomeIndexImport;
			parentRoute: typeof IndexHomeImport;
		};
	}
}

// Create and export the route tree

interface IndexHomeRouteChildren {
	IndexHomeIndexRoute: typeof IndexHomeIndexRoute;
}

const IndexHomeRouteChildren: IndexHomeRouteChildren = {
	IndexHomeIndexRoute: IndexHomeIndexRoute,
};

const IndexHomeRouteWithChildren = IndexHomeRoute._addFileChildren(
	IndexHomeRouteChildren,
);

export interface FileRoutesByFullPath {
	"": typeof IndexHomeRouteWithChildren;
	"/": typeof IndexHomeIndexRoute;
}

export interface FileRoutesByTo {
	"/": typeof IndexHomeIndexRoute;
}

export interface FileRoutesById {
	__root__: typeof rootRoute;
	"/_index/_home": typeof IndexHomeRouteWithChildren;
	"/_index/_home/": typeof IndexHomeIndexRoute;
}

export interface FileRouteTypes {
	fileRoutesByFullPath: FileRoutesByFullPath;
	fullPaths: "" | "/";
	fileRoutesByTo: FileRoutesByTo;
	to: "/";
	id: "__root__" | "/_index/_home" | "/_index/_home/";
	fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
	IndexHomeRoute: typeof IndexHomeRouteWithChildren;
}

const rootRouteChildren: RootRouteChildren = {
	IndexHomeRoute: IndexHomeRouteWithChildren,
};

export const routeTree = rootRoute
	._addFileChildren(rootRouteChildren)
	._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_index/_home"
      ]
    },
    "/_index/_home": {
      "filePath": "_index/_home.tsx",
      "children": [
        "/_index/_home/"
      ]
    },
    "/_index/_home/": {
      "filePath": "_index/_home/index.tsx",
      "parent": "/_index/_home"
    }
  }
}
ROUTE_MANIFEST_END */