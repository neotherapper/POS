import { Typography } from "@mui/material";
import { createFileRoute, ErrorComponent, ErrorComponentProps } from "@tanstack/react-router";

export const Route = createFileRoute("/sales/$id")({
  component: SalesComponent,
  errorComponent: PostErrorComponent as any,
  notFoundComponent: () => {
    return <p>Post not found</p>;
  },
});

export function PostErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />;
}

function SalesComponent() {
  return <Typography variant="body1">Sale</Typography>;
}
