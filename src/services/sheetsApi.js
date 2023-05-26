import axios from "axios";
import { letterConverter } from "../utils/letterConverter";

export const fetchSheetsData = async (
  sheetName,
  column1,
  row1,
  column2 = null,
  row2 = null
) => {
  let SHEET_ID = localStorage.getItem("sheetId");
  let SHEET_TITLE = sheetName;
  let SHEET_RANGE = column2
    ? `${letterConverter(column1)}${row1}:${letterConverter(column2)}${row2}`
    : `${letterConverter(column1)}${row1}`;

  let FULL_URL =
    "https://docs.google.com/spreadsheets/d/" +
    SHEET_ID +
    "/gviz/tq?sheet=" +
    SHEET_TITLE +
    "&range=" +
    SHEET_RANGE;

  try {
    const result = await axios.get(FULL_URL);
    const json = JSON.parse(
      result.data.replace(
        /.*google.visualization.Query.setResponse\({(.*?)}\);?/s,
        "{$1}"
      )
    );

    let data = json.table.rows.map((item) => {
      let row = {};
      const a = item.c.map((cell, idx) => {
        return (row[idx] = cell?.v ?? null);
      });

      return row;
    });

    return data;
  } catch (error) {
    console.log("Something get wrong");
  }
};
