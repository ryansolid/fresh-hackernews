/** @jsx h */
import { h, Fragment } from "preact";
import { Head } from "$fresh/runtime.ts";

export default ({ children }) => {
  return (
    <Fragment>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Astro Hackernews" />
        <link type="text/css" rel="stylesheet" href="/global.css" />
        <title>Fresh - Hacker News</title>
      </Head>
      <header class="header">
        <nav class="inner">
          <a href="/">
            <strong>HN</strong>
          </a>
          <a href="/new">
            <strong>New</strong>
          </a>
          <a href="/show">
            <strong>Show</strong>
          </a>
          <a href="/ask">
            <strong>Ask</strong>
          </a>
          <a href="/job">
            <strong>Jobs</strong>
          </a>
          <a
            class="github"
            href="https://fresh.deno.dev/"
            target="_blank"
            rel="noreferrer"
          >
            Built with Fresh
          </a>
        </nav>
      </header>
      <script></script>
      {children}
    </Fragment>
  );
};
