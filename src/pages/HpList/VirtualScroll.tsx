import React, { useState, useEffect, useRef, ReactNode } from "react";
import throttle from "lodash/throttle";
import { List, AutoSizer, ScrollParams } from "react-virtualized";
import { ScrollDataForm } from "./MyComponent";

export interface RowRendererParams {
  index: number;
  isScrolling: boolean;
  isVisible: boolean;
  key: string;
  parent: Object;
  style: Object;
}

export interface VirtualScrollForm {
  dataLength: number;
  hasMore: boolean;
  next: () => void;
  loader: ReactNode;
  height: number;
  elementHeight: number;
  rowRenderer: (params: RowRendererParams) => React.ReactElement;
  children: ScrollDataForm[];
  onScroll?: (e: ScrollParams) => void;
}

const VirtualScroll = ({
  next,
  hasMore,
  onScroll,
  height,
  loader,
  dataLength,
  children,
  elementHeight,
  rowRenderer,
}: VirtualScrollForm) => {
  const [showLoader, setShowLoader] = useState(false);
  let triggered = useRef(false);

  useEffect(() => {
    triggered.current = false;
    setShowLoader(false);
  }, [dataLength]);

  const props = useRef({
    next,
    hasMore,
    onScroll,
  });

  const scrollListener = (e: ScrollParams) => {
    const { next, hasMore, onScroll } = props.current;
    if (typeof onScroll === "function") {
      setTimeout(() => onScroll && onScroll(e), 0);
    }

    const { clientHeight, scrollHeight, scrollTop } = e;

    if (triggered.current) {
      return;
    }

    const atBottom = scrollTop + clientHeight >= scrollHeight;

    if (atBottom && hasMore) {
      triggered.current = true;
      setShowLoader(true);
      next && next();
    }
  };

  useEffect(() => {
    props.current = {
      next,
      hasMore,
      onScroll,
    };
  }, [next, hasMore, onScroll]);

  const throttleScrollListener = throttle(scrollListener, 150);

  const isLoaderVisible = showLoader && hasMore;

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <AutoSizer disableHeight>
        {({ width }) => (
          <List
            rowCount={children.length}
            width={width}
            height={height}
            rowHeight={elementHeight}
            rowRenderer={rowRenderer}
            overscanRowCount={5}
            onScroll={throttleScrollListener}
          />
        )}
      </AutoSizer>
      <div
        style={{
          visibility: isLoaderVisible ? "visible" : "hidden",
          position: isLoaderVisible ? undefined : "absolute",
          bottom: 0,
          willChange: "scroll-position", // https://wit.nts-corp.com/2017/06/05/4571, but IE not supported
        }}
      >
        {loader}
      </div>
    </div>
  );
};

export default VirtualScroll;
