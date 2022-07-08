/** @jsx h */
import { h } from "preact";

import type { IStory } from "../../types.ts";
import Layout from "../../components/Layout.tsx";
import Comment from "../../islands/Comment.tsx";
import fetchAPI from "../../api.ts";
import { Handlers, PageProps } from "https://deno.land/x/fresh@1.0.1/server.ts";

export const handler: Handlers<IStory> = {
  async GET(_, ctx) {
    const story = await fetchAPI(`item/${ctx.params.id}`);
    return ctx.render(story);
  },
};

const Story = ({ data: story }: PageProps<IStory>) => {
  return (
    <Layout>
      {story && (
        <div className="item-view">
          <div className="item-view-header">
            <a href={story.url} target="_blank">
              <h1>{story.title}</h1>
            </a>
            {story.domain && <span className="host">({story.domain})</span>}
            <p className="meta">
              {story.points} points | by{" "}
              <a href={`/users/${story.user}`}>{story.user}</a> {story.time_ago}{" "}
              ago
            </p>
          </div>
          <div className="item-view-comments">
            <p className="item-view-comments-header">
              {story.comments_count
                ? story.comments_count + " comments"
                : "No comments yet."}
            </p>
            <ul className="comment-children">
              {story.comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Story;
