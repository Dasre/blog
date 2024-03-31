import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout"
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";

const IntroduceData = [
  {
    buttonText: "學習筆記",
    link: "/docs/intro",
  },
  {
    buttonText: "Blog",
    link: "/blog",
  },
  {
    buttonText: "About Me",
    link: "/aboutMe",
  },
];

function Introduce({buttonText, link}) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center padding-horiz--md">
        {/* <h3>Blog</h3> */}
        <Link className="button button--secondary button--lg" to={link}>
          {buttonText}
        </Link>
      </div>
    </div>
  );
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)} style={{flex: 1}}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        {/* <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="#au">
            Know More
          </Link>
        </div> */}
        <div className={styles.buttonGroup}>
          {IntroduceData.map((item, index) => {
            return <Introduce key={`i${index}`} buttonText={item.buttonText} link={item.link}/>;
          })}
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={`${siteConfig.title}`} description="Andy Chen Blog">
      <HomepageHeader/>
      {/* <main id="au">
        <HomepageFeatures />
      </main> */}
    </Layout>
  );
}
