import * as React from "react";
import * as Scrivito from "scrivito";
import { groupBy, truncate } from "lodash-es";
import BlogPostDate from "./BlogPostDate";
import ShowMoreButton from "../../Objs/SearchResults/ShowMoreButton";
import formatDate from "../../utils/formatDate";
import InPlaceEditingPlaceholder from "../InPlaceEditingPlaceholder";
import isImage from "../../utils/isImage";

class BlogPostPreviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { maxItems: this.props.maxItems };

    this.incrementMaxItems = this.incrementMaxItems.bind(this);
    this.calculateResults = this.calculateResults.bind(this);
  }

  calculateResults() {
    let blogPosts = Scrivito.getClass("BlogPost")
      .all()
      .order("publishedAt", "desc");
    if (this.props.author) {
      blogPosts = blogPosts.and("author", "refersTo", this.props.author);
    }
    if (this.props.tag) {
      blogPosts = blogPosts.and("tags", "equals", this.props.tag);
    }
    if (this.props.filterBlogPostId) {
      blogPosts = blogPosts.andNot("id", "equals", this.props.filterBlogPostId);
    }

    // if (maxItems) {
    //   posts = blogPosts.take(maxItems);
    // } else {
    //   posts = [...blogPosts];
    // }

    return {
      posts: blogPosts.take(this.state.maxItems),
      totalCount: blogPosts.count(),
    };
  }

  render() {
    const { posts, totalCount } = this.calculateResults();

    if (!totalCount) {
      return (
        <InPlaceEditingPlaceholder center>
          There are no blog posts. Create one using the page menu.
        </InPlaceEditingPlaceholder>
      );
    }

    const months = groupBy(posts, (post) => {
      const publishedAt = post.get("publishedAt");
      return publishedAt && formatDate(publishedAt, "mmmm yyyy");
    });

    return (
      <React.Fragment>
        {Object.entries(months).map(([month, monthPosts]) => (
          <React.Fragment key={`month: ${month}`}>
            <MonthHeadline date={monthPosts[0].get("publishedAt")} />
            <PostsTimeline posts={monthPosts} />
          </React.Fragment>
        ))}
        <ShowMoreButton
          totalCount={totalCount}
          currentMaxItems={this.state.maxItems}
          onClick={this.incrementMaxItems}
        />
      </React.Fragment>
    );
  }

  incrementMaxItems() {
    this.setState({ maxItems: this.state.maxItems + this.props.maxItems });
  }
}

const MonthHeadline = Scrivito.connect(({ date }) => {
  if (!date) {
    return null;
  }

  return (
    <div className="blog-timeline--divider">
      <time dateTime={formatDate(date, "yyyy-mm")}>
        {formatDate(date, "mmmm yyyy")}
      </time>
    </div>
  );
});

const PostsTimeline = Scrivito.connect(({ posts }) => (
  <ul className="blog-timeline">
    {posts.map((post) => (
      <BlogPostPreview key={post.id()} post={post} />
    ))}
  </ul>
));

const BlogPostPreview = Scrivito.connect(({ post }) => {
  return (
    <li>
      <BlogPostDate post={post} />
      <div className="blog-timeline--panel">
        <div className="blog-timeline--body">
          <BlogPostTitleImage post={post} />
          <h3>
            <Scrivito.LinkTag to={post}>{post.get("title")}</Scrivito.LinkTag>
          </h3>
          <h4>{post.get("subtitle")}</h4>
          <p>
            {truncate(Scrivito.extractText(post, { length: 330 }), {
              length: 300,
              separator: /,? +/,
            })}
          </p>
        </div>
        <div className="blog-timeline--footer">
          <Scrivito.LinkTag to={post} className="btn btn-clear">
            Read more
            <i className="fa fa-angle-right fa-4" aria-hidden="true" />
          </Scrivito.LinkTag>
        </div>
      </div>
    </li>
  );
});

const BlogPostTitleImage = Scrivito.connect(({ post }) => {
  const titleImage = post.get("titleImage");
  if (!isImage(titleImage)) {
    return null;
  }

  return (
    <Scrivito.LinkTag to={post}>
      <Scrivito.ImageTag
        content={titleImage}
        className="img-responsive"
        alt={titleImage.get("alternativeText")}
      />
    </Scrivito.LinkTag>
  );
});

export default Scrivito.connect(BlogPostPreviewList);
