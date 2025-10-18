import { Mail, MapPin, Clock } from "lucide-react";
import { SiGithub, SiDiscord, SiYoutube } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import BackgroundGrid from "@/components/BackgroundGrid";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("KtS989S8h09hzUv4J");
    console.log("EmailJS initialized with public key: KtS989S8h09hzUv4J");
  }, []);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceId = "service_md5ydlc";
    const templateId = "template_gaz5ou9";

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_name: "Sebastian",
      reply_to: formData.email, // Add reply-to field
    };

    try {
      console.log("Sending email with params:", templateParams);
      const result = await emailjs.send(serviceId, templateId, templateParams);
      console.log("Email sent successfully:", result);
      
      toast({
        title: "message sent!",
        description: "i'll get back to you soon.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("EmailJS Full Error Object:", err);
      console.error("Error status:", err?.status);
      console.error("Error text:", err?.text);
      
      let errorMessage = "please try again later.";
      
      // Handle different error types
      if (err?.status === 400) {
        errorMessage = "Invalid request. Check your EmailJS configuration.";
      } else if (err?.status === 401) {
        errorMessage = "Unauthorized. Check your EmailJS public key.";
      } else if (err?.status === 404) {
        errorMessage = "Service or template not found. Check your IDs.";
      } else if (err?.text) {
        errorMessage = err.text;
      } else if (err?.message) {
        errorMessage = err.message;
      }
      
      toast({
        title: "oops, something went wrong",
        description: `Error: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      icon: Mail,
      label: "email",
      onClick: () => {
        navigator.clipboard.writeText("sebastiansuciu607@gmail.com");
        toast({
          title: "email copied!",
          description: "sebastiansuciu607@gmail.com copied to clipboard.",
        });
      },
      color: "hover:text-red-400",
    },
    {
      icon: SiGithub,
      label: "github",
      href: "https://github.com/sebashtioon",
      color: "hover:text-gray-300",
    },
    {
      icon: SiDiscord,
      label: "discord",
      href: "https://discord.com/users/1110329250306859018",
      color: "hover:text-blue-300",
    },
    {
      icon: SiYoutube,
      label: "youtube",
      href: "https://www.youtube.com/@sebashtioon_",
      color: "hover:text-red-400",
    },
  ];

  return (
    <div className="min-h-screen pt-24">
      <BackgroundGrid />

      {/* Header - Dynamic Layout */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-transparent rounded-full blur-2xl"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-12 animate-fade-in text-center">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 lowercase leading-tight">
                <span className="text-shimmer">contact</span> me
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto lowercase">
                wanna collab or do something cool? hmu
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="card-glow p-8 animate-fade-in lowercase">
              <h2 className="text-2xl font-bold mb-6 lowercase">send me an email</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2 lowercase">
                      your name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="gavin from expland"
                      required
                      className="bg-background/50 border-border/50 focus:border-accent-glow"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 lowercase">
                      email address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@gmail.com"
                      required
                      className="bg-background/50 border-border/50 focus:border-accent-glow"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2 lowercase">
                    subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="say hi or collab idea"
                    required
                    className="bg-background/50 border-border/50 focus:border-accent-glow"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 lowercase">
                    message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="email content blah blah"
                    rows={6}
                    required
                    className="bg-background/50 border-border/50 focus:border-accent-glow resize-none"
                  />
                </div>

                <Button type="submit" disabled={isSubmitting} className="btn-accent w-full py-6 text-lg lowercase">
                  {isSubmitting ? "sending..." : "send message"}
                </Button>
              </form>
            </Card>
          </div>

          {/* Contact Info & Social Links */}
          <div className="space-y-8">
            <Card className="card-glow p-6 animate-fade-in lowercase">
              <h3 className="text-xl font-semibold mb-4 lowercase">contact info</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="text-accent-glow" size={20} />
                  <div>
                    <div className="font-medium lowercase">email</div>
                    <div className="text-sm text-muted-foreground lowercase">sebastiansuciu607@gmail.com</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="text-accent-glow" size={20} />
                  <div>
                    <div className="font-medium lowercase">location</div>
                    <div className="text-sm text-muted-foreground lowercase">canberra, australia</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="text-accent-glow" size={20} />
                  <div>
                    <div className="font-medium lowercase">response time</div>
                    <div className="text-sm text-muted-foreground lowercase">
                      probably around 6-12 hours. my time zone is AEST (UTC+10)
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="card-glow p-6 animate-fade-in lowercase">
              <h3 className="text-xl font-semibold mb-4 lowercase">follow me</h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return social.onClick ? (
                    <button
                      key={social.label}
                      onClick={social.onClick}
                      className={`flex items-center space-x-3 p-3 rounded-lg border border-border/50 hover:border-border transition-all duration-300 ${social.color} lowercase`}
                    >
                      <Icon size={20} />
                      <span className="text-sm font-medium">{social.label}</span>
                    </button>
                  ) : (
                    <a
                      key={social.label}
                      href={social.href}
                      className={`flex items-center space-x-3 p-3 rounded-lg border border-border/50 hover:border-border transition-all duration-300 ${social.color} lowercase`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon size={20} />
                      <span className="text-sm font-medium">{social.label}</span>
                    </a>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
