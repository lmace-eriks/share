
import React, { ReactChildren } from 'react';

// Styles
import styles from "./styles.css";

interface ShareThisContentProps {

}

const ShareThisContent: StorefrontFunctionComponent<ShareThisContentProps> = ({ }) => {
  return (
    <h1>Hello</h1>
  )
}

ShareThisContent.schema = {
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

export default ShareThisContent;