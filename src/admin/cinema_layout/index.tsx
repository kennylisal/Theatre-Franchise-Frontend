import { useState, type JSX } from "react";
import type { Seating } from "../seating/interface";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  rowFormSchema,
  type LayoutGeneratorType,
  type RowSchemaForm,
} from "./interface";
import { checkFormError } from "./utils";

function CinemaLayoutMaker() {
  const formDataAwal: RowSchemaForm = {
    length: 0,
  };

  //   const cinemaId = "xx_cinema_id_xx";
  const [layoutSchema, setLayoutSchema] = useState<LayoutGeneratorType[]>([]);
  //   const [rowSchema, setRowSchema] = useState<RowSchema[]>([]);
  const [rowForm, setRowForm] = useState<RowSchemaForm>(formDataAwal);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isModeLane, setIsModeLane] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRowForm((prev) => ({ ...prev, [name]: value }));
  };
  const gantiModeLane = () => {
    setIsModeLane((prev) => !prev);
  };
  const addRow = () => {
    const arrLetter: string[] = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
    ];
    const isFormValid = checkFormError(rowFormSchema, rowForm, setErrors);
    if (isFormValid) {
      //   setRowSchema((prev) => [
      //     ...prev,
      //     {
      //       row: arrLetter[prev.length],
      //       column: Array.from({ length: rowForm.length }).map(
      //         (_, index) =>
      //           ({
      //             seat: `${index + 1}`,
      //             status: "available",
      //             seat_id: `${arrLetter[prev.length]}${index + 1}${cinemaId}`,
      //             rowName: `${arrLetter[prev.length]}`,
      //           } as Seating)
      //       ),
      //     },
      //   ]);
      setLayoutSchema((prev) => [
        ...prev,
        {
          length: rowForm.length,
          row: arrLetter[prev.length],
          sequence: [6],
        },
      ]);
    }
  };

  return (
    <Container maxWidth="md" sx={{ flexGrow: 1, height: "auto" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          maxHeight: "700px",
          backgroundColor: "bisque",
          padding: 2,
          overflow: "auto",
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          marginBottom={2}
          justifyContent="space-between"
          width="100%"
        >
          <TextField
            label="length"
            name="length"
            value={rowForm.length}
            onChange={handleChange}
            error={!!errors.length}
            helperText={errors.length}
            margin="normal"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "#4B4B4F",
                color: "#FFFFFF",
                "& fieldset": { borderColor: "#4B4B4F" },
                "&:hover fieldset": { borderColor: "#9147FF" },
                "&.Mui-focused fieldset": { borderColor: "#9147FF" },
              },
              "& .MuiInputLabel-root": { color: "#EFEEF1" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#FFFFFF" },
            }}
          />
          <Button
            onClick={addRow}
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: "#9147FF",
              color: "#FFFFFF",
              fontWeight: "bold",
              "&:hover": { bgcolor: "#7B3FE4" },
            }}
          >
            Buat
          </Button>
          <Button
            onClick={gantiModeLane}
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: "#9147FF",
              color: "#FFFFFF",
              fontWeight: "bold",
              "&:hover": { bgcolor: isModeLane ? "red" : "#7B3FE4" },
            }}
          >
            {isModeLane ? "Mode Normal" : "Mode Kursi"}
          </Button>
        </Stack>
        {/* <RowSeats seatings={rowSchema} setRowSchema={setRowSchema} /> */}
        {/* <RowSeatsLayout seatings={layoutSchema} setRowSchema={setRowSchema} /> */}
        <RowSeatsLayoutV2
          seatings={layoutSchema}
          setLayoutSchema={setLayoutSchema}
        />
      </Box>
    </Container>
  );
}

// function RowSeatsLayout({
//   seatings,
//   setLayoutSchema,
// }: {
//   seatings: LayoutGeneratorType[];
//   setLayoutSchema: React.Dispatch<React.SetStateAction<LayoutGeneratorType[]>>;
// }) {
//   return (
//     <>
//       {seatings.map((seat) => {
//         let ctr = 0;

//         return (
//           <Stack direction="row" spacing={1} sx={{ marginBottom: "10px" }}>
//             <Typography color="black" variant="h4" fontWeight="bold">
//               {seat.row}
//             </Typography>
//             {seat.sequence.map((e) =>
//               Array.from({ length: e }).map((_, index) => {
//                 if (ctr !== seat.length) {
//                   const seatingInfo: Seating = {
//                     rowName: seat.row,
//                     seat_id: `${seat.row}${ctr + 1}`,
//                     seat: `${ctr + 1}`,
//                     status: "available",
//                   };
//                   const result: JSX.Element = (
//                     <SeatingBox
//                       seatingInfo={seatingInfo}
//                       setRowSchema={setRowSchema}
//                     />
//                   );
//                   if (seat.sequence.length > 1) ctr++;
//                   return result;
//                 }
//               })
//             )}
//           </Stack>
//         );
//       })}
//     </>
//   );
// }

