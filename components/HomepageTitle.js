"use client";

import styles from "./HomepageTitle.module.css";

export default function HomepageTitle() {
  return (
    <div className={styles.titleContainer}>
      <div className={`${styles.titleText} ${styles.line1}`}>HAPPY</div>
  <div className={`${styles.titleText} ${styles.line2}`}>30</div>
  <div className={`${styles.titleText} ${styles.line3}`}>HAYATO</div>
  <div className={`${styles.titleText} ${styles.line4}`}>SUMINO</div>
    </div>
  );
}
