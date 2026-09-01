import type { CSSProperties, ComponentType } from "react";
import {
  IconBox,
  IconClipboard,
  IconGem,
  IconLayers,
  IconShield,
  IconSliders,
  IconSpark,
  IconTruck,
} from "../components/Icon";

/**
 * ============================================================
 *  EVERY PIECE OF COMPANY-SPECIFIC CONTENT LIVES IN THIS FILE.
 * ============================================================
 *
 * To rebrand the site for a new client, edit only this file (plus
 * `server/src/config/catalog.ts` if the product categories change, and
 * `index.html` for the browser tab title). No page or component contains
 * a hard-coded company name, phone number, or marketing sentence.
 *
 * The values below are neutral placeholders for demos — replace them.
 */

export type IconComponent = ComponentType<{
  className?: string;
  style?: CSSProperties;
}>;

/* ------------------------------------------------------------------
   Product categories
   IMPORTANT: the `slug` values must match `CATEGORIES` in
   `server/src/config/catalog.ts` — the API validates against that list.
   ------------------------------------------------------------------ */
export const CATEGORIES = [
  { slug: "core-products", label: "Sản Phẩm Chủ Lực", icon: IconBox },
  { slug: "custom-solutions", label: "Giải Pháp Tùy Chỉnh", icon: IconSliders },
  { slug: "premium-line", label: "Dòng Cao Cấp", icon: IconGem },
  { slug: "other-products", label: "Sản Phẩm Khác", icon: IconLayers },
] as const;

export type ProductCategory = (typeof CATEGORIES)[number]["slug"];

export function categoryLabel(slug: string): string {
  return CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;
}

export function categoryIcon(slug: string): IconComponent {
  return CATEGORIES.find((c) => c.slug === slug)?.icon ?? IconBox;
}

/** Position in the list — drives which gradient a card's art tile uses. */
export function categoryIndex(slug: string): number {
  const index = CATEGORIES.findIndex((c) => c.slug === slug);
  return index === -1 ? 0 : index;
}

/* ------------------------------------------------------------------
   Site content
   ------------------------------------------------------------------ */
