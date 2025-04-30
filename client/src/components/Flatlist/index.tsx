import React from "react";

interface FlatListProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string;
  ListEmptyComponent?: React.ReactNode;
  ListHeaderComponent?: React.ReactNode;
  ListFooterComponent?: React.ReactNode;
  ItemSeparatorComponent?: () => React.ReactNode;
  horizontal?: boolean;
  style?: React.CSSProperties; // for container
  contentContainerStyle?: React.CSSProperties; // for inner content
  loading?: boolean;
  LoadingComponent?: React.ReactNode;
}

export const FlatList = <T,>({
  data,
  renderItem,
  keyExtractor,
  ListEmptyComponent,
  ListHeaderComponent,
  ListFooterComponent,
  ItemSeparatorComponent,
  horizontal = false,
  style,
  contentContainerStyle,
  loading = false,
  LoadingComponent,
}: FlatListProps<T>) => {
  if (loading) {
    return <div>{LoadingComponent || <div>Loading...</div>}</div>;
  }

  if (!data || data.length === 0) {
    return <>{ListEmptyComponent || null}</>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: horizontal ? "row" : "column",
        overflowX: horizontal ? "auto" : "hidden",
        overflowY: horizontal ? "hidden" : "auto",
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: horizontal ? "row" : "column",
          ...contentContainerStyle,
        }}
      >
        {ListHeaderComponent}
        {data.map((item, index) => (
          <React.Fragment key={keyExtractor(item, index)}>
            <div style={{ flexShrink: 0 }}>{renderItem(item, index)}</div>
            {index !== data.length - 1 && ItemSeparatorComponent?.()}
          </React.Fragment>
        ))}
        {ListFooterComponent}
      </div>
    </div>
  );
};
