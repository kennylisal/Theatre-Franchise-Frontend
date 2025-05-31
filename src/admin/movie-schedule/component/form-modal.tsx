import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Modal,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs, { Dayjs } from "dayjs";
import { useContext, useState, type ChangeEvent, type FormEvent } from "react";
import type {
  FormModalProps,
  NewScheduleType,
  ScheduleMovieProp,
} from "../interfaces/interfaces";
import type { MovieObject } from "../../../public/movies/interfaces";
import CircularLoading from "../../global/circularLoading";
import SnackBarContext from "../../global/snackbar-context";

import { sendNewSchedule } from "../services/model";
const wait = () => new Promise((resolve) => setTimeout(resolve, 1500));
function FormModal({
  open,
  handleClose,
  movieData,
  movieDataHasLoad,
  cinemaId,
  setScheduleData,
}: FormModalProps) {
  const [formData, setFormData] = useState<ScheduleMovieProp>({
    movieName: "",
    hargaTiket: 0,
    awalWaktu: null,
    akhirWaktu: null,
    movieId: "",
    movieImage: "",
  });

  const [filmPilihan, setFilmPilihan] = useState(0);
  const [isSendingData, setIsSendingData] = useState(false);
  const { showSnackBar } = useContext(SnackBarContext);
  const handleClickMovie = (index: number, movieData: MovieObject) => {
    setFormData({
      ...formData,
      movieName: movieData.movie_name,
      movieId: movieData.movie_id,
      movieImage: movieData.movie_image,
    });
    setFilmPilihan(index);
  };

  // const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "hargaTiket" ? Number(value) || 0 : value,
    });
  };
  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSendingData(true);
    const addSuccessful = await sendNewSchedule(formData, cinemaId);
    await wait();
    if (addSuccessful.isSuccessful) {
      addScheduleOffline(formData, cinemaId, addSuccessful.id);
      cleanData();
      showSnackBar("Berhasil ditambahkan", "success");
      handleClose();
    } else {
      showSnackBar("gagal ditambahkan", "error");
    }
    setIsSendingData(false);
  };

  const addScheduleOffline = (
    formData: ScheduleMovieProp,
    cinemaId: string,
    movieScheduleId: string
  ) => {
    const body: NewScheduleType = {
      movieId: formData.movieId,
      timeStart: formData.awalWaktu!.format("YYYY-MM-DDTHH:mm"),
      timeEnd: formData.akhirWaktu!.format("YYYY-MM-DDTHH:mm"),
      price: formData.hargaTiket,
      cinema: cinemaId,
      movieName: formData.movieName,
      movieImage: formData.movieImage,
      movie_schedule_id: movieScheduleId,
    };

    setScheduleData((prev) => {
      const baru = new Map(prev);
      baru.get(cinemaId)?.detail.push(body);
      return baru;
    });
  };

  const cleanData = () => {
    setFormData({
      movieName: "",
      hargaTiket: 0,
      awalWaktu: null,
      akhirWaktu: null,
      movieId: "",
      movieImage: "",
    });
  };

  const setAwalTayang = (value: Dayjs | null) => {
    setFormData({ ...formData, awalWaktu: value });
  };
  const setAkhirTayang = (value: Dayjs | null) => {
    setFormData({ ...formData, akhirWaktu: value });
  };

  return (
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
        {isSendingData ? (
          <CircularLoading text="Mengirim Data" />
        ) : (
          <MainContent
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            movieData={movieData}
            movieDataHasLoad={movieDataHasLoad}
            filmPilihan={filmPilihan}
            handleClickMovie={handleClickMovie}
            setAwalTayang={setAwalTayang}
            setAkhirTayang={setAkhirTayang}
            handleClose={handleClose}
          />
        )}
      </Box>
    </Modal>
  );
}

const generateMoviesForModal = (
  datas: MovieObject[],
  isTerpilih: number,

  handleClickMovie: (arg1: number, arg2: MovieObject) => void
) =>
  datas.map((data, index) => (
    <ActiveMovieItem
      key={data.movie_id}
      durasi={data.movie_duration}
      imgSource={data.movie_image}
      judul={data.movie_name}
      isTerpilih={isTerpilih === index ? "" : undefined}
      onClickMovie={() => handleClickMovie(index, data)}
    />
  ));

