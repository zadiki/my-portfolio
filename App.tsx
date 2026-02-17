import React, { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  ChevronRight,
  Code,
  Server,
  Cloud,
  Cpu,
  Database,
  Smartphone,
  CheckCircle2,
  Calendar,
  ExternalLink,
  MessageSquare,
  X,
  Send,
  Loader2,
} from "lucide-react";
import { portfolioData } from "./data";
// import { GoogleGenAI } from '@google/genai';

// --- Sub-components ---

const SectionHeading: React.FC<{ title: string; subtitle?: string }> = ({
  title,
  subtitle,
}) => (
  <div className="mb-12">
    <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
    {subtitle && <p className="text-gray-600">{subtitle}</p>}
    <div className="h-1.5 w-20 bg-blue-600 rounded-full mt-4"></div>
  </div>
);

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "dark-glass py-3 shadow-lg" : "bg-transparent py-6"}`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <span
          className={`text-xl font-bold tracking-tight ${isScrolled ? "text-white" : "text-gray-900"}`}
        >
          ZADIKI. Hassan
        </span>
        <div
          className={`hidden md:flex gap-8 text-sm font-medium ${isScrolled ? "text-gray-300" : "text-gray-600"}`}
        >
          {["About", "Experience", "Skills", "Achievements", "Education"].map(
            (item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-blue-500 transition-colors"
              >
                {item}
              </a>
            ),
          )}
        </div>
        <a
          href={`mailto:${portfolioData.email}`}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
        >
          Hire Me
        </a>
      </div>
    </nav>
  );
};

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    { role: "user" | "bot"; text: string }[]
  >([
    {
      role: "bot",
      text: "Hi! I'm Zadiki's AI assistant. You can ask me about his experience, skills, or even his work in Nairobi!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = input;
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMessage,
        config: {
          systemInstruction: `
            You are an AI assistant for Zadiki Ochola Hassan, a Senior Full Stack Engineer.
            Use his CV data to answer questions: ${JSON.stringify(portfolioData)}.
            Keep responses professional, concise, and helpful. 
            If asked about personal things not in the CV, kindly state you only have information regarding his professional career.
          `,
        },
      });
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: response.text || "I'm sorry, I couldn't process that.",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Oops, something went wrong with the AI connection.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen ? (
        <div className="bg-white rounded-2xl shadow-2xl w-80 md:w-96 flex flex-col overflow-hidden border border-gray-100 h-[500px]">
          <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center">
                <Cpu size={16} />
              </div>
              <span className="font-semibold">Career Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-blue-500 p-1 rounded transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${m.role === "user" ? "bg-blue-600 text-white rounded-br-none" : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-none"}`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-2">
                  <Loader2 className="animate-spin text-blue-600" size={16} />
                  <span className="text-xs text-gray-500">Thinking...</span>
                </div>
              </div>
            )}
          </div>
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about Zadiki..."
                className="flex-1 text-sm bg-gray-100 border-none focus:ring-2 focus:ring-blue-500 rounded-lg px-4"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-xl transition-all hover:scale-110 active:scale-95 group"
        >
          <MessageSquare className="group-hover:rotate-12 transition-transform" />
        </button>
      )}
    </div>
  );
};

// --- Page Sections ---

