import axios from "axios";
import type {
  CinemaScheduleData,
  CinemaScheduleHeader,
  CreateRequestResponse,
  ModalDataProp,
  ScheduleMovieProp,
} from "../interfaces/interfaces";
import { newMovieSchema } from "../interfaces/joi-schema";
import Joi from "joi";
import joiErrortoDetail from "../../global/joi-error-helper";

const fetchModalMovies = async (
  modalData: ModalDataProp,
  setModalData: (value: React.SetStateAction<ModalDataProp>) => void
): Promise<boolean> => {
  try {
    const response = await axios.get(
      "http://localhost:3000/movies/activeMovies"
    );
    if (response.status == 200) {
      setModalData({
        ...modalData,
        movieDataHasLoad: true,
        movieData: response.data,
      });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(`Gagal load film aktif \n ${error}`);
    return false;
  }
};
const fetchCinemaScheduleData = async (
  setScheduleData: (
    value: React.SetStateAction<Map<string, CinemaScheduleHeader>>
  ) => void
) => {
  try {
    const response = await axios.get(
      "http://localhost:3000/movieSchedule/getMovieShowing",
      {
        params: {
          theatreLocation: "xxaxx",
          timeStart: "2025-05-16T00:00:00",
          timeEnd: "2025-05-16T23:59:59",
        },
      }
    );
    if (response.status == 200) {
      const myMap = new Map<string, CinemaScheduleHeader>();
      console.log(response.data);
      (response.data as CinemaScheduleData[]).forEach((e) => {
        if (!myMap.has(e.cinema_id)) {
          myMap.set(e.cinema_id, {
            cinema_id: e.cinema_id,
            cinema_name: e.cinema_name,
            detail: [],
          });
        }
        if (e.movie != null) {
          myMap.get(e.cinema_id)?.detail.push({
            movieId: e.movie,
            timeStart: e.started_at,
            timeEnd: e.end_at,
            price: e.price,
            movie_schedule_id: e.movie_schedule_id,
            movieName: e.movie_name,
            movieImage: e.movie_image,
            cinema: e.cinema_id,
          });
        }
      });
      setScheduleData(myMap);
      console.log(myMap);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(`Gagal load schedule cinema \n ${error}`);
    return false;
  }
};

const sendNewSchedule = async (
  formData: ScheduleMovieProp,
  cinemaId: string
): Promise<CreateRequestResponse> => {
  try {
    const body = {
      movieId: formData.movieId,
      timeStart: formData.awalWaktu!.format("YYYY-MM-DDTHH:mm"),
      timeEnd: formData.akhirWaktu!.format("YYYY-MM-DDTHH:mm"),
      price: formData.hargaTiket,
      cinema: cinemaId,
    };
    console.log(body);
    await newMovieSchema.validateAsync(body, { abortEarly: false });
    // const response = await axios.post(
    //   "http://localhost:3000/movieSchedule/create",
    //   body
    // );
    // if (response.status == 200) {
    //   const { movie_schedule_id } = response.data;
    //   return { id: movie_schedule_id, isSuccessful: true };
    // } else {
    //   return { id: "", isSuccessful: false };
    // }
    return { id: "xxFilmbaruxx", isSuccessful: true };
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      console.log(joiErrortoDetail(error));
    } else {
      console.log(`Gagal tambah schedule cinema baru \n ${error}`);
    }
    return { id: "", isSuccessful: false };
  }
};

export { fetchModalMovies, fetchCinemaScheduleData, sendNewSchedule };

// const fetchCinemaScheduleData = async () => {
//   try {
//     const response = await axios.get(
//       "http://localhost:3000/movieSchedule/getMovieShowing",
//       {
//         params: {
//           theatreLocation: "xxaxx",
//           timeStart: "2025-05-16T00:00:00",
//           timeEnd: "2025-05-16T23:59:59",
//         },
//       }
//     );

//     const myMap = new Map<string, CinemaScheduleHeader>();
//     console.log(response.data);
//     (response.data as CinemaScheduleData[]).forEach((e) => {
//       if (!myMap.has(e.cinema_id)) {
//         myMap.set(e.cinema_id, {
//           cinema_id: e.cinema_id,
//           cinema_name: e.cinema_name,
//           detail: [],
//         });
//       }
//       if (e.movie != null) {
//         myMap.get(e.cinema_id)?.detail.push({
//           movie: e.movie,
//           started_at: e.started_at,
//           end_at: e.end_at,
//           price: e.price,
//           movie_schedule_id: e.movie_schedule_id,
//         });
//       }
//     });
//     setScheduleData(myMap);
//     console.log(scheduleData);
//   } catch (error) {
//     console.log(`Gagal load schedule cinema \n ${error}`);
//   }
// };

// const fetchModalMovies = async () => {
//   try {
//     const response = await axios.get(
//       "http://localhost:3000/movies/activeMovies"
//     );
//     setModalData({
//       ...modalData,
//       movieDataHasLoad: true,
//       movieData: response.data,
//     });
//   } catch (error) {
//     console.log(`Gagal load film aktif \n ${error}`);
//   }
// };
