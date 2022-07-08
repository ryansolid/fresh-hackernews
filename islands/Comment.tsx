/** @jsx h */
import { h, Fragment } from "preact";
import { useState } from "preact/hooks";

import type { IComment } from "../types.ts";

const pluralize = (n: number) => n + (n === 1 ? " reply" : " replies");

const Comment = (props: { comment: IComment }) => {
  const [open, setOpen] = useState(true);

  return (
    <li className="comment">
      <div className="by">
        <a href={`/users/${props.comment.user}`}>{props.comment.user}</a>{" "}
        {props.comment.time_ago} ago
      </div>
      <div
        className="text"
        dangerouslySetInnerHTML={{ __html: props.comment.content }}
      />
      {props.comment.comments.length ? (
        <Fragment>
          <div className={open ? "toggle open" : "toggle"}>
            <a onClick={() => setOpen(!open)}>
              {open
                ? "[-]"
                : "[+] " +
                  pluralize(props.comment.comments.length) +
                  " collapsed"}
            </a>
          </div>
          {open && (
            <ul className="comment-children">
              {props.comment.comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </ul>
          )}
        </Fragment>
      ) : undefined}
    </li>
  );
};

export default Comment;
