import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAnalyticsDataAdmin = createAsyncThunk("analytics/get-analytics-admin", async () => {
  try {
    const { data } = await axios.get(`/api/analytics/get-analytics-admin`);

    return data;
  } catch (error) {
    throw new Error(error);
  }
});

export const getAdminGenealogy = createAsyncThunk("reference/getReferenceDataAdmin", async () => {
  try {
    const { data } = await axios.get(`/api/reference/getReferenceDataAdmin`);

    return data;
  } catch (error) {
    throw new Error(error);
  }
});

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    salesDataAdmin: [],
    salesAnalyticsAdmin: [],
    referencesIncentiveDataAdmin: [],
    directSalesDataAdmin: [],
    directSalesAdmin: 0,
    incentiveFromDirectSalesAdmin: 0,
    incentiveFromReferencesAdmin: 0,
    membersDataAdmin: [],
    adminGenealogy: [],
    membersAnalyticsAdmin: [],
    loading: false,
    error: "",
  },
  reducers: {
    clearAdminSlice: (state) => {
      state.salesDataAdmin = [];
      state.salesAnalyticsAdmin = [];
      state.referencesIncentiveDataAdmin = [];
      state.directSalesDataAdmin = [];
      state.directSalesAdmin = 0;
      state.incentiveFromDirectSalesAdmin = 0;
      state.incentiveFromReferencesAdmin = 0;
      state.membersDataAdmin = [];
      state.membersAnalyticsAdmin = [];
    },
  },

  extraReducers: {
    [getAnalyticsDataAdmin.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getAnalyticsDataAdmin.fulfilled]: (state, { payload }) => {
      if (payload.membersAnalyticsAdmin) {
        state.membersAnalyticsAdmin = payload.membersAnalyticsAdmin;
      }

      let totalReferencesIncentive = 0;
      if (payload.referencesIncentiveDataAdmin.length) {
        payload.referencesIncentiveDataAdmin.map((e) => {
          totalReferencesIncentive = totalReferencesIncentive + e.incentiveEarned;
        });
        state.incentiveFromReferencesAdmin = totalReferencesIncentive;
        state.referencesIncentiveDataAdmin = payload.referencesIncentiveDataAdmin;
      }

      if (payload.membersDataAdmin.length) {
        state.membersDataAdmin = payload.membersDataAdmin;
      }

      state.loading = false;
    },
    [getAnalyticsDataAdmin.rejected]: (state, { error }) => {
      state.error = error.message;
      state.loading = false;
    },

    [getAdminGenealogy.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getAdminGenealogy.fulfilled]: (state, { payload }) => {
      state.adminGenealogy = { ...payload };
      state.loading = false;
    },
    [getAdminGenealogy.rejected]: (state, { error }) => {
      state.error = error.message;
      state.loading = false;
    },
  },
});

// Export Actions
export const { clearAdminSlice } = adminSlice.actions;

// Export Reducer
export default adminSlice.reducer;
