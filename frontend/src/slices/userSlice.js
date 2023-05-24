import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAnalyticsData = createAsyncThunk("analytics/get-analytics", async () => {
  try {
    const { data } = await axios.get(`/api/analytics/get-analytics`);

    return data;
  } catch (error) {
    throw new Error(error);
  }
});

export const getGenealogy = createAsyncThunk("reference/get-reference-data", async () => {
  try {
    const { data } = await axios.get(`/api/reference/get-reference-data`);

    return data;
  } catch (error) {
    throw new Error(error);
  }
});

export const userSlice = createSlice({
  name: "userData",
  initialState: {
    referencesIncentiveData: [],
    referenceIncentiveAnalytics: [],
    directSalesIncentiveData: [],
    directSalesIncentiveAnalytics: [],
    directSales: 0,
    incentiveFromDirectSales: 0,
    incentiveFromReferences: 0,
    genealogy: [],
    referencesMemberId: [],
    membersData: [],
    membersAnalytics: [],
    nonWorkingIncentive: 0,
    nonWorkingIncentiveData: [],
    loading: false,
    error: "",
  },
  reducers: {
    clearUserSlice: (state) => {
      state.referenceIncentiveAnalytics = [];
      state.referencesIncentiveData = [];
      state.directSalesIncentiveData = [];
      state.directSalesIncentiveAnalytics = [];
      state.genealogy = [];
      state.directSales = 0;
      state.incentiveFromDirectSales = 0;
      state.incentiveFromReferences = 0;
      state.referencesMemberId = [];
      state.membersData = [];
      state.membersAnalytics = [];
      state.nonWorkingIncentive = 0;
      state.nonWorkingIncentiveData = [];
    },
  },

  extraReducers: {
    [getAnalyticsData.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getAnalyticsData.fulfilled]: (state, { payload }) => {
      if (payload.referenceIncentiveAnalytics) {
        state.referenceIncentiveAnalytics = payload.referenceIncentiveAnalytics;
      }
      if (payload.membersAnalytics) {
        state.membersAnalytics = payload.membersAnalytics;
      }

      let totalReferencesIncentive = 0;
      if (payload.referencesIncentiveData.length) {
        payload.referencesIncentiveData.map((e) => {
          totalReferencesIncentive = totalReferencesIncentive + e.incentiveEarned;
        });
        state.incentiveFromReferences = totalReferencesIncentive;
        state.referencesIncentiveData = payload.referencesIncentiveData;
      }

      if (payload.membersData.length) {
        state.membersData = payload.membersData;
      }

      let totalNonWorkingIncentive = 0;
      if (payload.nonWorkingIncentiveData.length) {
        payload.nonWorkingIncentiveData.map((e) => {
          totalNonWorkingIncentive = totalNonWorkingIncentive + e.incentiveEarned;
        });
        state.nonWorkingIncentive = totalNonWorkingIncentive;
        state.nonWorkingIncentiveData = payload.nonWorkingIncentiveData;
      }

      state.loading = false;
    },
    [getAnalyticsData.rejected]: (state, { error }) => {
      state.error = error.message;
      state.loading = false;
    },

    [getGenealogy.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getGenealogy.fulfilled]: (state, { payload }) => {
      state.genealogy = payload.referenceData;
      state.referencesMemberId = payload.array[0].referencesMemberId;
      state.loading = false;
    },
    [getGenealogy.rejected]: (state, { error }) => {
      state.error = error.message;
      state.loading = false;
    },
  },
});

// Export Actions
export const { clearUserSlice } = userSlice.actions;

// Export Reducer
export default userSlice.reducer;
