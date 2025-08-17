import { SiGithub, SiDiscord, SiYoutube } from "react-icons/si";
import { MdEmail } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";  
import BackgroundGrid from "@/components/BackgroundGrid";

const Home = () => {
  return (
    <div className="min-h-screen">
      <BackgroundGrid />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 lowercase">
              <span className="text-shimmer">yo, i'm sebashtioon</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in-delay lowercase">
              just a 15-year-old experimenting with games, code, and 3D stuff
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-delay">
              <Link to="/projects">
                <Button className="btn-hero text-lg px-8 py-6 group lowercase">
                  see my work
                </Button>
              </Link>
              
              <Button className="btn-accent text-lg px-8 py-6 lowercase">
                download resume
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Skills Overview */}
      <section className="py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            
            <div className="card-glow p-8 animate-fade-in lowercase">
              <h3 className="text-xl font-semibold mb-3">game development</h3>
              <p className="text-muted-foreground text-center">
                making 2d & 3d games, designing mechanics, and building cool stuff in godot
              </p>
            </div>

            <div className="card-glow p-8 animate-fade-in delay-200 lowercase">
              <h3 className="text-xl font-semibold mb-3">3d art & animation</h3>
              <p className="text-muted-foreground text-center">
                modeling & animating low-poly 3d assets, worlds, and characters in blender
              </p>
            </div>

            <div className="card-glow p-8 animate-fade-in delay-400 lowercase">
              <h3 className="text-xl font-semibold mb-3">programming</h3>
              <p className="text-muted-foreground text-center">
                writing scripts & building systems in gdscript, c++, and python for games & tools
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="card-glow p-12 animate-fade-in lowercase">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              wanna <span className="fast-text-shimmer">do something?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 lowercase">
              open to collabs and pretty much anything.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-9">
              <Link to="/contact">
                <Button className="btn-hero text-lg px-8 py-6 lowercase">
                  hmu
                </Button>
              </Link>
            </div>

            <div className="flex gap-4 justify-center">
              <a href="#" target="_blank" className="btn-accent p-6 flex items-center justify-center rounded-s-full">
                <SiGithub size={24} />
              </a>

              <a href="#" target="_blank" className="btn-accent p-6 flex items-center justify-center">
                <SiDiscord size={24} />
              </a>

              <a href="#" target="_blank" className="btn-accent p-6 flex items-center justify-center">
                <SiYoutube size={24} />
              </a>

              <a href="mailto:youremail@example.com" className="btn-accent p-6 flex items-center justify-center rounded-e-full">
                <MdEmail size={24} />
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
