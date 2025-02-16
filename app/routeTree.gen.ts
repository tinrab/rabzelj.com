/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ResourcesIndexImport } from './routes/resources/_index'
import { Route as BlogIndexImport } from './routes/blog/_index'
import { Route as IndexHomeImport } from './routes/_index/_home'
import { Route as ResourcesIndexIndexImport } from './routes/resources/_index.index'
import { Route as IndexHomeIndexImport } from './routes/_index/_home/index'
import { Route as BlogPostPostImport } from './routes/blog/_post/_post'
import { Route as BlogIndexPostsImport } from './routes/blog/_index/_posts'
import { Route as BlogIndexTagsIndexImport } from './routes/blog/_index/tags.index'
import { Route as BlogIndexPostsIndexImport } from './routes/blog/_index/_posts.index'
import { Route as BlogPostPostSlugImport } from './routes/blog/_post/_post.$slug'
import { Route as BlogIndexPostsExternalImport } from './routes/blog/_index/_posts.external'
import { Route as BlogIndexTagsSlugIndexImport } from './routes/blog/_index/tags.$slug.index'

// Create Virtual Routes

const ResourcesImport = createFileRoute('/resources')()
const BlogImport = createFileRoute('/blog')()

// Create/Update Routes

const ResourcesRoute = ResourcesImport.update({
  id: '/resources',
  path: '/resources',
  getParentRoute: () => rootRoute,
} as any)

const BlogRoute = BlogImport.update({
  id: '/blog',
  path: '/blog',
  getParentRoute: () => rootRoute,
} as any)

const ResourcesIndexRoute = ResourcesIndexImport.update({
  id: '/_index',
  getParentRoute: () => ResourcesRoute,
} as any)

const BlogIndexRoute = BlogIndexImport.update({
  id: '/_index',
  getParentRoute: () => BlogRoute,
} as any)

const IndexHomeRoute = IndexHomeImport.update({
  id: '/_index/_home',
  getParentRoute: () => rootRoute,
} as any)

const ResourcesIndexIndexRoute = ResourcesIndexIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => ResourcesIndexRoute,
} as any)

const IndexHomeIndexRoute = IndexHomeIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => IndexHomeRoute,
} as any)

const BlogPostPostRoute = BlogPostPostImport.update({
  id: '/_post/_post',
  getParentRoute: () => BlogRoute,
} as any)

const BlogIndexPostsRoute = BlogIndexPostsImport.update({
  id: '/_posts',
  getParentRoute: () => BlogIndexRoute,
} as any)

const BlogIndexTagsIndexRoute = BlogIndexTagsIndexImport.update({
  id: '/tags/',
  path: '/tags/',
  getParentRoute: () => BlogIndexRoute,
} as any)

const BlogIndexPostsIndexRoute = BlogIndexPostsIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => BlogIndexPostsRoute,
} as any)

const BlogPostPostSlugRoute = BlogPostPostSlugImport.update({
  id: '/$slug',
  path: '/$slug',
  getParentRoute: () => BlogPostPostRoute,
} as any)

const BlogIndexPostsExternalRoute = BlogIndexPostsExternalImport.update({
  id: '/external',
  path: '/external',
  getParentRoute: () => BlogIndexPostsRoute,
} as any)

