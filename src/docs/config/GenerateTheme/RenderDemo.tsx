import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import styled, { StyleSheetManager } from "styled-components";
import { GlobalStyle } from "../../../lib";

interface Props {
  theme: "light" | "dark";
  generatedCss: string;
  children: React.ReactNode;
}

const ContainerBackground = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--main-bg-color);
  color: var(--main-fg-color);
  border: 1px solid var(--main-bdr-color);
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  border: none;
  display: block;
`;

const RenderDemo: React.FC<Props> = ({ theme, generatedCss, children }) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const [headNode, setHeadNode] = useState<HTMLHeadElement | null>(null);
  const [iframeHeight, setIframeHeight] = useState<string>("300px");

  useEffect(() => {
    const doc = iframeRef.current?.contentDocument;
    if (doc) {
      doc.documentElement.style.height = "100%";
      doc.body.style.height = "100%";
      doc.body.style.margin = "0";
      doc.body.style.padding = "0";

      doc.body.style.overflow = "hidden";

      setMountNode(doc.body);
      setHeadNode(doc.head);
    }
  }, []);

  useEffect(() => {
    if (!mountNode) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const currentHeight = entry.target.scrollHeight;
        setIframeHeight(`${Math.max(currentHeight, 300)}px`);
      }
    });

    resizeObserver.observe(mountNode);
    return () => resizeObserver.disconnect();
  }, [mountNode]);

  useEffect(() => {
    const doc = iframeRef.current?.contentDocument;
    if (doc) {
      const rootElement = doc.documentElement;
      rootElement.setAttribute("data-theme", theme);
      rootElement.style.setProperty("color-scheme", theme, "important");
    }
  }, [theme]);

  return (
    <StyledIframe ref={iframeRef} style={{ height: iframeHeight }}>
      {mountNode &&
        headNode &&
        createPortal(
          <StyleSheetManager target={headNode}>
            <>
              <style>{generatedCss}</style>
              <GlobalStyle />
              <ContainerBackground>
                <div>{children}</div>
              </ContainerBackground>
            </>
          </StyleSheetManager>,
          mountNode,
        )}
    </StyledIframe>
  );
};

export default RenderDemo;
