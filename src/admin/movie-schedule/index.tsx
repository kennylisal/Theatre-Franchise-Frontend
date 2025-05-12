import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import InfoIcon from "@mui/icons-material/Info";

function MovieScheduleView() {
  return (
    <>
      <AppBarAdmin />
      <Container maxWidth="xl" sx={{ flexGrow: 1, height: "auto" }}>
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
            <Paper elevation={6} sx={{ px: "14px", py: "5px" }}>
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
              <Paper elevation={6} sx={{ px: "14px", py: "5px" }}>
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
        <Box sx={{ my: "20px" }}></Box>
        <Stack direction="row">
          <Typography variant="h3">Cinema 1</Typography>
          <IconButton color="primary" aria-label="add to shopping cart">
            <AddCircleIcon sx={{ fontSize: "45px" }} />
          </IconButton>
        </Stack>

        <Grid container rowSpacing={5} columnSpacing={1.5} marginBottom="30px">
          <Grid size={{ xs: 12, sm: 12, md: 5, lg: 4, xl: 3 }}>
            <Paper
              sx={{ backgroundColor: "#ffffd6", height: "100%" }}
              elevation={8}
            >
              <Stack direction="row" paddingX={1.5} paddingY={1.5}>
                <img
                  style={{
                    height: "200px",
                    objectFit: "fill",
                    borderRadius: "8px",
                  }}
                  src="https://m.media-amazon.com/images/M/MV5BNGY0NGM5N2UtNzU5MS00MDAwLWFmMWEtZjE4N2Q0Y2M4YjNjXkEyXkFqcGc@._V1_.jpg" // Fallback image
                />
                <Stack
                  justifyContent="space-between"
                  sx={{ paddingLeft: "10px" }}
                >
                  <Typography
                    variant="body1"
                    sx={{ color: "black" }}
                    fontWeight="bold"
                    align="justify"
                  >
                    Bocchi The Rock the Movie : Re Re Bring it Again
                  </Typography>
                  <Stack direction="row" width="100%" alignItems="center">
                    <Box
                      sx={{
                        height: "28px",
                        width: "fit-content",
                        backgroundColor: "#595958",
                        display: "inline",
                        paddingX: "10px",
                        alignContent: "center", //ini untuk kasih vertical
                      }}
                    >
                      <Typography sx={{ color: "White", fontWeight: "bold" }}>
                        17.00
                      </Typography>
                    </Box>
                    <Typography
                      sx={{ color: "black", fontWeight: "bold", mx: "15px" }}
                    >
                      -
                    </Typography>
                    <Box
                      sx={{
                        height: "28px",
                        width: "fit-content",
                        backgroundColor: "#595958",
                        display: "inline",
                        paddingX: "10px",
                        alignContent: "center", //ini untuk kasih vertical
                      }}
                    >
                      <Typography sx={{ color: "White", fontWeight: "bold" }}>
                        19.30
                      </Typography>
                    </Box>
                  </Stack>
                  <Box
                    sx={{
                      height: "28px",
                      width: "fit-content",
                      backgroundColor: "green",
                      display: "inline",
                      paddingX: "10px",
                      alignContent: "center", //ini untuk kasih vertical
                    }}
                  >
                    <Typography sx={{ color: "White", fontWeight: "bold" }}>
                      Rp 35.000
                    </Typography>
                  </Box>
                  <Button variant="contained" color="primary">
                    Edit
                  </Button>
                </Stack>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
        <Stack direction="row">
          <Typography variant="h3">Cinema 2</Typography>
          <IconButton color="primary" aria-label="add to shopping cart">
            <AddCircleIcon sx={{ fontSize: "45px" }} />
          </IconButton>
        </Stack>
        <Grid container rowSpacing={5} columnSpacing={1.5} marginBottom="30px">
          <Grid size={{ xs: 12, sm: 12, md: 5, lg: 4, xl: 3 }}>
            <Paper
              sx={{ backgroundColor: "#ffffd6", height: "100%" }}
              elevation={8}
            >
              <Stack direction="row" paddingX={1.5} paddingY={1.5}>
                <IconButton color="primary" aria-label="add to shopping cart">
                  <InfoIcon sx={{ fontSize: "45px", color: "red" }} />
                </IconButton>
                <Stack justifyContent="center" sx={{ paddingLeft: "10px" }}>
                  <Typography
                    variant="h5"
                    sx={{ color: "black" }}
                    fontWeight="bold"
                    align="justify"
                  >
                    Belum Tersedia Jadwal Untuk Cinema 2
                  </Typography>
                </Stack>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
        <Stack direction="row">
          <Typography variant="h3">Cinema 2</Typography>
          <IconButton color="primary" aria-label="add to shopping cart">
            <AddCircleIcon sx={{ fontSize: "45px" }} />
          </IconButton>
        </Stack>
        <Grid container rowSpacing={5} columnSpacing={1.5} marginBottom="30px">
          <Grid size={{ xs: 12, sm: 12, md: 5, lg: 4, xl: 3 }}>
            <Paper
              sx={{ backgroundColor: "#ffffd6", height: "100%" }}
              elevation={8}
            >
              <Stack direction="row" paddingX={1.5} paddingY={1.5}>
                <IconButton color="primary" aria-label="add to shopping cart">
                  <InfoIcon sx={{ fontSize: "45px", color: "red" }} />
                </IconButton>
                <Stack justifyContent="center" sx={{ paddingLeft: "10px" }}>
                  <Typography
                    variant="h5"
                    sx={{ color: "black" }}
                    fontWeight="bold"
                    align="justify"
                  >
                    Belum Tersedia Jadwal Untuk Cinema 2
                  </Typography>
                </Stack>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

function AppBarAdmin() {
  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "transparent" }}
      elevation={0}
    ></AppBar>
  );
}
export default MovieScheduleView;
