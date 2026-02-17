
import { PortfolioData } from './types';

export const portfolioData: PortfolioData = {
  name: "Zadiki Ochola Hassan",
  title: "Senior Full Stack Engineer",
  email: "zadikiochola@gmail.com",
  linkedin: "linkedin.com/in/zadikiochola",
  github: "github.com/zadiki",
  location: "Nairobi, Kenya",
  summary: "Results-driven Senior Full Stack Engineer and Data Engineer with 6+ years of experience in full stack development, including frontend, backend, and data engineering. Expertise in building and deploying scalable, high-performance web applications using technologies like JavaScript, React, Node.js, Python, and Java.",
  experience: [
    {
      role: "Senior Backend Engineer",
      company: "Iprocure Limited",
      period: "04/2021 - 03/2024",
      location: "Nairobi, Kenya",
      description: [
        "Led the development and deployment of a microservice architecture system, resulting in a 50% rise in scalability and a 40% reduction in maintenance costs.",
        "Mentored and trained a team of junior developers, resulting in a 25% rise in the speed of feature delivery and a 15% reduction in code-related errors.",
        "Built and managed an automated testing framework, resulting in a 90% reduction in regression bugs.",
        "Developed an AWS Glue and PySpark ETL pipeline to streamline data flow into Redshift, enhancing BI reporting efficiency by 35%."
      ]
    },
    {
      role: "Full Stack Engineer",
      company: "Iprocure Limited",
      period: "03/2019 - 01/2021",
      location: "Nairobi, Kenya",
      description: [
        "Implemented a distributed caching system, resulting in an 80% boost in system performance.",
        "Steered the design and development of a new data storage solution, resulting in a 50% growth in data storage capacity.",
        "Maintained an automated deployment pipeline, resulting in a 50% reduction in deployment time."
      ]
    },
    {
      role: "Junior Android Developer",
      company: "Iprocure Limited",
      period: "01/2018 - 02/2019",
      location: "Nairobi, Kenya",
      description: [
        "Developed deep expertise in core Android architecture and legacy APIs.",
        "Optimized multithreading, concurrency, and memory management for mobile devices.",
        "Designed and implemented a location tracking service using Google Maps API.",
        "Adopted the Android Model View ViewModel (MVVM) design pattern."
      ]
    },
    {
      role: "Technical Support Technician and ICT Teacher",
      company: "Light Academy International School",
      period: "08/2015 - 12/2017",
      location: "Mombasa, Kenya",
      description: [
        "Developed and delivered computer training materials, reducing user-reported errors by 30%.",
        "Managed hardware/software setup and troubleshooting, cutting setup time by 25%.",
        "Developed and enforced computer-related curriculum, aligning with educational standards."
      ]
    }
  ],
  achievements: [
    {
      title: "Developed a Multi-Tenant ERP System",
      description: "Successfully designed and developed a robust multi-tenant ERP system, enabling multiple organizations to use a single instance of the software with isolated data and configuration.",
      icon: "building"
    },
    {
      title: "Leadership and Team Collaboration",
      description: "Successfully guided cross-functional development teams, fostering a collaborative and innovative environment that consistently delivered high-quality software solutions.",
      icon: "users"
    },
    {
      title: "Built Point of Sale (POS) Systems",
      icon: "shopping-cart",
      description: "Engineered both Android-based and web-based point of sale systems, providing seamless and intuitive user experiences for retail businesses."
    }
  ],
  education: [
    {
      degree: "Bachelor of Science in Mathematical Engineering",
      institution: "Yildiz Technical University",
      period: "01/2011 - 01/2015",
      location: "Istanbul, Turkey"
    }
  ],
  skills: [
    {
      category: "Languages & Core",
      skills: ["JavaScript", "Python", "Java", "Bash scripting", "Typescript"]
    },
    {
      category: "Frontend",
      skills: ["ReactJS", "Tailwind CSS", "Bootstrap CSS", "jQuery", "JavaFX"]
    },
    {
      category: "Backend & Frameworks",
      skills: ["NodeJS", "ExpressJS", "Laravel", "Springboot", "RESTful API Development", "API Integration"]
    },
    {
      category: "Data & Database",
      skills: ["MongoDB", "MySQL", "PostgreSQL", "BigQuery", "Data Warehousing", "AWS Redshift", "PySpark", "Caching"]
    },
    {
      category: "Cloud & DevOps",
      skills: ["AWS (EC2, Glue)", "GCP", "Docker", "Docker Compose", "Kubernetes", "CI/CD", "Git", "Devops"]
    },
    {
      category: "Specialized",
      skills: ["Android Development", "USSD development", "Payment Gateway Integration", "Automated Testing", "Project Management", "Jira"]
    }
  ]
};
