import { createSlice } from "@reduxjs/toolkit";
import { Student } from "../components/interface";

interface HomePageState {
  students: Student[];
  error: string;
  isLoading: boolean;
}

// Define the initial state using that type
const initialState: HomePageState = {
  students: [],
  error: "",
  isLoading: false,
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    enterEditMode: (state, action) => {
      state.students.map((student) => {
        if (student.id === action.payload) {
          student.inEdit = true;
        }
        return student;
      });
    },
    cancelEditMode: (state, action) => {
      state.students.map((student) => {
        if (student.id === action.payload) {
          student.inEdit = false;
        }
        return student;
      });
    },
    setStudent: (state, action) => {
      state.students = action.payload;
    },
    getStudents: (state) => {
      state.isLoading = true;
    },
    getStudentsSuccess: (state, action) => {
      state.isLoading = false;
      state.students = action.payload;
    },
    getStudentsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addStudent: (state, action) => {
      state.isLoading = true;
    },
    addStudentSuccess: (state, action) => {
      state.isLoading = false;
      state.students = [...state.students, action.payload];
    },
    addStudentFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteStudent: (state, action) => {
      state.isLoading = true;
    },
    deleteStudentSuccess: (state, action) => {
      state.isLoading = false;
      state.students = state.students.filter(
        (student) => student.id !== action.payload
      );
    },
    deleteStudentFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateStudent: (state, action) => {
      state.isLoading = true;
    },
    updateStudentSuccess: (state, action) => {
      console.log("updateStudentSuccess", action.payload);
      state.isLoading = false;
      state.students = state.students.map((student) => {
        if (student.id === action.payload.id) {
          return {
            ...action.payload,
            inEdit: false,
          };
        }
        return student;
      });
    },
    updateStudentFailure: (state, action) => {
      state.isLoading = false;
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
  enterEditMode,
  cancelEditMode,
  setStudent,
  updateStudent,
  updateStudentSuccess,
  updateStudentFailure,
} = homeSlice.actions;

export default homeSlice.reducer;
