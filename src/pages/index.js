import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Feedbacks from "@/components/Feedbacks";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Tech from "@/components/Tech";
import Works from "@/components/Works";
import { StarsCanvas } from "@/components/canvas";
const { connect } = require("@/server/config/redis");
import React from "react";

export default function Home({ data }) {
  const {
    navLinks,
    services,
    experiences,
    technologies,
    projects,
    testimonials,
  } = data;
  return (
    <main>
      <div className="relative z-0 bg-primary">
        <section className="bg-hero-pattern bg-herobg bg-no-repeat bg-center">
          <Navbar navLinks={navLinks} />
          <Hero />
        </section>
        <About services={services} />
        <Experience experiences={experiences} />
        <Tech technologies={technologies} />
        <Works projects={projects} />
        <Feedbacks testimonials={testimonials} />
        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps({ req }) {
  const ip =
    req.headers["x-forwarded-for"] || req.headers["Remote_Addr"] || "NA";
  const client = await connect();

  const data = await client.jsonget("ishansingla");
  client.jsonset("ishansingla", {
    navLinks: [
      { id: "about", title: "About" },
      { id: "work", title: "Work" },
      { id: "contact", title: "Contact" },
    ],
    services: [
      { title: "FullStack Developer", icon: "/assets/web.png" },
      { title: "Flutter Developer", icon: "/assets/mobile.png" },
      { title: "Backend Developer", icon: "/assets/backend.png" },
      { title: "Devops", icon: "/assets/devops.png" },
    ],
    experiences: [
      {
        title: "Android Team Exicutive",
        company_name: "IEEE CIET Student Branch",
        icon: "https://media.licdn.com/dms/image/C510BAQE7n-d84V1kVw/company-logo_200_200/0/1579384916571?e=1691020800&v=beta&t=O5tfMiR8YvxaEtkopoSs9pbwux6-HH60mFXJTc0OSWM",
        iconBg: "#383E56",
        date: "Dec 2021 - Present",
        points: [
          "Developing and maintaining web applications using React.js and other related technologies.",
          "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
          "Participating in code reviews and providing constructive feedback to other developers.",
        ],
      },
      {
        title: "Chief of Back-End Head",
        company_name: "Apple Student Community",
        icon: "https://applestudents.tech/logo.png",
        iconBg: "#E6DEDD",
        date: "Sep 2022 - Present",
        points: [
          "Developing and maintaining web applications using React.js and other related technologies.",
          "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
          "Participating in code reviews and providing constructive feedback to other developers.",
        ],
      },
      {
        title: "Co-Founder & CTO",
        company_name: "IndusianAssist Private Limited",
        icon: "https://media.licdn.com/dms/image/D4D0BAQFq36OCqVOKag/company-logo_200_200/0/1666772278970?e=1691020800&v=beta&t=SulIrgI8v63aoTAEYtZr2tA6IH98CBqYcutdW9yxDOg",
        iconBg: "#383E56",
        date: "Dec 2022 - Present",
        points: [
          "Developing and maintaining web applications using React.js and other related technologies.",
          "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
          "Participating in code reviews and providing constructive feedback to other developers.",
        ],
      },
    ],
    technologies: [
      {
        name: "AWS",
        icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
      },
      {
        name: "Azure",
        icon: "https://www.vectorlogo.zone/logos/microsoft_azure/microsoft_azure-icon.svg",
      },
      {
        name: "Google Cloud",
        icon: "https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg",
      },
      {
        name: "Docker",
        icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg",
      },
      {
        name: "Kubernates",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain-wordmark.svg",
      },
      
      {
        name: "Nginx",
        icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nginx/nginx-original.svg",
      },
      {
        name: "Github",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original-wordmark.svg",
      },
      {
        name: "Python",
        icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
      },
      {
        name: "Node.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain.svg",
      },
      {
        name: "JavaScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      {
        name: "Java",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      },
      {
        name: "GO",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg",
      },
      {
        name: "Bash",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
      },
      {
        name: "Dart",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
      },
      {
        name: "Flutter",
        icon: "https://www.vectorlogo.zone/logos/flutterio/flutterio-icon.svg",
      },
      {
        name: "React.js",
        icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg",
      },
      {
        name: "Next.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      },
      
      {
        name: "Express",
        icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg",
      },
      {
        name: "Spring",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original-wordmark.svg",
      },
      
      {
        name: "Mongodb",
        icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg",
      },
      {
        name: "Redis",
        icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original-wordmark.svg",
      },
    ],
    projects: [
      {
        name: "Car Rent",
        description:
          "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
        tags: [
          {
            name: "react",
            color: "blue-text-gradient",
          },
          {
            name: "mongodb",
            color: "green-text-gradient",
          },
          {
            name: "tailwind",
            color: "pink-text-gradient",
          },
        ],
        image: "carrent",
        source_code_link: "https://github.com/",
      },
      {
        name: "Job IT",
        description:
          "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
        tags: [
          {
            name: "react",
            color: "blue-text-gradient",
          },
          {
            name: "mongodb",
            color: "green-text-gradient",
          },
          {
            name: "tailwind",
            color: "pink-text-gradient",
          },
        ],
        image: "jobit",
        source_code_link: "https://github.com/",
      },
      {
        name: "Trip Guide",
        description:
          "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
        tags: [
          {
            name: "react",
            color: "blue-text-gradient",
          },
          {
            name: "mongodb",
            color: "green-text-gradient",
          },
          {
            name: "tailwind",
            color: "pink-text-gradient",
          },
        ],
        image: "tripguide",
        source_code_link: "https://github.com/",
      },
    ],
    testimonials: [
      {
        testimonial:
          "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
        name: "Sara Lee",
        designation: "CFO",
        company: "Acme Co",
        image: "https://randomuser.me/api/portraits/women/4.jpg",
      },
      {
        testimonial:
          "I've never met a web developer who truly cares about their clients' success like Rick does.",
        name: "Chris Brown",
        designation: "COO",
        company: "DEF Corp",
        image: "https://randomuser.me/api/portraits/men/5.jpg",
      },
      {
        testimonial:
          "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
        name: "Lisa Wang",
        designation: "CTO",
        company: "456 Enterprises",
        image: "https://randomuser.me/api/portraits/women/6.jpg",
      },
    ],
  });
  console.log(data);
  client.close();

  return { props: { data, ip } };
}
