
import React, { ReactChildren } from 'react';

// Styles
import styles from "./styles.css";

interface ShareProps {

}

const Share: StorefrontFunctionComponent<ShareProps> = ({ link, imgSrc, text, newTab }) => {

  if (!imgSrc) return <></>
  if (!link) return <></>

  return (
    <div className={styles.buttonContainer}>
      <div className={styles.buttonWrapper}>
        <a href={link} target={newTab ? "_blank" : "_self"} className={styles.button}>
          {text && <p className={styles.buttonText}>{text}</p>}
          <img src={imgSrc} alt="" className={styles.buttonImage} />
        </a>
      </div>
    </div>
  )
}

Share.schema = {
  title: 'Guide Button',
  description: '',
  type: 'object',
  properties: {
    text: {
      title: "Button Text",
      description: "Optional - Text overlayed on top of image.",
      type: "string"
    },
    imgSrc: {
      title: "Image Source",
      description: "REQUIRED - Absolute path to image.",
      type: "string"
    },
    link: {
      title: "Link",
      description: "REQUIRED - Absolute or Relative path url.",
      type: "string"
    },
    newTab: {
      title: "Open in new tab?",
      type: "boolean"
    }
  }
}

export default Share;