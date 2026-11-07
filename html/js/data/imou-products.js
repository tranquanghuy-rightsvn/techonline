const BRAND_ICON_STRIP = [
  { label: 'Camera', image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/IPC-A32P-PRO-.-IPC-A52P-PRO-247x296.png' },
  { label: 'Đầu ghi', image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/11/NVR-N110W-8A0E-247x296.png' },
  { label: 'Sản phẩm khác', image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/01/1-247x296.png' }
];

const BRAND_CATEGORY_GROUPS = [
  {
    title: 'Camera',
    viewAllHref: '#',
    products: [
      { name: 'Camera Imou IPC-A82P-PRO', price: 'Liên hệ', attrs: ['Imou'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/IPC-A32P-PRO-.-IPC-A52P-PRO-247x296.png', href: '/camera-imou-ipc-a82p-pro/' },
      { name: 'Camera Imou IPC-UA7E-5M0T2-EU/FSP14', price: 'Liên hệ', attrs: ['Imou'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/06/IPC-UA7E-5M0T2-EU.FSP14-1-247x296.png', href: '/camera-imou-ipc-ua7e-5m0t2-eu-fsp14/' },
      { name: 'Camera Imou IPC-SA70F-10M0T2-EU', price: 'Liên hệ', attrs: ['Imou'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/06/IPC-SA70F-10M0T2-EU-247x296.png', href: '/camera-imou-ipc-sa70f-10m0t2-eu/' },
      { name: 'Camera Imou IPC-K7F-5M1T-X', price: 'Liên hệ', attrs: ['Imou'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/06/IPC-K7F-5M1T-X-247x296.png', href: '/camera-imou-ipc-k7f-5m1t-x/' },
      { name: 'Camera Imou IPC-K7F-3M1T-X', price: 'Liên hệ', attrs: ['Imou'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/06/IPC-K7F-3M1T-X-247x296.png', href: '/camera-imou-ipc-k7f-3m1t-x/' },
      { name: 'Camera Imou IPC-S76DP-13M0N', price: 'Liên hệ', attrs: ['Imou'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/IPC-S7UP-11M0WED-247x296.png', href: '/camera-imou-ipc-s76dp-13m0n/' },
      { name: 'Camera Imou IPC-PS8E-5V0', price: 'Liên hệ', attrs: ['Imou'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/06/PS8D-247x296.png', href: '/camera-imou-ipc-ps8e-5v0/' },
      { name: 'Camera Imou IPC-PS8EP-3V0', price: 'Liên hệ', attrs: ['Imou'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/06/PS8D-247x296.png', href: '/camera-imou-ipc-ps8ep-3v0/' },
      { name: 'Camera Imou IPC-S3EP-5M0WE-PRO', price: 'Liên hệ', attrs: ['Imou'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/IPC-F32FP-PRO-247x296.png', href: '/camera-imou-ipc-s3ep-5m0we-pro/' },
      { name: 'Camera Imou IPC-S3EP-3M0WE-PRO', price: 'Liên hệ', attrs: ['Imou'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/IPC-F32FP-PRO-247x296.png', href: '/camera-imou-ipc-s3ep-3m0we-pro/' },
      { name: 'Camera Imou IPC-F52FP-PRO', price: 'Liên hệ', attrs: ['Imou'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/IPC-F32FP-PRO-247x296.png', href: '/camera-imou-ipc-f52fp-pro/' },
      { name: 'Camera Imou IPC-F32FP-PRO', price: 'Liên hệ', attrs: ['Imou'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/IPC-F32FP-PRO-247x296.png', href: '/camera-imou-ipc-f32fp-pro/' }
    ]
  },
  {
    title: 'Đầu ghi',
    viewAllHref: '#',
    products: [
      { name: 'Đầu ghi Imou NVR-N110W-8A0E', price: 'Liên hệ', attrs: ['Imou'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/11/NVR-N110W-8A0E-247x296.png', href: '/dau-ghi-imou-nvr-n110w-8a0e/' },
      { name: 'Đầu ghi Imou NVR-N118W-8A0E', price: 'Liên hệ', attrs: ['Imou'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/11/NVR-N110W-8A0E-247x296.png', href: '/dau-ghi-imou-nvr-n118w-8a0e/' },
      { name: 'Đầu ghi Imou NVR-N110-8A0E', price: 'Liên hệ', attrs: ['Imou'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/11/NVR-N110-8A0E-1-247x296.png', href: '/dau-ghi-imou-nvr-n110-8a0e/' },
      { name: 'Đầu ghi Imou NVR-N118-8A0E', price: 'Liên hệ', attrs: ['Imou'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/11/NVR-N110-8A0E-1-247x296.png', href: '/dau-ghi-imou-nvr-n118-8a0e/' },
      { name: 'Đầu ghi Imou NVR1108HS-W-S2', price: 'Liên hệ', attrs: ['Imou'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2022/02/nvr1108hs_w_s2-247x296.png', href: '/dau-ghi-imou-nvr1108hs-w-s2/' },
      { name: 'Đầu ghi Imou NVR1104HS-W-S2', price: 'Liên hệ', attrs: ['Imou'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2022/02/nvr1108hs_w_s2-247x296.png', href: '/dau-ghi-imou-nvr1104hs-w-s2/' }
    ]
  },
  {
    title: 'Sản phẩm khác',
    viewAllHref: '#',
    products: [
      { name: 'Sản phẩm khác Imou SF110P', price: 'Liên hệ', attrs: ['Imou'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/01/1-247x296.png', href: '/san-pham-khac-imou-sf110p/' },
      { name: 'Sản phẩm khác Imou SF106P', price: 'Liên hệ', attrs: ['Imou'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/01/SF106P-1-247x296.png', href: '/san-pham-khac-imou-sf106p/' },
      { name: 'Sản phẩm khác Imou Thẻ nhớ Imou', price: 'Liên hệ', attrs: ['Imou'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2022/10/the-nho-imou-247x296.png', href: '/san-pham-khac-imou-the-nho-imou/' },
      { name: 'Sản phẩm khác Imou RV-L11-A', price: 'Liên hệ', attrs: ['Imou'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2022/10/RV-L11-A-247x296.png', href: '/san-pham-khac-imou-rv-l11-a/' },
      { name: 'Sản phẩm khác Imou K2C', price: 'Liên hệ', attrs: ['Imou'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2022/10/K2C-247x296.png', href: '/san-pham-khac-imou-k2c/' },
      { name: 'Sản phẩm khác Imou CL1B-5-E27', price: 'Liên hệ', attrs: ['Imou'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2022/10/CL1B-5-247x296.png', href: '/san-pham-khac-imou-cl1b-5-e27/' }
    ]
  }
];