const Hero: React.FC = () => (
  <section
    id="about"
    className="relative min-h-screen flex items-center pt-20 overflow-hidden"
  >
    {/* Abstract Background Elements */}
    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[120px] -mr-60 -mt-20 z-0"></div>
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50/50 rounded-full blur-[80px] -ml-40 -mb-20 z-0"></div>

    <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-12 gap-12 items-center">
      <div className="md:col-span-7 space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          Available for new opportunities
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-[1.1]">
          Building <span className="text-blue-600">scalable</span> software for
          the next billion users.
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
          {portfolioData.summary}
        </p>
        <div className="flex flex-wrap gap-4 pt-4">
          <a
            href="#experience"
            className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg hover:-translate-y-1"
          >
            View Experience
          </a>
          <a
            href="#skills"
            className="bg-white border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-bold hover:border-blue-200 hover:bg-blue-50 transition-all"
          >
            See Tech Stack
          </a>
        </div>
        <div className="flex gap-6 pt-6">
          <a
            href={`https://${portfolioData.linkedin}`}
            target="_blank"
            className="text-gray-400 hover:text-blue-600 transition-colors"
          >
            <Linkedin size={24} />
          </a>
          <a
            href={`https://${portfolioData.github}`}
            target="_blank"
            className="text-gray-400 hover:text-gray-900 transition-colors"
          >
            <Github size={24} />
          </a>
          <a
            href={`mailto:${portfolioData.email}`}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Mail size={24} />
          </a>
        </div>
      </div>
      <div className="md:col-span-5 hidden md:block">
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
          <img
            src="/img/profile.jpeg"
            alt="Zadiki Ochola Hassan"
            className="relative rounded-3xl shadow-2xl object-cover grayscale hover:grayscale-0 transition-all duration-700 w-full aspect-[4/5]"
          />
          <div className="absolute bottom-6 -right-6 glass p-6 rounded-2xl shadow-xl space-y-2 border border-white/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg text-white">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                  Expertise
                </p>
                <p className="text-sm font-bold text-gray-900">
                  Senior Full Stack
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Experience: React.FC = () => (
  <section id="experience" className="py-24 bg-white">
    <div className="container mx-auto px-6">
      <SectionHeading
        title="Work Experience"
        subtitle="A timeline of professional growth and contributions"
      />
      <div className="space-y-12">
        {portfolioData.experience.map((exp, index) => (
          <div
            key={index}
            className="relative pl-8 border-l-2 border-gray-100 pb-12 last:pb-0 group"
          >
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-blue-600 group-hover:bg-blue-600 transition-colors"></div>
            <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-2">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{exp.role}</h3>
                <p className="text-blue-600 font-semibold">{exp.company}</p>
              </div>
              <div className="flex flex-col md:items-end text-sm text-gray-500 font-medium">
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  {exp.period}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={14} />
                  {exp.location}
                </div>
              </div>
            </div>
            <ul className="grid md:grid-cols-2 gap-4 mt-6">
              {exp.description.map((desc, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-gray-600 text-sm leading-relaxed"
                >
                  <ChevronRight
                    size={16}
                    className="text-blue-600 shrink-0 mt-0.5"
                  />
                  {desc}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Skills: React.FC = () => {
  const getIcon = (category: string) => {
    switch (category) {
      case "Languages & Core":
        return <Code size={20} />;
      case "Frontend":
        return <Cpu size={20} />;
      case "Backend & Frameworks":
        return <Server size={20} />;
      case "Data & Database":
        return <Database size={20} />;
      case "Cloud & DevOps":
        return <Cloud size={20} />;
      default:
        return <Smartphone size={20} />;
    }
  };

  return (
    <section id="skills" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <SectionHeading
          title="Technical Ecosystem"
          subtitle="The tools and technologies I use to bring ideas to life"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.skills.map((cat, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  {getIcon(cat.category)}
                </div>
                <h3 className="font-bold text-gray-900">{cat.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Achievements: React.FC = () => (
  <section id="achievements" className="py-24 bg-white">
    <div className="container mx-auto px-6">
      <SectionHeading
        title="Key Achievements"
        subtitle="Highlighted impact from my professional journey"
      />
      <div className="grid md:grid-cols-3 gap-8">
        {portfolioData.achievements.map((ach, index) => (
          <div
            key={index}
            className="group relative p-8 bg-gray-900 rounded-3xl overflow-hidden hover:scale-[1.02] transition-transform duration-300"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 text-white group-hover:scale-110 transition-transform">
              {ach.icon === "building" && <Code size={80} />}
              {ach.icon === "users" && <Smartphone size={80} />}
              {ach.icon === "shopping-cart" && <Database size={80} />}
            </div>
            <h3 className="text-xl font-bold text-white mb-4 relative z-10">
              {ach.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed relative z-10">
              {ach.description}
            </p>
            <div className="mt-8 flex items-center gap-2 text-blue-400 font-bold text-sm">
              Impact Delivered <ChevronRight size={14} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Footer: React.FC = () => (
  <footer className="bg-gray-900 text-white py-20">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 pb-12 border-b border-gray-800">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">
            Let's build something{" "}
            <span className="text-blue-500">incredible</span> together.
          </h2>
          <p className="text-gray-400 max-w-lg">
            Experienced in leading teams and shipping production-ready
            applications across diverse sectors.
          </p>
          <div className="flex gap-4">
            <a
              href={`mailto:${portfolioData.email}`}
              className="bg-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
            >
              Get In Touch
            </a>
            <a
              href={`https://${portfolioData.linkedin}`}
              className="border border-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors"
            >
              LinkedIn Profile
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-12 gap-y-6">
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
              Location
            </h4>
            <p className="text-gray-300">{portfolioData.location}</p>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
              Email
            </h4>
            <p className="text-gray-300">{portfolioData.email}</p>
          </div>
        </div>
      </div>
      <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500 font-medium">
        <p>
          © {new Date().getFullYear()} Zadiki Ochola Hassan. All rights
          reserved.
        </p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Cookie Policy
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Experience />
      <Skills />
      <Achievements />

      {/* Education Section Inline for simplicity */}
      <section id="education" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <SectionHeading title="Education" />
          {portfolioData.education.map((edu, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900">
                  {edu.degree}
                </h3>
                <p className="text-blue-600 font-semibold">{edu.institution}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} /> {edu.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> {edu.period}
                  </span>
                </div>
              </div>
              <div className="p-4 bg-blue-50 rounded-2xl">
                <ExternalLink size={24} className="text-blue-600" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      {/* <ChatBot /> */}
    </div>
  );
}
