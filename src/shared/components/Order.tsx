import { Button, Typography } from "@mui/material";

type OrderProps = Readonly<{
  onBack: () => void;
}>;
export function Order({ onBack }: OrderProps) {
  return (
    <>
      <Button
        onClick={() => {
          onBack();
        }}
      >
        Back
      </Button>
      <Typography variant="h2" component="h1" sx={{ mb: 2 }}>
        Sale
      </Typography>
    </>
  );
}
