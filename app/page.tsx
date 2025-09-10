"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Github, Mail, MapPin, Phone } from "lucide-react";
import { Suspense, lazy, useCallback, useMemo } from "react";

const Canvas = lazy(() =>
  import("@react-three/fiber").then((module) => ({ default: module.Canvas }))
);
const Scene3D = lazy(() =>
  import("@/components/scene-3d").then((module) => ({
    default: module.Scene3D,
  }))
);
const AboutSection = lazy(() =>
  import("@/components/about-section").then((module) => ({
    default: module.AboutSection,
  }))
);
const SkillsSection = lazy(() =>
  import("@/components/skills-section").then((module) => ({
    default: module.SkillsSection,
  }))
);
const ProjectsSection = lazy(() =>
  import("@/components/projects-section").then((module) => ({
    default: module.ProjectsSection,
  }))
);
const ContactSection = lazy(() =>
  import("@/components/contact-section").then((module) => ({
    default: module.ContactSection,
  }))
);

function LoadingFallback({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function Portfolio() {
  const cvContent = useMemo(
    () => `
AHMED MOHAMED - SOFTWARE DEVELOPER
Contact: 01090065807 | ahmednagdy165@gmail.com
GitHub: https://github.com/a-nagdy
Location: Egypt, Cairo, Nasr City

PROFILE:
A highly motivated Full-Stack Developer with 3+ Years of experience in developing
and implementing user-friendly websites and applications using React, NextJS and
Magento2. Skilled in developing responsive and interactive web designs, proficient
in JavaScript, HTML, CSS, Magento2, ReactJS And Next.JS, Possessing strong
analytical and problem-solving skills, with a passion for staying up-to-date with the
latest technologies and trends in the industry.

SKILLS:
Languages: HTML, CSS, JavaScript, TypeScript
Libraries: React, Bootstrap, Tailwind, Redux, Router
Frameworks: Next.js, Jest, Magento 2
Runtime Environment: NodeJs
Database's: SQL/MySql, NoSql/MongoDB
API: Rest, GraphQL

WORK EXPERIENCE:
UniParticle (Sep 2024 - Present)
- Worked on revamping APIs, marketplaces, and dashboards for the Aman website using Magento 2 backend
- Designed and implemented multiple modules, enhancing functionality and performance
- Developed and maintained dynamic web and mobile applications using React and React Native
- Integrated payment gateways and shipping providers

2B (Jul 2024 - Apr 2025)
- Specialized in Frontend Magento development
- Crafted and maintained front-end code for Magento-based platforms
- Developed and maintained kiosk smart screen interfaces for in-store digital experiences

DB Group (May 2024 - Present)
- Developed and maintained websites using ReactJS, Astro.js, and Next.js
- Utilized Node.js for backend development
- Integrated multiple backend services to streamline workflows

Raneen (Dec 2023 - Jul 2024)
- Specialized in Frontend Magento development
- Crafted and maintained front-end code for Magento-based platforms
- Collaborated with cross-functional teams to implement dynamic web solutions

2B (Jun 2022 - Dec 2023)
- Maintained web pages, graphics, and online marketing materials
- Created and maintained front-end code for e-Commerce websites
- Conducted performance optimization and scalability testing

EDUCATION:
Faculty of Law English Section (2015 - 2020)

LANGUAGES:
Arabic, English
  `,
    []
  );

  const handleDownloadCV = useCallback(() => {
    const blob = new Blob([cvContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Ahmed_Mohamed_CV.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [cvContent]);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Ahmed Mohamed</h1>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6">
              <a
                href="#about"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </a>
              <a
                href="#skills"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Skills
              </a>
              <a
                href="#projects"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Projects
              </a>
              <a
                href="#contact"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </a>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section with 3D Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Canvas Background */}
        <div className="absolute inset-0 z-0">
          <Suspense fallback={<LoadingFallback className="h-full" />}>
            <Canvas
              camera={{ position: [0, 0, 5], fov: 75 }}
              dpr={[1, 2]}
              performance={{ min: 0.5 }}
            >
              <Suspense fallback={null}>
                <Scene3D />
              </Suspense>
            </Canvas>
          </Suspense>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="mb-6">
            <Badge variant="secondary" className="mb-4">
              Full Stack Developer
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance">
              Ahmed Mohamed
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
              3+ Years of experience crafting exceptional web experiences with
              React, Next.js, and Magento2
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button onClick={handleDownloadCV} size="lg" className="gap-2">
              <Download className="w-5 h-5" />
              Download CV
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a
                href="https://github.com/a-nagdy"
                target="_blank"
                rel="noopener noreferrer"
                className="gap-2"
              >
                <Github className="w-5 h-5" />
                GitHub Profile
              </a>
            </Button>
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              01090065807
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              ahmednagdy165@gmail.com
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Cairo, Egypt
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<LoadingFallback className="py-20" />}>
        <AboutSection />
      </Suspense>

      <Suspense fallback={<LoadingFallback className="py-20" />}>
        <SkillsSection />
      </Suspense>

      <Suspense fallback={<LoadingFallback className="py-20" />}>
        <ProjectsSection />
      </Suspense>

      <Suspense fallback={<LoadingFallback className="py-20" />}>
        <ContactSection />
      </Suspense>
    </div>
  );
}
