import * as React from "react";
import * as Scrivito from "scrivito";

import Disqus from "disqus-react";
import BlogPostAuthor from "../../Components/BlogPost/BlogPostAuthor";
import BlogPostMorePosts from "../../Components/BlogPost/BlogPostMorePosts";
import BlogPostNavigation from "../../Components/BlogPost/BlogPostNavigation";
import BlogPostTagList from "../../Components/BlogPost/BlogPostTagList";
import SchemaDotOrg from "../../Components/SchemaDotOrg";

Scrivito.provideComponent("BlogPost", ({ page }) => {
  const disqusShortname = "soliditydeveloper-com";
  const disqusConfig = {
    url: Scrivito.urlFor(page),
    identifier: page.id(),
    title: page.get("title"),
  };

  return (
    <div>
      <BlogPostNavigation currentPost={page} />
      <section className="bg-white">
        <div className="container">
          <Scrivito.ContentTag
            tag="h1"
            className="h2"
            content={page}
            attribute="title"
          />
          <Scrivito.ContentTag
            tag="h2"
            className="h4"
            content={page}
            attribute="subtitle"
          />
        </div>
      </section>
      <Scrivito.ContentTag tag="div" content={page} attribute="body" />

      {!Scrivito.isInPlaceEditingActive() && (
        <div className="container">
          <Disqus.DiscussionEmbed
            shortname={disqusShortname}
            config={disqusConfig}
          />
          g
        </div>
      )}

      <BlogPostAuthor author={page.get("author")} />
      <BlogPostTagList tags={page.get("tags")} />
      <BlogPostMorePosts
        author={page.get("author")}
        filterBlogPostId={page.id()}
      />
      <SchemaDotOrg content={page} />
    </div>
  );
});
