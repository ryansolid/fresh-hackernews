/** @jsx h */
import { h, Fragment } from "preact";
import type { IStory } from "../types.ts";

const Story = (props: { story: IStory }) => {
  return (
    <li className="news-item">
      <span className="score">{props.story.points}</span>
      <span className="title">
        {props.story.url && !props.story.url.startsWith("item?id=") ? (
          <Fragment>
            <a href={props.story.url} target="_blank" rel="noreferrer">
              {props.story.title}
            </a>
            <span className="host"> ({props.story.domain})</span>
          </Fragment>
        ) : (
          <a href={`/item/${props.story.id}`}>{props.story.title}</a>
        )}
      </span>
      <br />
      <span className="meta">
        {props.story.type !== "job" ? (
          <Fragment>
            by <a href={`/users/${props.story.user}`}>{props.story.user}</a>{" "}
            {props.story.time_ago} |{" "}
            <a href={`/stories/${props.story.id}`}>
              {props.story.comments_count
                ? `${props.story.comments_count} comments`
                : "discuss"}
            </a>
          </Fragment>
        ) : (
          <a href={`/stories/${props.story.id}`}>{props.story.time_ago}</a>
        )}
      </span>
      {props.story.type !== "a" && (
        <Fragment>
          {" "}
          <span className="label">{props.story.type}</span>
        </Fragment>
      )}
    </li>
  );
};

export default Story;
