const BRAND_ICON_STRIP = [
  { label: 'Mesh Wi-Fi', image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/DECO-X50-OUTDOOR-247x296.png' },
  { label: 'Router Wi-Fi', image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/ARCHER-GE230-247x296.png' },
  { label: 'Modem / Gateway', image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/ARCHER-MR202-247x296.png' },
  { label: 'Thiết bị mở rộng mạng', image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/RE235BE-247x296.png' },
  { label: 'Wi-Fi di động', image: 'https://kabegroup.vn/kabet/wp-content/uploads/2023/02/M7000-247x296.jpg' },
  { label: 'Wi-Fi Adapter', image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/ARCHER-TX50UH-247x296.png' },
  { label: 'Phụ kiện', image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/UH9120C-247x296.png' },
  { label: 'Mạng Văn Phòng SOHO', image: 'https://kabegroup.vn/kabet/wp-content/uploads/2023/02/TL-SG1024DE-247x296.jpg' },
  { label: 'Giải pháp doanh nghiệp', image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/MC211CS-2-1-247x296.png' }
];

const BRAND_CATEGORY_GROUPS = [
  {
    title: 'Mesh Wi-Fi',
    viewAllHref: '#',
    products: [
      { name: 'Mesh Wi-Fi TP-Link DECO X50-OUTDOOR', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/DECO-X50-OUTDOOR-247x296.png', href: '/mesh-wifi-tplink-deco-x50-outdoor/' },
      { name: 'Mesh Wi-Fi TP-Link DECO X50', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/DECO-X501-PACK-247x296.png', href: '/mesh-wifi-tplink-deco-x50/' },
      { name: 'Mesh Wi-Fi TP-Link DECO X20', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/DECO-X201-PACK-247x296.png', href: '/mesh-wifi-tplink-deco-x20/' },
      { name: 'Mesh Wi-Fi TP-Link DECO X10', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/DECO-X101-PACK-247x296.png', href: '/mesh-wifi-tplink-deco-x10/' },
      { name: 'Mesh Wi-Fi TP-Link DECO S7', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/DECO-S71-PACK-247x296.png', href: '/mesh-wifi-tplink-deco-s7/' },
      { name: 'Mesh Wi-Fi TP-Link DECO M5', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/DECO-M51-PACK-247x296.png', href: '/mesh-wifi-tplink-deco-m5/' },
      { name: 'Mesh Wi-Fi TP-Link DECO M4', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/DECO-M41-PACK-247x296.png', href: '/mesh-wifi-tplink-deco-m4/' },
      { name: 'Mesh Wi-Fi TP-Link DECO E4', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/DECO-E41-PACK-247x296.png', href: '/mesh-wifi-tplink-deco-e4/' },
      { name: 'Mesh Wi-Fi TP-Link DECO BE25-OUTDOOR(1-PACK)', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/DECO-BE25-OUTDOOR1-PACK-247x296.png', href: '/mesh-wifi-tplink-deco-be25-outdoor-1-pack/' },
      { name: 'Mesh Wi-Fi TP-Link DECO BE25(3-PACK)', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/DECO-BE253-PACK-247x296.png', href: '/mesh-wifi-tplink-deco-be25-3-pack/' },
      { name: 'Mesh Wi-Fi TP-Link DECO BE25(2-PACK)', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/DECO-BE252-PACK-247x296.png', href: '/mesh-wifi-tplink-deco-be25-2-pack/' },
      { name: 'Mesh Wi-Fi TP-Link DECO BE25(1-PACK)', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/DECO-BE251-PACK-247x296.png', href: '/mesh-wifi-tplink-deco-be25-1-pack/' }
    ]
  },
  {
    title: 'Router Wi-Fi',
    viewAllHref: '#',
    products: [
      { name: 'Router Wi-Fi TP-Link ARCHER GE230', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/ARCHER-GE230-247x296.png', href: '/router-wifi-tplink-archer-ge230/' },
      { name: 'Router Wi-Fi TP-Link ARCHER C64', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/ARCHER-C64-247x296.png', href: '/router-wifi-tplink-archer-c64/' },
      { name: 'Router Wi-Fi TP-Link ARCHER C54', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/ARCHER-C54-247x296.png', href: '/router-wifi-tplink-archer-c54/' },
      { name: 'Router Wi-Fi TP-Link ARCHER C50', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/ARCHER-C50-247x296.png', href: '/router-wifi-tplink-archer-c50/' },
      { name: 'Router Wi-Fi TP-Link ARCHER BE800', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/ARCHER-BE800-247x296.png', href: '/router-wifi-tplink-archer-be800/' },
      { name: 'Router Wi-Fi TP-Link ARCHER BE400', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/Thiet-ke-chua-co-ten-23-247x296.png', href: '/router-wifi-tplink-archer-be400/' },
      { name: 'Router Wi-Fi TP-Link ARCHER AX56EU', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/Thiet-ke-chua-co-ten-21-247x296.png', href: '/router-wifi-tplink-archer-ax56eu/' },
      { name: 'Router Wi-Fi TP-Link ARCHER AX53HP', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/ARCHER-AX53HP-247x296.png', href: '/router-wifi-tplink-archer-ax53hp/' },
      { name: 'Router Wi-Fi TP-Link ARCHER AX12', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/ARCHER-AX12-247x296.png', href: '/router-wifi-tplink-archer-ax12/' },
      { name: 'Router Wi-Fi TP-Link TL-WR1502X', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/TL-WR1502X-01-247x296.png', href: '/router-wifi-tplink-tl-wr1502x/' },
      { name: 'Router Wi-Fi TP-Link TL-WR846N', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2023/02/TL-WR846N-247x296.png', href: '/router-wifi-tplink-tl-wr846n/' },
      { name: 'Router Wi-Fi TP-Link TL-WR840N', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/06/TL-WR840N-247x296.jpg', href: '/router-wifi-tplink-tl-wr840n/' }
    ]
  },
  {
    title: 'Modem / Gateway',
    viewAllHref: '#',
    products: [
      { name: 'Modem / Gateway TP-Link ARCHER MR400', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/ARCHER-MR202-247x296.png', href: '/modem-gateway-tplink-archer-mr400/' },
      { name: 'Modem / Gateway TP-Link ARCHER MR202', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/ARCHER-MR202-247x296.png', href: '/modem-gateway-tplink-archer-mr202/' },
      { name: 'Modem / Gateway TP-Link TL-MR6400', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/TL-MR6400-247x296.jpg', href: '/modem-gateway-tplink-tl-mr6400/' },
      { name: 'Modem / Gateway TP-Link TL-MR105', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/TL-MR105-247x296.png', href: '/modem-gateway-tplink-tl-mr105/' },
      { name: 'Modem / Gateway TP-Link TL-MR100-Outdoor', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/TL-MR100-OUTDOOR-247x296.jpg', href: '/modem-gateway-tplink-tl-mr100-outdoor/' },
      { name: 'Modem / Gateway TP-Link TL-MR100', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/TL-MR100-247x296.png', href: '/modem-gateway-tplink-tl-mr100/' }
    ]
  },
  {
    title: 'Thiết bị mở rộng mạng',
    viewAllHref: '#',
    products: [
      { name: 'Thiết bị mở rộng mạng TP-Link RE235BE', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/RE235BE-247x296.png', href: '/thiet-bi-mo-rong-mang-tplink-re235be/' },
      { name: 'Thiết bị mở rộng mạng TP-Link TL-PA7017 KIT', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/TL-PA7017-KIT-247x296.jpg', href: '/thiet-bi-mo-rong-mang-tplink-tl-pa7017-kit/' },
      { name: 'Thiết bị mở rộng mạng TP-Link TL-WA850RE', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2023/02/TL-WA850RE-247x296.jpg', href: '/thiet-bi-mo-rong-mang-tplink-tl-wa850re/' },
      { name: 'Thiết bị mở rộng mạng TP-Link TL-WA855RE', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2023/02/TL-WA855RE-247x296.jpg', href: '/thiet-bi-mo-rong-mang-tplink-tl-wa855re/' },
      { name: 'Thiết bị mở rộng mạng TP-Link RE200', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2023/02/RE200-247x296.jpg', href: '/thiet-bi-mo-rong-mang-tplink-re200/' },
      { name: 'Thiết bị mở rộng mạng TP-Link RE205', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2023/02/RE205-247x296.png', href: '/thiet-bi-mo-rong-mang-tplink-re205/' },
      { name: 'Thiết bị mở rộng mạng TP-Link RE315', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2023/02/RE315-247x296.jpg', href: '/thiet-bi-mo-rong-mang-tplink-re315/' },
      { name: 'Thiết bị mở rộng mạng TP-Link RE305', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2023/02/RE305-247x296.jpg', href: '/thiet-bi-mo-rong-mang-tplink-re305/' },
      { name: 'Thiết bị mở rộng mạng TP-Link RE505X', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2023/02/RE505X-247x296.jpg', href: '/thiet-bi-mo-rong-mang-tplink-re505x/' },
      { name: 'Thiết bị mở rộng mạng TP-Link RE705X EU', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2023/02/RE705X-EU-247x296.jpg', href: '/thiet-bi-mo-rong-mang-tplink-re705x-eu/' }
    ]
  },
  {
    title: 'Wi-Fi di động',
    viewAllHref: '#',
    products: [
      { name: 'Wi-Fi di động TP-Link M7000', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2023/02/M7000-247x296.jpg', href: '/wifi-di-dong-tplink-m7000/' },
      { name: 'Wi-Fi di động TP-Link M7350', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2023/02/M7350-247x296.jpg', href: '/wifi-di-dong-tplink-m7350/' }
    ]
  },
  {
    title: 'Wi-Fi Adapter',
    viewAllHref: '#',
    products: [
      { name: 'Wi-Fi Adapter TP-Link ARCHER TX50UH', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/ARCHER-TX50UH-247x296.png', href: '/wifi-adapter-tplink-archer-tx50uh/' },
      { name: 'Wi-Fi Adapter TP-Link ARCHER TX50U', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/ARCHER-TX50U-247x296.png', href: '/wifi-adapter-tplink-archer-tx50u/' },
      { name: 'Wi-Fi Adapter TP-Link ARCHER TX35U PLUS', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/ARCHER-TX35U-PLUS-247x296.png', href: '/wifi-adapter-tplink-archer-tx35u-plus/' },
      { name: 'Wi-Fi Adapter TP-Link ARCHER TX20U NANO', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/ARCHER-TX20U-NANO-247x296.png', href: '/wifi-adapter-tplink-archer-tx20u-nano/' },
      { name: 'Wi-Fi Adapter TP-Link ARCHER TX1U NANO', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/ARCHER-TX1U-NANO-247x296.png', href: '/wifi-adapter-tplink-archer-tx1u-nano/' },
      { name: 'Wi-Fi Adapter TP-Link ARCHER TBE400UH', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/ARCHER-TBE400UH-247x296.png', href: '/wifi-adapter-tplink-archer-tbe400uh/' },
      { name: 'Wi-Fi Adapter TP-Link ARCHER TBE400E', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/ARCHER-TBE400E-247x296.png', href: '/wifi-adapter-tplink-archer-tbe400e/' },
      { name: 'Wi-Fi Adapter TP-Link ARCHER T3U NANO', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/ARCHER-T3U-NANO-247x296.png', href: '/wifi-adapter-tplink-archer-t3u-nano/' },
      { name: 'Wi-Fi Adapter TP-Link UB600', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/UB600-247x296.png', href: '/wifi-adapter-tplink-ub600/' },
      { name: 'Wi-Fi Adapter TP-Link UB500 PLUS', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/UB500-PLUS-247x296.png', href: '/wifi-adapter-tplink-ub500-plus/' },
      { name: 'Wi-Fi Adapter TP-Link TX201', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/TX201-247x296.png', href: '/wifi-adapter-tplink-tx201/' },
      { name: 'Wi-Fi Adapter TP-Link TL-WN781ND', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2023/03/TL-WN781ND-247x296.jpg', href: '/wifi-adapter-tplink-tl-wn781nd/' }
    ]
  },
  {
    title: 'Phụ kiện',
    viewAllHref: '#',
    products: [
      { name: 'Phụ kiện TP-Link UH9120C', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/UH9120C-247x296.png', href: '/phu-kien-tplink-uh9120c/' },
      { name: 'Phụ kiện TP-Link UE330C', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/UE330C-247x296.png', href: '/phu-kien-tplink-ue330c/' },
      { name: 'Phụ kiện TP-Link UC400', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/UC400-247x296.png', href: '/phu-kien-tplink-uc400/' },
      { name: 'Phụ kiện TP-Link UA520C', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/UA520C-247x296.png', href: '/phu-kien-tplink-ua520c/' },
      { name: 'Phụ kiện TP-Link UA430D', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/UA430D-247x296.png', href: '/phu-kien-tplink-ua430d/' },
      { name: 'Phụ kiện TP-Link UE306', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2023/03/UE306-247x296.png', href: '/phu-kien-tplink-ue306/' }
    ]
  },
  {
    title: 'Mạng Văn Phòng SOHO',
    viewAllHref: '#',
    products: [
      { name: 'Mạng Văn Phòng SOHO TP-Link TL-SG1024DE', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2023/02/TL-SG1024DE-247x296.jpg', href: '/mang-van-phong-soho-tplink-tl-sg1024de/' },
      { name: 'Mạng Văn Phòng SOHO TP-Link TL-SG1210MPE', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2023/02/TL-SG1210MPE-247x296.jpg', href: '/mang-van-phong-soho-tplink-tl-sg1210mpe/' },
      { name: 'Mạng Văn Phòng SOHO TP-Link TL-SG105PE', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2023/02/TL-SG105PE-247x296.jpg', href: '/mang-van-phong-soho-tplink-tl-sg105pe/' }
    ]
  },
  {
    title: 'Giải pháp doanh nghiệp',
    viewAllHref: '#',
    products: [
      { name: 'Giải pháp doanh nghiệp TP-Link MC212CS-20', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/MC211CS-2-1-247x296.png', href: '/giai-phap-doanh-nghiep-tplink-mc212cs-20/' },
      { name: 'Giải pháp doanh nghiệp TP-Link MC212CS-2', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/MC211CS-2-1-247x296.png', href: '/giai-phap-doanh-nghiep-tplink-mc212cs-2/' },
      { name: 'Giải pháp doanh nghiệp TP-Link MC211CS-20', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/MC211CS-2-1-247x296.png', href: '/giai-phap-doanh-nghiep-tplink-mc211cs-20/' },
      { name: 'Giải pháp doanh nghiệp TP-Link MC211CS-2', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/MC211CS-2-247x296.png', href: '/giai-phap-doanh-nghiep-tplink-mc211cs-2/' },
      { name: 'Giải pháp doanh nghiệp TP-Link TL-SG1024', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/TL-SG1024-247x296.jpg', href: '/giai-phap-doanh-nghiep-tplink-tl-sg1024/' },
      { name: 'Giải pháp doanh nghiệp TP-Link TL-SG1016PE', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/TL-SG1016PE-247x296.jpg', href: '/giai-phap-doanh-nghiep-tplink-tl-sg1016pe/' },
      { name: 'Giải pháp doanh nghiệp TP-Link TL-SG1016D', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/TL-SG1016D-247x296.png', href: '/giai-phap-doanh-nghiep-tplink-tl-sg1016d/' },
      { name: 'Giải pháp doanh nghiệp TP-Link TL-SG1008MP', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/TL-SG1008MP-247x296.png', href: '/giai-phap-doanh-nghiep-tplink-tl-sg1008mp/' },
      { name: 'Giải pháp doanh nghiệp TP-Link TL-SG1008D', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/TL-SG1008D-247x296.png', href: '/giai-phap-doanh-nghiep-tplink-tl-sg1008d/' },
      { name: 'Giải pháp doanh nghiệp TP-Link TL-SG1005P', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/TL-SG1005P-247x296.png', href: '/giai-phap-doanh-nghiep-tplink-tl-sg1005p/' },
      { name: 'Giải pháp doanh nghiệp TP-Link TL-SG1005D', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/Thiet-ke-chua-co-ten-44-247x296.png', href: '/giai-phap-doanh-nghiep-tplink-tl-sg1005d/' },
      { name: 'Giải pháp doanh nghiệp TP-Link TL-SF1048', price: 'Liên hệ', attrs: ['TP-Link'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/TL-SF1048-247x296.png', href: '/giai-phap-doanh-nghiep-tplink-tl-sf1048/' }
    ]
  }
];
