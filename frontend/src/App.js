import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";

import "./App.css";

import ClientsList from "./pages/ClientsList/ClientsList";
import VendorsList from "./pages/VendorsList/VendorsList";
import Login from "./pages/loginSignup/Login";
import Signup from "./pages/loginSignup/Signup";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSession } from "./slices/sessionSlice";
import DashboardCustomer from "./pages/Dashboard-Pages/DashboardCustomer";
import DashboardVendor from "./pages/Dashboard-Pages/DashboardVendor";
import DashboardAdmin from "./pages/Dashboard-Pages/DashboardAdmin";
import Membership from "./pages/Membership/Membership";
import AllPostedProgramsAdmin from "./pages/AllPostedProgramsAdmin/AllPostedProgramsAdmin";
import PendingApprovalProgramsAdmin from "./pages/AllPostedProgramsAdmin/PendingApprovalProgramsAdmin";
import AllPostedQuotationsVendor from "./pages/AllPostedQuotationsVendor/AllPostedQuotationsVendor";
import PendingQuotationsVendor from "./pages/AllPostedQuotationsVendor/PendingQuotationsVendor";
import AcceptedQuotationsVendor from "./pages/AllPostedQuotationsVendor/AcceptedQuotationsVendor";
import AllPostedProgramsCustomer from "./pages/AllPagesCustomer/AllPostedProgramsCustomer";
import PendingQuotationsCustomer from "./pages/AllPagesCustomer/PendingQuotationsCustomer";
import AcceptedQuotationsCustomer from "./pages/AllPagesCustomer/AcceptedQuotationsCustomer";
import AllPostedProgramsPage from "./pages/AllPostedProgramsPage/AllPostedProgramsPage";
import Contact from "./pages/Contact/Contact";
import AddProgramsAdmin from "./pages/AllPostedProgramsAdmin/AddProgramsAdmin";
import AddParameters from "./pages/AllPostedProgramsAdmin/AddParameters";
import ClientsListMonth from "./pages/ClientsList/ClientsListMonth";
import VendorsListMonth from "./pages/VendorsList/VendorsListMonth";
import AwardedQuotationsVendor from "./pages/AllPostedQuotationsVendor/AwardedQuotationsVendor";
import AwardedQuotationsCustomer from "./pages/AllPagesCustomer/AwardedQuotationsCustomer";
import PostYourProgram from "./pages/PostYourProgram/PostYourProgram";
import AwardedQuotationsAdmin from "./pages/AllPostedProgramsAdmin/AwardedQuotationsAdmin";
import NewsletterEmails from "./pages/AllPostedProgramsAdmin/Newsletter/NewsletterEmails";
import SendNewsletter from "./pages/AllPostedProgramsAdmin/Newsletter/SendNewsletter";
import AddAdmins from "./pages/AllPostedProgramsAdmin/AddAdmins";
import ChangeHero from "./pages/AllPostedProgramsAdmin/ChangeHero";
import About from "./pages/About/About";
import TermsOfUse from "./pages/TermsOfUse/TermsOfUse";
import EditMembershipPlans from "./pages/AllPostedProgramsAdmin/EditMembershipPlans";
import Profile from "./pages/Profile/Profile";
import Queries from "./pages/AllPostedProgramsAdmin/Queries";
// import About from "./pages/About/About";

function App() {
  const { sessionUser } = useSelector((state) => state.sessionSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSession());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contactUs" element={<Contact />} />
        <Route path="/aboutUs" element={<About />} />
        <Route path="/termsAndConditions" element={<TermsOfUse />} />
        {sessionUser.role === "admin" && <Route path="/dashboard" element={<DashboardAdmin />} />}
        {sessionUser.role === "customer" && <Route path="/dashboard" element={<DashboardCustomer />} />}
        {sessionUser.role === "vendor" && <Route path="/dashboard" element={<DashboardVendor />} />}
        <Route path="/clientsListAdmin" element={<ClientsList />} />
        <Route path="/vendorsListAdmin" element={<VendorsList />} />
        <Route path="/allPostedProgramsAdmin" element={<AllPostedProgramsAdmin />} />
        <Route path="/pendingApprovalsAdmin" element={<PendingApprovalProgramsAdmin />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/allPostedQuotationsVendor" element={<AllPostedQuotationsVendor />} />
        <Route path="/pendingQuotationsVendor" element={<PendingQuotationsVendor />} />
        <Route path="/acceptedQuotationsVendor" element={<AcceptedQuotationsVendor />} />
        <Route path="/allPostedProgramsCustomer" element={<AllPostedProgramsCustomer />} />
        <Route path="/pendingQuotationsCustomer" element={<PendingQuotationsCustomer />} />
        <Route path="/acceptedQuotationsCustomer" element={<AcceptedQuotationsCustomer />} />
        <Route path="/allPostedPrograms" element={<AllPostedProgramsPage />} />
        <Route path="/addProgramsAdmin" element={<AddProgramsAdmin />} />
        <Route path="/addCertificationsAdmin" element={<AddParameters />} />
        <Route path="/clientsListThisMonth" element={<ClientsListMonth />} />
        <Route path="/vendorsListThisMonth" element={<VendorsListMonth />} />
        <Route path="/awardedQuotationsVendor" element={<AwardedQuotationsVendor />} />
        <Route path="/awardedQuotationsCustomer" element={<AwardedQuotationsCustomer />} />
        <Route path="/postYourProgram" element={<PostYourProgram />} />
        <Route path="/awardedProgramsAdmin" element={<AwardedQuotationsAdmin />} />
        <Route path="/newsleterEmails" element={<NewsletterEmails />} />
        <Route path="/sendNewsletters" element={<SendNewsletter />} />
        <Route path="/createAdmins" element={<AddAdmins />} />
        <Route path="/changeHero" element={<ChangeHero />} />
        <Route path="/editMembershipPlans" element={<EditMembershipPlans />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/queries" element={<Queries />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
