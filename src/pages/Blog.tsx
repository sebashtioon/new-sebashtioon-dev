import ProsePage from "@/components/ProsePage";
import { blogPosts } from "@/content/blogPosts";
import { Link } from "react-router-dom";

const Blog = () => {
  return (
    <ProsePage
      title="blog"
      subtitle={
        <span className="lowercase">
          short notes, devlogs, and whatever else survives long enough to get posted.
        </span>
      }
    >
      <section className="space-y-3">
        <h2 className="text-xl font-bold font-serif lowercase">posts</h2>
        <div className="space-y-4">
          {blogPosts.map((p) => (
            <div key={p.slug} className="border-b border-border/30 pb-4">
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground lowercase">
                <span>{p.date}</span>
                <span className="text-muted-foreground/60">•</span>
                <span>{p.slug}</span>
              </div>

              <Link
                to={`/blog/${p.slug}`}
                className="inline-block mt-1 text-lg font-bold lowercase hover:underline"
              >
                {p.title}
              </Link>

              <p className="mt-2 text-muted-foreground lowercase leading-relaxed">
                {p.summary}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold font-serif lowercase">house style</h2>
        <ul className="list-disc pl-6 lowercase text-foreground/90">
          <li>i prefer blunt writing over vibes.</li>
          <li>if something is unfinished, i will say so.</li>
          <li>if a post is wrong later, ill update it.</li>
        </ul>
      </section>
    </ProsePage>
  );
};

export default Blog;
