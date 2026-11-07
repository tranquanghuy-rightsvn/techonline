const NETWORK_ICON_STRIP = [
  { label: 'Thiết bị mạng theo hãng', image: 'assets/images/thiet-bi-mang/icons/cat_big_144_1748060512.jpg' },
  { label: 'Bộ phát wifi', image: 'assets/images/thiet-bi-mang/icons/cat_big_56_1748060524.jpg' },
  { label: 'Router – Modem', image: 'assets/images/thiet-bi-mang/icons/cat_big_57_1748060640.jpg' },
  { label: 'Phụ kiện mạng', image: 'assets/images/thiet-bi-mang/icons/cat_big_60_1748060603.jpg' },
  { label: 'Mesh Wi-Fi', image: 'assets/images/thiet-bi-mang/icons/logo_logo (1).png' },
  { label: 'Quán lý AP', image: 'assets/images/thiet-bi-mang/icons/logo_logo (1).png' },
  { label: 'Gateway', image: 'assets/images/thiet-bi-mang/icons/logo_logo (1).png' },
  { label: 'Bộ kích sóng wifi', image: 'assets/images/thiet-bi-mang/icons/logo_logo (1).png' },
  { label: 'Wi-Fi Di Động', image: 'assets/images/thiet-bi-mang/icons/logo_logo (1).png' },
  { label: 'Switch – Bộ chuyển mạch', image: 'assets/images/thiet-bi-mang/icons/logo_logo (1).png' },
  { label: 'Module mạng', image: 'assets/images/thiet-bi-mang/icons/logo_logo (1).png' }
];