export const site = {
  /** Wordmark in the header and footer. `accent` renders in the brand colour. */
  logo: { lead: "NOVA", accent: "GROUP" },

  name: "Nova",
  legalName: "Công Ty TNHH Nova Việt Nam",

  /** Browser tab title and meta description — mirror these in index.html. */
  seo: {
    title: "Nova - Giải Pháp Sản Xuất Toàn Diện",
    description:
      "Nova Việt Nam - giải pháp sản xuất toàn diện: sản phẩm chủ lực, giải pháp tùy chỉnh, dòng cao cấp. Đạt tiêu chuẩn ISO 9001:2015.",
  },

  contact: {
    phone: "0900 000 000",
    phoneHref: "tel:0900000000",
    email: "lienhe@example.com",
    address: ["123 Đường Số 1, Khu Công Nghiệp,", "Quận/Huyện, Tỉnh/Thành Phố"],
  },

  /** `end` marks a link that should only be active on an exact path match. */
  nav: [
    { to: "/", label: "Trang Chủ", end: true },
    { to: "/san-pham", label: "Sản Phẩm", end: false },
    { to: "/tin-tuc", label: "Tin Tức", end: false },
    { to: "/tuyen-dung", label: "Tuyển Dụng", end: false },
  ],
  navCta: { to: "/lien-he", label: "Liên Hệ" },

  home: {
    hero: {
      eyebrow: "Nova Việt Nam",
      title: "Giải Pháp Sản Xuất",
      titleAccent: "Toàn Diện",
      titleTail: "Cho Doanh Nghiệp",
      subtitle:
        "Từ nguyên liệu đầu vào đến thành phẩm — chúng tôi cung cấp quy trình sản xuất khép kín, đạt các tiêu chuẩn chất lượng quốc tế.",
      primaryCta: { to: "/san-pham", label: "Xem Sản Phẩm" },
      secondaryCta: { to: "/lien-he", label: "Nhận Tư Vấn" },
      badges: [
        { icon: IconShield, label: "ISO 9001:2015" },
        { icon: IconSpark, label: "Chất lượng đảm bảo" },
        { icon: IconTruck, label: "Giao hàng toàn quốc" },
      ],
    },

    /** Scrolling strip under the hero. */
    marquee: [
      { icon: IconShield, label: "ISO 9001:2015" },
      { icon: IconSpark, label: "Chứng Nhận Chất Lượng" },
      { icon: IconBox, label: "Sản Xuất Khép Kín" },
      { icon: IconSliders, label: "Thiết Kế Theo Yêu Cầu" },
      { icon: IconTruck, label: "Giao Hàng Toàn Quốc" },
    ],

    categoriesSection: {
      eyebrow: "Danh Mục",
      title: "Sản Phẩm Của Chúng Tôi",
      subtitle: "Bốn nhóm sản phẩm chính phục vụ đa dạng ngành hàng.",
    },

    /** `value` counts up from zero when scrolled into view. */
    stats: [
      { value: 500, suffix: "+", label: "Khách hàng tin tưởng" },
      { value: 1000, suffix: "+", label: "Sản phẩm đã cung cấp" },
      { value: 200, suffix: "+", label: "Nhân sự lành nghề" },
      { value: 15, suffix: "+", label: "Năm kinh nghiệm" },
    ],

    valuesSection: { eyebrow: "Giá Trị Cốt Lõi", title: "Vì Sao Chọn Chúng Tôi" },
    values: [
      {
        title: "Giải pháp trọn gói",
        text: "Từ nguyên liệu đầu vào đến thành phẩm, tất cả trong một quy trình khép kín.",
      },
      {
        title: "Đồng hành liên tục",
        text: "Đội ngũ tư vấn theo sát từ khâu thiết kế mẫu đến khi giao hàng.",
      },
      {
        title: "Tối ưu chi phí",
        text: "Sản xuất khép kín giúp giảm giá thành mà vẫn giữ chất lượng ổn định.",
      },
      {
        title: "Chuyên nghiệp",
        text: "Quy trình đạt chuẩn, kiểm soát chất lượng ở từng công đoạn.",
      },
    ],

    /* --------------------------------------------------------------
       "How we work" — the numbered timeline. Four steps reads best;
       the connecting line is drawn by CSS from the step count.
       -------------------------------------------------------------- */
    processSection: {
      eyebrow: "Quy Trình",
      title: "Cách Chúng Tôi Làm Việc",
      subtitle: "Bốn bước rõ ràng, từ lần trao đổi đầu tiên đến khi hàng đến kho của bạn.",
    },
    process: [
      {
        icon: IconClipboard,
        title: "Tiếp nhận yêu cầu",
        text: "Lắng nghe nhu cầu, sản lượng và ngân sách để đề xuất phương án phù hợp.",
      },
      {
        icon: IconSliders,
        title: "Thiết kế & báo giá",
        text: "Dựng mẫu, chốt thông số kỹ thuật và gửi báo giá minh bạch trong 24 giờ.",
      },
      {
        icon: IconBox,
        title: "Sản xuất & kiểm tra",
        text: "Sản xuất theo mẫu đã duyệt, kiểm soát chất lượng ở từng công đoạn.",
      },
      {
        icon: IconTruck,
        title: "Giao hàng & hậu mãi",
        text: "Giao đúng hẹn trên toàn quốc, đồng hành cho những đơn hàng tiếp theo.",
      },
    ],

    /* --------------------------------------------------------------
       Split section: copy and a checklist on one side, artwork on the
       other. Keep `points` to four or five lines.
       -------------------------------------------------------------- */
    showcase: {
      eyebrow: "Năng Lực",
      title: "Đầu Tư Vào Chất Lượng, Không Chỉ Sản Lượng",
      text: "Nhà máy vận hành theo quy trình chuẩn hoá, thiết bị được bảo trì định kỳ và mọi lô hàng đều đi qua kiểm tra trước khi xuất xưởng.",
      points: [
        "Dây chuyền hiện đại, công suất ổn định quanh năm",
        "Kiểm tra chất lượng ở đầu vào, trong sản xuất và trước khi giao",
        "Hồ sơ kỹ thuật đầy đủ cho từng đơn hàng",
        "Đội ngũ kỹ thuật hỗ trợ trong suốt vòng đời sản phẩm",
      ],
      cta: { to: "/lien-he", label: "Trao Đổi Với Chúng Tôi" },
    },

    /* --------------------------------------------------------------
       PLACEHOLDER TESTIMONIALS — the names below are invented for the
       demo. Replace them with real, permitted quotes before going live,
       or delete the whole block and the section it feeds in `Home.tsx`.
       -------------------------------------------------------------- */
    testimonialsSection: {
      eyebrow: "Khách Hàng",
      title: "Đối Tác Nói Gì Về Chúng Tôi",
    },
    testimonials: [
      {
        quote:
          "Thời gian phản hồi nhanh và mẫu gửi sang đúng như mô tả. Chúng tôi đã chuyển toàn bộ đơn hàng định kỳ sang đây.",
        name: "Nguyễn Văn A",
        role: "Giám đốc mua hàng, Công ty ABC",
      },
      {
        quote:
          "Chất lượng ổn định qua nhiều lô hàng. Bộ phận kỹ thuật hỗ trợ tận nơi khi chúng tôi đổi quy cách.",
        name: "Trần Thị B",
        role: "Trưởng phòng sản xuất, Công ty XYZ",
      },
      {
        quote:
          "Báo giá rõ ràng, giao hàng đúng hẹn kể cả trong cao điểm cuối năm. Rất đáng để hợp tác lâu dài.",
        name: "Lê Văn C",
        role: "Chủ đầu tư, Chuỗi bán lẻ DEF",
      },
    ],

    newsSection: {
      eyebrow: "Tin Tức",
      title: "Cập Nhật Mới Nhất",
      subtitle: "Chia sẻ về ngành và hoạt động của công ty.",
      cta: "Xem Tất Cả Tin Tức",
    },
  },

  products: {
    eyebrow: "Sản Phẩm",
    title: "Danh Mục Sản Phẩm",
    subtitle: "Lọc theo danh mục để xem các mẫu phù hợp với nhu cầu của bạn.",
    emptyLabel: "Chưa có sản phẩm trong danh mục này.",
    detailCta: "Yêu Cầu Báo Giá",
  },

  news: {
    eyebrow: "Tin Tức",
    title: "Bản Tin Công Ty",
    subtitle: "Chia sẻ về ngành và hoạt động của công ty.",
    emptyLabel: "Chưa có bài viết nào.",
  },

  recruitment: {
    hero: {
      eyebrow: "Tuyển Dụng",
      title: "Nuôi Dưỡng Nhân Tài Là Nền Tảng Phát Triển",
      subtitle:
        "Chúng tôi phát triển nguồn nhân lực thông qua đào tạo, hợp tác và ghi nhận đóng góp của từng nhân viên.",
      cta: "Xem Vị Trí Đang Tuyển",
    },
    benefitsSection: { eyebrow: "Quyền Lợi", title: "Làm Việc Tại Công Ty" },
    benefits: [
      "Đào tạo bài bản khi vào làm việc",
      "Ban lãnh đạo chuyên nghiệp, giàu kinh nghiệm",
      "Chế độ đãi ngộ và lương thưởng hấp dẫn",
      "Cơ sở vật chất hiện đại, môi trường thoải mái",
      "Mức lương cạnh tranh, đáp ứng nhu cầu cuộc sống",
      "Văn hóa làm việc thân thiện, lành mạnh",
    ],
    jobsSection: { eyebrow: "Vị Trí Đang Tuyển", title: "Cơ Hội Nghề Nghiệp" },
    emptyLabel: "Hiện chưa có vị trí tuyển dụng. Vui lòng liên hệ 0900 000 000.",
    applyForm: {
      eyebrow: "Ứng Tuyển",
      title: "Gửi Hồ Sơ Của Bạn",
      subtitle: "Điền thông tin bên dưới, đội ngũ nhân sự sẽ phản hồi sớm nhất.",
      success: "Đã gửi hồ sơ. Chúng tôi sẽ liên hệ sớm!",
    },
  },

  contactPage: {
    eyebrow: "Liên Hệ",
    title: "Nhận Tư Vấn Từ Chúng Tôi",
    subtitle: "Để lại thông tin, đội ngũ kinh doanh sẽ liên hệ tư vấn giải pháp.",
    success: "Đã gửi thông tin. Chúng tôi sẽ liên hệ sớm!",
    messagePlaceholder: "Bạn cần sản phẩm nào, số lượng dự kiến...",
  },

  footer: {
    about:
      "Giải pháp sản xuất toàn diện từ nguyên liệu đầu vào đến thành phẩm, phục vụ đa dạng ngành hàng.",
    supportTitle: "Hỗ Trợ",
    support: [
      { to: "/tin-tuc", label: "Tin Tức" },
      { to: "/tuyen-dung", label: "Tuyển Dụng" },
      { to: "/lien-he", label: "Liên Hệ" },
    ],
    /** Shown bottom-right; clear the string to hide it. */
    note: "Chứng nhận ISO 9001:2015",
  },

  notFound: {
    title: "Không tìm thấy trang",
    text: "Trang bạn yêu cầu không tồn tại hoặc đã được chuyển sang địa chỉ khác.",
    cta: "Về Trang Chủ",
  },

  /** Full-width band above the footer, shown on every page except the CTA target. */
  ctaBand: {
    eyebrow: "Bắt Đầu",
    title: "Sẵn sàng cho đơn hàng tiếp theo của bạn?",
    text: "Gửi yêu cầu hôm nay, đội ngũ của chúng tôi phản hồi trong vòng 24 giờ làm việc.",
    primary: { to: "/lien-he", label: "Nhận Báo Giá" },
  },
} as const;
