import { Box, Container } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import type {
  ModalDataProp,
  CinemaScheduleHeader,
} from "./interfaces/interfaces";
import PilihanTanggal from "./component/pilihan-tanggal";
import { MovieScheduleSkeleton } from "./component/skeleton";
import { fetchCinemaScheduleData, fetchModalMovies } from "./services/model";
import AppBarAdmin from "../global/app-bar";
import { ScheduleContent } from "./component/schedule-section";
import SnackBarContext from "../global/snackbar-context";
import FormModal from "./component/form-modal";

function MovieScheduleView() {
  const [modalData, setModalData] = useState<ModalDataProp>({
    open: false,
    movieDataHasLoad: false,
    movieData: [],
  });
  const [scheduleData, setScheduleData] = useState<
    Map<string, CinemaScheduleHeader>
  >(new Map());
  const [hasScheduleLoad, setHasScheduleLoad] = useState(false);
  const [selectedCinema, setSelectedCinema] = useState("");
  const { showSnackBar } = useContext(SnackBarContext);
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

  useEffect(() => {
    const loadData = async () => {
      const hasModalFetched = await fetchModalMovies(modalData, setModalData);
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

  return (
    <>
      <AppBarAdmin />
      <Container maxWidth="xl" sx={{ flexGrow: 1, height: "auto" }}>
        <PilihanTanggal />
        <FormModal
          open={modalData.open}
          handleClose={handleModalClose}
          handleOpen={handleModalOpen}
          movieData={modalData.movieData}
          movieDataHasLoad={modalData.movieDataHasLoad}
          cinemaId={selectedCinema}
          setScheduleData={setScheduleData}
        />
        <Box sx={{ my: "20px" }}></Box>
        {hasScheduleLoad ? (
          <ScheduleContent
            scheduleData={scheduleData!}
            handleModalOpen={handleModalOpen}
            setSelectedCinema={setSelectedCinema}
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
