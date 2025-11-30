"use client";

import { FaMedium, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

const snses = [
  {
    id: 1,
    name: "Medium",
    link: "https://medium.com/@aoi01",
    icon: FaMedium,
  },
  {
    id: 2,
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/aoi-kurokawa-aa1744204/",
    icon: FaLinkedin,
  },
  {
    id: 3,
    name: "GitHub",
    link: "https://github.com/Aoi1011",
    icon: FaGithub,
  },
  {
    id: 4,
    name: "Twitter",
    link: "https://twitter.com/aoi18_en",
    icon: FaTwitter,
  },
];

export default function SnsApps() {
  return (
    <div className="flex items-center justify-center gap-8 sm:gap-16">
      {snses.map((sns) => (
        <a
          key={sns.id}
          href={sns.link}
          target="_blank"
          rel="noreferrer"
          className="text-4xl text-gray-700 hover:text-black transition-colors cursor-pointer"
          aria-label={sns.name}
        >
          <sns.icon />
        </a>
      ))}
    </div>
  );
}
