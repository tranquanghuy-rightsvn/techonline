const BRAND_ICON_STRIP = [
  { label: 'Camera Wifi', image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/10/H3AS-247x296.png' },
  { label: 'Camera IP', image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/10/12-247x296.png' },
  { label: 'Camera Analog', image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/04/HAC-HDW1200TQP-IL-T-247x296.png' },
  { label: 'Camera PTZ', image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/09/1_0_01_07_15253_195330777_crop-247x296.png' },
  { label: 'Đầu ghi IP', image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/09/DHI-NVR5864-EI2-247x296.png' },
  { label: 'Đầu ghi Analog', image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/09/XVR5104HS-I21-247x296.png' },
  { label: 'Switch', image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/09/1_0_01_20_11945_746851564_crop-247x296.png' },
  { label: 'Chuông cửa màn hình', image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/03/DHI-VTO2201F-P-S2-247x296.png' },
  { label: 'Access control', image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/07/DHI-ASI3214A-W-247x296.png' },
  { label: 'Sản phẩm dự án', image: 'https://kabegroup.vn/kabet/wp-content/uploads/2024/09/ITC431-RW1F-L-247x296.png' },
  { label: 'Phụ kiện / Sản phẩm khác', image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/10/admin-ajax-1-247x296.png' }
];

const BRAND_CATEGORY_GROUPS = [
  {
    title: 'Camera Wifi',
    viewAllHref: '#',
    products: [
      { name: 'Camera Wifi Dahua DH-H5AS', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/10/H3AS-247x296.png', href: '/camera-wifi-dahua-dh-h5as/' },
      { name: 'Camera Wifi Dahua DH-H3AS', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/10/H3AS-247x296.png', href: '/camera-wifi-dahua-dh-h3as/' },
      { name: 'Camera Wifi Dahua DH-H3AE-L', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/H2A.1-247x296.png', href: '/camera-wifi-dahua-dh-h3ae-l/' },
      { name: 'Camera Wifi Dahua DH-P5I-PV', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/DH-P5I-PV-247x296.png', href: '/camera-wifi-dahua-dh-p5i-pv/' },
      { name: 'Camera Wifi Dahua DH-P3I-PV', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/DH-P5I-PV-247x296.png', href: '/camera-wifi-dahua-dh-p3i-pv/' },
      { name: 'Camera Wifi Dahua DH-P3D-3F-PV-P', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/12/DH-P3D-3F-PV-P-247x296.png', href: '/camera-wifi-dahua-dh-p3d-3f-pv-p/' },
      { name: 'Camera Wifi Dahua DH-P8F-PV', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/DH-P8F-PV-247x296.png', href: '/camera-wifi-dahua-dh-p8f-pv/' },
      { name: 'Camera Wifi Dahua DH-P5F-PV', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/DH-P8F-PV-247x296.png', href: '/camera-wifi-dahua-dh-p5f-pv/' },
      { name: 'Camera Wifi Dahua DH-P3F-PV', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/DH-P8F-PV-247x296.png', href: '/camera-wifi-dahua-dh-p3f-pv/' },
      { name: 'Camera Wifi Dahua DH-IPC-HDW1539DA-SAW-IL', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/04/DH-IPC-HDW1339DA-SAW-IL-1-247x296.png', href: '/camera-wifi-dahua-dh-ipc-hdw1539da-saw-il/' },
      { name: 'Camera Wifi Dahua DH-IPC-HDW1339DA-SAW-IL', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/04/DH-IPC-HDW1339DA-SAW-IL-1-247x296.png', href: '/camera-wifi-dahua-dh-ipc-hdw1339da-saw-il/' },
      { name: 'Camera Wifi Dahua DH-IPC-HFW1539DTK2-SAW-IL', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/04/1-247x296.png', href: '/camera-wifi-dahua-dh-ipc-hfw1539dtk2-saw-il/' }
    ]
  },
  {
    title: 'Camera IP',
    viewAllHref: '#',
    products: [
      { name: 'Camera IP Dahua DH-IPC-HDW1439T1-A-PRO', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/10/12-247x296.png', href: '/camera-ip-dahua-dh-ipc-hdw1439t1-a-pro/' },
      { name: 'Camera IP Dahua DH-IPC-HDW1239T1-A-PRO', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/10/12-247x296.png', href: '/camera-ip-dahua-dh-ipc-hdw1239t1-a-pro/' },
      { name: 'Camera IP Dahua DH-IPC-HFW1439TC1-A-PRO', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/10/1234-247x296.png', href: '/camera-ip-dahua-dh-ipc-hfw1439tc1-a-pro/' },
      { name: 'Camera IP Dahua DH-IPC-HFW1439M1-A-B-PRO', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/10/123-247x296.png', href: '/camera-ip-dahua-dh-ipc-hfw1439m1-a-b-pro/' },
      { name: 'Camera IP Dahua DH-IPC-HFW1239M1-A-B-PRO', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/10/123-247x296.png', href: '/camera-ip-dahua-dh-ipc-hfw1239m1-a-b-pro/' },
      { name: 'Camera IP Dahua DAT-N9449DZI', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/09/1-247x296.png', href: '/camera-ip-dahua-dat-n9449dzi/' },
      { name: 'Camera IP Dahua DHI-HY-FT121LDP', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/HY-FT121LD-E_2_thumb-247x296.png', href: '/camera-ip-dahua-dhi-hy-ft121ldp/' },
      { name: 'Camera IP Dahua DAT-9649ZAS-IL', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/07/DAT-9649ZAS-IL-247x296.png', href: '/camera-ip-dahua-dat-9649zas-il/' },
      { name: 'Camera IP Dahua DAT-N9449D', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/07/DAT-N9449D-247x296.png', href: '/camera-ip-dahua-dat-n9449d/' },
      { name: 'Camera IP Dahua DH-N42DRZ-PMA', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/05/DH-IPC-HDPW1230R1-S5-247x296.png', href: '/camera-ip-dahua-dh-n42drz-pma/' },
      { name: 'Camera IP Dahua DH-SD3C205DB-GNY-A-PV', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/01/DH-SD3C205DB-GNY-A-PV-1-247x296.png', href: '/camera-ip-dahua-dh-sd3c205db-gny-a-pv/' },
      { name: 'Camera IP Dahua DH-IPC-HDW1230T2-A-VN', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/01/DH-IPC-HDW1230T2-A-VN-1-247x296.png', href: '/camera-ip-dahua-dh-ipc-hdw1230t2-a-vn/' }
    ]
  },
  {
    title: 'Camera Analog',
    viewAllHref: '#',
    products: [
      { name: 'Camera Analog Dahua DH-HAC-HDW1200TQP-IL-T-VN', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/04/HAC-HDW1200TQP-IL-T-247x296.png', href: '/camera-analog-dahua-dh-hac-hdw1200tqp-il-t-vn/' },
      { name: 'Camera Analog Dahua DH-HAC-HDW1500TQP-IL-T', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/09/admin-ajax-2-1-247x296.png', href: '/camera-analog-dahua-dh-hac-hdw1500tqp-il-t/' },
      { name: 'Camera Analog Dahua DH-HAC-HFW1500RLP-IL-T', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/DH-HAC-HFW1500RLP-IL-T-247x296.png', href: '/camera-analog-dahua-dh-hac-hfw1500rlp-il-t/' },
      { name: 'Camera Analog Dahua DH-HAC-HFW1500TLMP-IL-T', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/09/DH-HAC-HFW1500TLMP-IL-T-247x296.png', href: '/camera-analog-dahua-dh-hac-hfw1500tlmp-il-t/' },
      { name: 'Camera Analog Dahua DH-HAC-T2A21P-U-IL-A', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/09/admin-ajax-3-247x296.png', href: '/camera-analog-dahua-dh-hac-t2a21p-u-il-a/' },
      { name: 'Camera Analog Dahua DH-HAC-HFW1500THP-IL-A', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/09/2-1-247x296.png', href: '/camera-analog-dahua-dh-hac-hfw1500thp-il-a/' },
      { name: 'Camera Analog Dahua DH-HAC-B2A51P-U-IL-A', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/09/DH-HAC-B2A21P-U-IL-A-247x296.png', href: '/camera-analog-dahua-dh-hac-b2a51p-u-il-a/' },
      { name: 'Camera Analog Dahua DH-HAC-B2A21P-U-IL-A', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/09/DH-HAC-B2A21P-U-IL-A-247x296.png', href: '/camera-analog-dahua-dh-hac-b2a21p-u-il-a/' },
      { name: 'Camera Analog Dahua DH-HAC-HFW1249X-IL-A-PRO-VN', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/DH-HAC-HFW1249XP-IL-A-PRO-0360B-DIP_Rendergraph_45Left-logo-247x296.png', href: '/camera-analog-dahua-dh-hac-hfw1249x-il-a-pro-vn/' },
      { name: 'Camera Analog Dahua DH-HAC-HFW1249X-IL-A-PRO', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/DH-HAC-HFW1249XP-IL-A-PRO-0360B-DIP_Rendergraph_45Left-logo-247x296.png', href: '/camera-analog-dahua-dh-hac-hfw1249x-il-a-pro/' },
      { name: 'Camera Analog Dahua DH-HAC-HFW1249X-A-PRO-VN', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/DH-HAC-HFW1249XP-IL-A-PRO-0360B-DIP_Rendergraph_45Left-logo-247x296.png', href: '/camera-analog-dahua-dh-hac-hfw1249x-a-pro-vn/' },
      { name: 'Camera Analog Dahua DH-HAC-HFW1249X-A-PRO', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/DH-HAC-HFW1249XP-IL-A-PRO-0360B-DIP_Rendergraph_45Left-logo-247x296.png', href: '/camera-analog-dahua-dh-hac-hfw1249x-a-pro/' }
    ]
  },
  {
    title: 'Camera PTZ',
    viewAllHref: '#',
    products: [
      { name: 'Camera PTZ Dahua DH-SD4A225DB-HNY', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/09/1_0_01_07_15253_195330777_crop-247x296.png', href: '/camera-ptz-dahua-dh-sd4a225db-hny/' },
      { name: 'Camera PTZ Dahua DH-SDT2A200-2F-NB-A-PV', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/09/DH-SDT2A200-2F-NB-A-PV-247x296.png', href: '/camera-ptz-dahua-dh-sdt2a200-2f-nb-a-pv/' },
      { name: 'Camera PTZ Dahua DH-SD4D225MB-HNR', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/09/DH-SD4D225MB-HNR-247x296.png', href: '/camera-ptz-dahua-dh-sd4d225mb-hnr/' },
      { name: 'Camera PTZ Dahua DH-SD4D425MB-HNR', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/09/DH-SD4D425MB-HNR-247x296.png', href: '/camera-ptz-dahua-dh-sd4d425mb-hnr/' },
      { name: 'Camera PTZ Dahua DH-SD4D225DB-HNY', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/09/DH-SD4D225DB-HNY-247x296.png', href: '/camera-ptz-dahua-dh-sd4d225db-hny/' },
      { name: 'Camera PTZ Dahua DH-SD5A432GB-HNR', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/03/DH-SD5A432GB-HNR-247x296.png', href: '/camera-ptz-dahua-dh-sd5a432gb-hnr/' },
      { name: 'Camera PTZ Dahua DH-SD6C3432GB-HNR-AGQ-PV1-LA', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/02/DH-SD6C3432GB-HNR-AGQ-PV1-LA-247x296.png', href: '/camera-ptz-dahua-dh-sd6c3432gb-hnr-agq-pv1-la/' },
      { name: 'Camera PTZ Dahua DH-SD5A232GB-HNR', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2024/07/DH-SD5A232GB-HNR-247x296.png', href: '/camera-ptz-dahua-dh-sd5a232gb-hnr/' },
      { name: 'Camera PTZ Dahua DH-SD6AL245GB-HNV', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2024/06/DH-SD6AL245GB-HNV-247x296.png', href: '/camera-ptz-dahua-dh-sd6al245gb-hnv/' },
      { name: 'Camera PTZ Dahua DH-SD29404DB-GNY-W', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/09/sd14-247x296.png', href: '/camera-ptz-dahua-dh-sd29404db-gny-w/' },
      { name: 'Camera PTZ Dahua DH-SD29404DB-GNY', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/09/sd14-247x296.png', href: '/camera-ptz-dahua-dh-sd29404db-gny/' },
      { name: 'Camera PTZ Dahua DH-SD29204DB-GNY-W', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/09/sd14-247x296.png', href: '/camera-ptz-dahua-dh-sd29204db-gny-w/' }
    ]
  },
  {
    title: 'Đầu ghi IP',
    viewAllHref: '#',
    products: [
      { name: 'Đầu ghi IP Dahua DHI-NVR5864-EI2', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/09/DHI-NVR5864-EI2-247x296.png', href: '/dau-ghi-ip-dahua-dhi-nvr5864-ei2/' },
      { name: 'Đầu ghi IP Dahua DHI-NVR5832-EI2', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/09/DHI-NVR5832-EI2-247x296.png', href: '/dau-ghi-ip-dahua-dhi-nvr5832-ei2/' },
      { name: 'Đầu ghi IP Dahua DHI-NVR5816-EI2', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/09/DHI-NVR5816-EI2-247x296.png', href: '/dau-ghi-ip-dahua-dhi-nvr5816-ei2/' },
      { name: 'Đầu ghi IP Dahua DHI-NVR5432-EI2', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/09/DHI-NVR5432-EI2-247x296.png', href: '/dau-ghi-ip-dahua-dhi-nvr5432-ei2/' },
      { name: 'Đầu ghi IP Dahua DHI-NVR5464-EI2', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/09/DHI-NVR5416-EI_2-247x296.png', href: '/dau-ghi-ip-dahua-dhi-nvr5464-ei2/' },
      { name: 'Đầu ghi IP Dahua DHI-NVR4432-4KS3', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/09/NVR4432-4KS3-247x296.png', href: '/dau-ghi-ip-dahua-dhi-nvr4432-4ks3/' },
      { name: 'Đầu ghi IP Dahua DHI-NVR5416-EI2', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/09/DHI-NVR5416-EI_2-247x296.png', href: '/dau-ghi-ip-dahua-dhi-nvr5416-ei2/' },
      { name: 'Đầu ghi IP Dahua DHI-NVR5232-EI2', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/09/DHI-NVR5232-EI2-247x296.png', href: '/dau-ghi-ip-dahua-dhi-nvr5232-ei2/' }
    ]
  },
  {
    title: 'Đầu ghi Analog',
    viewAllHref: '#',
    products: [
      { name: 'Đầu ghi Analog Dahua DH-XVR4116HS-I/T', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/09/XVR5104HS-I21-247x296.png', href: '/dau-ghi-analog-dahua-dh-xvr4116hs-i-t/' },
      { name: 'Đầu ghi Analog Dahua DH-XVR5216AN-5M-I3/T', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/11/1_0_01_01_16825_1084810437_crop-247x296.png', href: '/dau-ghi-analog-dahua-dh-xvr5216an-5m-i3-t/' },
      { name: 'Đầu ghi Analog Dahua XVR5232AN-5M-I3/T', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/11/1_0_01_01_16825_1084810437_crop-247x296.png', href: '/dau-ghi-analog-dahua-xvr5232an-5m-i3-t/' },
      { name: 'Đầu ghi Analog Dahua DH-XVR5116HS-5M-I3/T', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/09/XVR5104HS-I21-247x296.png', href: '/dau-ghi-analog-dahua-dh-xvr5116hs-5m-i3-t/' },
      { name: 'Đầu ghi Analog Dahua DH-XVR5108HS-5M-I3/T', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/09/XVR5104HS-I21-247x296.png', href: '/dau-ghi-analog-dahua-dh-xvr5108hs-5m-i3-t/' },
      { name: 'Đầu ghi Analog Dahua DH-XVR5104HS-5M-I3/T', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/09/XVR5104HS-I21-247x296.png', href: '/dau-ghi-analog-dahua-dh-xvr5104hs-5m-i3-t/' },
      { name: 'Đầu ghi Analog Dahua DH-XVR5216AN-5M-I3', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/11/1_0_01_01_16825_1084810437_crop-247x296.png', href: '/dau-ghi-analog-dahua-dh-xvr5216an-5m-i3/' },
      { name: 'Đầu ghi Analog Dahua DH-XVR1B08-I/T-VN', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/09/1_0_01_01_16589_748707296_crop-247x296.png', href: '/dau-ghi-analog-dahua-dh-xvr1b08-i-t-vn/' },
      { name: 'Đầu ghi Analog Dahua DH-XVR1B08-I/T', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/09/1_0_01_01_16589_748707296_crop-247x296.png', href: '/dau-ghi-analog-dahua-dh-xvr1b08-i-t/' },
      { name: 'Đầu ghi Analog Dahua DH-XVR1B04-I/T-VN', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/09/1_0_01_01_16589_748707296_crop-247x296.png', href: '/dau-ghi-analog-dahua-dh-xvr1b04-i-t-vn/' },
      { name: 'Đầu ghi Analog Dahua DH-XVR1B04-I/T', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/09/1_0_01_01_16589_748707296_crop-247x296.png', href: '/dau-ghi-analog-dahua-dh-xvr1b04-i-t/' },
      { name: 'Đầu ghi Analog Dahua DH-XVR5232AN-5M-I3', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/11/1_0_01_01_16825_1084810437_crop-247x296.png', href: '/dau-ghi-analog-dahua-dh-xvr5232an-5m-i3/' }
    ]
  },
  {
    title: 'Switch',
    viewAllHref: '#',
    products: [
      { name: 'Switch Dahua DH-CS4010-8ET2GT-60', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/09/1_0_01_20_11945_746851564_crop-247x296.png', href: '/switch-dahua-dh-cs4010-8et2gt-60/' },
      { name: 'Switch Dahua DH-CS4228-24GT-240', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/09/1_0_01_20_12002_784149803_crop-247x296.png', href: '/switch-dahua-dh-cs4228-24gt-240/' },
      { name: 'Switch Dahua DH-CS4220-16GT-135', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/07/DH-CS4220-16GT-135-247x296.png', href: '/switch-dahua-dh-cs4220-16gt-135/' },
      { name: 'Switch Dahua DH-CS4010-8GT-60', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/07/DH-CS4010-8GT-60-247x296.png', href: '/switch-dahua-dh-cs4010-8gt-60/' },
      { name: 'Switch Dahua DH-S3010-8ET2ET-60', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/09/1_0_01_20_11853_695394196-247x296.png', href: '/switch-dahua-dh-s3010-8et2et-60/' },
      { name: 'Switch Dahua DH-S3006-4ET-36', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/09/1_0_01_20_11849_696870997-247x296.png', href: '/switch-dahua-dh-s3006-4et-36/' },
      { name: 'Switch Dahua DH-CS4006-4ET2ET-60', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/09/1_0_01_20_11246_459621465_crop-247x296.png', href: '/switch-dahua-dh-cs4006-4et2et-60/' },
      { name: 'Switch Dahua DH-CS4006-4GT-60', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/03/DH-CS4006-4GT-60-247x296.png', href: '/switch-dahua-dh-cs4006-4gt-60/' },
      { name: 'Switch Dahua DH-SF1005L', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2024/11/DH-SF1005L-247x296.png', href: '/switch-dahua-dh-sf1005l/' },
      { name: 'Switch Dahua DH-SF1008L', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2024/11/DH-SF1008L-247x296.png', href: '/switch-dahua-dh-sf1008l/' },
      { name: 'Switch Dahua DH-CS4006-4ET2GT-36', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/09/1_0_01_20_11802_674015150_crop-247x296.png', href: '/switch-dahua-dh-cs4006-4et2gt-36/' },
      { name: 'Switch Dahua DH-CS4005-4ET1GT-36', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/09/1_0_01_20_11804_674015154_crop-247x296.png', href: '/switch-dahua-dh-cs4005-4et1gt-36/' }
    ]
  },
  {
    title: 'Chuông cửa màn hình',
    viewAllHref: '#',
    products: [
      { name: 'Chuông cửa màn hình Dahua DHI-VTO2201F-P-S2', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/03/DHI-VTO2201F-P-S2-247x296.png', href: '/chuong-cua-man-hinh-dahua-dhi-vto2201f-p-s2/' },
      { name: 'Chuông cửa màn hình Dahua DHI-VTH2421FW-P', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2022/02/DHI-VTH2421FB-P-247x296.png', href: '/chuong-cua-man-hinh-dahua-dhi-vth2421fw-p/' },
      { name: 'Chuông cửa màn hình Dahua DHI-VTH2621GW-WP', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2023/06/DHI-VTH2621GW-WP-247x296.png', href: '/chuong-cua-man-hinh-dahua-dhi-vth2621gw-wp/' },
      { name: 'Chuông cửa màn hình Dahua VTM09R', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2023/06/VTM09R-247x296.png', href: '/chuong-cua-man-hinh-dahua-vtm09r/' },
      { name: 'Chuông cửa màn hình Dahua DHI-VTO2311R-WP', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/09/vv1-247x296.png', href: '/chuong-cua-man-hinh-dahua-dhi-vto2311r-wp/' },
      { name: 'Chuông cửa màn hình Dahua VTM05R', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2023/02/VTM05R-247x296.png', href: '/chuong-cua-man-hinh-dahua-vtm05r/' },
      { name: 'Chuông cửa màn hình Dahua DHI-VTH5441G', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2022/10/DHI-VTH5441G-247x296.png', href: '/chuong-cua-man-hinh-dahua-dhi-vth5441g/' },
      { name: 'Chuông cửa màn hình Dahua DHI-VTH5221DW-S2', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2022/10/DHI-VTH5221DW-S2-247x296.png', href: '/chuong-cua-man-hinh-dahua-dhi-vth5221dw-s2/' },
      { name: 'Chuông cửa màn hình Dahua DHI-VTH5221D-S2', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2022/10/DHI-VTH5221D-S2-247x296.png', href: '/chuong-cua-man-hinh-dahua-dhi-vth5221d-s2/' },
      { name: 'Chuông cửa màn hình Dahua DHI-VTO2211G-WP', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2022/10/DHI-VTO2211G-WP-247x296.png', href: '/chuong-cua-man-hinh-dahua-dhi-vto2211g-wp/' },
      { name: 'Chuông cửa màn hình Dahua DHI-VTO2202F-P-S2', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2022/10/DHI-VTO2202F-P-S2-247x296.png', href: '/chuong-cua-man-hinh-dahua-dhi-vto2202f-p-s2/' },
      { name: 'Chuông cửa màn hình Dahua DHI-VTO6210B', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2022/02/VTO6210B_BW-247x296.png', href: '/chuong-cua-man-hinh-dahua-dhi-vto6210b/' }
    ]
  },
  {
    title: 'Access control',
    viewAllHref: '#',
    products: [
      { name: 'Access control Dahua DHI-ASI3214A-W', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/07/DHI-ASI3214A-W-247x296.png', href: '/kiem-soat-ra-vao-dahua-dhi-asi3214a-w/' },
      { name: 'Access control Dahua DHI-ASI3213A-W-E1', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/09/1_0_01_25_12795_991098999-247x296.png', href: '/kiem-soat-ra-vao-dahua-dhi-asi3213a-w-e1/' },
      { name: 'Access control Dahua ASF7K-FQ', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/07/ASF7K-FQ-247x296.png', href: '/kiem-soat-ra-vao-dahua-asf7k-fq/' },
      { name: 'Access control Dahua DHI-ASI7213K-W', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/07/DHI-ASI7213K-W-247x296.png', href: '/kiem-soat-ra-vao-dahua-dhi-asi7213k-w/' },
      { name: 'Access control Dahua DHI-ASI6213S-D', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/07/DHI-ASI6213S-D-247x296.png', href: '/kiem-soat-ra-vao-dahua-dhi-asi6213s-d/' },
      { name: 'Access control Dahua DHI-ASI6213S-PW', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/07/DHI-ASI6213S-PW-247x296.png', href: '/kiem-soat-ra-vao-dahua-dhi-asi6213s-pw/' },
      { name: 'Access control Dahua DHI-ASI6213J-MW-V1', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/07/DHI-ASI6213J-MW-V1-247x296.png', href: '/kiem-soat-ra-vao-dahua-dhi-asi6213j-mw-v1/' },
      { name: 'Access control Dahua DHI-ASI6214S', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/07/DHI-ASI6214S-247x296.png', href: '/kiem-soat-ra-vao-dahua-dhi-asi6214s/' },
      { name: 'Access control Dahua DHI-ASI6213S', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/07/DHI-ASI6213S-247x296.png', href: '/kiem-soat-ra-vao-dahua-dhi-asi6213s/' },
      { name: 'Access control Dahua DHI-ASI6214J-MFW-V1', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/07/DHI-ASI6214J-MFW-V1-247x296.png', href: '/kiem-soat-ra-vao-dahua-dhi-asi6214j-mfw-v1/' },
      { name: 'Access control Dahua DHI-ASI6214S-PW', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/07/DHI-ASI6214S-PW-247x296.png', href: '/kiem-soat-ra-vao-dahua-dhi-asi6214s-pw/' }
    ]
  },
  {
    title: 'Sản phẩm dự án',
    viewAllHref: '#',
    products: [
      { name: 'Sản phẩm dự án Dahua ITC431-RW1F-L', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2024/09/ITC431-RW1F-L-247x296.png', href: '/san-pham-du-an-dahua-itc431-rw1f-l/' },
      { name: 'Sản phẩm dự án Dahua EN-ITC852', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2024/07/EN-ITC852-247x296.png', href: '/san-pham-du-an-dahua-en-itc852/' },
      { name: 'Sản phẩm dự án Dahua DH-PFA150', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2024/07/DH-PFA1503-247x296.png', href: '/san-pham-du-an-dahua-dh-pfa150/' },
      { name: 'Sản phẩm dự án Dahua DHI-ITALE-160BA-IR8-P', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2024/07/DHI-ITALE-160BA-IR8-P-247x296.png', href: '/san-pham-du-an-dahua-dhi-itale-160ba-ir8-p/' },
      { name: 'Sản phẩm dự án Dahua 8019', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2024/07/8019-247x296.png', href: '/san-pham-du-an-dahua-8019/' },
      { name: 'Sản phẩm dự án Dahua EN-ST965', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2024/07/EN-ST965-247x296.png', href: '/san-pham-du-an-dahua-en-st965/' },
      { name: 'Sản phẩm dự án Dahua DH-CS4218-16ET-190', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2024/06/DH-CS4218-16ET-190-247x296.png', href: '/san-pham-du-an-dahua-dh-cs4218-16et-190/' },
      { name: 'Sản phẩm dự án Dahua DH-PFS3006-4ET-36', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2024/06/DH-PFS3006-4ET-36-247x296.png', href: '/san-pham-du-an-dahua-dh-pfs3006-4et-36/' },
      { name: 'Sản phẩm dự án Dahua DH-S4100-8ET2GT-96-C', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2024/06/DH-S4100-8ET2GT-96-C-247x296.png', href: '/san-pham-du-an-dahua-dh-s4100-8et2gt-96-c/' },
      { name: 'Sản phẩm dự án Dahua EN-NVR708AI', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2024/06/EN-NVR708AI-247x296.png', href: '/san-pham-du-an-dahua-en-nvr708ai/' },
      { name: 'Sản phẩm dự án Dahua EN-NVR716AI', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2024/06/NVR5216-EI_1-247x296.png', href: '/san-pham-du-an-dahua-en-nvr716ai/' },
      { name: 'Sản phẩm dự án Dahua EN-NVR764AI', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2024/06/EN-NVR764AI-247x296.png', href: '/san-pham-du-an-dahua-en-nvr764ai/' }
    ]
  },
  {
    title: 'Phụ kiện / Sản phẩm khác',
    viewAllHref: '#',
    products: [
      { name: 'Phụ kiện / Sản phẩm khác Dahua DHI-LM22-B220N', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/10/admin-ajax-1-247x296.png', href: '/phu-kien-dahua-dhi-lm22-b220n/' },
      { name: 'Phụ kiện / Sản phẩm khác Dahua DHI-LM24-B221S', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/10/admin-ajax-1-247x296.png', href: '/phu-kien-dahua-dhi-lm24-b221s/' },
      { name: 'Phụ kiện / Sản phẩm khác Dahua DHI-LPH75-ST470-L', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/10/admin-ajax-247x296.png', href: '/phu-kien-dahua-dhi-lph75-st470-l/' },
      { name: 'Phụ kiện / Sản phẩm khác Dahua DHI-LPH65-ST470-L', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/10/admin-ajax-247x296.png', href: '/phu-kien-dahua-dhi-lph65-st470-l/' },
      { name: 'Phụ kiện / Sản phẩm khác Dahua DH-PFM920I-5EUN', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/DH-PFM920I-5EUN-2-247x296.png', href: '/phu-kien-dahua-dh-pfm920i-5eun/' },
      { name: 'Phụ kiện / Sản phẩm khác Dahua DH-PFM920I-6UN1-N (CAT6 – 305m)', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2026/08/PFM920I-5EUN-C-247x296.png', href: '/phu-kien-dahua-dh-pfm920i-6un1-n-cat6-305m/' },
      { name: 'Phụ kiện / Sản phẩm khác Dahua DHI-LPH65-MC470-P-S2', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/02/DHI-LPH65-MC470-P-S2-247x296.png', href: '/phu-kien-dahua-dhi-lph65-mc470-p-s2/' },
      { name: 'Phụ kiện / Sản phẩm khác Dahua DHI-LPH75-MC470-P-S2', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2025/02/DHI-LPH75-MC470-P-S2-247x296.png', href: '/phu-kien-dahua-dhi-lph75-mc470-p-s2/' },
      { name: 'Phụ kiện / Sản phẩm khác Dahua DH-PFM320-020EN', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2024/06/DH-PFM320-020EN-247x296.png', href: '/phu-kien-dahua-dh-pfm320-020en/' },
      { name: 'Phụ kiện / Sản phẩm khác Dahua DH-PFM920I-6UN1-C (CAT6 đồng – 305m)', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2024/04/DH-PFM920I-6UN1-C-247x296.png', href: '/phu-kien-dahua-dh-pfm920i-6un1-c-cat6-dong-305m/' },
      { name: 'Phụ kiện / Sản phẩm khác Dahua DH-PFM920I-5EUN-h (CAT5e – 305m)', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2024/04/DH-PFM920I-5EUN-h-247x296.png', href: '/phu-kien-dahua-dh-pfm920i-5eun-h-cat5e-305m/' },
      { name: 'Phụ kiện / Sản phẩm khác Dahua DH-PFM920I-5EUN-m (CAT5e – 305m)', price: 'Liên hệ', attrs: ['Dahua'], image: 'https://kabegroup.vn/kabet/wp-content/uploads/2024/04/DH-PFM920I-5EUN-m-247x296.png', href: '/phu-kien-dahua-dh-pfm920i-5eun-m-cat5e-305m/' }
    ]
  }
];
