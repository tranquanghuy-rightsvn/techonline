const LOCK_ICON_STRIP = [
  { label: 'Khóa cửa Ezviz', image: 'assets/images/khoa-cua-van-tay/icons/cat_big_74_1749193066.jpg' },
  { label: 'Khóa vân tay Bosch', image: 'assets/images/khoa-cua-van-tay/icons/cat_big_68_1749193030.jpg' },
  { label: 'Khóa cửa Hafele', image: 'assets/images/khoa-cua-van-tay/icons/cat_big_82_1749193056.jpg' },
  { label: 'Khóa cửa Philips', image: 'assets/images/khoa-cua-van-tay/icons/cat_big_69_1749193041.jpg' },
  { label: 'Khóa cửa Kaadas', image: 'assets/images/khoa-cua-van-tay/icons/cat_big_71_1749193075.jpg' },
  { label: 'Khóa cửa Hyundai', image: 'assets/images/khoa-cua-van-tay/icons/cat_big_126_1749193217.png' },
  { label: 'Khóa cửa Kawa', image: 'assets/images/khoa-cua-van-tay/icons/cat_big_163_1749193105.jpg' },
  { label: 'Khóa cửa Kassler', image: 'assets/images/khoa-cua-van-tay/icons/cat_big_73_1749193097.jpg' },
  { label: 'Khóa cửa Solity', image: 'assets/images/khoa-cua-van-tay/icons/cat_big_72_1749193123.jpg' },
  { label: 'Khóa cửa Hubert', image: 'assets/images/khoa-cua-van-tay/icons/cat_big_128_1749193115.jpg' },
  { label: 'Khóa vân tay Kitos', image: 'assets/images/khoa-cua-van-tay/icons/logo-placeholder.png' },
  { label: 'Phụ kiện khóa vân tay', image: 'assets/images/khoa-cua-van-tay/icons/cat_big_123_1748060785.jpg' },
  { label: 'Khóa vân tay theo loại cửa', image: 'assets/images/khoa-cua-van-tay/icons/cat_big_76_1748060744.jpg' },
  { label: 'Khóa cửa Yale', image: 'assets/images/khoa-cua-van-tay/icons/logo-placeholder.png' },
  { label: 'Khóa cửa Hexa', image: 'assets/images/khoa-cua-van-tay/icons/logo-placeholder.png' }
];

