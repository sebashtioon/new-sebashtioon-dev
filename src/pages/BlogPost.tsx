import ProsePage from "@/components/ProsePage";
import { blogPosts } from "@/content/blogPosts";
import { Link, useParams } from "react-router-dom";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <ProsePage
        title="blog"
        breadcrumb={
          <>
            <Link to="/blog" className="hover:text-foreground transition-colors">
              blog
            </Link>
            <span className="mx-2">/</span>
            <span className="text-muted-foreground">not found</span>
          </>
        }
        subtitle={
          <span className="lowercase">this post does not exist (yet).</span>
        }
      >
        <p className="lowercase">
          if you typed the url by hand, you probably invented a new post.
        </p>
        <p className="lowercase">
          go back to the <Link className="underline" to="/blog">blog index</Link>.
        </p>
      </ProsePage>
    );
  }

  return (
    <ProsePage
      title={post.title}
      breadcrumb={
        <>
          <Link to="/blog" className="hover:text-foreground transition-colors">
            blog
          </Link>
          <span className="mx-2">/</span>
          <span className="text-muted-foreground">{post.slug}</span>
        </>
      }
      subtitle={
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-muted-foreground">{post.date}</span>
          <span className="text-muted-foreground/60">•</span>
          <span className="text-muted-foreground">{post.summary}</span>
        </div>
      }
    >
      {post.content}
    </ProsePage>
  );
};

export default BlogPost;