const generateMovieListSkeleton = (
  <>
    <ActiveMovieSkeleton />
    <ActiveMovieSkeleton />
    <ActiveMovieSkeleton />
    <ActiveMovieSkeleton />
  </>
);

function ActiveMovieItem({
  judul,
  durasi,
  imgSource,
  isTerpilih,
  onClickMovie,
}: {
  judul: string;
  durasi: number;
  imgSource: string;
  isTerpilih: string | undefined;
  onClickMovie: () => void;
}) {
  return (
    <Card
      elevation={3}
      sx={{ display: "flex", height: "60px", marginY: "6px" }}
    >
      <CardActionArea
        data-active={isTerpilih}
        onClick={onClickMovie}
        sx={{
          display: "flex",
          height: "100%",
          "&[data-active]": {
            backgroundColor: "action.selected",
            "&:hover": {
              backgroundColor: "action.selectedHover",
            },
          },
        }}
      >
        <Box sx={{ width: "20%" }}>
          <CardMedia
            component="img"
            sx={{ height: "100%" }}
            image={imgSource}
          />
        </Box>
        <Stack direction="column" marginX="10px" sx={{ width: "80%" }}>
          <Typography
            variant="body1"
            align="justify"
            color="primary"
            overflow="clip"
          >
            {judul}
          </Typography>
          <Typography variant="body1" align="justify">
            Durasi : {durasi} Menit
          </Typography>
        </Stack>
      </CardActionArea>
    </Card>
  );
}

function ActiveMovieSkeleton() {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      width="auto"
      marginBottom="10px"
    >
      <Box sx={{ width: "20%", height: "65px", marginRight: "10px" }}>
        <Skeleton
          variant="rectangular"
          height="100%"
          width="70px"
          sx={{ marginBottom: "10px" }}
        />
      </Box>
      <Stack direction="column" width="80%" spacing={1.5}>
        <Skeleton variant="rectangular" width="auto" height={20} />
        <Skeleton variant="rectangular" width="60px" height={20} />
      </Stack>
    </Stack>
  );
}

const MainContent = ({
  formData,
  handleInputChange,
  handleSubmit,
  movieData,
  movieDataHasLoad,
  filmPilihan,
  handleClickMovie,
  setAwalTayang,
  setAkhirTayang,
  handleClose,
}: {
  formData: ScheduleMovieProp;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  movieData: MovieObject[];
  movieDataHasLoad: boolean;
  filmPilihan: number;
  handleClickMovie: (index: number, movieData: MovieObject) => void;
  setAwalTayang: (value: Dayjs | null) => void;
  setAkhirTayang: (value: Dayjs | null) => void;
  handleClose: () => void;
}) => (
  <>
    <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
      Add Movie Schedule
    </Typography>
    <TextField
      id="input-with-icon-textfield"
      label="TextField"
      size="small"
      slotProps={{
        input: {
          startAdornment: <SearchIcon />,
        },
      }}
      variant="standard"
    />
    <Box
      width="auto"
      height="250px"
      sx={{
        flexDirection: "column",
        overflowY: "scroll",
        marginTop: "15px",
      }}
    >
      {movieDataHasLoad
        ? generateMoviesForModal(movieData, filmPilihan, handleClickMovie)
        : generateMovieListSkeleton}
    </Box>
    <TextField
      fullWidth
      label="Movie Name"
      name="movieName"
      margin="normal"
      value={formData.movieName}
      required
      disabled
    />
    <TextField
      fullWidth
      label="Harga Tiket"
      name="hargaTiket"
      margin="normal"
      type="number"
      sx={{ marginBottom: "20px" }}
      required
      value={formData.hargaTiket}
      onChange={handleInputChange}
    />
    <Stack direction="row" spacing={2}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          label="Uncontrolled picker"
          name="awalWaktu"
          defaultValue={dayjs().startOf("day")}
          onChange={(newValue) => {
            setAwalTayang(newValue);
          }}
        />
        <TimePicker
          label="Controlled picker"
          name="akhirWaktu"
          defaultValue={dayjs().startOf("day")}
          onChange={(newValue) => {
            setAkhirTayang(newValue);
          }}
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
  </>
);

export default FormModal;
