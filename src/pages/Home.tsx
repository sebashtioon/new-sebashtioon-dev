import { ArrowRight, Download, Github, Linkedin } from "lucide-react";
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
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-gradient">Game Developer</span>
              <br />
              <span className="text-foreground">& 3D Artist</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in-delay">
              15-year-old passionate creator crafting immersive games and stunning 3D worlds with code and creativity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-delay">
              <Link to="/projects">
                <Button className="btn-hero text-lg px-8 py-6 group">
                  View My Work
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Button>
              </Link>
              
              <Button className="btn-accent text-lg px-8 py-6">
                <Download className="mr-2" size={20} />
                Download Resume
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Skills Overview */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-glow p-8 text-center animate-fade-in">
              <div className="w-16 h-16 bg-gradient-accent rounded-xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🎮</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Game Development</h3>
              <p className="text-muted-foreground">
                Creating interactive experiences with Unity, C#, and creative gameplay mechanics.
              </p>
            </div>
            
            <div className="card-glow p-8 text-center animate-fade-in delay-200">
              <div className="w-16 h-16 bg-gradient-accent rounded-xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">3D Art & Animation</h3>
              <p className="text-muted-foreground">
                Crafting detailed 3D models, environments, and animations using Blender.
              </p>
            </div>
            
            <div className="card-glow p-8 text-center animate-fade-in delay-400">
              <div className="w-16 h-16 bg-gradient-accent rounded-xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">💻</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Programming</h3>
              <p className="text-muted-foreground">
                Building robust systems with C#, Python, and exploring new technologies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="card-glow p-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Let's Create Something <span className="text-gradient">Amazing</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Ready to collaborate or just want to chat about games and 3D art?
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button className="btn-hero text-lg px-8 py-6">
                  Get In Touch
                </Button>
              </Link>
              
              <div className="flex gap-4">
                <Button variant="outline" size="lg" className="p-6">
                  <Github size={24} />
                </Button>
                <Button variant="outline" size="lg" className="p-6">
                  <Linkedin size={24} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;