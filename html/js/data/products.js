const PRODUCT_SECTIONS = [
  {
    id: 'cat1',
    type: 'category',
    title: 'Camera giám sát',
    tabs: [
      { label: 'Camera Imou', href: '#' },
      { label: 'Camera Dahua', href: '#' },
      { label: 'Camera KBVision', href: '#' }
    ],
    viewAllText: 'Xem tất cả ›',
    viewAllHref: '/camera-giam-sat/',
    products: [
      {
        name: 'Camera IP Dome Dahua DH-IPC-HDW1439T1-A-PRO 4MP có mic, AI-ISP',
        image: 'assets/images/product-cat1-dahua-ip.png',
        price: '1.250.000 đ',
        oldPrice: '1.780.000 đ',
        discount: '-30%',
        badge: '',
        attrs: ['4MP', 'Tích hợp mic', 'H.265+'],
        link: '/camera-ip-dahua-dh-ipc-hdw1439t1-a-pro/'
      },
      {
        name: 'Camera Wifi Dahua DH-H5AS quay quét trong nhà 5MP, Auto Tracking',
        image: 'assets/images/product-cat1-dahua-wifi.png',
        price: '690.000 đ',
        oldPrice: '980.000 đ',
        discount: '-30%',
        badge: '',
        attrs: ['Xoay 360 độ', '5MP', 'Hồng ngoại 10m'],
        link: '/camera-wifi-dahua-dh-h5as/'
      },
      {
        name: 'Camera Wifi Imou IPC-A82P-PRO trong nhà quay quét 8MP (4K)',
        image: 'assets/images/product-cat1-imou.png',
        price: '1.090.000 đ',
        oldPrice: '1.650.000 đ',
        discount: '-34%',
        badge: 'Mẫu mới',
        attrs: ['Xoay 360 độ', '8MP', '4 chế độ ánh sáng'],
        link: '/camera-wifi-imou-ipc-a82p-pro/'
      },
      {
        name: 'Camera IP KBVision KX-CAiF5003N-DL-AB 5MP ánh sáng kép thông minh',
        image: 'assets/images/product-cat1-kbvision.png',
        price: '890.000 đ',
        oldPrice: '1.250.000 đ',
        discount: '-29%',
        badge: '',
        attrs: ['5MP', 'Ánh sáng kép', 'H.265+'],
        link: '/camera-ip-kbvision-kx-caif5003n-dl-ab/'
      },
      {
        name: 'Camera Wifi Kabevision KX-5PTW-D-PMA 2 ống kính ngoài trời 5+5MP',
        image: 'assets/images/product-cat1-kabevision.png',
        price: '1.450.000 đ',
        oldPrice: '2.050.000 đ',
        discount: '-29%',
        badge: '',
        attrs: ['Xoay 360 độ', '5+5MP', '2 Mắt'],
        link: '/camera-wifi-kabevision-kx-5ptw-d-pma/'
      },
      {
        name: 'Camera Analog Dahua DH-HAC-HDW1200TQP-IL-T-VN',
        image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/04/HAC-HDW1200TQP-IL-T-247x296.png',
        price: 'Liên hệ',
        attrs: ['Dahua'],
        link: '/camera-analog-dahua-dh-hac-hdw1200tqp-il-t-vn/'
      },
      {
        name: 'Camera PTZ Dahua DH-SD4A225DB-HNY',
        image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/09/1_0_01_07_15253_195330777_crop-247x296.png',
        price: 'Liên hệ',
        attrs: ['Dahua'],
        link: '/camera-ptz-dahua-dh-sd4a225db-hny/'
      },
      {
        name: 'Camera Analog KabeVision KX-AD5013-A',
        image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/07/KX-AD5013-A-247x296.png',
        price: 'Liên hệ',
        attrs: ['KabeVision'],
        link: '/camera-analog-kabevision-kx-ad5013-a/'
      },
      {
        name: 'Camera PTZ KabeVision KX-EAi2458LZSN',
        image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/09/EAi2458LZSN-247x296.png',
        price: 'Liên hệ',
        attrs: ['KabeVision'],
        link: '/camera-ptz-kabevision-kx-eai2458lzsn/'
      },
      {
        name: 'Camera Imou IPC-UA7E-5M0T2-EU/FSP14',
        image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/06/IPC-UA7E-5M0T2-EU.FSP14-1-247x296.png',
        price: 'Liên hệ',
        attrs: ['Imou'],
        link: '/camera-imou-ipc-ua7e-5m0t2-eu-fsp14/'
      }
    ]
  },
  {
    id: 'cat2',
    type: 'category',
    title: 'Thiết bị mạng',
    tabs: [
      { label: 'Router TP-Link', href: '#' },
      { label: 'Mesh Wi-Fi', href: '#' },
      { label: 'Modem – Gateway', href: '#' }
    ],
    viewAllText: 'Xem tất cả ›',
    viewAllHref: '/tp-link/',
    products: [
      {
        name: 'Router Wi-Fi 7 TP-Link Archer GE230 băng tần kép BE3600',
        image: 'assets/images/product-cat2-tplink-router.png',
        price: '1.690.000 đ',
        oldPrice: '2.290.000 đ',
        discount: '-26%',
        badge: 'Mẫu mới',
        attrs: ['Wi-Fi 7', 'BE3600'],
        link: '/router-wifi-tplink-archer-ge230/'
      },
      {
        name: 'Hệ thống Wi-Fi Mesh TP-Link Deco X50 AX3000 (1-Pack)',
        image: 'assets/images/product-cat2-tplink-mesh.png',
        price: '1.890.000 đ',
        oldPrice: '2.590.000 đ',
        discount: '-27%',
        badge: '',
        attrs: ['Wi-Fi 6', 'AX3000'],
        link: '/mesh-wifi-tplink-deco-x50/'
      },
      {
        name: 'Router Wi-Fi 4G LTE TP-Link TL-MR6400 Chuẩn N 300Mbps',
        image: 'assets/images/product-cat2-tplink-modem.jpg',
        price: '890.000 đ',
        oldPrice: '1.190.000 đ',
        discount: '-25%',
        badge: '',
        attrs: ['4G LTE', 'Chuẩn N'],
        link: '/modem-4g-tplink-tl-mr6400/'
      },
      {
        name: 'Bộ phát Wi-Fi di động TP-Link M7350 4G LTE pin 2000mAh',
        image: 'assets/images/product-cat2-tplink-mobile.jpg',
        price: '1.190.000 đ',
        oldPrice: '1.590.000 đ',
        discount: '-25%',
        badge: '',
        attrs: ['4G LTE', '10 thiết bị'],
        link: '/wifi-di-dong-tplink-m7350/'
      },
      {
        name: 'Bộ mở rộng sóng Wi-Fi 7 TP-Link RE235BE băng tần kép BE3600',
        image: 'assets/images/product-cat2-tplink-extender.png',
        price: '990.000 đ',
        oldPrice: '1.350.000 đ',
        discount: '-27%',
        badge: '',
        attrs: ['Wi-Fi 7', 'MLO'],
        link: '/bo-mo-rong-wifi-tplink-re235be/'
      },
      {
        name: 'Wi-Fi Adapter TP-Link ARCHER TX50UH',
        image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/ARCHER-TX50UH-247x296.png',
        price: 'Liên hệ',
        attrs: ['TP-Link'],
        link: '/wifi-adapter-tplink-archer-tx50uh/'
      },
      {
        name: 'Phụ kiện TP-Link UH9120C',
        image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/UH9120C-247x296.png',
        price: 'Liên hệ',
        attrs: ['TP-Link'],
        link: '/phu-kien-tplink-uh9120c/'
      },
      {
        name: 'Mạng Văn Phòng SOHO TP-Link TL-SG1024DE',
        image: 'https://kabegroup.vn/kabet/wp-content/uploads/2023/02/TL-SG1024DE-247x296.jpg',
        price: 'Liên hệ',
        attrs: ['TP-Link'],
        link: '/mang-van-phong-soho-tplink-tl-sg1024de/'
      },
      {
        name: 'Giải pháp doanh nghiệp TP-Link MC212CS-20',
        image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/MC211CS-2-1-247x296.png',
        price: 'Liên hệ',
        attrs: ['TP-Link'],
        link: '/giai-phap-doanh-nghiep-tplink-mc212cs-20/'
      },
      {
        name: 'Mesh Wi-Fi TP-Link DECO X50-OUTDOOR',
        image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/DECO-X50-OUTDOOR-247x296.png',
        price: 'Liên hệ',
        attrs: ['TP-Link'],
        link: '/mesh-wifi-tplink-deco-x50-outdoor/'
      }
    ]
  },
  {
    id: 'cat5',
    type: 'category',
    title: 'Chấm công - Kiểm soát cửa',
    tabs: [
      { label: 'Kiểm soát cửa Dahua', href: '#' },
      { label: 'Kiểm soát cửa Kabevision', href: '#' },
      { label: 'Module vân tay', href: '#' }
    ],
    viewAllText: 'Xem tất cả ›',
    viewAllHref: '/dahua/',
    products: [
      {
        name: 'Máy chấm công khuôn mặt Dahua DHI-ASI3214A-W màn hình 4.3"',
        image: 'assets/images/product-cat5-access-dahua1.png',
        price: '3.690.000 đ',
        oldPrice: '5.200.000 đ',
        discount: '-29%',
        badge: '',
        attrs: ['Khuôn mặt', 'Vân tay', 'Thẻ IC'],
        link: '/may-cham-cong-khuon-mat-dahua-dhi-asi3214a-w/'
      },
      {
        name: 'Máy chấm công khuôn mặt Dahua DHI-ASI3213A-W-E1 Camera kép 2MP',
        image: 'assets/images/product-cat5-access-dahua2.png',
        price: '3.290.000 đ',
        oldPrice: '4.600.000 đ',
        discount: '-28%',
        badge: '',
        attrs: ['Khuôn mặt', 'Thẻ IC', 'Mật khẩu'],
        link: '/may-cham-cong-khuon-mat-dahua-dhi-asi3213a-w-e1/'
      },
      {
        name: 'Module mở rộng vân tay Dahua ASF7K-FQ (10.000 vân tay)',
        image: 'assets/images/product-cat5-access-dahua3.png',
        price: '1.450.000 đ',
        oldPrice: '1.950.000 đ',
        discount: '-26%',
        badge: '',
        attrs: ['Vân tay', 'QR Code'],
        link: '/module-van-tay-dahua-asf7k-fq/'
      },
      {
        name: 'Máy kiểm soát ra vào Dahua DHI-ASI7213K-W màn hình 7"',
        image: 'assets/images/product-cat5-access-dahua4.png',
        price: '5.690.000 đ',
        oldPrice: '7.900.000 đ',
        discount: '-28%',
        badge: 'Mẫu mới',
        attrs: ['Khuôn mặt', 'Thẻ IC', 'QR Code'],
        link: '/may-kiem-soat-ra-vao-dahua-dhi-asi7213k-w/'
      },
      {
        name: 'Máy kiểm soát ra vào Kabevision KX-FR04AC-FW nhận diện khuôn mặt',
        image: 'assets/images/product-cat5-access-kabevision.png',
        price: '2.690.000 đ',
        oldPrice: '3.790.000 đ',
        discount: '-29%',
        badge: '',
        attrs: ['Khuôn mặt', 'Camera kép 2MP'],
        link: '/may-kiem-soat-ra-vao-kabevision-kx-fr04ac-fw/'
      },
      {
        name: 'Access control Dahua DHI-ASI6213S-D',
        image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/07/DHI-ASI6213S-D-247x296.png',
        price: 'Liên hệ',
        attrs: ['Dahua'],
        link: '/kiem-soat-ra-vao-dahua-dhi-asi6213s-d/'
      },
      {
        name: 'Access control Dahua DHI-ASI6213S-PW',
        image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/07/DHI-ASI6213S-PW-247x296.png',
        price: 'Liên hệ',
        attrs: ['Dahua'],
        link: '/kiem-soat-ra-vao-dahua-dhi-asi6213s-pw/'
      },
      {
        name: 'Access control Dahua DHI-ASI6213J-MW-V1',
        image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/07/DHI-ASI6213J-MW-V1-247x296.png',
        price: 'Liên hệ',
        attrs: ['Dahua'],
        link: '/kiem-soat-ra-vao-dahua-dhi-asi6213j-mw-v1/'
      },
      {
        name: 'Access control Dahua DHI-ASI6214S',
        image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/07/DHI-ASI6214S-247x296.png',
        price: 'Liên hệ',
        attrs: ['Dahua'],
        link: '/kiem-soat-ra-vao-dahua-dhi-asi6214s/'
      },
      {
        name: 'Access Control KabeVision KX-FR04AC-W',
        image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/09/KX-FR04AC-W-247x296.png',
        price: 'Liên hệ',
        attrs: ['KabeVision'],
        link: '/kiem-soat-ra-vao-kabevision-kx-fr04ac-w/'
      }
    ]
  },
  {
    id: 'cat6',
    type: 'category',
    title: 'Thiết bị lưu trữ',
    tabs: [
      { label: 'Ổ cứng', href: '#' },
      { label: 'Thẻ nhớ', href: '#' },
      { label: 'Ổ SSD', href: '#' }
    ],
    viewAllText: 'Xem tất cả ›',
    viewAllHref: '/sandisk/',
    products: [
      {
        name: 'SSD SanDisk SDSSDA-240G-G26 2.5" SATA 3, 240GB',
        image: 'assets/images/product-cat6-sandisk-ssd.png',
        price: '590.000 đ',
        oldPrice: '790.000 đ',
        discount: '-25%',
        badge: '',
        attrs: ['240GB', 'SATA 3', 'Bảo hành 3 năm'],
        link: '/ssd-sandisk-sdssda-240g-g26/'
      },
      {
        name: 'Thẻ nhớ SanDisk',
        image: 'https://kabegroup.vn/kabet/wp-content/uploads/2024/10/the-nho-sandisk-247x296.png',
        price: 'Liên hệ',
        attrs: ['SanDisk'],
        link: '/the-nho-sandisk-the-nho-sandisk/'
      },
      {
        name: 'Thẻ nhớ Micro SD SanDisk',
        image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/09/SANDISK.1-247x296.png',
        price: 'Liên hệ',
        attrs: ['SanDisk'],
        link: '/the-nho-sandisk-the-nho-micro-sd-sandisk/'
      },
      {
        name: 'Thẻ nhớ Sandisk High Endurance',
        image: 'https://kabegroup.vn/kabet/wp-content/uploads/2022/04/the-nho-sandisk-247x296.png',
        price: 'Liên hệ',
        attrs: ['SanDisk'],
        link: '/the-nho-sandisk-the-nho-sandisk-high-endurance/'
      },
      {
        name: 'Ổ cứng Seagate Skyhawk AI 20TB',
        image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/09/seagate-skyhawk-20tb-247x296.png',
        price: 'Liên hệ',
        attrs: ['Seagate'],
        link: '/o-cung-seagate-seagate-skyhawk-ai-20tb/'
      },
      {
        name: 'Ổ cứng Seagate Skyhawk AI',
        image: 'https://kabegroup.vn/kabet/wp-content/uploads/2024/10/seagate-skyhawk-ai-247x296.png',
        price: 'Liên hệ',
        attrs: ['Seagate'],
        link: '/o-cung-seagate-o-cung-seagate-skyhawk-ai/'
      },
      {
        name: 'Ổ cứng Seagate ST16000VE002',
        image: 'https://kabegroup.vn/kabet/wp-content/uploads/2022/01/ST16000VE000-247x296.jpg',
        price: 'Liên hệ',
        attrs: ['Seagate'],
        link: '/o-cung-seagate-st16000ve002/'
      },
      {
        name: 'Ổ cứng Seagate ST12000VE001',
        image: 'https://kabegroup.vn/kabet/wp-content/uploads/2022/01/ST12000VE0008-247x296.jpg',
        price: 'Liên hệ',
        attrs: ['Seagate'],
        link: '/o-cung-seagate-st12000ve001/'
      },
      {
        name: 'Ổ cứng Seagate ST10000VE001',
        image: 'https://kabegroup.vn/kabet/wp-content/uploads/2022/01/ST10000VE0001-247x296.jpg',
        price: 'Liên hệ',
        attrs: ['Seagate'],
        link: '/o-cung-seagate-st10000ve001/'
      },
      {
        name: 'Ổ cứng Seagate ST8000VE001',
        image: 'https://kabegroup.vn/kabet/wp-content/uploads/2022/01/ST8000VE000-247x296.jpg',
        price: 'Liên hệ',
        attrs: ['Seagate'],
        link: '/o-cung-seagate-st8000ve001/'
      }
    ]
  }
];
