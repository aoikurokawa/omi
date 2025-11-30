"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { BiDetail } from "react-icons/bi";
import data from "@/data/worksData.json";

export default function Works() {
  const router = useRouter();

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((d) => (
          <div
            key={d.id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
          >
            <img
              src={d.image}
              alt={d.title}
              className="w-full h-72 object-cover"
            />
            <div className="p-4 grow">
              <h2 className="text-xl font-semibold mb-2">{d.title}</h2>
              <p className="text-gray-600">{d.description}</p>
            </div>
            <div className="px-4 pb-4 flex gap-2">
              {d.githubLink && (
                <Link
                  href={d.githubLink}
                  target="_blank"
                  className="p-2 text-2xl text-gray-700 hover:text-black transition-colors"
                >
                  <FaGithub />
                </Link>
              )}
              {d.detailLink && (
                <Link
                  href={d.detailLink}
                  target="_blank"
                  className="p-2 text-2xl text-gray-700 hover:text-black transition-colors"
                >
                  <BiDetail />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-12">
        <button
          onClick={() => router.push("/")}
          className="px-6 py-2 text-gray-600 hover:text-black transition-colors"
        >
          Back to home
        </button>
      </div>
    </div>
  );
}
