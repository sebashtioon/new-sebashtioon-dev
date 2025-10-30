import BackgroundGrid from "@/components/BackgroundGrid";
import BottomNav from "@/components/BottomNav";

const Blog = () => {
  return (
    <div className="h-screen overflow-hidden">
      <BackgroundGrid />
      
      <section className="h-screen flex items-center justify-center px-4 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-left animate-fade-in">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 lowercase leading-tight font-serif">
                <span className="text-foreground">blog</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl lowercase leading-relaxed">
                this page is in the works
              </p>
            </div>
          </div>
        </div>
      </section>

      <BottomNav />
    </div>
  );
};

export default Blog;