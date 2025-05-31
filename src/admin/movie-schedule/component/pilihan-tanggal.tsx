import { Box, Paper, Stack, Typography } from "@mui/material";

function PilihanTanggal() {
  return (
    <Box
      sx={{
        backgroundColor: "#ededed",
        py: "12px",
        px: "15px",
        mx: "auto",
        width: "fit-content",
      }}
    >
      <Stack direction="row" spacing={2}>
        <Paper key="xx" elevation={6} sx={{ px: "14px", py: "5px" }}>
          <Stack
            direction="row"
            spacing={1}
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <Stack>
              <Typography fontWeight="bold">Mei</Typography>
              <Typography fontWeight="bold">Sen</Typography>
            </Stack>
            <Typography variant="h3">12</Typography>
          </Stack>
        </Paper>
        <Box
          sx={{
            backgroundColor: "white",
            px: "14px",
            py: "5px",
            border: "1px solid black",
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <Stack>
              <Typography fontWeight="bold">Mei</Typography>
              <Typography fontWeight="bold">Sen</Typography>
            </Stack>
            <Typography variant="h3">13</Typography>
          </Stack>
        </Box>

        {Array.from({ length: 5 }, (_, index) => (
          <Paper key={index} elevation={6} sx={{ px: "14px", py: "5px" }}>
            <Stack
              direction="row"
              spacing={1}
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              <Stack>
                <Typography fontWeight="bold">Mei</Typography>
                <Typography fontWeight="bold">Sen</Typography>
              </Stack>
              <Typography variant="h3">{13 + index}</Typography>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}

export default PilihanTanggal;
