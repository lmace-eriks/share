import React, { ReactChildren, useEffect, useRef, useState } from 'react';
import { canUseDOM } from "vtex.render-runtime";

// Styles
import styles from "./styles.css";

interface ShareThisContentProps {
  shareText: string
  buttonText: string
  url: string
}

const ShareThisContent: StorefrontFunctionComponent<ShareThisContentProps> = ({ shareText, buttonText, url }) => {
  const openGate = useRef(true);
  const [render, setRender] = useState(false);
  const [shortMessage, setShortMessage] = useState(false);
  const [buttonTextWrap, setButtonTextWrap] = useState("");
  const [buttonTextNoWrap, setButtonTextNoWrap] = useState("");

  const shareData = {
    title: shareText,
    text: shareText,
    url
  }

  useEffect(() => {
    if (!openGate.current) return;
    openGate.current = false;

    // Handles exception for browsers where canShare() is not built in - LM
    // VTEX does not recognise canShare() on Navigator - LM
    // @ts-expect-error
    if (!navigator.canShare) return;

    // @ts-expect-error
    const canShare = navigator.canShare(shareData);

    buildText();
    setRender(canShare);
  })

  const buildText = () => {
    const buttonWords = buttonText.split(" ");
    const wordCount = buttonWords.length;
    if (wordCount <= 2) {
      setShortMessage(true);
      return;
    }
    let tempButtonTextWrap = "";
    const tempButtonTextNoWrap = buttonWords[wordCount - 2] + " " + buttonWords[wordCount - 1];

    for (let i = 0; i < wordCount - 2; i++) {
      tempButtonTextWrap = i > 0 ? tempButtonTextWrap + " " + buttonWords[i] : buttonWords[i];
    }

    setButtonTextWrap(tempButtonTextWrap);
    setButtonTextNoWrap(tempButtonTextNoWrap);
  }

  const handleShare = async () => {
    if (!canUseDOM) return;

    try {
      await navigator.share(shareData);
    } catch (e) {
      const cancelled = e.message === "Abort due to cancellation of share.";
      if (!cancelled) console.error(e);
    }
  }

  const ShortMessage = () => (
    <div className={styles.shareText}>{buttonText}</div>
  )

  const NoWrapText = () => (
    <div className={styles.shareText}><span>{buttonTextWrap}</span> <span className={styles.noWrap}>{buttonTextNoWrap}</span></div>
  )

  const ShareComponent = () => (
    <div className={styles.shareContainer}>
      <div className={styles.shareWrapper}>
        <button onClick={handleShare} className={styles.shareButton}>
          <img src="https://eriksbikeshop.vtexassets.com/arquivos/share-social.png" className={styles.shareImage} />
          {shortMessage ? <ShortMessage /> : <NoWrapText />}
        </button>
      </div>
    </div>
  )

  const NoShare = () => (<div data-share-compatible="false" style={{ display: "none" }} />)

  return render ? <ShareComponent /> : <NoShare />;
}

ShareThisContent.schema = {
  title: 'Share This Content',
  type: 'object',
  properties: {
    shareText: {
      title: "Title of Shared Content",
      description: "Example: BMC Bikes Buying Guide",
      type: "string"
    },
    buttonText: {
      title: "Button Text",
      description: "Example: Share This Guide With A Friend",
      type: "string"
    },
    url: {
      title: "URL",
      description: "Absolute / Full URL To Share.",
      type: "string"
    }
  }
}

export default ShareThisContent;