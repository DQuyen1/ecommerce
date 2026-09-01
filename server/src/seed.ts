import "dotenv/config";

import mongoose from "mongoose";
import connectDB from "./config/db";
import Product from "./models/Product";
import Article from "./models/Article";
import Job from "./models/Job";

/**
 * Neutral demo data. Replace these three arrays with the client's real content
 * — the category slugs must stay in sync with `src/config/catalog.ts`.
 */

const products = [
  {
    name: "Sản Phẩm Tiêu Chuẩn A",
    category: "core-products" as const,
    description:
      "Dòng sản phẩm tiêu chuẩn, phù hợp cho nhu cầu sử dụng phổ thông với số lượng lớn.",
  },
  {
    name: "Sản Phẩm Tiêu Chuẩn B",
    category: "core-products" as const,
    description: "Phiên bản nâng cấp với độ bền cao hơn, thích hợp cho môi trường khắt khe.",
  },
  {
    name: "Giải Pháp Theo Yêu Cầu",
    category: "custom-solutions" as const,
    description:
      "Thiết kế và sản xuất theo đúng thông số kỹ thuật của từng khách hàng.",
  },
  {
    name: "Dòng Cao Cấp",
    category: "premium-line" as const,
    description:
      "Sản phẩm cao cấp với hoàn thiện tinh xảo, dành cho phân khúc thị trường cao.",
  },
  {
    name: "Phụ Kiện Đi Kèm",
    category: "other-products" as const,
    description: "Các phụ kiện và linh kiện bổ trợ cho những dòng sản phẩm chính.",
  },
];

const articles = [
  {
    title: "Công ty đạt chứng nhận ISO 9001:2015",
    topic: "chứng nhận",
    content:
      "Chúng tôi vừa được cấp chứng nhận ISO 9001:2015, khẳng định cam kết về hệ thống quản lý chất lượng trong toàn bộ quy trình sản xuất.\n\nChứng nhận này là kết quả của quá trình chuẩn hóa quy trình kéo dài nhiều tháng, với sự tham gia của toàn thể cán bộ nhân viên.",
  },
  {
    title: "Giới thiệu quy trình sản xuất khép kín",
    topic: "sản xuất",
    content:
      "Từ khâu tiếp nhận nguyên liệu đến khi đóng gói thành phẩm, mọi công đoạn đều được thực hiện tại nhà máy của chúng tôi.\n\nMô hình khép kín giúp kiểm soát chất lượng chặt chẽ hơn và rút ngắn đáng kể thời gian giao hàng cho khách hàng.",
  },
  {
    title: "Mở rộng năng lực sản xuất trong năm nay",
    topic: "tin công ty",
    content:
      "Nhà máy đã đưa vào vận hành thêm dây chuyền mới, nâng công suất lên đáng kể so với cùng kỳ năm trước.\n\nViệc mở rộng giúp chúng tôi đáp ứng tốt hơn các đơn hàng số lượng lớn và rút ngắn thời gian chờ của khách hàng.",
  },
];

const jobs = [
  {
    title: "Nhân Viên Sản Xuất",
    location: "Khu Công Nghiệp, Tỉnh/Thành Phố",
    type: "full-time",
    requirements: "Không yêu cầu kinh nghiệm, được đào tạo khi vào làm việc.",
    benefits: "Lương cạnh tranh, hỗ trợ bữa ăn, bảo hiểm đầy đủ theo quy định.",
  },
  {
    title: "Nhân Viên Kinh Doanh",
    location: "Khu Công Nghiệp, Tỉnh/Thành Phố",
    type: "full-time",
    requirements: "Tối thiểu 1 năm kinh nghiệm bán hàng, kỹ năng giao tiếp tốt.",
    benefits: "Lương cứng cộng hoa hồng, được đào tạo bài bản về sản phẩm.",
  },
  {
    title: "Nhân Viên Kiểm Soát Chất Lượng",
    location: "Khu Công Nghiệp, Tỉnh/Thành Phố",
    type: "full-time",
    requirements: "Tốt nghiệp cao đẳng trở lên, cẩn thận và có tinh thần trách nhiệm.",
    benefits: "Môi trường chuyên nghiệp, lộ trình thăng tiến rõ ràng.",
  },
];

async function seed(): Promise<void> {
  await connectDB();

  await Promise.all([Product.deleteMany({}), Article.deleteMany({}), Job.deleteMany({})]);

  await Product.insertMany(products);
  await Article.insertMany(articles);
  await Job.insertMany(jobs);

  console.log(
    `Seed complete: ${products.length} products, ${articles.length} articles, ${jobs.length} jobs.`
  );
  await mongoose.disconnect();
}

seed().catch((err: Error) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
