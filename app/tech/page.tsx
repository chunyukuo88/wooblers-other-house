"use client";
import {useEffect, useState} from "react";
import Image from "next/image";
import "./tech.css";

export default function Page() {
  // Starts with image2 -- the first image is "above the fold".
  const [image2Visible, setImage2] = useState<boolean | null>(false);
  const [image3Visible, setImage3] = useState<boolean | null>(false);

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

    return () => {
      img2Observer.disconnect();
      img3Observer.disconnect();
    };
  }, []);

  return (
    <main id="tech-page">
      <h3>Dev Diary: Creating This App</h3>
      <p>
        Fun fact: I'm an engineer at Gap Inc. Woobler is my younger son.
      </p>
      <h5>August 2024</h5>
      <p>
        I am leading my team's apps from being two of a constellation of React
        SPAs to just another set of packages within a massive Next.js monorepo.
      </p>
      <p>
        A lot of the architecture and setup was done by a designated architecture team, however; my
        team concerns itself with colossal leaf nodes. If that seems overly specialized, consider that our site is essentially the same code for many brands: Gap, Old Navy, Banana Republic, and Athleta.
        Then add additional complexity with our international sites, our commitment to accessibility, and the myriad considerations required to make a pleasant e-commerce experience; this is one of the world's largest clothing brands, after all!
      </p>
      <p>
        My team was left out of the foundational work. I wanted to know what setting up a proper, complex Next.js was all about, so here we are!
      </p>
      <div className="woh__tech-page-image-visible">
        <Image
          alt="Next.js logo"
          src="/images/logo_NextJS.png"
          width={100}
          height={100}
        />
      </div>
      <h5>September 2024</h5>
      <p>
        This month I'm hoping to learn about the <code>IntersectionObserver</code> API, aggressive preloading, and NextAuth. Questions of authentication and authorization are now a
        bit more complicated than in SPAs! This is a meaningful place to maintain them and see how they evolve along with Next.js.
      </p>
      <div className="woh__tech-page-image-visible">
        <Image
          alt="NextAuth logo"
          src="/images/logo_NextAuth.png"
          width={100}
          height={100}
        />
      </div>
      <p>
        In past jobs I used React Router, Tanstack Router, and SvelteKit routing. The latter felt the most like the
        app-based routing of Next.js, at least in version 14. I then learned that Vercel manages both technologies. They
        hired Rich Harris in 2021!
      </p>
      <div className={`woh__tech-page-image ${image2Visible ? "fade-in" : ""}`}>
        <Image
          alt="Vercel logo"
          src="/images/woobler-pointing.png"
          width={100}
          height={100}
        />
      </div>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias aliquid amet autem commodi culpa, distinctio
        est facilis hic in molestiae mollitia nemo nihil nobis nulla, odio officia porro possimus quae repellat
        reprehenderit soluta ut voluptate! Aspernatur assumenda at atque aut consequatur culpa deserunt dolorem enim est
        ex fugit ipsam iure libero magnam, molestiae nemo nostrum porro, quia quidem ratione rem reprehenderit sed sequi
        sint tempore voluptates voluptatibus. A, aliquam, aliquid beatae cum cupiditate delectus dignissimos distinctio
        doloremque ducimus error eum excepturi explicabo harum hic labore minus molestias nam natus neque non odit qui
        quisquam rem, sed vel! Deleniti ducimus, eum harum labore molestias neque numquam soluta voluptatum? Amet,
        consectetur consequuntur dolorem dolores harum illo in, laudantium minus numquam repudiandae sapiente ut! Ab
        adipisci exercitationem iste laudantium minus perspiciatis tempore tenetur veritatis. Aspernatur cumque
        distinctio eligendi fuga, impedit iure laboriosam maiores minus modi optio perferendis perspiciatis placeat quas
        neque nesciunt numquam obcaecati odit pariatur placeat quibusdam reiciendis rem repellendus sit soluta tempore
        unde veniam. Amet asperiores at consectetur cum cupiditate dolore, dolorum eligendi error est expedita hic in
        ipsam iure labore libero mollitia nam neque nisi numquam odio officiis pariatur perferendis praesentium
        provident quasi quia quo quos ratione rem reprehenderit sequi sint, tempora totam velit vitae voluptatem
        voluptatum? Iste minima obcaecati optio reprehenderit. A adipisci atque enim eveniet expedita modi odit officiis
        quibusdam repellendus vel! Iure, possimus, saepe! Accusamus accusantium at autem, commodi, dolorem eius esse
        inventore iste iusto laborum laudantium magnam neque nihil placeat praesentium quas quasi quod ratione rem,
        repellat reprehenderit sequi sit sunt vel vero? Impedit libero molestiae quaerat temporibus tenetur veritatis
        voluptatem! Ab quaerat rerum voluptatem voluptatum!</p>
      <div className={`woh__tech-page-image ${image3Visible ? "fade-in" : ""}`}>
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