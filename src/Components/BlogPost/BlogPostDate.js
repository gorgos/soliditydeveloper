import * as React from "react";
import * as Scrivito from "scrivito";
import { formatDate } from "../../utils/formatDate";
import { ClientRender } from "../../Components/ClientRender";

export const BlogPostDate = Scrivito.connect(function BlogPostDate({ post }) {
  const date = post.get("publishedAt");
  if (!date) return null;

  return (
    <ClientRender>
      <Scrivito.ContentTag
        content={post}
        attribute="publishedAt"
        tag="time"
        className="blog-timeline--badge"
        dateTime={formatDate(date, "yyyy-mm")}
      >
        {formatDate(date, "mm/dd")}
      </Scrivito.ContentTag>
    </ClientRender>
  );
});
