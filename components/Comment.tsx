/** @jsx h */
import { h } from "preact";
import type { IComment } from "../types.ts";
import Toggle from '../islands/Toggle.tsx';

const Comment = (props) => {
  return (
    <li className="comment">
      <div className="by">
        <a href={`/users/${props.comment.user}`}>{props.comment.user}</a>{' '}
        {props.comment.time_ago} ago
      </div>
      <div
        className="text"
        dangerouslySetInnerHTML={{ __html: props.comment.content }}
      />
      {props.comment.comments.length ? (
        <Toggle>
          {props.comment.comments.map((nested: IComment) => (
            <Comment key={nested.id} comment={nested} />
          ))}
        </Toggle>
      ) : (
        undefined
      )}
    </li>
  );
};

export default Comment;