const NETWORK_CATEGORY_GROUPS = [
  {
    title: 'Bộ phát wifi',
    viewAllHref: '/bo-phat-wifi/',
    products: [
      { name: 'Bộ Mở Rộng Sóng Wi-Fi 300Mbps TL-WA850RE', oldPrice: '390.000 đ', price: '275.000 đ', discount: '-28%', attrs: ['Chuẩn N', '2.4GHz', '150 - 500 Mpps'], image: '250-902-tl-wa850re--2-.png', href: '/tplink-bo-phat-wifi-tl-wa850re/' },
      { name: 'Bộ Chuyển Đổi Mạng USB 3.0 Type-C sang Gigabit Ethernet với 3 Cổng USB 3.0 TP-Link UE330C', oldPrice: '650.000 đ', price: '465.000 đ', discount: '-28%', attrs: [], image: '250-1123-ue330c.png', href: '/tplink-bo-phat-wifi-ue330c/' }
    ]
  },
  {
    title: 'Router – Modem',
    viewAllHref: '/router-modem/',
    products: [
      { name: 'Router Wi-Fi N300 TL-WR840N', oldPrice: '460.000 đ', price: '325.000 đ', discount: '-28%', attrs: ['Chuẩn N', '10 đến 20 thiết bị', '5 Cổng'], image: '250-874-tl-wr840n--2-.png', href: '/tplink-router-modem-tl-wr840n/' },
      { name: 'Router Wi-Fi Băng Tần Kép AC1200 Archer C54', oldPrice: '630.000 đ', price: '450.000 đ', discount: '-28%', attrs: ['20 đến 30 thiết bị', '5 Cổng'], image: '250-867-archer-c54.png', href: '/tplink-router-modem-archer-c54/' },
      { name: 'Router Wi-Fi Băng Tần Kép AC1200 Archer C50', oldPrice: '710.000 đ', price: '510.000 đ', discount: '-28%', attrs: [], image: '250-866-archer-c50.png', href: '/tplink-router-modem-archer-c50/' }
    ]
  },
  {
    title: 'Phụ kiện mạng',
    viewAllHref: '/phu-kien-mang/',
    products: [
      { name: 'Bộ chuyển đổi USB tầm xa Bluetooth 5.3 TP-Link UB500 Plus', oldPrice: '240.000 đ', price: '170.000 đ', discount: '-28%', attrs: [], image: '250-1127-ub500-plus--2-.png', href: '/tplink-phu-kien-mang-ub500-plus/' },
      { name: 'Bộ Chuyển Đổi Mạng USB 3.0 sang Gigabit Ethernet TP-Link UE306', oldPrice: '290.000 đ', price: '210.000 đ', discount: '-28%', attrs: [], image: '250-1126-ue306.png', href: '/tplink-phu-kien-mang-ue306/' }
    ]
  },
  {
    title: 'Mesh Wi-Fi',
    viewAllHref: '/mesh-wi-fi/',
    products: [
      { name: 'Hub USB Type-C 9 Cổng TP-Link UH9120C', oldPrice: '1.110.000 đ', price: '790.000 đ', discount: '-28%', attrs: [], image: '250-1115-uh9120c--2-.png', href: '/tplink-mesh-wifi-uh9120c/' },
      { name: 'Hệ thống Wi-Fi Mesh Cho Toàn Bộ Nhà AC1200 Deco M4(1-pack)', oldPrice: '1.360.000 đ', price: '970.000 đ', discount: '-28%', attrs: ['Chuẩn AC', 'Wifi 5', '1 Pack'], image: '250-830-deco-m4-1-pack---4-.png', href: '/tplink-mesh-wifi-deco-m4/' },
      { name: 'Hệ thống Wi-Fi Mesh Cho Toàn Bộ Nhà AC1900 Deco S7(1-pack)', oldPrice: '1.430.000 đ', price: '1.020.000 đ', discount: '-28%', attrs: ['Chuẩn AC', 'Wifi 5', '1 Pack'], image: '250-821-deco-s7-1-pack-.png', href: '/tplink-mesh-wifi-deco-s7/' }
    ]
  },
  {
    title: 'Bộ kích sóng wifi',
    viewAllHref: '/bo-kich-song-wifi/',
    products: [
      { name: 'Bộ Chuyển Đổi PCI Express Wi Fi 150Mbps TL-WN781ND', oldPrice: '280.000 đ', price: '200.000 đ', discount: '-28%', attrs: ['2.4GHz', '150 - 500 Mpps'], image: '250-941-tl-wn781nd--2-.png', href: '/tplink-bo-kich-song-wifi-tl-wn781nd/' }
    ]
  },
  {
    title: 'Wi-Fi Di Động',
    viewAllHref: '/wi-fi-di-dong/',
    products: [
      { name: 'Bộ phát Wifi di động TP-Link M7000 4G LTE 150Mbps', oldPrice: '1.600.000 đ', price: '1.140.000 đ', discount: '-28%', attrs: ['2.4GHz', '150 - 500 Mpps'], image: '250-948-m7000.png', href: '/tplink-wifi-di-dong-m7000/' },
      { name: 'Bộ phát Wifi di động 4G LTE TP-Link M7350', oldPrice: '2.040.000 đ', price: '1.455.000 đ', discount: '-28%', attrs: ['2.4GHz', '150 - 500 Mpps'], image: '250-946-m7350.png', href: '/wifi-di-dong-tplink-m7350/' },
      { name: 'Hệ thống Wi-Fi Mesh Cho Toàn Bộ Nhà AC1200 Deco E4(3-Pack)', oldPrice: '2.630.000 đ', price: '1.880.000 đ', discount: '-28%', attrs: ['Chuẩn AC', 'Wifi 5', '3 Pack'], image: '250-831-deco-e4-3-pack---2-.png', href: '/tplink-wifi-di-dong-deco-e4/' }
    ]
  },
  {
    title: 'Switch – Bộ chuyển mạch',
    viewAllHref: '/switch-bo-chuyen-mach/',
    products: [
      { name: 'Switch Để Bàn 5 Cổng Gigabit TL-SG1005D', oldPrice: '390.000 đ', price: '280.000 đ', discount: '-28%', attrs: ['Switch Ethernet 10/100/1000'], image: '250-1001-tl-sg1005d.jpg', href: '/tplink-switch-tl-sg1005d/' }
    ]
  }
];