const BlogIndexTagsSlugIndexRoute = BlogIndexTagsSlugIndexImport.update({
  id: '/tags/$slug/',
  path: '/tags/$slug/',
  getParentRoute: () => BlogIndexRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_index/_home': {
      id: '/_index/_home'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof IndexHomeImport
      parentRoute: typeof rootRoute
    }
    '/blog': {
      id: '/blog'
      path: '/blog'
      fullPath: '/blog'
      preLoaderRoute: typeof BlogImport
      parentRoute: typeof rootRoute
    }
    '/blog/_index': {
      id: '/blog/_index'
      path: '/blog'
      fullPath: '/blog'
      preLoaderRoute: typeof BlogIndexImport
      parentRoute: typeof BlogRoute
    }
    '/resources': {
      id: '/resources'
      path: '/resources'
      fullPath: '/resources'
      preLoaderRoute: typeof ResourcesImport
      parentRoute: typeof rootRoute
    }
    '/resources/_index': {
      id: '/resources/_index'
      path: '/resources'
      fullPath: '/resources'
      preLoaderRoute: typeof ResourcesIndexImport
      parentRoute: typeof ResourcesRoute
    }
    '/blog/_index/_posts': {
      id: '/blog/_index/_posts'
      path: ''
      fullPath: '/blog'
      preLoaderRoute: typeof BlogIndexPostsImport
      parentRoute: typeof BlogIndexImport
    }
    '/blog/_post/_post': {
      id: '/blog/_post/_post'
      path: ''
      fullPath: '/blog'
      preLoaderRoute: typeof BlogPostPostImport
      parentRoute: typeof BlogImport
    }
    '/_index/_home/': {
      id: '/_index/_home/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexHomeIndexImport
      parentRoute: typeof IndexHomeImport
    }
    '/resources/_index/': {
      id: '/resources/_index/'
      path: '/'
      fullPath: '/resources/'
      preLoaderRoute: typeof ResourcesIndexIndexImport
      parentRoute: typeof ResourcesIndexImport
    }
    '/blog/_index/_posts/external': {
      id: '/blog/_index/_posts/external'
      path: '/external'
      fullPath: '/blog/external'
      preLoaderRoute: typeof BlogIndexPostsExternalImport
      parentRoute: typeof BlogIndexPostsImport
    }
    '/blog/_post/_post/$slug': {
      id: '/blog/_post/_post/$slug'
      path: '/$slug'
      fullPath: '/blog/$slug'
      preLoaderRoute: typeof BlogPostPostSlugImport
      parentRoute: typeof BlogPostPostImport
    }
    '/blog/_index/_posts/': {
      id: '/blog/_index/_posts/'
      path: '/'
      fullPath: '/blog/'
      preLoaderRoute: typeof BlogIndexPostsIndexImport
      parentRoute: typeof BlogIndexPostsImport
    }
    '/blog/_index/tags/': {
      id: '/blog/_index/tags/'
      path: '/tags'
      fullPath: '/blog/tags'
      preLoaderRoute: typeof BlogIndexTagsIndexImport
      parentRoute: typeof BlogIndexImport
    }
    '/blog/_index/tags/$slug/': {
      id: '/blog/_index/tags/$slug/'
      path: '/tags/$slug'
      fullPath: '/blog/tags/$slug'
      preLoaderRoute: typeof BlogIndexTagsSlugIndexImport
      parentRoute: typeof BlogIndexImport
    }
  }
}

// Create and export the route tree

interface IndexHomeRouteChildren {
  IndexHomeIndexRoute: typeof IndexHomeIndexRoute
}

const IndexHomeRouteChildren: IndexHomeRouteChildren = {
  IndexHomeIndexRoute: IndexHomeIndexRoute,
}

const IndexHomeRouteWithChildren = IndexHomeRoute._addFileChildren(
  IndexHomeRouteChildren,
)

interface BlogIndexPostsRouteChildren {
  BlogIndexPostsExternalRoute: typeof BlogIndexPostsExternalRoute
  BlogIndexPostsIndexRoute: typeof BlogIndexPostsIndexRoute
}

const BlogIndexPostsRouteChildren: BlogIndexPostsRouteChildren = {
  BlogIndexPostsExternalRoute: BlogIndexPostsExternalRoute,
  BlogIndexPostsIndexRoute: BlogIndexPostsIndexRoute,
}

const BlogIndexPostsRouteWithChildren = BlogIndexPostsRoute._addFileChildren(
  BlogIndexPostsRouteChildren,
)

interface BlogIndexRouteChildren {
  BlogIndexPostsRoute: typeof BlogIndexPostsRouteWithChildren
  BlogIndexTagsIndexRoute: typeof BlogIndexTagsIndexRoute
  BlogIndexTagsSlugIndexRoute: typeof BlogIndexTagsSlugIndexRoute
}

