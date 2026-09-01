import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
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