const LOCK_CATEGORY_GROUPS = [
  {
    title: 'Khóa cửa Ezviz',
    viewAllHref: '/khoa-cua-van-tay-ezviz/',
    products: [
      { name: 'Khóa cửa thông minh Ezviz DL03', oldPrice: '5.000.000 đ', price: '2.500.000 đ', discount: '-50%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-473-khoa-cua-ezviz-dl03--1-.jpg', isNew: false },
      { name: 'Khóa cửa Deadbolt Ezviz DL04', oldPrice: '5.100.000 đ', price: '2.720.000 đ', discount: '-47%', attrs: ['Cửa gỗ', 'Mã số', 'Thẻ từ'], image: '250-2725-khoa-cua-deadbolt-ezviz-dl04.jpg', isNew: false },
      { name: 'Khóa cửa vân tay Ezviz DL03 Pro', oldPrice: '7.000.000 đ', price: '2.800.000 đ', discount: '-60%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-457-kh--a-c---a-v--n-tay-ezviz-dl03-pro.png', isNew: false },
      { name: 'Khóa Cửa Thông Minh Ezviz DL04 Pro', oldPrice: '6.500.000 đ', price: '3.500.000 đ', discount: '-46%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-2726-ezviz-dl04-pro--3-.jpg', isNew: false },
      { name: 'Khóa cửa vân tay điện tử Ezviz DL05', oldPrice: '8.000.000 đ', price: '2.400.000 đ', discount: '-70%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-483-khoa-cua-van-tay-dientu-ezviz-dl05-.jpg', isNew: true },
      { name: 'Khóa cửa nhôm thông minh EZVIZ DL06', oldPrice: '5.200.000 đ', price: '2.500.000 đ', discount: '-52%', attrs: ['Cửa nhôm', 'App', 'Mã số'], image: '250-2727-khoa-cua-nhom-thong-minh-ezviz-dl06.jpg', isNew: true },
      { name: 'Khoá cửa gỗ Ezviz Y2000', oldPrice: '7.000.000 đ', price: '3.700.000 đ', discount: '-47%', attrs: ['Cửa gỗ', 'Mã số', 'Thẻ từ'], image: '250-3581-khoa-cua-go-ezviz-y2000.jpg', isNew: false },
      { name: 'Khóa cửa vân tay điện tử Ezviz DL06 Pro', oldPrice: '6.000.000 đ', price: '3.800.000 đ', discount: '-37%', attrs: ['Cửa nhôm', 'Mã số', 'Thẻ từ'], image: '250-1481-khoa-van-tay-dl06-pro-2.jpg', isNew: true },
      { name: 'Khóa cửa gỗ Ezviz DL20 FVS Plus Mở Bằng Face ID và Tĩnh Mạch Lòng Bàn Tay', oldPrice: '15.000.000 đ', price: '7.400.000 đ', discount: '-51%', attrs: ['Cửa gỗ', 'Face-ID', 'Mã số'], image: '250-3582-khoa-cua-go-ezviz-dl20-fvs.jpg', isNew: false },
      { name: 'Khóa Ezviz DL50FVS nhận diện khuôn mặt', oldPrice: '14.000.000 đ', price: '7.800.000 đ', discount: '-44%', attrs: ['Cửa gỗ', 'App', 'Face-ID'], image: '250-1106-khoa-ezviz-dl50fvs-.jpg', isNew: true }
    ]
  },
  {
    title: 'Khóa vân tay Bosch',
    viewAllHref: '/khoa-van-tay-bosch/',
    products: [
      { name: 'Khóa cửa gỗ vân tay Bosch ID40', oldPrice: '14.590.000 đ', price: '7.900.000 đ', discount: '-46%', attrs: ['Cửa gỗ'], image: '250-4153-id40--2-.png', isNew: false },
      { name: 'Khoá điện tử Bosch ID60C', oldPrice: '15.890.000 đ', price: '8.500.000 đ', discount: '-47%', attrs: ['Cửa gỗ'], image: '250-4154-id60c--2-.png', isNew: false },
      { name: 'Khóa cửa vân tay Bosch EL600', oldPrice: '19.290.000 đ', price: '9.600.000 đ', discount: '-50%', attrs: ['Cửa gỗ', 'Mã số', 'Thẻ từ'], image: '250-527-khoa-cua-van-tay-bosch-el600.jpg', isNew: false },
      { name: 'Khóa điện tử Bosch FU6+ Face ID', oldPrice: '19.590.000 đ', price: '9.800.000 đ', discount: '-50%', attrs: ['Cửa gỗ', 'App', 'Face-ID'], image: '250-1483-bosch-fu6---2-.jpg', isNew: false },
      { name: 'Khóa điện tử Bosch FU8+', oldPrice: '20.290.000 đ', price: '10.500.000 đ', discount: '-48%', attrs: ['Cửa gỗ', 'App', 'Face-ID'], image: '250-1484-khoa-cua-go-bosch-fu8---2-.jpg', isNew: false },
      { name: 'Khóa điện tử Bosch EL600F', oldPrice: '33.990.000 đ', price: '16.000.000 đ', discount: '-53%', attrs: ['Cửa gỗ', 'App', 'Face-ID'], image: '250-4157-khoa-bosch-el600f.jpg', isNew: false },
      { name: 'Khóa cửa vân tay Bosch EL600VF', oldPrice: '35.590.000 đ', price: '17.900.000 đ', discount: '-50%', attrs: ['Cửa gỗ', 'App', 'Face-ID'], image: '250-522-el600vf.jpg', isNew: false },
      { name: 'Khóa cửa vân tay Bosch EL800VF', oldPrice: '40.390.000 đ', price: '20.200.000 đ', discount: '-50%', attrs: ['Cửa gỗ', 'App', 'Face-ID'], image: '250-521-khoa-bosch-el800vf.jpg', isNew: false }
    ]
  },
  {
    title: 'Khóa cửa Hafele',
    viewAllHref: '/khoa-cua-van-tay-hafele/',
    products: [
      { name: 'Khóa Điện Tử Hafele DL6000', oldPrice: '5.490.000 đ', price: '4.720.000 đ', discount: '-14.000000000000002%', attrs: ['Cửa khách sạn', 'Cửa gỗ', 'App'], image: '250-1172-khoa-dien-tu-hafele-dl6000.jpg', isNew: false },
      { name: 'Khóa Điện Tử Cửa Nhôm Hafele DL6600', oldPrice: '7.370.000 đ', price: '6.150.000 đ', discount: '-17%', attrs: ['Cửa nhôm', 'App', 'Mã số'], image: '250-1178-khoa-dien-tu-cua-nhom-hafele-dl6600.jpg', isNew: false },
      { name: 'Khóa điện tử EL7500 thân khóa nhỏ', oldPrice: '8.130.000 đ', price: '6.490.000 đ', discount: '-20%', attrs: ['Cửa khách sạn', 'Mã số', 'Thẻ từ'], image: '250-1173-khoa-dien-tu-hafele-el7500-912-05-716.jpg', isNew: false },
      { name: 'Khóa Điện Tử EL8000-TC Hafele', oldPrice: '8.100.000 đ', price: '6.500.000 đ', discount: '-20%', attrs: ['Cửa gỗ', 'Mã số', 'Thẻ từ'], image: '250-1176-khoa-dien-tu-hafele-el8000-912-05-359.jpg', isNew: false },
      { name: 'Khóa điện tử Hafele DL7100 cho cửa gỗ / Màu đen', oldPrice: '8.030.000 đ', price: '6.700.000 đ', discount: '-17%', attrs: ['Cửa gỗ', 'Mã số', 'Thẻ từ'], image: '250-1174-khoa-dien-tu-hafele-dl7100-912-05-498.jpg', isNew: false },
      { name: 'Khóa điện tử Hafele DL7600', oldPrice: '13.730.000 đ', price: '9.970.000 đ', discount: '-27%', attrs: ['Cửa gỗ', 'Mã số', 'Thẻ từ'], image: '250-1175-khoa-dien-tu-hafele-dl7600-912-20-237.jpg', isNew: false },
      { name: 'Khóa điện tử Hafele PP8100', oldPrice: '14.520.000 đ', price: '11.290.000 đ', discount: '-22%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-1177-khoa-dien-tu-hafele-pp8100-912-20-286.jpg', isNew: false },
      { name: 'Khóa điện tử Hafele nhận diện khuôn mặt 3D PP9100', oldPrice: '19.990.000 đ', price: '15.390.000 đ', discount: '-23%', attrs: ['Cửa gỗ', 'App', 'Face-ID'], image: '250-1171-pp9100.png', isNew: false },
      { name: 'Khóa điện tử Hafele HORIZON PP2501W', oldPrice: '20.412.000 đ', price: '15.310.000 đ', discount: '-25%', attrs: ['Cửa gỗ', 'App', 'Face-ID'], image: '250-2985-khoa-dien-tu-hafele-horizon-pp2501w-499-21-224.jpg', isNew: false },
      { name: 'Khóa điện tử Hafele Infinity PP2502W 499.21.223', oldPrice: '22.669.000 đ', price: '17.000.000 đ', discount: '-25%', attrs: ['Cửa gỗ', 'App', 'Face-ID'], image: '250-2986-khoa-dien-tu-hafele-infinity-pp2502w-499-21-223.jpg', isNew: false }
    ]
  },
  {
    title: 'Khóa cửa Philips',
    viewAllHref: '/khoa-van-tay-philips/',
    products: [
      { name: 'Khóa cửa thông minh DDL609-5HS tích hợp Vân tay, Mật khẩu, Thẻ từ', oldPrice: '5.750.000 đ', price: '4.600.000 đ', discount: '-20%', attrs: ['Cửa gỗ', 'Mã số', 'Thẻ từ'], image: '250-575-khoa-cua-van-tay-ddl609-5hs-.jpg', isNew: false },
      { name: 'Khóa cửa vân tay Philips DDL615-5HBS', oldPrice: '6.000.000 đ', price: '4.800.000 đ', discount: '-20%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-2358-khoa-cua-van-tay-philips-ddl615-5hbs--1-.jpg', isNew: false },
      { name: 'Khóa cửa vân tay Philips DDL603E-5HWS', oldPrice: '8.250.000 đ', price: '6.600.000 đ', discount: '-20%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-289-khoa-cua-van-tay-philips-ddl603e-5hws.jpg', isNew: false },
      { name: 'Khóa cửa thông minh Philips DDL610-5HBS, Tích hợp vân tay, Mật mã, thẻ từ, Wifi, Bluetoolth', oldPrice: '9.620.000 đ', price: '7.700.000 đ', discount: '-20%', attrs: ['Cửa gỗ', 'Mã số', 'Thẻ từ'], image: '250-574-khoa-cua-van-tay-philips-ddl610-5hbs.jpg', isNew: false },
      { name: 'Khóa cửa vân tay Philips DDL611S-5HBS', oldPrice: '9.620.000 đ', price: '7.700.000 đ', discount: '-20%', attrs: ['Cửa nhôm', 'App', 'Mã số'], image: '250-2866-khoa-cua-van-tay-philips-ddl611s-5hbs.jpg', isNew: false },
      { name: 'Khóa cửa vân tay Philips 7300-5', oldPrice: '11.370.000 đ', price: '9.100.000 đ', discount: '-20%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-288-khoa-cua-van-tay-philips-7300-5.jpg', isNew: false },
      { name: 'Khóa cửa vân tay Philips Alpha-5', oldPrice: '13.000.000 đ', price: '10.400.000 đ', discount: '-20%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-291-kh--a-c---a-v--n-tay-alpha-5.png', isNew: false },
      { name: 'Khóa cửa vân tay Philips DDL801-5HBS', oldPrice: '17.370.000 đ', price: '13.900.000 đ', discount: '-20%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-2347-khoa-cua-van-tay-philips-ddl801-5hbs.jpg', isNew: false },
      { name: 'Khóa cửa vân tay Philips DDL702-1HWS', oldPrice: '18.370.000 đ', price: '14.700.000 đ', discount: '-20%', attrs: ['Cửa gỗ', 'Mã số', 'Thẻ từ'], image: '250-294-khoa-cua-van-tay-philips-ddl702-1hws.jpg', isNew: false },
      { name: 'Khóa cửa vân tay Philips DDL720-MVP-17HWS', oldPrice: '19.250.000 đ', price: '15.400.000 đ', discount: '-20%', attrs: ['Cửa gỗ', 'Mã số', 'Thẻ từ'], image: '250-2348-khoa-cua-van-tay-philips-ddl720-mvp-7hws.jpg', isNew: false }
    ]
  },
  {
    title: 'Khóa cửa Kaadas',
    viewAllHref: '/khoa-cua-van-tay-kaadas/',
    products: [
      { name: 'Khóa cửa vân tay Kaadas M5', oldPrice: '4.600.000 đ', price: '3.490.000 đ', discount: '-24%', attrs: ['Cửa gỗ', 'Mã số', 'Thẻ từ'], image: '250-276-kh--a-c---a-v--n-tay-kaadas-m5--3-.png', isNew: false },
      { name: 'Khóa vân tay cửa gỗ Kaadas M7-W', oldPrice: '5.500.000 đ', price: '4.400.000 đ', discount: '-20%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-2176-khoa-van-tay-kaadas-m7-w--2-.jpg', isNew: false },
      { name: 'Khóa cửa vân tay Kaadas L8-5', oldPrice: '6.500.000 đ', price: '4.900.000 đ', discount: '-25%', attrs: ['Cửa gỗ', 'Mã số', 'Thẻ từ'], image: '250-280-khoa-cua-van-tay-kaadas-l8-5-.jpg', isNew: false },
      { name: 'Khóa vân tay cửa nhôm Kaadas S10-5W', oldPrice: '6.000.000 đ', price: '4.950.000 đ', discount: '-18%', attrs: ['Cửa nhôm', 'Face-ID', 'Mã số'], image: '250-582-khoa-cua-nhom-kaadas-s10-5w.jpg', isNew: false },
      { name: 'Khóa cửa gỗ Kaadas S500-C5', oldPrice: '6.500.000 đ', price: '5.200.000 đ', discount: '-20%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-2173-khoa-cua-go-kaadas-s500-c5---1-.jpg', isNew: false },
      { name: 'Khóa cửa vân tay Kaadas S500-C', oldPrice: '6.800.000 đ', price: '5.200.000 đ', discount: '-24%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-278-khoa-cua-go-kaadas-s500-c.jpg', isNew: false },
      { name: 'Khóa cửa vân tay Kaadas S500-5W', oldPrice: '7.300.000 đ', price: '5.500.000 đ', discount: '-25%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-277-khoa-cua-go-kaadas-s500-5w--1-.jpg', isNew: false },
      { name: 'Khóa vân tay cửa kính Kaadas R8-5GL', oldPrice: '7.900.000 đ', price: '5.600.000 đ', discount: '-28.999999999999996%', attrs: ['Cửa kính', 'App', 'Mã số'], image: '250-583-khoa-van-tay-c---a-kinh-kaadas-r8-5gl.jpg', isNew: false },
      { name: 'Khóa vân tay Kaadas R6-5', oldPrice: '7.000.000 đ', price: '5.800.000 đ', discount: '-17%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-584-khoa-kaadas-r6-5.jpg', isNew: false },
      { name: 'Khóa cửa vân tay Kaadas Q3', oldPrice: '7.800.000 đ', price: '5.950.000 đ', discount: '-24%', attrs: ['Cửa gỗ', 'Mã số', 'Thẻ từ'], image: '250-281-khoa-cua-van-tay-kaadas-q3.jpg', isNew: false }
    ]
  },
  {
    title: 'Khóa cửa Hyundai',
    viewAllHref: '/khoa-cua-van-tay-hyundai/',
    products: [
      { name: 'Khóa cửa khách sạn Hyundai HY-HL01', oldPrice: '4.500.000 đ', price: '4.460.000 đ', discount: '-1%', attrs: ['Cửa khách sạn'], image: '250-2018-khoa-cua-khach-san-hyundai-hy-hl01.jpg', isNew: false },
      { name: 'Khóa Cửa Gỗ Hyundai HY-SL007', oldPrice: '5.500.000 đ', price: '4.940.000 đ', discount: '-10%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-750-khoa-cua-go-hyundai-hy-sl007.jpg', isNew: false },
      { name: 'Khóa Cửa Nhôm Hyundai HY-SLS003', oldPrice: '6.550.000 đ', price: '4.940.000 đ', discount: '-25%', attrs: ['Cửa nhôm', 'App', 'Mã số'], image: '250-749-khoa-cua-nhom-hyundai-hy-sls003.jpg', isNew: false },
      { name: 'Khóa cửa khách sạn Hyundai HY-HL03', oldPrice: '5.500.000 đ', price: '5.450.000 đ', discount: '-1%', attrs: ['Cửa khách sạn'], image: '250-2017-khoa-cua-khach-san-hyundai-hy-hl03.jpg', isNew: false },
      { name: 'Khóa cửa khách sạn Hyundai HY-HL04', oldPrice: '6.500.000 đ', price: '6.440.000 đ', discount: '-1%', attrs: ['Cửa khách sạn'], image: '250-2016-khoa-cua-khach-san-hyundai-hy-hl04.jpg', isNew: false },
      { name: 'Khoá Cửa Cổng Hyundai HY-SLN002 Black', oldPrice: '6.990.000 đ', price: '6.920.000 đ', discount: '-1%', attrs: ['Cửa cổng', 'App', 'Mã số'], image: '250-748-khoa-cua-cong-hyundai-hy-sln002-black.jpg', isNew: false },
      { name: 'Khoá Cửa Gỗ Hyundai HY-SLA808', oldPrice: '7.500.000 đ', price: '7.430.000 đ', discount: '-1%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-747-khoa-cua-go-hyundai-hy-sla808.jpg', isNew: false },
      { name: 'Khoá Cửa Gỗ Hyundai HY-SLA808F', oldPrice: '8.990.000 đ', price: '8.900.000 đ', discount: '-1%', attrs: ['Cửa gỗ', 'App', 'Face-ID'], image: '250-746-khoa-cua-go-hyundai-hy-sla808f.jpg', isNew: false },
      { name: 'Khoá Cửa Gỗ Hyundai HY-SLA807F Black', oldPrice: '9.990.000 đ', price: '9.890.000 đ', discount: '-1%', attrs: ['Cửa gỗ', 'App', 'Face-ID'], image: '250-745-khoa-cua-go-hyundai-hy-sla807f-black.jpg', isNew: false },
      { name: 'Khóa Cửa Nhôm Hyundai HY-SLS005 Black', oldPrice: '14.400.000 đ', price: '10.880.000 đ', discount: '-24%', attrs: ['Cửa nhôm', 'App', 'Mã số'], image: '250-744-khoa-cua-nhom-hyundai-hy-sls005-black--1-.jpg', isNew: false }
    ]
  },
  {
    title: 'Khóa cửa Kawa',
    viewAllHref: '/khoa-cua-van-tay-kawa/',
    products: [
      { name: 'Khóa cửa khách sạn Kawa KS001', oldPrice: '2.200.000 đ', price: '1.540.000 đ', discount: '-30%', attrs: ['Cửa khách sạn', 'Thẻ từ'], image: '250-1368-kawa-ks001--5-.png', isNew: false },
      { name: 'Khóa cửa khách sạn Kawa KS105', oldPrice: '2.400.000 đ', price: '1.680.000 đ', discount: '-30%', attrs: ['Cửa khách sạn', 'Thẻ từ'], image: '250-1369-kawa-ks105.png', isNew: false },
      { name: 'Khóa cửa khách sạn Kawa KS510', oldPrice: '2.970.000 đ', price: '2.080.000 đ', discount: '-30%', attrs: ['Cửa khách sạn', 'Thẻ từ'], image: '250-1370-kawa-ks510--8-.png', isNew: false },
      { name: 'Khóa cửa khách sạn Kawa KS610', oldPrice: '3.170.000 đ', price: '2.220.000 đ', discount: '-30%', attrs: ['Cửa khách sạn', 'Thẻ từ'], image: '250-1371-kawa-ks610--9-.png', isNew: false },
      { name: 'Khóa cửa khách sạn Kawa KS805', oldPrice: '3.170.000 đ', price: '2.220.000 đ', discount: '-30%', attrs: ['Cửa khách sạn', 'Thẻ từ'], image: '250-1376-kawa-ks805--3-.png', isNew: false },
      { name: 'Khóa cửa khách sạn Kawa KS626', oldPrice: '3.460.000 đ', price: '2.420.000 đ', discount: '-30%', attrs: ['Cửa khách sạn', 'Thẻ từ'], image: '250-1372-kawa-ks626--5-.png', isNew: false },
      { name: 'Khóa cửa khách sạn Kawa KS802', oldPrice: '3.450.000 đ', price: '2.850.000 đ', discount: '-17%', attrs: ['Cửa khách sạn', 'Thẻ từ'], image: '250-1375-kawa-ks802--4-.png', isNew: false },
      { name: 'Khóa cửa khách sạn Kawa KS668', oldPrice: '3.850.000 đ', price: '2.700.000 đ', discount: '-30%', attrs: ['Cửa khách sạn', 'Thẻ từ'], image: '250-1374-kawa-ks668.png', isNew: false },
      { name: 'Khóa cửa khách sạn Kawa KSAL01', oldPrice: '4.350.000 đ', price: '3.050.000 đ', discount: '-30%', attrs: ['Cửa khách sạn', 'Thẻ từ'], image: '250-1367-kawa-ksal01.png', isNew: false },
      { name: 'Khóa cửa khách sạn Kawa KS628', oldPrice: '3.950.000 đ', price: '3.260.000 đ', discount: '-17%', attrs: ['Cửa khách sạn', 'Thẻ từ'], image: '250-1373-kawa-ks628--2-.png', isNew: false }
    ]
  },
  {
    title: 'Khóa cửa Kassler',
    viewAllHref: '/khoa-cua-van-tay-kassler/',
    products: [
      { name: 'Khóa cửa khách sạn Kassler KL-383I', oldPrice: '2.890.000 đ', price: '2.170.000 đ', discount: '-25%', attrs: ['Cửa khách sạn', 'Thẻ từ'], image: '250-517-khoa-cua-khach-san-kassler-kl-383i.jpg', isNew: false },
      { name: 'Khóa cửa Khách sạn Kassler KL-363', oldPrice: '3.590.000 đ', price: '2.690.000 đ', discount: '-25%', attrs: ['Cửa khách sạn', 'Thẻ từ'], image: '250-518-khoa-cua-khach-san-kassler-kl-363---1-.jpg', isNew: false },
      { name: 'Khóa khách sạn Kassler KL-393', oldPrice: '4.890.000 đ', price: '3.670.000 đ', discount: '-25%', attrs: ['Cửa khách sạn', 'Thẻ từ'], image: '250-516-khoa-cua-khach-san-kassler-kl-393--2-.jpg', isNew: false },
      { name: 'Khóa cửa khách sạn Kassler KL-353', oldPrice: '4.990.000 đ', price: '3.740.000 đ', discount: '-25%', attrs: ['Cửa khách sạn', 'Thẻ từ'], image: '250-519-khoa-cua-khach-san-kassler-kl-353.jpg', isNew: false },
      { name: 'Khóa cửa vân tay Kassler KL-566', oldPrice: '5.390.000 đ', price: '4.040.000 đ', discount: '-25%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-503-khoa-cua-van-tay-kassler-kl-566-.jpg', isNew: false },
      { name: 'Khóa cửa nhôm Kassler KL-68BL', oldPrice: '7.390.000 đ', price: '5.540.000 đ', discount: '-25%', attrs: ['Cửa nhôm', 'App', 'Mã số'], image: '250-885-khoa-cua-nhom-kassler-kl-68-bl-.jpg', isNew: false },
      { name: 'Khóa cửa vân tay Kassler KL-79H', oldPrice: '6.990.000 đ', price: '5.240.000 đ', discount: '-25%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-502-khoa-cua-van-tay-kassler-kl-79h.jpg', isNew: false },
      { name: 'Khóa cửa vân tay Kassler KL-666', oldPrice: '5.890.000 đ', price: '4.420.000 đ', discount: '-25%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-504-khoa-cua-van-tay-kassler-kl-666-.jpg', isNew: false },
      { name: 'Khóa cửa cổng vân tay Kassler KL-579BL', oldPrice: '6.990.000 đ', price: '5.240.000 đ', discount: '-25%', attrs: ['Cửa cổng', 'Mã số', 'Thẻ từ'], image: '250-515-kh--a-c---a-v--n-tay-kassler-kl-579-bl--2-.png', isNew: false },
      { name: 'Khóa cửa vân tay Kassler KL-668', oldPrice: '7.190.000 đ', price: '5.390.000 đ', discount: '-25%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-501-kassler-kl-668-600x600.jpg', isNew: false }
    ]
  },
  {
    title: 'Khóa cửa Solity',
    viewAllHref: '/khoa-cua-van-tay-solity/',
    products: [
      { name: 'Khóa cửa Solity SYNC SM-1000K', oldPrice: '4.500.000 đ', price: '3.500.000 đ', discount: '-22%', attrs: ['Cửa gỗ', 'Mã số', 'Thẻ từ'], image: '250-442-kh--a-c---a-solity-sync-sm-1000k--1-.png', isNew: false },
      { name: 'Khóa cửa vân tay Solity GA-60B', oldPrice: '5.400.000 đ', price: '4.900.000 đ', discount: '-9%', attrs: ['Cửa sắt', 'App', 'Mã số'], image: '250-444-kh--a-c---a-solity-ga-60b.png', isNew: false },
      { name: 'Khóa vân tay cửa kính Solity GG-33B', oldPrice: '5.700.000 đ', price: '5.000.000 đ', discount: '-12%', attrs: ['Cửa kính', 'Mã số', 'Vân tay'], image: '250-447-kh--a-c---a-solity-gg-33b.png', isNew: false },
      { name: 'Khóa cửa vân tay Solity GM-1000BK', oldPrice: '6.100.000 đ', price: '5.500.000 đ', discount: '-10%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-443-khoa-cua-van-tay-solity-gm-1000bk.jpg', isNew: false },
      { name: 'Khóa cửa vân tay Solity GA-60BH', oldPrice: '6.700.000 đ', price: '6.100.000 đ', discount: '-9%', attrs: ['Cửa kính', 'App', 'Mã số'], image: '250-445-kh--a-c---a-solity-ga-60bh.png', isNew: false },
      { name: 'Khóa cửa vân tay Solity GM-6000BK', oldPrice: '7.500.000 đ', price: '6.800.000 đ', discount: '-9%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-441-kh--a-c---a-solity-gm-6000bk.png', isNew: false },
      { name: 'Khóa cửa vân tay 2 chiều Solity GD-60B', oldPrice: '8.400.000 đ', price: '7.590.000 đ', discount: '-10%', attrs: ['Cửa sắt', 'App', 'Mã số'], image: '250-446-kh--a-c---a-solity-gd-60b.png', isNew: false },
      { name: 'Khóa cửa vân tay Solity GSP-2000BK DS', oldPrice: '11.200.000 đ', price: '10.020.000 đ', discount: '-11%', attrs: ['Cửa gỗ', 'Mã số', 'Thẻ từ'], image: '250-437-kh--a-c---a-solity-gsp-2000bk-ds.png', isNew: false },
      { name: 'Khóa cửa vân tay Solity GSP-2000BK BZ', oldPrice: '11.200.000 đ', price: '10.200.000 đ', discount: '-9%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-438-kh--a-c---a-solity-gsp-2000bk-bz.png', isNew: false },
      { name: 'Khóa cửa vân tay Solity GP-6000BK', oldPrice: '11.900.000 đ', price: '10.800.000 đ', discount: '-9%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-440-khoa-cua-van-tay-solity-gp-6000bk.jpg', isNew: false }
    ]
  },
  {
    title: 'Khóa cửa Hubert',
    viewAllHref: '/khoa-cua-van-tay-hubert/',
    products: [
      { name: 'Khoá cửa khách sạn Hubert HB KSCG77', oldPrice: '2.300.000 đ', price: '2.080.000 đ', discount: '-10%', attrs: ['Cửa khách sạn', 'Thẻ từ'], image: '250-2705-hubert-hb-kscg77--2-.jpg', isNew: false },
      { name: 'Khóa Khách Sạn Hubert HB KSCG86 Amber Gold', oldPrice: '3.500.000 đ', price: '2.870.000 đ', discount: '-18%', attrs: ['Cửa khách sạn', 'Thẻ từ'], image: '250-2703-khoa-cua-hubert-hb-kscg86-amber-gold.jpg', isNew: false },
      { name: 'Khóa cửa gỗ Hubert HB CG22 Black', oldPrice: '3.000.000 đ', price: '2.970.000 đ', discount: '-1%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-2694-khoa-cua-hubert-hb-cg22-black.jpg', isNew: false },
      { name: 'Khoá cửa khách sạn Hubert HB KSCN79 Black', oldPrice: '3.500.000 đ', price: '3.460.000 đ', discount: '-1%', attrs: ['Cửa khách sạn', 'Thẻ từ'], image: '250-2706-khoa-cua-hubert-hb-kscn79-black--1-.jpg', isNew: false },
      { name: 'Khoá Cửa Gỗ Hubert HB CG23', oldPrice: '3.500.000 đ', price: '3.470.000 đ', discount: '-1%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-2925-khoa-cua-hubert-hb-cg23--1-.jpg', isNew: false },
      { name: 'Khóa cửa gỗ Hubert HB CG25 Black', oldPrice: '4.000.000 đ', price: '3.960.000 đ', discount: '-1%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-2695-khoa-cua-hubert-hb-cg25-black--1-.jpg', isNew: false },
      { name: 'Khóa Cửa Nhôm Hubert HB CN21 Black', oldPrice: '4.000.000 đ', price: '3.960.000 đ', discount: '-1%', attrs: ['Cửa nhôm', 'Mã số', 'Thẻ từ'], image: '250-2699-khoa-cua-hubert-hb-cn21-black--1-.jpg', isNew: false },
      { name: 'Khóa cửa gỗ Hubert HB CG39 mini', oldPrice: '4.800.000 đ', price: '4.220.000 đ', discount: '-12%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-2686-khoa-cua-hubert-hb-cg39-mini.jpg', isNew: false },
      { name: 'Khoá Cửa Gỗ Hubert HB CG60 GOLD', oldPrice: '4.900.000 đ', price: '4.310.000 đ', discount: '-12%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-2917-khoa-cua-hubert-hb-cg60-gold.jpg', isNew: false },
      { name: 'Khóa Cửa Gỗ Hubert HB CG59 Amber Gold', oldPrice: '4.990.000 đ', price: '4.390.000 đ', discount: '-12%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-800-khoa-cua-go-hubert-hb-cg59.png', isNew: false }
    ]
  },
  {
    title: 'Khóa vân tay Kitos',
    viewAllHref: '/khoa-van-tay-kitos/',
    products: [
      { name: 'Khóa cửa gỗ Kitos KT-V2 PRO', oldPrice: '3.400.000 đ', price: '2.970.000 đ', discount: '-13%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-2592-khoa-cua-kitos-kt-v2-pro.jpg', isNew: false },
      { name: 'Khóa cửa vân tay Kitos KT-E3 PRO ĐEN', oldPrice: '3.900.000 đ', price: '3.520.000 đ', discount: '-10%', attrs: ['Cửa gỗ', 'Mã số', 'Thẻ từ'], image: '250-2593-khoa-cua-kitos-kt-e3-pro-den.jpg', isNew: false },
      { name: 'Khóa cửa vân tay Kitos KT- E3 PRO ĐỒNG', oldPrice: '4.200.000 đ', price: '3.740.000 đ', discount: '-11%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-2594-khoa-cua-kitos-kt-e3-pro.jpg', isNew: false },
      { name: 'Khóa cửa vân tay Kitos KT-G302 PRO', oldPrice: '4.800.000 đ', price: '4.290.000 đ', discount: '-11%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-2595-khoa-cua-kitos-kt-g302-pro.jpg', isNew: false },
      { name: 'Khóa cửa nhôm Kitos KT ALX5 PRO', oldPrice: '4.800.000 đ', price: '4.290.000 đ', discount: '-11%', attrs: ['Cửa nhôm', 'App', 'Mã số'], image: '250-2604-khoa-cua-kitos-kt-alx5-pro.jpg', isNew: false },
      { name: 'Khóa cửa kính Kitos KT-GL30 PRO', oldPrice: '4.900.000 đ', price: '4.290.000 đ', discount: '-12%', attrs: ['Cửa kính', 'App', 'Mã số'], image: '250-2608-khoa-cua-kitos-kt-gl30-pro.jpg', isNew: false },
      { name: 'Khóa cửa cổng Kitos KT-DL03 PRO', oldPrice: '5.800.000 đ', price: '5.060.000 đ', discount: '-13%', attrs: ['Cửa cổng', 'App', 'Mã số'], image: '250-2610-khoa-cua-kitos-kt-dl03-pro.jpg', isNew: false },
      { name: 'Khóa cửa nhôm Kitos KL-AL630 PRO', oldPrice: '5.900.000 đ', price: '5.170.000 đ', discount: '-12%', attrs: ['Cửa nhôm', 'App', 'Mã số'], image: '250-2605-khoa-cua-nhom-kitos-kl-al630-pro.jpg', isNew: false },
      { name: 'Khóa cửa vân tay Kitos KT-G900 PRO', oldPrice: '6.500.000 đ', price: '5.720.000 đ', discount: '-12%', attrs: ['Cửa gỗ', 'App', 'Thẻ từ'], image: '250-2596-khoa-cua-kitos-kt-g900-pro.jpg', isNew: false },
      { name: 'Khóa cửa vân tay Kitos KT DL072', oldPrice: '6.900.000 đ', price: '6.050.000 đ', discount: '-12%', attrs: ['Cửa gỗ', 'Mã số', 'Thẻ từ'], image: '250-2597-khoa-cua-kitos-kt-dl072.jpg', isNew: false }
    ]
  },
  {
    title: 'Phụ kiện khóa vân tay',
    viewAllHref: '/phu-kien-khoa-van-tay/',
    products: [
      { name: 'Module dùng cho khóa điện tử Solity RX-710C', oldPrice: '', price: '700.000 đ', discount: '', attrs: [], image: '250-588-module-d--ng-cho-kh--a---i---n-t----solity-rx-710c.png', isNew: false },
      { name: 'Module dùng cho điều khiển từ xa của khóa điện tử Solity 5800', oldPrice: '', price: '800.000 đ', discount: '', attrs: [], image: '250-589-module---i---u-khi---n-t----xa-kh--a---i---n-t----solity-5800.png', isNew: false },
      { name: 'Điều khiển từ xa cho khóa cửa điện tử Solity HG-TX210', oldPrice: '', price: '1.100.000 đ', discount: '', attrs: [], image: '250-590---i---u-khi---n-t----xa-kh--a-c---a-solity-hg-tx210.png', isNew: false },
      { name: 'Thiết bị thu phát vô tuyến dùng cho khóa cửa điện tử Solity model GW-100', oldPrice: '', price: '1.600.000 đ', discount: '', attrs: [], image: '250-591-thi---t-b----thu-ph--t-v---tuy---n-kh--a-c---a-solity-model-gw-100.png', isNew: false },
      { name: 'Màn hình cảm ứng EZVIZ SD7 xem camera', oldPrice: '', price: '3.400.000 đ', discount: '', attrs: [], image: '250-2724-man-hinh-cam-ung-ezviz-sd7.jpg', isNew: false },
      { name: 'Module mở rộng vân tay Dahua ASF7K-FQ (10.000 vân tay)', oldPrice: '', price: 'Liên hệ', discount: '', attrs: ['Vân tay', 'QR Code'], image: '250-module-van-tay-dahua-asf7k-fq.png', isNew: true, href: '/module-van-tay-dahua-asf7k-fq/' }
    ]
  },
  {
    title: 'Khóa vân tay theo loại cửa',
    viewAllHref: '/khoa-van-tay-theo-loai-cua/',
    products: [
      { name: 'Khóa Cửa Gỗ Hubert HB CG59 Amber Gold', oldPrice: '4.990.000 đ', price: '4.390.000 đ', discount: '-12%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-800-khoa-cua-go-hubert-hb-cg59.png', isNew: false },
      { name: 'Khóa Cửa Gỗ Hubert HB CG67 Mini', oldPrice: '6.300.000 đ', price: '5.540.000 đ', discount: '-12%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-797-khoa-cua-hubert-hb-cg67-mini--2-.jpg', isNew: false },
      { name: 'Khóa Cửa Gỗ Hubert HB CG62', oldPrice: '6.500.000 đ', price: '5.720.000 đ', discount: '-12%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-799-khoa-hubert-hb-hb-cg62--2-.jpg', isNew: false },
      { name: 'Khóa cửa khách sạn Kassler KL-383I', oldPrice: '2.890.000 đ', price: '2.170.000 đ', discount: '-25%', attrs: ['Cửa khách sạn', 'Thẻ từ'], image: '250-517-khoa-cua-khach-san-kassler-kl-383i.jpg', isNew: false },
      { name: 'Khóa cửa Khách sạn Kassler KL-363', oldPrice: '3.590.000 đ', price: '2.690.000 đ', discount: '-25%', attrs: ['Cửa khách sạn', 'Thẻ từ'], image: '250-518-khoa-cua-khach-san-kassler-kl-363---1-.jpg', isNew: false },
      { name: 'Khóa khách sạn Kassler KL-393', oldPrice: '4.890.000 đ', price: '3.670.000 đ', discount: '-25%', attrs: ['Cửa khách sạn', 'Thẻ từ'], image: '250-516-khoa-cua-khach-san-kassler-kl-393--2-.jpg', isNew: false },
      { name: 'Khóa cửa khách sạn Kassler KL-353', oldPrice: '4.990.000 đ', price: '3.740.000 đ', discount: '-25%', attrs: ['Cửa khách sạn', 'Thẻ từ'], image: '250-519-khoa-cua-khach-san-kassler-kl-353.jpg', isNew: false },
      { name: 'Khóa cửa vân tay Kassler KL-566', oldPrice: '5.390.000 đ', price: '4.040.000 đ', discount: '-25%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-503-khoa-cua-van-tay-kassler-kl-566-.jpg', isNew: false },
      { name: 'Khóa cửa nhôm Kassler KL-68BL', oldPrice: '7.390.000 đ', price: '5.540.000 đ', discount: '-25%', attrs: ['Cửa nhôm', 'App', 'Mã số'], image: '250-885-khoa-cua-nhom-kassler-kl-68-bl-.jpg', isNew: false },
      { name: 'Khóa cửa vân tay Kassler KL-79H', oldPrice: '6.990.000 đ', price: '5.240.000 đ', discount: '-25%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-502-khoa-cua-van-tay-kassler-kl-79h.jpg', isNew: false }
    ]
  },
  {
    title: 'Khóa cửa Yale',
    viewAllHref: '/khoa-cua-yale/',
    products: [
      { name: 'Khóa cửa vân tay YALE ZURI S (05/108110/BL)', oldPrice: '5.500.000 đ', price: '4.475.000 đ', discount: '-19%', attrs: ['App', 'Mã số', 'Thẻ từ'], image: '250-2803-yale-zuri-s.jpg', isNew: false },
      { name: 'Khóa cửa nhôm YALE YDMA 100NP', oldPrice: '7.300.000 đ', price: '5.300.000 đ', discount: '-27%', attrs: ['Cửa nhôm', 'Mã số', 'Thẻ từ'], image: '250-2807-khoa-cua-van-tay-yale-ydma-100np.jpg', isNew: false },
      { name: 'Khóa cửa thông minh YALE YDM3109A SIL', oldPrice: '12.210.000 đ', price: '7.840.000 đ', discount: '-36%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-2802-khoa-cua-van-tay-yale-ydm3109a-sil.jpg', isNew: false },
      { name: 'Khóa cửa vân tay YALE YDM4109A GOLD', oldPrice: '15.600.000 đ', price: '10.700.000 đ', discount: '-31%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-2801-khoa-cua-van-tay-yale-ydm4109a-gold.jpg', isNew: false },
      { name: 'Khóa cửa vân tay YALE YDM7116A MB', oldPrice: '16.000.000 đ', price: '10.800.000 đ', discount: '-33%', attrs: ['Cửa gỗ'], image: '250-2800-khoa-cua-van-tay-yale-ydm7116a-mb.jpg', isNew: false },
      { name: 'Khóa cửa vân tay YALE YDM7116A RB', oldPrice: '17.700.000 đ', price: '11.150.000 đ', discount: '-37%', attrs: [], image: '250-2798-khoa-cua-van-tay-yale-ydm7116a-rb.jpg', isNew: false },
      { name: 'Khóa cửa vân tay YALE YDM7116A CG', oldPrice: '16.600.000 đ', price: '10.500.000 đ', discount: '-37%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-2799-khoa-cua-van-tay-yale-ydm7116a-cg.jpg', isNew: false },
      { name: 'Khóa cửa vân tay YALE Luna Pro +', oldPrice: '30.000.000 đ', price: '17.200.000 đ', discount: '-43%', attrs: ['Cửa gỗ', 'App', 'Face-ID'], image: '250-2797-khoa-cua-van-tay-yale-luna-pro-.jpg', isNew: false },
      { name: 'Khoá điện tử Yale Zuri (05/107100/BL)', oldPrice: '8.000.000 đ', price: '5.600.000 đ', discount: '-30%', attrs: [], image: '250-4141-05_107100_bl.jpg', isNew: false },
      { name: 'Khoá điện tử Yale YDR343', oldPrice: '9.320.000 đ', price: '6.330.000 đ', discount: '-32%', attrs: [], image: '250-4152-ydr343--2-.jpg', isNew: false }
    ]
  },
  {
    title: 'Khóa cửa Hexa',
    viewAllHref: '/khoa-cua-hexa/',
    products: [
      { name: 'Khóa cửa nhôm Hexa A100', oldPrice: '6.000.000 đ', price: '4.950.000 đ', discount: '-18%', attrs: ['Cửa nhôm', 'App'], image: '250-4180-hexa-a100.jpg', isNew: false },
      { name: 'Khóa cửa nhôm Hexa P300', oldPrice: '9.900.000 đ', price: '8.000.000 đ', discount: '-19%', attrs: ['Cửa nhôm', 'App', 'Mã số'], image: '250-4175-hexa-p300--4-.jpg', isNew: false },
      { name: 'Khóa cửa nhôm Hexa P300-Pro', oldPrice: '11.000.000 đ', price: '8.800.000 đ', discount: '-20%', attrs: ['Cửa nhôm', 'App', 'Face-ID'], image: '250-4174-hexa-p300-pro--3-.jpg', isNew: false },
      { name: 'Khóa cửa Hexa HX12  thân khóa 6068', oldPrice: '4.900.000 đ', price: '3.950.000 đ', discount: '-19%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-4179-hexa-hx12.jpg', isNew: false },
      { name: 'Khóa cửa Hexa L100', oldPrice: '7.300.000 đ', price: '5.950.000 đ', discount: '-18%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-4177-hexa-l100.jpg', isNew: false },
      { name: 'Khóa cửa Hexa HX12  thân khóa 5050', oldPrice: '4.400.000 đ', price: '3.500.000 đ', discount: '-20%', attrs: ['Cửa gỗ', 'App', 'Mã số'], image: '250-4178-hexa-hx12-5050.jpg', isNew: false },
      { name: 'Khóa cửa Hexa L100 màu Vàng 24K', oldPrice: '8.000.000 đ', price: '6.400.000 đ', discount: '-20%', attrs: ['Cửa gỗ', 'Mã số', 'Thẻ từ'], image: '250-4176-hexa-l100-vang-.jpg', isNew: false },
      { name: 'Khóa cửa Hexa P200 Pro Max nhận diện khuôn mặt', oldPrice: '19.400.000 đ', price: '15.500.000 đ', discount: '-20%', attrs: ['Cửa gỗ', 'App', 'Face-ID'], image: '250-4173-p200-pro-max.jpg', isNew: false },
      { name: 'Khóa cửa Hexa P100M-Pro max đen vàng 24K', oldPrice: '14.900.000 đ', price: '11.900.000 đ', discount: '-20%', attrs: ['App', 'Face-ID', 'Mã số'], image: '250-4172-hexa-p100m-pro-max-v--ng-24k-.jpg', isNew: false },
      { name: 'Khóa cửa Hexa P100M Pro Max nhận diện Khuôn mặt', oldPrice: '14.300.000 đ', price: '11.400.000 đ', discount: '-20%', attrs: ['App', 'Face-ID', 'Mã số'], image: '250-4171-hexa-p100m-pro-max---en-x--m-.jpg', isNew: false }
    ]
  }
];
