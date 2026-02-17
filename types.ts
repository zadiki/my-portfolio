
export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
}

export interface Achievement {
  title: string;
  description: string;
  icon: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface PortfolioData {
  name: string;
  title: string;
  email: string;
  linkedin: string;
  github: string;
  location: string;
  summary: string;
  experience: ExperienceItem[];
  achievements: Achievement[];
  education: EducationItem[];
  skills: SkillCategory[];
}
