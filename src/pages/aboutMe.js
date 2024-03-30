import React from "react";
import WorkExperience from "../components/workExperience/workExperience";
import Layout from "@theme/Layout";
import style from "./aboutMe.module.css"

const experience = [{
  position: "Senior Frontend Engineer",
  company: "TripSaaS Data Service Co., Ltd.",
  time: "July 2020 - Now",
  content: [
    {
      title: "COMMEET Cost Management System (Next.js, Node.js, Golang)",
      list: [
        "[FE] Responsible for overall project planning and enhancing the front-end development process\n" +
        "to reduce on-boarding time for new front-end engineer.",
        "[FE] Refine the Node.js log collection logic and centralize it to Grafana Cloud.",
        "[BE] Assisted in service decomposition and partially implemented DDD (Domain-Driven Design)\n" +
        "architecture refactoring to reduce coupling issues and facilitate testing integration.",
        "FE project integrated Sentry for tracking error in the application and facilitating error handing.",
        "Integrated Grafana to aggregate log and machine status from various service into Grafana\n" +
        "Cloud, and reduces the cost of using Cloud Ops Agent by about 30%.",
        "Managed a variety of services across the three major cloud providers (AWS, Azure, GCP),\n" +
        "including but not limited to networking, VMs, and Containers. And ensured the SLA was\n" +
        "maintained at a minimum of 99.9%.",
        "Introduced Apache APISIX to replace the outdated version of Kong. APISIX provides easily\n" +
        "configurable files and dashboard, eliminating the need to manually set up databases and third-\n" +
        "party dashboards like Kong. Additionally, APISIX's configuration files include Prometheus, which\n" +
        "can be integrated into Grafana Cloud.",
        "Establish team CI/CD process (GitHub + Drone or GitHub Action + Docker) and respective\n" +
        "pipelines."
      ]
    },
    {
      title: "COMMEET Travel System (Next.js, Node.js, .Net Core 3.1)",
      list: [
        "Google Map, Google API integration, component design, setting up ESLint and Prettier,\n" +
        "standardizing commit messages, encapsulate Axios and improve Node.js Architecture.",
        "Integrated AdminLTE3 into .Net Core 3.1, deploy script pattern, and common CSS style to\n" +
        "reducing UI development time by 30%."
      ]
    },
    {
      title: "Team Growth:",
      list: [
        "Implement a team Code Review mechanism to enhance code quality.",
        "Establish a team Git Flow process.",
        "Promote the tests for front-end project, starting from zero tests to ensuring all new\n" +
        "components have basic unit tests.",
        "Assist the QA team in utilizing Cypress for project integration test.",
        "Chaired team meetings to assist team members in resolving development issues, and\n" +
        "technology sharing every week(TypeScript, Global State in React...)."
      ]
    }
  ]
}]

export default function AboutMe() {
  return (
    <Layout title="About Me" description="About Me">
      <content className={style.container}>
        <h2>Who Am I</h2>
        <p>I am Andy Chen. A frontend engineer with 3+ year in enterprise. Experienced in React, Node.js, Golang, Docker
          and API
          design.</p>
        <h2>Work Experience</h2>
        {
          experience.map((e) => <WorkExperience experience={e} />)
        }
      </content>
    </Layout>
  );
}