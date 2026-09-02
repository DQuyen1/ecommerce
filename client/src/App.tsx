import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import News from "./pages/News";
import ArticleDetail from "./pages/ArticleDetail";
import Recruitment from "./pages/Recruitment";
import JobDetail from "./pages/JobDetail";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import RequireAdmin from "./pages/admin/RequireAdmin";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminProductForm from "./pages/admin/AdminProductForm";
import AdminNews from "./pages/admin/AdminNews";
import AdminNewsForm from "./pages/admin/AdminNewsForm";
import AdminJobs from "./pages/admin/AdminJobs";
import AdminJobForm from "./pages/admin/AdminJobForm";
import AdminApplications from "./pages/admin/AdminApplications";
import AdminContacts from "./pages/admin/AdminContacts";

/** Jump to the top on navigation — but leave filter/pagination changes alone. */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="admin/login" element={<AdminLogin />} />
        <Route
          path="admin"
          element={
            <RequireAdmin>
              <AdminLayout />
            </RequireAdmin>
          }
        >
          <Route index element={<Navigate to="products" replace />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/new" element={<AdminProductForm />} />
          <Route path="products/:id/edit" element={<AdminProductForm />} />
          <Route path="news" element={<AdminNews />} />
          <Route path="news/new" element={<AdminNewsForm />} />
          <Route path="news/:id/edit" element={<AdminNewsForm />} />
          <Route path="jobs" element={<AdminJobs />} />
          <Route path="jobs/new" element={<AdminJobForm />} />
          <Route path="jobs/:id/edit" element={<AdminJobForm />} />
          <Route path="applications" element={<AdminApplications />} />
          <Route path="contacts" element={<AdminContacts />} />
        </Route>

        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="san-pham" element={<Products />} />
          <Route path="san-pham/:id" element={<ProductDetail />} />
          <Route path="tin-tuc" element={<News />} />
          <Route path="tin-tuc/:slug" element={<ArticleDetail />} />
          <Route path="tuyen-dung" element={<Recruitment />} />
          <Route path="tuyen-dung/:id" element={<JobDetail />} />
          <Route path="lien-he" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
