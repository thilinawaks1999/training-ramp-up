/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { Student } from "../../utils/interface";

interface HomePageState {
  students: Student[];
  error: string;
  loading: boolean;
}

// Define the initial state using that type
const initialState: HomePageState = {
  students: [],
  error: "",
  loading: false,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const homeSlice: any = createSlice({
  name: "home",
  initialState,
  reducers: {
    getStudents: (state) => {
      state.loading = true;
    },
    getStudentsSuccess: (state, action) => {
      state.loading = false;
      state.students = action.payload;
      state.error = "";
    },
    getStudentsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addStudent: (state, action) => {
      return state;
    },
    addStudentSuccess: (state, action) => {
      state.students = action.payload;
      state.error = "";
    },
    addStudentFailure: (state, action) => {
      state.error = action.payload;
    },
    deleteStudent: (state, action) => {
      return state;
    },
    deleteStudentSuccess: (state, action) => {
      state.students = action.payload;
      state.error = "";
    },
    deleteStudentFailure: (state, action) => {
      state.error = action.payload;
    },
    updateStudent: (state, action) => {
      return state;
    },
    updateStudentSuccess: (state, action) => {
      state.students = action.payload;
      state.error = "";
    },
    updateStudentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getStudents,
  getStudentsSuccess,
  getStudentsFailure,
  addStudent,
  addStudentSuccess,
  addStudentFailure,
  deleteStudent,
  deleteStudentSuccess,
  deleteStudentFailure,
  updateStudent,
  updateStudentSuccess,
  updateStudentFailure,
} = homeSlice.actions;

export default homeSlice.reducer;
