import Link from "next/link";
import SnsApps from "@/components/SnsApps";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8 mt-20">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Aoi Kurokawa</h1>
        <hr className="border-gray-300 mb-6" />
        <p className="text-2xl mb-6">
          Hi, I&apos;m Aoi. An adventurous traveler, and dog-lover.
        </p>
      </div>

      <div className="space-y-6 text-lg">
        <p>
          I&apos;m currently a student, studying computer science. I also go by
          Full Stack Developer, Front-End Developer, or Back-End Developer.
        </p>
        <p>
          For my personal interest, I like blockchain, web3.0 technologies. I
          have joined some projects such as watch NFT project, video NFT
          project. My task was mainly developing user interface by front-end
          frameworks such as ReactJS, NextJS.
        </p>
        <p>
          You can find some projects that I have joined before and my personal
          projects{" "}
          <Link href="/works" className="underline hover:text-gray-600">
            here.
          </Link>
        </p>
        <p>
          You can find my resume{" "}
          <a
            href="https://github.com/Aoi1011/resume/blob/main/AOI%20KUROKAWA.pdf"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-gray-600"
          >
            here.
          </a>
        </p>
      </div>

      <div className="mt-12">
        <SnsApps />
      </div>
    </div>
  );
}
