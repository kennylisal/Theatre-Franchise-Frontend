import React, { useState, type ChangeEvent, type FormEvent } from "react";
import {
  Container,
  Stack,
  Paper,
  Typography,
  Box,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs, { Dayjs } from "dayjs";

// Placeholder for AppBarAdmin (replace with your actual component)
const AppBarAdmin = () => <Box sx={{ height: 64, bgcolor: "primary.main" }} />;

function PercobaanView() {
  // State to control modal visibility
  const [open, setOpen] = useState(false);
  // State to manage form input
  const [formData, setFormData] = useState({ movieName: "" });

  // Handle opening the modal
  //   const handleOpen = () => setOpen(true);
  // Handle closing the modal
  const handleClose = () => setOpen(false);
  // Handle form input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    handleClose(); // Close modal after submission
  };
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs("2022-04-17T15:30")
  );
  return (
    <>
      <AppBarAdmin />
      <Container maxWidth="xl" sx={{ flexGrow: 1, height: "auto", py: 2 }}>
        {/* Button to trigger the modal */}
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          sx={{ mb: 2 }}
        >
          Add New Movie
        </Button>
        <Container
          maxWidth={false}
          sx={{
            backgroundColor: "#ededed",
            py: "10px",
            width: "fit-content",
            mx: "auto",
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
                  <Typography variant="h3">{14 + index}</Typography>
                </Stack>
              </Paper>
            ))}
          </Stack>
        </Container>

        {/* Modal for the pop-up form */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: 400 }, // Responsive width
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography
              id="modal-title"
              variant="h6"
              component="h2"
              gutterBottom
            >
              Add Movie Schedule
            </Typography>
            <TextField
              fullWidth
              label="Movie Name"
              name="movieName"
              value={formData.movieName}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <Box
              width="auto"
              height="300px"
              sx={{
                display: "flex",
                flexDirection: "column",
                overflowY: "scroll",
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <Box
                  sx={{ width: "auto", height: "65px", marginRight: "10px" }}
                >
                  <img
                    style={{
                      height: "100%",
                      width: "70px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      border: "1px solid black",
                    }}
                    src="https://m.media-amazon.com/images/M/MV5BNGY0NGM5N2UtNzU5MS00MDAwLWFmMWEtZjE4N2Q0Y2M4YjNjXkEyXkFqcGc@._V1_.jpg" // Fallback image
                  />
                </Box>
                <Stack direction="column">
                  <Typography
                    variant="body1"
                    align="justify"
                    color="primary"
                    overflow="clip"
                  >
                    Bocchi The Rock the Movie : Re Re Bring it Again
                  </Typography>
                  <Typography variant="body1" align="justify">
                    Durasi : 109 Menit
                  </Typography>
                </Stack>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <Box
                  sx={{ width: "auto", height: "65px", marginRight: "10px" }}
                >
                  <img
                    style={{
                      height: "100%",
                      width: "70px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      border: "1px solid black",
                    }}
                    src="https://m.media-amazon.com/images/M/MV5BNGY0NGM5N2UtNzU5MS00MDAwLWFmMWEtZjE4N2Q0Y2M4YjNjXkEyXkFqcGc@._V1_.jpg" // Fallback image
                  />
                </Box>
                <Stack direction="column">
                  <Typography
                    variant="body1"
                    align="justify"
                    color="primary"
                    overflow="clip"
                  >
                    Bocchi The Rock the Movie : Re Re Bring it Again
                  </Typography>
                  <Typography variant="body1" align="justify">
                    Durasi : 109 Menit
                  </Typography>
                </Stack>
              </Stack>
            </Box>
            <TextField
              fullWidth
              label="Harga Tiket"
              name="movieName"
              margin="normal"
              type="number"
              sx={{ marginBottom: "20px" }}
              required
            />
            <Stack direction="row" spacing={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Uncontrolled picker"
                  defaultValue={dayjs("2022-04-17T15:30")}
                />
                <TimePicker
                  label="Controlled picker"
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                />
              </LocalizationProvider>
            </Stack>
            <form onSubmit={handleSubmit}>
              <Stack
                direction="row"
                spacing={2}
                sx={{ mt: 3, justifyContent: "flex-end" }}
              >
                <Button variant="outlined" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </Stack>
            </form>
          </Box>
        </Modal>
      </Container>
    </>
  );
}

export default PercobaanView;
