---
title: Tiny Tips for Gatsby Incremental Builds on Netlify
date: "2020-05-16T23:12:03.284Z"
description: "Stuck in an error when enabling Gatsby incremental builds on Netlify? This post might help it."
featuredImage: incremental_build/ogp.jpg
tags: ["en", "gatsby", "programming"]
---

Recently, Netlify started supporting Gatsby's incremental builds. It remarkably reduces the build time by caching the previous build! [The official blog]((https://www.netlify.com/blog/2020/04/23/enable-gatsby-incremental-builds-on-netlify/)) says this feature is easy to enable, but I came into an error at the first trial. I write this post for those who are in trouble with the same error.

## Environment

```shell
$ gatsby --version
Gatsby CLI version: 2.8.29
Gatsby version: 2.21.33

$ node --version
v12.16.2

$ npm --version
6.14.4
```
<br/>

## Error
I just followed the instruction in [the official blog]((https://www.netlify.com/blog/2020/04/23/enable-gatsby-incremental-builds-on-netlify/). I saw no errors in the development environment, so I pushed the code, and got this error on Netlify.

```shell
6:53:11 PM: success run queries - 44.036s - 29/29 0.66/s
6:53:17 PM: (sharp:1642): GLib-GObject-WARNING **: 09:53:17.297: ../gobject/gtype.c:4268: type id '0' is invalid
6:53:17 PM: (sharp:1642): GLib-GObject-WARNING **: 09:53:17.298: can't peek value table for type '<invalid>' which is not currently referenced
6:53:17 PM: (sharp:1642): GLib-GObject-WARNING **: 09:53:17.298: ../gobject/gvalue.c:187: cannot initialize GValue with type '(null)', this type has no GTypeValueTable implementation
6:53:17 PM: (sharp:1642): GLib-GObject-CRITICAL **: 09:53:17.298: g_value_type_compatible: assertion 'src_type' failed
6:53:17 PM: (sharp:1642): GLib-GObject-WARNING **: 09:53:17.299: ../gobject/gtype.c:4268: type id '0' is invalid
6:53:17 PM: (sharp:1642): GLib-GObject-WARNING **: 09:53:17.299: can't peek value table for type '<invalid>' which is not currently referenced
6:53:17 PM: (sharp:1642): GLib-GObject-WARNING **: 09:53:17.299: ../gobject/gvalue.c:187: cannot initialize GValue with type '(null)', this type has no GTypeValueTable implementation
6:53:17 PM: (sharp:1642): GLib-GObject-CRITICAL **: 09:53:17.299: g_value_type_compatible: assertion 'src_type' failed
6:53:19 PM: ​
6:53:19 PM: ┌─────────────────────────────┐
6:53:19 PM: │        Build failed         │
6:53:19 PM: └─────────────────────────────┘
6:53:19 PM: ​
6:53:19 PM:   Error message
6:53:19 PM:   Command was killed with SIGBUS (Bus error due to misaligned, non-existing address or paging error): gatsby build
6:53:19 PM: ​
6:53:19 PM:   Error location
6:53:19 PM:   In build.command from netlify.toml:
6:53:19 PM:   gatsby build
```

<br/>

## How to Solve
This error was totally unfamiliar to me. Searching by the error message did not help.  

Since the error was happning in `netlify.toml`, I checked the file and went to [the official repository](https://github.com/jlengstorf/netlify-plugin-gatsby-cache) of `netlify-plugin-gatsby-cache`.

It tells us to add the following lines in `netlify.toml`.

```
[build]
  publish = "public"

[[plugins]]
  package = "netlify-plugin-gatsby-cache"
```

*The first two lines are critical*. Adding them solved my problem. The problem was that I didn't include the first two lines because I created `netlify.toml` just when I read the blog.