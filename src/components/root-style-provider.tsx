"use client";

import { useState, type PropsWithChildren } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

export const RootStyleRegistry = ({ children }: PropsWithChildren) => {
  const [cache] = useState(() => createCache());
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();

    return (
      <>
        <script
          dangerouslySetInnerHTML={{
            __html: `</script>${extractStyle(cache)}<script>`,
          }}
        />
        {styles}
      </>
    );
  });

  if (typeof window !== "undefined") return <>{children}</>;

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      <StyleProvider cache={cache}>{children}</StyleProvider>
    </StyleSheetManager>
  );
};
