import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: {},
  start: false,
  score: 0,
  isScoreUpdated: false,
  activeQuestion: 0,
  answers: {},
  isSubmitted: false,
  isDisabled: false,
  quiz: [],
};

export const quizReducer = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    getQuery: (state, action) => {
      state.query = action.payload;
    },
    getStatus: (state, action) => {
      state.start = action.payload;
    },
    setQuiz: (state, action) => {
      state.quiz = action.payload;
    },
    next: (state) => {
      if (state.activeQuestion < state.quiz.length - 1) {
        state.activeQuestion++;
      }
    },
    prev: (state) => {
      if (state.activeQuestion > 0) {
        state.activeQuestion--;
      }
    },
    setScore: (state, action) => {
      state.score = action.payload;
    },
    setAnswers: (state, action) => {
      state.answers[action.payload[0]] = action.payload[1];
    },
    emptyAnswers: (state) => {
      state.answers = [];
    },
    incScore: (state) => {
      state.score += 10;
    },
    decScore: (state) => {
      state.score--;
    },
    getSubmitted: (state, action) => {
      state.isSubmitted = action.payload;
    },
    setActive: (state, action) => {
      state.activeQuestion = action.payload;
    },
    setDisabled: (state, action) => {
      state.isDisabled = action.payload;
    },
    setScoreUpdates: (state, action) => {
      state.isScoreUpdated = action.payload;
    },
    resetStates: (state) => {
      state.score = 0;
      state.activeQuestion = 0;
      state.answers = {};
      state.isSubmitted = false;
      state.activeQuestion = 0;
      state.isDisabled = false;
      state.start = false;
      state.query = {};
      state.quiz = [];
    },
  },
});

export const {
  getQuery,
  getStatus,
  setQuiz,
  prev,
  next,
  resetStates,
  setAnswers,
  incScore,
  decScore,
  getSubmitted,
  setActive,
  setScore,
  emptyAnswers,
  setDisabled,
  setScoreUpdates,
} = quizReducer.actions;

export default quizReducer.reducer;
