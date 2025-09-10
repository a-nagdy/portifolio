"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import projectsData from "@/data/projects.json";
import { motion } from "framer-motion";
import { Calendar, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { EnhancedCard } from "./enhanced-card";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Featured Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A showcase of my professional work across different companies and
              technologies
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {projectsData.projects.map((project, index) => (
              <EnhancedCard key={project.id} index={index} className="h-full">
                <Card className="group overflow-hidden bg-card border-border relative hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                  <div className="relative overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={500}
                        height={300}
                        className="w-full h-48 object-cover"
                      />
                      {project.underDevelopment && (
                        <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
                          <span className="text-foreground text-lg font-bold">
                            Under Development
                          </span>
                        </div>
                      )}
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute top-4 left-4">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Badge
                          variant="secondary"
                          className="bg-background/80 backdrop-blur-sm text-foreground"
                        >
                          {project.type}
                        </Badge>
                      </motion.div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Badge
                          variant="outline"
                          className="bg-background/80 backdrop-blur-sm"
                        >
                          {project.company}
                        </Badge>
                      </motion.div>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="w-4 h-4" />
                      {project.period}
                    </div>
                    <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="pt-0 flex-1 flex flex-col">
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>

                    <motion.div
                      className="flex flex-wrap gap-2 mb-6"
                      initial="hidden"
                      whileInView="visible"
                      variants={{
                        visible: {
                          transition: {
                            staggerChildren: 0.1,
                          },
                        },
                      }}
                    >
                      {project?.technologies
                        ?.slice(0, 3)
                        .map((tech, techIndex) => (
                          <motion.div
                            key={tech}
                            variants={{
                              hidden: { opacity: 0, scale: 0.8 },
                              visible: { opacity: 1, scale: 1 },
                            }}
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Badge variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          </motion.div>
                        ))}
                      {project.technologies.length > 3 && (
                        <motion.div
                          variants={{
                            hidden: { opacity: 0, scale: 0.8 },
                            visible: { opacity: 1, scale: 1 },
                          }}
                          whileHover={{ scale: 1.1 }}
                        >
                          <Badge variant="outline" className="text-xs">
                            +{project.technologies.length - 3} more
                          </Badge>
                        </motion.div>
                      )}
                    </motion.div>

                    <div className="flex gap-3 mt-auto">
                      <motion.div
                        className="flex-1"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          size="sm"
                          variant="default"
                          asChild
                          className="w-full"
                          disabled={!project.liveUrl}
                        >
                          {project.liveUrl ? (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              View Project
                            </a>
                          ) : (
                            <span>Smart Screen (In Store)</span>
                          )}
                        </Button>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {project?.githubUrl && (
                          <Button size="sm" variant="outline" asChild>
                            <a
                              href={project?.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </EnhancedCard>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">
                      {projectsData.stats.projectsCompleted}
                    </div>
                    <div className="text-muted-foreground">
                      Projects Completed
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">
                      {projectsData.stats.companiesWorked}
                    </div>
                    <div className="text-muted-foreground">
                      Companies Worked
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">
                      {projectsData.stats.clientSatisfaction}
                    </div>
                    <div className="text-muted-foreground">
                      Client Satisfaction
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">
                      {projectsData.stats.yearsExperience}
                    </div>
                    <div className="text-muted-foreground">
                      Years Experience
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
