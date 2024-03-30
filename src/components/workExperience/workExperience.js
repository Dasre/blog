import React from "react";
import styles from "./workExperience.module.css";

export default function WorkExperience({experience}) {
  return (
    <div className={styles["work-experience"]}>
      <div className={styles["work-experience-left"]}>
        <h3>{experience.position} • {experience.company}</h3>
        <p>{experience.time}</p>
      </div>
      <div className={styles["work-experience-divider"]}></div>
      <div className={styles["work-experience-right"]}>
        {
          experience.content.map((i) => {
            return (
              <div>
                <b>{i.title}</b>
                <ul>
                  {i.list.map((content) => (
                    <li>{content}</li>
                  ))}
                </ul>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}