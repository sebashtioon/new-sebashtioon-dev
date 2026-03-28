import ProsePage from "@/components/ProsePage";
import { blogPosts } from "@/content/blogPosts";
import { Link } from "react-router-dom";

const Blog = () => {
  return (
    <ProsePage
      title="blog"
      subtitle={
        <span className="lowercase">
          short notes and shit. mostly about what im making or thinking abt
        </span>
      }
    >
      <section className="space-y-3">
        <h2 className="text-2xl font-bold font-serif lowercase">posts</h2>
        <div className="space-y-5">
          {blogPosts.map((p, index) => {
            const postNumber = String(blogPosts.length - index).padStart(2, "0");

            return (
            <article
              key={p.slug}
              className="border border-border/40 bg-card/40 p-4 md:p-5"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground lowercase">
                <span className="px-2 py-0.5 border border-border/50">post {postNumber}</span>
                <span>{p.date}</span>
                <span className="text-muted-foreground/60">•</span>
                <span>{p.slug}</span>
              </div>

              <Link
                to={`/blog/${p.slug}`}
                className="inline-block mt-2 text-lg md:text-xl font-bold lowercase hover:underline"
              >
                {p.title}
              </Link>

              <p className="mt-2 text-muted-foreground lowercase leading-relaxed">
                {p.summary}
              </p>

              <div className="mt-4">
                <Link
                  to={`/blog/${p.slug}`}
                  className="inline-flex items-center px-3 py-1.5 border border-border text-sm lowercase hover:bg-card"
                >
                  read post
                </Link>
              </div>
            </article>
            );
          })}
        </div>
      </section>
    </ProsePage>
  );
};

export default Blog;