/** @jsx h */
import { h } from "preact";
import Layout from "../components/Layout.tsx";
import Story from "../components/Story.tsx";
import { Handlers, PageProps } from "https://deno.land/x/fresh@1.0.1/server.ts";
import { IStory } from "../types.ts";
import fetchAPI from "../api.ts";

interface StoriesData {
  page: number;
  type: string;
  stories: IStory[];
}

const mapStories = {
  top: "news",
  new: "newest",
  show: "show",
  ask: "ask",
  job: "jobs",
};

export const handler: Handlers<StoriesData> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const page = +(url.searchParams.get('page') || 1);
    const type =  "top";

    const stories = await fetchAPI(
      `${mapStories[type as keyof mapStories]}?page=${page}`
    );
    return ctx.render({ page, type, stories });
  },
};

export default function Stories({ data: { stories, type, page } }: PageProps<StoriesData>) {
  return (
    <Layout>
      <div class="news-view">
        <div class="news-list-nav">
          {page > 1 ? (
            <a
              class="page-link"
              href={`${type}?page=${page - 1}`}
              aria-label="Previous Page"
            >
              {"<"} prev
            </a>
          ) : (
            <span class="page-link disabled" aria-hidden="true">
              {"<"} prev
            </span>
          )}
          <span>page {page}</span>
          {stories.length >= 28 ? (
            <a
              class="page-link"
              href={`${type}?page=${page + 1}`}
              aria-label="Next Page"
            >
              more {">"}
            </a>
          ) : (
            <span class="page-link" aria-hidden="true">
              more {">"}
            </span>
          )}
        </div>
        <main class="news-list">
          <ul>
            {stories.map((story) => (
              <Story story={story} />
            ))}
          </ul>
        </main>
      </div>
    </Layout>
  );
}