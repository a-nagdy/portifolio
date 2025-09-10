"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import skillsData from "@/data/skills.json";
import { motion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import { EnhancedCard } from "./enhanced-card";

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(0);
  const currentSkills = useMemo(
    () => skillsData.categories[activeCategory].skills,
    [activeCategory]
  );
  const handleCategoryChange = useCallback((index: number) => {
    setActiveCategory(index);
  }, []);

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Skills & Expertise
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive overview of my technical skills and proficiency
              levels across different technologies
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {skillsData.categories.map((category, index) => (
              <motion.button
                key={category.title}
                onClick={() => handleCategoryChange(index)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeCategory === index
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-secondary text-foreground hover:bg-muted/80"
                }`}
                whileHover={{
                  scale: 1.05,
                  rotateX: 5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <span className="mr-2">{category.icon}</span>
                {category.title}
              </motion.button>
            ))}
          </div>

          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {currentSkills.map((skill, index) => (
              <EnhancedCard key={skill.name} index={index}>
                <Card className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold text-foreground">
                        {skill.name}
                      </h3>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: index * 0.1 + 0.3,
                          type: "spring",
                        }}
                      >
                        <Badge variant="secondary">{skill.level}%</Badge>
                      </motion.div>
                    </div>
                    <div className="space-y-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                      >
                        <Progress value={skill.level} className="h-2" />
                      </motion.div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Proficiency</span>
                        <motion.span
                          className="font-medium"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 + 0.7 }}
                        >
                          {skill.level >= 90
                            ? "Expert"
                            : skill.level >= 80
                            ? "Advanced"
                            : skill.level >= 70
                            ? "Intermediate"
                            : "Beginner"}
                        </motion.span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </EnhancedCard>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
              <CardHeader>
                <CardTitle className="text-center text-2xl text-foreground">
                  Professional Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">
                      {skillsData.stats.yearsExperience}
                    </div>
                    <div className="text-muted-foreground">
                      Years Experience
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">
                      {skillsData.stats.technologies}
                    </div>
                    <div className="text-muted-foreground">Technologies</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">
                      {skillsData.stats.companies}
                    </div>
                    <div className="text-muted-foreground">Companies</div>
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
