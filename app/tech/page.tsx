"use client";
import {useEffect, useState} from "react";
import Image from "next/image";
import "./tech.css";

type FadeInImageProps = {
  alt: string;
  fadeInFromThe: "left" | "right";
  height: number;
  isVisible: boolean;
  src: string;
  width: number;
}

const FadeInImage = ({
   alt,
   fadeInFromThe,
   height,
   isVisible,
   src,
   width,
 }: FadeInImageProps) => {
  return (
    <span className="woh__fade-in-container-left">
      <div className={`woh__tech-page-image ${isVisible ? "fade-in" : ""}`}>
        <Image
          alt="Amplify logo"
          src="/images/woobler-pointing.png"
          width={100}
          height={100}
        />
      </div>
    </span>
  );
};

export default function Page() {
  // Starts with image2 -- the first image is "above the fold".
  const [image2Visible, setImage2] = useState<boolean | null>(false);
  const [image3Visible, setImage3] = useState<boolean | null>(false);
  const [image4Visible, setImage4] = useState<boolean | null>(false);

  useEffect(() => {
    const img2Observer = new IntersectionObserver(
      ([entry]) => {
        setImage2(entry.isIntersecting);
      }
    );
    const image2Wrapper = document.querySelectorAll(".woh__tech-page-image")[0]!;
    img2Observer.observe(image2Wrapper);
    const img3Observer = new IntersectionObserver(
      ([entry]) => {
        setImage3(entry.isIntersecting);
      }
    );
    const image3Wrapper = document.querySelectorAll(".woh__tech-page-image")[1]!;
    img3Observer.observe(image3Wrapper);
    const img4Observer = new IntersectionObserver(
      ([entry]) => {
        setImage4(entry.isIntersecting);
      }
    );
    const image4Wrapper = document.querySelectorAll(".woh__tech-page-image")[2]!;
    img4Observer.observe(image4Wrapper);

    return () => {
      img2Observer.disconnect();
      img3Observer.disconnect();
      img4Observer.disconnect();
    };
  }, []);

  return (
    <main id="tech-page">
      <h3>Dev Diary: Creating This App</h3>
      <h5>
        I'm an engineer at Gap Inc., and Woobler is my younger son, to whom this site is dedicated. We like serifs.
      </h5>
      <h4>August 2024</h4>
      <p className="woh__has-drop-letter">
        I am leading my team's apps from being two of a constellation of React
        SPAs to just another set of packages within a massive Next.js monorepo.
      </p>
      <div className="woh__has-drop-letter">
        Routing, auth, global state and CI/CD was done by a designated architecture team, however; my
        team of about a dozen people concerns itself with colossal leaf nodes on product display pages.
        If that seems overly specialized, consider that our site is essentially the same code
        <span>
          <div className="woh__tech-page-image-visible">
            <Image
              alt="Next.js logo"
              src="/images/logo_NextJS.png"
              width={100}
              height={100}
            />
          </div>
        </span>
        for many brands: Gap, Old Navy, Banana Republic, and Athleta. Then add additional complexity of our sites for
        other countries, our commitment to accessibility, and the myriad subtle features required to make a pleasant
        e-commerce experience; this is one of the world's largest clothing giants, after all!
      </div>
      <p className="woh__has-drop-letter">
        My team was left out of the foundational work. I wanted to know what setting up a proper, complex Next.js was
        all about, so here we are!
      </p>
      <h4>September 2024</h4>
      <div className="woh__has-drop-letter">
        This month I'm hoping to learn about the <code>IntersectionObserver</code> API, aggressive preloading, and
        NextAuth.
        <span className="woh__fade-in-container">
          <div className={`woh__tech-page-image ${image2Visible ? "fade-in" : ""}`}>
            <Image
              alt="NextAuth logo"
              src="/images/logo_NextAuth.png"
              width={100}
              height={100}
            />
          </div>
        </span>
        Questions of authentication and authorization are now a bit more complicated than in SPAs! This is a meaningful
        place to maintain them and see how they evolve along
        with Next.js.
      </div>
      <p className="woh__has-drop-letter">
        In past jobs I used React Router, Tanstack Router, and SvelteKit routing. The latter felt the most like the
        app-based routing of Next.js, at least in version 14. I then learned that Vercel manages both technologies. They
        hired Rich Harris in 2021!
      </p>
      <div className="woh__has-drop-letter">
        Probably the trickiest bit so far was getting AWS Amplify + Cognito + NextAuth to work harmoniously together.
        Amplify wants environment variables in the web console, NextAuth wants a <code>secret</code> attribute in the
        auth configuration object,
          <span className="woh__fade-in-container-left">
            <div className={`woh__tech-page-image ${image3Visible ? "fade-in" : ""}`}>
              <Image
                alt="Amplify logo"
                src="/images/woobler-pointing.png"
                width={100}
                height={100}
              />
            </div>
          </span>
        and Cognito has options for everything under the sun. The final solution, not mentioned in the Amplify
        configuration, was to write the environment variables to an inaccessible production .env document at build time.
        That's something I had to figure out on my own. Google, Stack Overflow and ChatGPT just regurgitated the
        NextAuth documentation.
      </div>
      <div className={`woh__tech-page-image ${image4Visible ? "fade-in" : ""}`}>
        <Image
          alt="AWS logo"
          src="/images/woobler-pointing.png"
          width={100}
          height={100}
        />
      </div>
    </main>
  );
}