function RowSeatsLayoutV2({
  seatings,
  setLayoutSchema,
}: {
  seatings: LayoutGeneratorType[];
  setLayoutSchema: React.Dispatch<React.SetStateAction<LayoutGeneratorType[]>>;
}) {
  return (
    <>
      {seatings.map((seat) => {
        let ctr = 0;
        //ctr -> seq[0]
        //selama jalan ctr++
        //if ctr < seat.length
        //lanjut terus
        const returnedElement: JSX.Element[] = [];
        seat.sequence.forEach((e) => {
          console.log(e);
          for (let index = 0; index < e; index++) {
            const seatingInfo: Seating = {
              rowName: seat.row,
              seat_id: `${seat.row}${ctr + 1}`,
              seat: `${ctr + 1}`,
              status: "available",
            };
            returnedElement.push(
              <SeatingBoxV2
                seatingInfo={seatingInfo}
                setLayoutSchema={setLayoutSchema}
              />
            );
            ctr++;
            if (ctr > seat.length) {
              break;
            }
          }
          if (ctr < seat.length) {
            const seatingInfo: Seating = {
              rowName: seat.row,
              seat_id: `${seat.row}${ctr + 1}X`,
              seat: `XX`,
              status: "lane",
            };
            returnedElement.push(
              <SeatingBoxV2
                seatingInfo={seatingInfo}
                setLayoutSchema={setLayoutSchema}
              />
            );
          }
        });
        let ctrAkhir = ctr;
        for (
          let index = 0;
          index < seat.length - ctr - seat.sequence.length;
          index++
        ) {
          const seatingInfo: Seating = {
            rowName: seat.row,
            seat_id: `${seat.row}${ctrAkhir + 1}`,
            seat: `${ctrAkhir + 1}`,
            status: "available",
          };
          returnedElement.push(
            <SeatingBoxV2
              seatingInfo={seatingInfo}
              setLayoutSchema={setLayoutSchema}
            />
          );
          ctrAkhir++;
        }
        return (
          <Stack direction="row" spacing={1} sx={{ marginBottom: "10px" }}>
            <Typography color="black" variant="h4" fontWeight="bold">
              {seat.row}
            </Typography>
            {...returnedElement}
          </Stack>
        );
      })}
    </>
  );
}

// function RowSeats({
//   seatings,
//   setRowSchema,
// }: {
//   seatings: RowSchema[];
//   setRowSchema: React.Dispatch<React.SetStateAction<RowSchema[]>>;
// }) {
//   return (
//     <>
//       {seatings.map((seat) => (
//         <Stack direction="row" spacing={1} sx={{ marginBottom: "10px" }}>
//           <Typography color="black" variant="h4" fontWeight="bold">
//             {seat.row}
//           </Typography>
//           {seat.column.map((column) => {
//             return (
//               <SeatingBox seatingInfo={column} setRowSchema={setRowSchema} />
//             );
//           })}
//         </Stack>
//       ))}
//     </>
//   );
// }

function SeatingBoxV2({
  seatingInfo,
  setLayoutSchema,
}: {
  seatingInfo: Seating;
  setLayoutSchema: React.Dispatch<React.SetStateAction<LayoutGeneratorType[]>>;
}) {
  const colorCode: Record<string, string> = {
    available: "#2ed41a",
    unavailable: "#616161",
    hover: "#e5ef14",
    lane: "#ffffff",
    "on-maintenance": "red",
  };
  const onClick = () => {
    console.log(seatingInfo);
    setLayoutSchema((prev) => prev);
  };
  const styleTambahan =
    seatingInfo.status === "lane"
      ? {
          backgroundColor: colorCode[seatingInfo.status],
          border: "1px solid black",
          borderRadius: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "&:hover": {
            backgroundColor: colorCode.hover,
            cursor: "pointer",
          },
        }
      : {
          backgroundColor: colorCode[seatingInfo.status],
          border: "1px solid black",
          borderRadius: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          ...(seatingInfo.status === "available" && {
            "&:hover": {
              backgroundColor: colorCode.hover,
              cursor: "pointer",
            },
          }),
        };
  return (
    <Box
      onClick={onClick}
      sx={{
        width: "40px", // Wider than parent to trigger horizontal scrolling
        height: "40px", // Taller than parent to trigger vertical scrolling
        ...styleTambahan,
      }}
    >
      <Typography
        color={seatingInfo.status === "unavailable" ? "black" : "white"}
        variant="body1"
        fontWeight="bold"
      >
        {seatingInfo.seat === "XX" ? "" : seatingInfo.seat}
      </Typography>
    </Box>
  );
}

// function SeatingBox({
//   seatingInfo,
//   setRowSchema,
// }: {
//   seatingInfo: Seating;
//   setRowSchema: React.Dispatch<React.SetStateAction<RowSchema[]>>;
// }) {
//   const colorCode: Record<string, string> = {
//     available: "#2ed41a",
//     unavailable: "#616161",
//     hover: "#e5ef14",
//     lane: "#ffffff",
//     "on-maintenance": "red",
//   };
//   const onClick = () => {
//     console.log(seatingInfo);
//     setRowSchema((prev) => {
//       const newSchema = prev.map((e) => {
//         if (e.row === seatingInfo.rowName) {
//           const newColumn = e.column.map((seating) =>
//             seating.seat_id === seatingInfo.seat_id
//               ? ({ ...seating, status: "lane" } as Seating)
//               : seating
//           );
//           return { row: e.row, column: newColumn };
//         } else {
//           return e;
//         }
//       });
//       return newSchema;
//     });
//   };
//   const styleTambahan =
//     seatingInfo.status === "lane"
//       ? {}
//       : {
//           backgroundColor: colorCode[seatingInfo.status],
//           border: "1px solid black",
//           borderRadius: "5px",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           ...(seatingInfo.status === "available" && {
//             "&:hover": {
//               backgroundColor: colorCode.hover,
//               cursor: "pointer",
//             },
//           }),
//         };
//   return (
//     <Box
//       onClick={onClick}
//       sx={{
//         width: "40px", // Wider than parent to trigger horizontal scrolling
//         height: "40px", // Taller than parent to trigger vertical scrolling
//         ...styleTambahan,
//       }}
//     >
//       <Typography
//         color={seatingInfo.status === "unavailable" ? "black" : "white"}
//         variant="body1"
//         fontWeight="bold"
//       >
//         {seatingInfo.seat === "XX" ? "" : seatingInfo.seat}
//       </Typography>
//     </Box>
//   );
// }

export default CinemaLayoutMaker;
