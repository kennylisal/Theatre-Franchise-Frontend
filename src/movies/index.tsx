import { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Skeleton,
  Paper,
  Grid,
  Container,
  AppBar,
  Toolbar,
  Button,
} from "@mui/material";

import Face5Icon from "@mui/icons-material/Face5";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ReceiptIcon from "@mui/icons-material/Receipt";

// Main App component
function MoviesView() {
  // const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Simulate data fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2-second delay to simulate loading
    return () => clearTimeout(timer);
  }, []);

  return <>{loading ? <SkeletonMovies /> : <MainContent />}</>;
}

function MainContent() {
  return (
    <>
      <AppBarCinemaRakyat />
      <Container maxWidth="lg" sx={{ flexGrow: 1, height: "auto" }}>
        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Now Showing
        </Typography>
        <Grid container rowSpacing={5} columnSpacing={1.5}>
          <GridContainer />
          <GridContainer />
          <GridContainer />
          <GridContainer />
          <GridContainer />
          <GridContainer />
        </Grid>
      </Container>
    </>
  );
}

function AppBarCinemaRakyat() {
  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "transparent" }}
      elevation={0}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Face5Icon sx={{ color: "black" }} fontSize="large" />
          <Typography variant="body1" color="info">
            Cinema Rakyat
          </Typography>
          <Box
            sx={{
              height: "28px",
              width: "fit-content",
              backgroundColor: "black",
              display: "flex",
              flexDirection: "row",
              paddingX: "15px",
              paddingY: "5px",
              alignItems: "center",
              marginLeft: "50px",
              borderRadius: "12px",
            }}
          >
            <LocationOnIcon sx={{ color: "white" }} fontSize="medium" />
            <Typography sx={{ color: "White" }}>MAKASSAR</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            width: 360,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ReceiptIcon sx={{ color: "black" }} fontSize="large" />
            <Typography variant="body1" color="textPrimary">
              Promo
            </Typography>
          </Box>
          <Button variant="text" color="success">
            Login
          </Button>
          <Button variant="contained">Contained</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

function SkeletonMovies() {
  return (
    <>
      <SkeletonAppbar />
      <Container maxWidth="lg" sx={{ flexGrow: 1, height: "auto" }}>
        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Now Showing
        </Typography>
        <Grid container rowSpacing={5} columnSpacing={1.5}>
          <GridComponentSkeleton />
          <GridComponentSkeleton />
          <GridComponentSkeleton />
          <GridComponentSkeleton />
          <GridComponentSkeleton />
          <GridComponentSkeleton />
        </Grid>
      </Container>
    </>
  );
}

function GridComponentSkeleton() {
  return (
    <Grid size={{ sm: 7, md: 5, lg: 4, xl: 3 }} height={{ xl: "575px" }}>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Skeleton
          variant="rounded"
          sx={{ marginBottom: "10px", height: "72%" }}
        />
        <Skeleton
          variant="rectangular"
          height={15}
          sx={{ marginBottom: "10px" }}
        />

        <Grid container spacing={2} rowSpacing={1}>
          <Skeleton variant="rectangular" width={45} height={20} />
          <Skeleton variant="rectangular" width={45} height={20} />
        </Grid>
      </Box>
    </Grid>
  );
}

function SkeletonAppbar() {
  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "transparent" }}
      elevation={0}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Face5Icon sx={{ color: "black" }} fontSize="large" />
          <Typography variant="body1" color="info">
            Cinema Rakyat
          </Typography>
          <Skeleton
            variant="rounded"
            width={150}
            height={50}
            sx={{ marginLeft: 5 }}
          />
        </Box>
        <Skeleton variant="rounded" width={150} height={50} />
      </Toolbar>
    </AppBar>
  );
}

function GridContainer() {
  return (
    <Grid
      size={{ xs: 12, sm: 12, md: 5, lg: 4, xl: 3 }}
      height={{ xl: "575px" }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Paper
          elevation={4}
          sx={{
            backgroundColor: "white",
            height: "100%",
            marginBottom: "10px",
          }}
        ></Paper>
        <Typography sx={{ color: "black", marginBottom: "10px" }}>
          NAMA FILM YANG MAU DITAMPILKAN DAN PANJANG SEKALI
        </Typography>
        <Grid container spacing={2} rowSpacing={1}>
          <Box
            sx={{
              height: "28px",
              width: "fit-content",
              backgroundColor: "black",
              display: "inline",
              paddingX: "10px",
              alignContent: "center", //ini untuk kasih vertical
            }}
          >
            <Typography sx={{ color: "White", fontWeight: "bold" }}>
              2D
            </Typography>
          </Box>
          <Box
            sx={{
              height: "28px",
              width: "fit-content",
              backgroundColor: "black",
              display: "inline",
              paddingX: "10px",
              alignContent: "center", //ini untuk kasih vertical
            }}
          >
            <Typography sx={{ color: "White", fontWeight: "bold" }}>
              ACTION
            </Typography>
          </Box>
          <Box
            sx={{
              height: "28px",
              width: "fit-content",
              backgroundColor: "black",
              display: "inline",
              paddingX: "10px",
              alignContent: "center", //ini untuk kasih vertical
            }}
          >
            <Typography sx={{ color: "White", fontWeight: "bold" }}>
              1H 54M
            </Typography>
          </Box>
          <Box
            sx={{
              height: "28px",
              width: "fit-content",
              backgroundColor: "black",
              display: "inline",
              paddingX: "10px",
              alignContent: "center", //ini untuk kasih vertical
            }}
          >
            <Typography sx={{ color: "White", fontWeight: "bold" }}>
              DONG HUA
            </Typography>
          </Box>
        </Grid>
      </Box>
    </Grid>
  );
}

export default MoviesView;
