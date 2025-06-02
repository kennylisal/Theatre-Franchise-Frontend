import { Box, Container } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import {
  type ModalDataProp,
  type CinemaScheduleHeader,
  type NewScheduleType,
} from "./interfaces/interfaces";
import PilihanTanggal from "./main-page/pilihan-tanggal";
import { MovieScheduleSkeleton } from "./main-page/skeleton";

import AppBarAdmin from "../global/app-bar";
import { ScheduleContent } from "./main-page/schedule-section";
import SnackBarContext from "../global/snackbar-context";
import FormModalCreate from "./create/form-modal";
import {
  fetchCinemaScheduleData,
  fetchModalMovies,
} from "./main-page/services";
import FormModalUpdate from "./update/form-moda";
import type { MovieObject } from "../../public/movies/interfaces";
import dayjs, { Dayjs } from "dayjs";

function MovieScheduleView() {
  const [selectedUpdateMovie, setSelectedUpdateMovie] =
    useState<NewScheduleType>();
  const [modalMovies, setModalMovies] = useState<MovieObject[]>([]);
  const [modalData, setModalData] = useState<ModalDataProp>({
    open: false,
    movieDataHasLoad: false,
  });

  const handleSelectUpdateMovies = (movieScheduleProp: NewScheduleType) => {
    setSelectedUpdateMovie(movieScheduleProp);
  };
  const handleModalOpen = () =>
    setModalData({
      ...modalData,
      open: true,
    });
  const handleModalClose = () =>
    setModalData({
      ...modalData,
      open: false,
    });
  const [modalUpdateData, setModalUpdateData] = useState<ModalDataProp>({
    open: false,
    movieDataHasLoad: true,
  });
  const handleModalUpdateOpen = () =>
    setModalUpdateData({ ...modalUpdateData, open: true });
  const handleModalUpdateClose = () =>
    setModalUpdateData({ ...modalUpdateData, open: false });
  const [scheduleData, setScheduleData] = useState<
    Map<string, CinemaScheduleHeader>
  >(new Map());
  const [hasScheduleLoad, setHasScheduleLoad] = useState(false);
  const [selectedCinema, setSelectedCinema] = useState("");
  const { showSnackBar } = useContext(SnackBarContext);

  useEffect(() => {
    const loadData = async () => {
      const hasModalFetched = await fetchModalMovies(
        modalData,
        setModalData,
        setModalMovies
      );
      const hasCinemaSCheduleFetch = await fetchCinemaScheduleData(
        setScheduleData
      );
      await wait();
      if (hasModalFetched && hasCinemaSCheduleFetch) {
        setHasScheduleLoad(true);
      } else {
        showSnackBar("Data Cinema Schedule gagal di muat", "error");
      }
    };
    loadData();
  }, []);
  //bagian tanggal
  const tanggalAwal = dayjs();
  const [tanggalPilihan, setTanggalPilihan] = useState<Dayjs>(tanggalAwal);
  const handleGantiTanggal = (tangalBaru: Dayjs) => {
    console.log("ganti tanggal");
    setTanggalPilihan(tangalBaru);
    console.log(tanggalPilihan.date());
  };
  //
  return (
    <>
      <AppBarAdmin />
      <Container maxWidth="xl" sx={{ flexGrow: 1, height: "auto" }}>
        <PilihanTanggal
          tanggalAwal={tanggalAwal}
          handleChangeDate={handleGantiTanggal}
          tanggalPilihan={tanggalPilihan}
        />
        <FormModalCreate
          open={modalData.open}
          handleClose={handleModalClose}
          handleOpen={handleModalOpen}
          movieData={modalMovies}
          movieDataHasLoad={modalData.movieDataHasLoad}
          cinemaId={selectedCinema}
          setScheduleData={setScheduleData}
        />
        <FormModalUpdate
          open={modalUpdateData.open}
          handleClose={handleModalUpdateClose}
          handleOpen={handleModalUpdateOpen}
          setScheduleData={setScheduleData}
          movieProp={selectedUpdateMovie}
          movieData={modalMovies}
        />
        <Box sx={{ my: "20px" }}></Box>
        {hasScheduleLoad ? (
          <ScheduleContent
            scheduleData={scheduleData!}
            handleModalOpen={handleModalOpen}
            setSelectedCinema={setSelectedCinema}
            handleOpenModalUpdate={handleModalUpdateOpen}
            setSelectedUpdateMovie={handleSelectUpdateMovies}
          />
        ) : (
          <MovieScheduleSkeleton jumlah={3} />
        )}
      </Container>
    </>
  );
}

const wait = () => new Promise((resolve) => setTimeout(resolve, 1500));

export default MovieScheduleView;