const BlogIndexRouteChildren: BlogIndexRouteChildren = {
  BlogIndexPostsRoute: BlogIndexPostsRouteWithChildren,
  BlogIndexTagsIndexRoute: BlogIndexTagsIndexRoute,
  BlogIndexTagsSlugIndexRoute: BlogIndexTagsSlugIndexRoute,
}

const BlogIndexRouteWithChildren = BlogIndexRoute._addFileChildren(
  BlogIndexRouteChildren,
)

interface BlogPostPostRouteChildren {
  BlogPostPostSlugRoute: typeof BlogPostPostSlugRoute
}

const BlogPostPostRouteChildren: BlogPostPostRouteChildren = {
  BlogPostPostSlugRoute: BlogPostPostSlugRoute,
}

const BlogPostPostRouteWithChildren = BlogPostPostRoute._addFileChildren(
  BlogPostPostRouteChildren,
)

interface BlogRouteChildren {
  BlogIndexRoute: typeof BlogIndexRouteWithChildren
  BlogPostPostRoute: typeof BlogPostPostRouteWithChildren
}

const BlogRouteChildren: BlogRouteChildren = {
  BlogIndexRoute: BlogIndexRouteWithChildren,
  BlogPostPostRoute: BlogPostPostRouteWithChildren,
}

const BlogRouteWithChildren = BlogRoute._addFileChildren(BlogRouteChildren)

interface ResourcesIndexRouteChildren {
  ResourcesIndexIndexRoute: typeof ResourcesIndexIndexRoute
}

const ResourcesIndexRouteChildren: ResourcesIndexRouteChildren = {
  ResourcesIndexIndexRoute: ResourcesIndexIndexRoute,
}

const ResourcesIndexRouteWithChildren = ResourcesIndexRoute._addFileChildren(
  ResourcesIndexRouteChildren,
)

interface ResourcesRouteChildren {
  ResourcesIndexRoute: typeof ResourcesIndexRouteWithChildren
}

const ResourcesRouteChildren: ResourcesRouteChildren = {
  ResourcesIndexRoute: ResourcesIndexRouteWithChildren,
}

const ResourcesRouteWithChildren = ResourcesRoute._addFileChildren(
  ResourcesRouteChildren,
)

export interface FileRoutesByFullPath {
  '': typeof IndexHomeRouteWithChildren
  '/blog': typeof BlogPostPostRouteWithChildren
  '/resources': typeof ResourcesIndexRouteWithChildren
  '/': typeof IndexHomeIndexRoute
  '/resources/': typeof ResourcesIndexIndexRoute
  '/blog/external': typeof BlogIndexPostsExternalRoute
  '/blog/$slug': typeof BlogPostPostSlugRoute
  '/blog/': typeof BlogIndexPostsIndexRoute
  '/blog/tags': typeof BlogIndexTagsIndexRoute
  '/blog/tags/$slug': typeof BlogIndexTagsSlugIndexRoute
}

