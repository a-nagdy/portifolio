"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import personalData from "@/data/personal.json";
import { Download } from "lucide-react";

export function AboutSection() {
  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = personalData.cvFile;
    link.download = `${personalData.name.replace(" ", "_")}_CV.pdf`;
    link.click();
  };

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
            About Me
          </h2>

          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    {personalData.bio.summary}
                  </p>

                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    {personalData.bio.description}
                  </p>
                </div>

                <Button
                  onClick={handleDownloadCV}
                  className="ml-6 gap-2 bg-transparent"
                  variant="outline"
                >
                  <Download className="w-4 h-4" />
                  Download CV
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {personalData.softSkills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* <div className="grid md:grid-cols-1 gap-6 max-w-md mx-auto">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Languages</h3>
                <div className="space-y-2">
                  {personalData.languages.map((language) => (
                    <div key={language.name} className="flex justify-between">
                      <span className="text-foreground">{language.name}</span>
                      <span className="text-muted-foreground">{language.level}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div> */}
        </div>
      </div>
    </section>
  );
}
