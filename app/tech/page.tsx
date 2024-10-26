"use client";
import {useEffect, useState} from "react";
import FadeInImage from "./fade-in-image";
import "./tech.css";

type ObservableArgs = {
  justify: "left" | "right";
  index: number
  callback: Function;
}

const buildObservable = (args: ObservableArgs) => {
  const {justify, index, callback} = args;
  const observer = new IntersectionObserver(([entry]) => callback(entry.isIntersecting));
  const image = document.querySelectorAll(`.woh__tech-page-image-${justify}`)[index]!;
  return {observer, image};
};

export default function Page() {
  const [image1Visible, setImage1] = useState<boolean | null>(false);
  const [image2Visible, setImage2] = useState<boolean | null>(false);
  const [image3Visible, setImage3] = useState<boolean | null>(false);
  const [image4Visible, setImage4] = useState<boolean | null>(false);

  useEffect(() => {
    const {observer: img1Observer, image: image1} = buildObservable({justify: "left", index: 0, callback: setImage1});
    const {observer: img2Observer, image: image2} = buildObservable({justify: "right", index: 0, callback: setImage2});
    const {observer: img3Observer, image: image3} = buildObservable({justify: "left", index: 1, callback: setImage3});
    const {observer: img4Observer, image: image4} = buildObservable({justify: "right", index: 1, callback: setImage4});
    img1Observer.observe(image1);
    img2Observer.observe(image2);
    img3Observer.observe(image3);
    img4Observer.observe(image4);

    return () => {
      img1Observer.disconnect();
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
      <h4 className="woh__dev-diary-date">August 2024</h4>
      <div className="woh__has-drop-letter">
        I am leading my team's apps from being two of a constellation of React
        SPAs to just another set of packages within a massive Next.js monorepo.
      </div>
      <br/>
      <div className="woh__ensuing-paragraph">
        Routing, auth, global state and CI/CD was done by a designated architecture team, however; my
        team of about a dozen people concerns itself with colossal leaf nodes on product display pages.
        If that seems overly specialized, consider that our site is essentially the same code
        <FadeInImage
          alt="Next.js logo"
          fadeInFromThe="left"
          isVisible={image1Visible}
          src="/images/logo_NextJS.png"
          height={100}
          width={100}
        />
        for many brands: Gap, Old Navy, Banana Republic, and Athleta. Then add additional complexity of our sites for
        other countries, our commitment to accessibility, and the myriad subtle features required to make a pleasant
        e-commerce experience; this is one of the world's largest clothing giants, after all!
      <br/>
        My team was left out of the foundational work. I wanted to know what setting up a proper, complex Next.js was
        all about, so here we are!
      </div>
      <h4 className="woh__dev-diary-date">September 2024</h4>
      <div className="woh__has-drop-letter">
        This month I'm hoping to learn about the <code>IntersectionObserver</code> API, aggressive preloading, and
        NextAuth.
        <FadeInImage
          alt="NextAuth logo"
          fadeInFromThe={"right"}
          isVisible={image2Visible}
          height={100}
          src="/images/logo_NextAuth.png"
          width={100}
        />
        Questions of authentication and authorization are now a bit more complicated than in SPAs! This is a meaningful
        place to maintain them and see how they evolve along
        with Next.js.
      </div>
      <br/>
      <div className="woh__ensuing-paragraph">
        In past jobs I used React Router, Tanstack Router, and SvelteKit routing. The latter felt the most like the
        app-based routing of Next.js, at least in version 14. I then learned that Vercel manages both technologies. They
        hired Rich Harris in 2021!
      </div>
      <h4 className="woh__dev-diary-date">October 2024</h4>
      <div className="woh__has-drop-letter">
        Probably the trickiest bit so far was getting AWS Amplify + Cognito + NextAuth to work harmoniously together.
        Amplify wants environment variables in the web console, NextAuth wants a <code>secret</code> attribute in the
        auth configuration object,
        <FadeInImage
          alt="Amplify logo"
          fadeInFromThe={"left"}
          height={100}
          isVisible={image3Visible}
          src="/images/logo_Amplify.png"
          width={100}
        />
        and Cognito has options for everything under the sun. The final solution, not mentioned in the Amplify
        configuration, was to write the environment variables to an inaccessible production .env document at build time.
        That's something I had to figure out on my own. Google, Stack Overflow and ChatGPT just regurgitated the
        NextAuth documentation.
        <br/>
        <br/>
        Another subtle thing that took me a while to figure out was that because NextAuth supports a
        wide variety of auth providers, it is not configured to return the given JWT token of a given
        provider by default. How could it? They label them differently. This took a while to figure out
        <FadeInImage
          alt="Cognito logo"
          fadeInFromThe={"right"}
          height={100}
          isVisible={image4Visible}
          src="/images/logo_Cognito.png"
          width={100}
        />
        because for years I had used Cognito JavaScript APIs for both React SPA front ends and Node.js
        back ends. So testing in Bruno, a fine alternative to Postman, I kept getting 401s because the
        token I plucked out of browser cookies following a successful login was not actually from Cognito.
        A quick tweak to the NextAuth configuration object fixed that.
      </div>
    </main>
  );
}