export interface FileRoutesByTo {
  '/blog': typeof BlogIndexPostsIndexRoute
  '/resources': typeof ResourcesIndexIndexRoute
  '/': typeof IndexHomeIndexRoute
  '/blog/external': typeof BlogIndexPostsExternalRoute
  '/blog/$slug': typeof BlogPostPostSlugRoute
  '/blog/tags': typeof BlogIndexTagsIndexRoute
  '/blog/tags/$slug': typeof BlogIndexTagsSlugIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_index/_home': typeof IndexHomeRouteWithChildren
  '/blog': typeof BlogRouteWithChildren
  '/blog/_index': typeof BlogIndexRouteWithChildren
  '/resources': typeof ResourcesRouteWithChildren
  '/resources/_index': typeof ResourcesIndexRouteWithChildren
  '/blog/_index/_posts': typeof BlogIndexPostsRouteWithChildren
  '/blog/_post/_post': typeof BlogPostPostRouteWithChildren
  '/_index/_home/': typeof IndexHomeIndexRoute
  '/resources/_index/': typeof ResourcesIndexIndexRoute
  '/blog/_index/_posts/external': typeof BlogIndexPostsExternalRoute
  '/blog/_post/_post/$slug': typeof BlogPostPostSlugRoute
  '/blog/_index/_posts/': typeof BlogIndexPostsIndexRoute
  '/blog/_index/tags/': typeof BlogIndexTagsIndexRoute
  '/blog/_index/tags/$slug/': typeof BlogIndexTagsSlugIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/blog'
    | '/resources'
    | '/'
    | '/resources/'
    | '/blog/external'
    | '/blog/$slug'
    | '/blog/'
    | '/blog/tags'
    | '/blog/tags/$slug'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/blog'
    | '/resources'
    | '/'
    | '/blog/external'
    | '/blog/$slug'
    | '/blog/tags'
    | '/blog/tags/$slug'
  id:
    | '__root__'
    | '/_index/_home'
    | '/blog'
    | '/blog/_index'
    | '/resources'
    | '/resources/_index'
    | '/blog/_index/_posts'
    | '/blog/_post/_post'
    | '/_index/_home/'
    | '/resources/_index/'
    | '/blog/_index/_posts/external'
    | '/blog/_post/_post/$slug'
    | '/blog/_index/_posts/'
    | '/blog/_index/tags/'
    | '/blog/_index/tags/$slug/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexHomeRoute: typeof IndexHomeRouteWithChildren
  BlogRoute: typeof BlogRouteWithChildren
  ResourcesRoute: typeof ResourcesRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexHomeRoute: IndexHomeRouteWithChildren,
  BlogRoute: BlogRouteWithChildren,
  ResourcesRoute: ResourcesRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_index/_home",
        "/blog",
        "/resources"
      ]
    },
    "/_index/_home": {
      "filePath": "_index/_home.tsx",
      "children": [
        "/_index/_home/"
      ]
    },
    "/blog": {
      "filePath": "blog",
      "children": [
        "/blog/_index",
        "/blog/_post/_post"
      ]
    },
    "/blog/_index": {
      "filePath": "blog/_index.tsx",
      "parent": "/blog",
      "children": [
        "/blog/_index/_posts",
        "/blog/_index/tags/",
        "/blog/_index/tags/$slug/"
      ]
    },
    "/resources": {
      "filePath": "resources",
      "children": [
        "/resources/_index"
      ]
    },
    "/resources/_index": {
      "filePath": "resources/_index.tsx",
      "parent": "/resources",
      "children": [
        "/resources/_index/"
      ]
    },
    "/blog/_index/_posts": {
      "filePath": "blog/_index/_posts.tsx",
      "parent": "/blog/_index",
      "children": [
        "/blog/_index/_posts/external",
        "/blog/_index/_posts/"
      ]
    },
    "/blog/_post/_post": {
      "filePath": "blog/_post/_post.tsx",
      "parent": "/blog",
      "children": [
        "/blog/_post/_post/$slug"
      ]
    },
    "/_index/_home/": {
      "filePath": "_index/_home/index.tsx",
      "parent": "/_index/_home"
    },
    "/resources/_index/": {
      "filePath": "resources/_index.index.tsx",
      "parent": "/resources/_index"
    },
    "/blog/_index/_posts/external": {
      "filePath": "blog/_index/_posts.external.tsx",
      "parent": "/blog/_index/_posts"
    },
    "/blog/_post/_post/$slug": {
      "filePath": "blog/_post/_post.$slug.tsx",
      "parent": "/blog/_post/_post"
    },
    "/blog/_index/_posts/": {
      "filePath": "blog/_index/_posts.index.tsx",
      "parent": "/blog/_index/_posts"
    },
    "/blog/_index/tags/": {
      "filePath": "blog/_index/tags.index.tsx",
      "parent": "/blog/_index"
    },
    "/blog/_index/tags/$slug/": {
      "filePath": "blog/_index/tags.$slug.index.tsx",
      "parent": "/blog/_index"
    }
  }
}
ROUTE_MANIFEST_END */
