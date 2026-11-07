# -*- coding: utf-8 -*-
"""Article data for the An Ninh Thái Nguyên news section.

Edit this file, then run (from the project root):
    python3 scripts/news/covers.py html/assets/images && python3 scripts/news/build.py html
"""

HOTLINE = "0913.286.293"
HOTLINE_TEL = "0913286293"
P = "camera-giam-sat/products/"

CATEGORIES = [
    ("huong-dan", "Hướng dẫn kỹ thuật", "news-cat-huong-dan.png"),
    ("tin-cong-nghe", "Tin công nghệ", None),
    ("tu-van-lua-chon", "Tư vấn lựa chọn", "news-cat-tu-van.png"),
    ("tin-tuc-cong-ty", "Tin tức công ty", "news-cat-cong-ty.png"),
]

IMG_SOLAR = P + "250-1146-camera-tapo-c410-kit.png"
IMG_INDOOR = P + "250-1015-camera-tapo-c200.png"
IMG_SOLAR_4G = P + "250-1626-dahua-dh-ipc-hfw2441dg-4g-sp-b-4mp.jpg"
IMG_HDCVI = P + "250-1937-camera-hdcvi-dahua-dh-hac-hfw1200rlp-il-t.jpg"
IMG_BATTERY = P + "250-175-camera-ip-wifi-dung-pin-ezviz-bc1c-1.jpg"
IMG_BULLET = P + "250-1331-ds-2de7a232iw-aeb----2025-06-19t102859-714.jpg"


def fig(src, caption):
    return (f'<figure class="article-figure"><img src="assets/images/{src}" alt="{caption}" loading="lazy">'
            f'<figcaption>{caption}</figcaption></figure>')


# Newest first.
ARTICLES = [
    # ------------------------------------------------------------------
    {
        "slug": "an-ninh-thai-nguyen-chinh-thuc-ra-mat-website",
        "cat": "tin-tuc-cong-ty",
        "date": "08.11.2026",
        "title": "An Ninh Thái Nguyên chính thức ra mắt website anninhthainguyen.vn",
        "cover_src": None,  # logo cover
        "summary": "Website anninhthainguyen.vn chính thức đi vào hoạt động, giúp khách hàng tra cứu sản phẩm, xem giá và đặt mua thiết bị an ninh nhanh chóng, thuận tiện mọi lúc mọi nơi.",
        "body": f"""
<p>An Ninh Thái Nguyên trân trọng thông báo: website <strong>anninhthainguyen.vn</strong> đã chính thức đi vào hoạt động. Đây là kênh thông tin và mua sắm trực tuyến dành cho khách hàng quan tâm đến camera giám sát, khóa cửa vân tay, thiết bị báo cháy, máy chấm công – kiểm soát ra vào và thiết bị mạng.</p>
<p>Việc ra mắt website là bước tiếp theo trong định hướng phục vụ khách hàng tốt hơn: thông tin minh bạch hơn, tra cứu nhanh hơn và hỗ trợ kịp thời hơn – dù bạn đang ở nhà, ở văn phòng hay đang trên đường.</p>

<h2>Vì sao chúng tôi xây dựng website?</h2>
<p>Trong quá trình tư vấn và lắp đặt, chúng tôi nhận được rất nhiều câu hỏi giống nhau từ khách hàng: nên chọn camera loại nào, giá bao nhiêu, lắp ở đâu cho hợp lý, khóa vân tay nào phù hợp với cửa nhà mình… Một website đầy đủ thông tin giúp khách hàng chủ động tìm hiểu trước, so sánh các lựa chọn và đưa ra quyết định phù hợp nhất với nhu cầu, ngân sách của mình.</p>

<h2>Những gì bạn có thể làm trên website</h2>
<h3>Tra cứu sản phẩm theo danh mục và thương hiệu</h3>
<p>Sản phẩm được phân loại rõ ràng theo nhóm: camera giám sát (camera IP, camera Analog, camera wifi, camera quay quét), khóa cửa vân tay, thiết bị báo động – báo cháy, chấm công – kiểm soát cửa, thiết bị lưu trữ và thiết bị mạng. Bạn cũng có thể lọc nhanh theo các thương hiệu quen thuộc như Dahua, Imou, KBVision, Ezviz, TP-Link…</p>
<h3>Xem thông tin chi tiết, rõ ràng</h3>
<p>Mỗi sản phẩm đều có hình ảnh, thông số kỹ thuật chính và mức giá tham khảo. Các sản phẩm đang có chương trình ưu đãi được đánh dấu riêng để bạn dễ nhận biết.</p>
<h3>Đặt hàng trực tuyến chỉ trong vài bước</h3>
<ul>
  <li>Thêm sản phẩm vào <strong>giỏ hàng</strong>, điều chỉnh số lượng tùy ý.</li>
  <li>Điền thông tin giao hàng và gửi đơn – nhân viên sẽ gọi lại xác nhận.</li>
  <li>Danh sách <strong>sản phẩm đã xem</strong> được lưu lại để bạn tiện so sánh, quay lại bất cứ lúc nào.</li>
</ul>

<h2>Chuyên mục Tin tức – kiến thức hữu ích cho mọi người</h2>
<p>Bên cạnh sản phẩm, chuyên mục <a href="/tin-tuc/">Tin tức</a> sẽ thường xuyên cập nhật các bài viết được biên soạn dễ hiểu, gần gũi:</p>
<ul>
  <li><strong>Hướng dẫn kỹ thuật:</strong> cài đặt camera trên điện thoại, xem lại video, xử lý các lỗi thường gặp.</li>
  <li><strong>Tư vấn lựa chọn:</strong> kinh nghiệm chọn camera, khóa cửa, thiết bị phù hợp cho gia đình, cửa hàng, văn phòng.</li>
  <li><strong>Tin công nghệ:</strong> xu hướng mới như camera AI, camera 4G, camera dùng năng lượng mặt trời…</li>
</ul>

<h2>Cam kết khi mua sắm cùng An Ninh Thái Nguyên</h2>
<ul>
  <li><strong>Sản phẩm chính hãng</strong>, có nguồn gốc xuất xứ rõ ràng.</li>
  <li><strong>Tư vấn đúng nhu cầu</strong>, không chèo kéo mua thiết bị không cần thiết.</li>
  <li><strong>Lắp đặt gọn gàng, thẩm mỹ</strong>, hướng dẫn sử dụng tận tình sau khi bàn giao.</li>
  <li><strong>Bảo hành, đổi trả</strong> theo chính sách công khai trên website.</li>
</ul>

<h2>Kết nối và hỗ trợ</h2>
<p>Nếu cần tư vấn, bạn có thể gọi hotline <a href="tel:{HOTLINE_TEL}">{HOTLINE}</a>, nhắn tin qua Zalo bằng nút liên hệ ở góc màn hình, hoặc để lại email trong mục <strong>Đăng ký nhận tin</strong> ở cuối trang để nhận thông tin khuyến mãi sớm nhất.</p>
<p>Website vẫn đang tiếp tục được hoàn thiện. Mọi góp ý của quý khách đều rất quý giá để chúng tôi phục vụ tốt hơn mỗi ngày. Cảm ơn quý khách đã tin tưởng và đồng hành cùng An Ninh Thái Nguyên!</p>
""",
    },
    # ------------------------------------------------------------------
    {
        "slug": "cach-chon-vi-tri-lap-dat-camera-an-ninh",
        "cat": "huong-dan",
        "date": "08.11.2026",
        "title": "Cách chọn vị trí lắp đặt camera an ninh cho gia đình",
        "cover_src": IMG_SOLAR,
        "summary": "Lắp camera đúng chỗ quan trọng không kém việc chọn camera tốt. Bài viết tổng hợp những vị trí nên lắp, chiều cao, góc quay và các lỗi thường gặp cần tránh.",
        "body": f"""
<p>Rất nhiều gia đình đầu tư camera chất lượng tốt nhưng khi cần xem lại thì hình ảnh lại không giúp được gì: khuôn mặt bị ngược sáng, góc quay chỉ thấy đỉnh đầu, hoặc khu vực quan trọng nằm ngoài khung hình. Nguyên nhân phần lớn đến từ việc <strong>chọn vị trí lắp đặt chưa hợp lý</strong>.</p>
<p>Bài viết dưới đây sẽ giúp bạn lên phương án bố trí camera cho ngôi nhà một cách bài bản, kể cả khi bạn tự lắp đặt.</p>

<h2>Bước 1: Khảo sát và xác định khu vực cần giám sát</h2>
<p>Trước khi khoan bất kỳ lỗ nào, hãy đi một vòng quanh nhà và trả lời các câu hỏi:</p>
<ul>
  <li>Người lạ có thể vào nhà bằng những lối nào? (cổng, cửa chính, cửa sau, ban công, cửa sổ tầng trệt…)</li>
  <li>Tài sản giá trị nằm ở đâu? (xe máy, ô tô, kho hàng, quầy thu ngân…)</li>
  <li>Bạn muốn theo dõi ai? (trẻ nhỏ, người già, người giúp việc, nhân viên…)</li>
</ul>
<p>Nên vẽ sơ đồ mặt bằng đơn giản và đánh dấu các điểm cần quan sát. Đây là cơ sở để tính số lượng camera và chọn loại camera phù hợp.</p>

<h2>Bước 2: Những vị trí nên ưu tiên lắp camera</h2>
<h3>Cổng và cửa chính</h3>
<p>Đây là vị trí quan trọng nhất vì hầu hết mọi người đều ra vào qua đây. Camera ở cổng nên quay được <strong>rõ khuôn mặt</strong> người ra vào, thay vì chỉ thấy toàn cảnh từ xa.</p>
<h3>Sân, gara, khu để xe</h3>
<p>Nên dùng camera có góc rộng, hồng ngoại xa hoặc có đèn trợ sáng để quan sát được cả ban đêm. Nếu sân rộng, có thể cân nhắc camera quay quét (PTZ) để bao quát nhiều hướng.</p>
<h3>Cửa sau, cửa sổ tầng trệt, ban công</h3>
<p>Những lối này thường bị bỏ quên nhưng lại là nơi kẻ gian hay lợi dụng vì ít người qua lại. Một camera nhỏ gọn hoặc camera dùng pin là đủ cho các vị trí này.</p>
<h3>Phòng khách, hành lang, cầu thang</h3>
<p>Camera trong nhà giúp quan sát sinh hoạt chung, trông trẻ, chăm sóc người lớn tuổi. Nên đặt ở góc phòng để bao quát được nhiều không gian nhất.</p>
{fig(IMG_SOLAR, "Camera ngoài trời dùng tấm pin năng lượng mặt trời phù hợp với cổng, sân vườn khó đi dây")}

<h2>Bước 3: Chiều cao và góc quay hợp lý</h2>
<p>Chiều cao lắp đặt lý tưởng thường nằm trong khoảng <strong>2,5 – 3 mét</strong>:</p>
<ul>
  <li><strong>Quá thấp</strong> (dưới 2 m): dễ bị che chắn, phá hoại hoặc xoay hướng.</li>
  <li><strong>Quá cao</strong> (trên 4 m): chỉ thấy đỉnh đầu, khó nhận diện khuôn mặt.</li>
</ul>
<p>Góc chúc xuống nên khoảng <strong>15 – 30 độ</strong>. Hãy hướng camera theo chiều người đi vào – tức là camera "đón" người từ phía trước – thay vì quay ngang lối đi.</p>
<div class="article-tip"><strong>Mẹo:</strong> Trước khi cố định chân đế, hãy nhờ một người đứng ở vị trí cần nhận diện và xem trực tiếp trên điện thoại. Chỉnh đến khi khuôn mặt chiếm khoảng 1/5 – 1/4 chiều cao khung hình là đạt.</div>

<h2>Bước 4: Xử lý ánh sáng và ngược sáng</h2>
<p>Ngược sáng là lỗi phổ biến nhất khiến hình ảnh chỉ còn bóng đen. Để hạn chế:</p>
<ul>
  <li>Không hướng camera thẳng vào mặt trời, đèn đường, đèn pha xe hay cửa kính lớn.</li>
  <li>Với cửa ra vào có nắng chiếu trực tiếp, chọn camera có <strong>WDR (chống ngược sáng)</strong> thực từ 120 dB trở lên.</li>
  <li>Ban đêm, tránh để đèn trang trí chiếu thẳng vào ống kính; ánh sáng hồng ngoại cũng có thể phản xạ nếu camera đặt sát tường hoặc mái hiên.</li>
</ul>

<h2>Bước 5: Nguồn điện, dây dẫn và kết nối mạng</h2>
<ul>
  <li><strong>Camera wifi:</strong> kiểm tra cường độ sóng tại vị trí lắp bằng điện thoại. Nếu sóng yếu, nên bổ sung bộ kích sóng hoặc hệ thống wifi Mesh.</li>
  <li><strong>Camera có dây:</strong> dây tín hiệu và dây nguồn nên luồn trong ống ghen, đi gọn theo góc tường để thẩm mỹ và chống chuột cắn.</li>
  <li><strong>Camera ngoài trời:</strong> chọn chuẩn chống nước <strong>IP66/IP67</strong>, đầu nối nên đặt trong hộp kỹ thuật kín để tránh nước mưa.</li>
  <li><strong>Đầu ghi:</strong> đặt ở nơi kín đáo, thoáng mát, tránh kẻ gian có thể lấy đi cả thiết bị lưu trữ.</li>
</ul>

<h2>Những lỗi thường gặp cần tránh</h2>
<ol>
  <li>Lắp camera ở vị trí dễ với tới, kẻ gian có thể xoay hướng hoặc che ống kính.</li>
  <li>Để cây cối, biển hiệu che một phần khung hình – cây lớn lên theo thời gian nên cần kiểm tra định kỳ.</li>
  <li>Quá ham góc rộng khiến đối tượng ở xa trở nên quá nhỏ, không nhận diện được.</li>
  <li>Không kiểm tra hình ảnh ban đêm sau khi lắp.</li>
</ol>

<h2>Lưu ý về quyền riêng tư</h2>
<p>Không lắp camera quay vào nhà hàng xóm, khu vực công cộng ngoài phạm vi nhà mình, hay những nơi riêng tư như phòng tắm, phòng ngủ của người khác. Việc này vừa gây mất lòng hàng xóm vừa có thể vi phạm quy định pháp luật về bảo vệ đời tư.</p>

<h2>Gợi ý bố trí cho nhà phố điển hình</h2>
<p>Với nhà phố 3–4 tầng thông thường, một hệ thống <strong>4 camera</strong> thường đáp ứng đủ nhu cầu:</p>
<ul>
  <li>1 camera ngoài trời ở cổng/cửa chính, quay rõ mặt người ra vào.</li>
  <li>1 camera góc rộng quan sát sân hoặc khu để xe.</li>
  <li>1 camera trong nhà ở phòng khách.</li>
  <li>1 camera ở cửa sau, sân thượng hoặc cầu thang.</li>
</ul>
<p>Nếu bạn chưa chắc chắn nên đặt camera ở đâu, đội ngũ kỹ thuật của chúng tôi có thể đến khảo sát và tư vấn phương án phù hợp nhất cho ngôi nhà của bạn.</p>
""",
    },
    # ------------------------------------------------------------------
    {
        "slug": "camera-ai-la-gi",
        "cat": "tin-cong-nghe",
        "date": "08.11.2026",
        "title": "Camera AI là gì? Những tính năng thông minh đáng chú ý",
        "cover_src": IMG_BULLET,
        "summary": "Camera AI có thể nhận diện người, phương tiện và cảnh báo xâm nhập chính xác hơn nhiều so với camera thông thường. Cùng tìm hiểu cách hoạt động và những tính năng nổi bật.",
        "body": """
<p>Vài năm trở lại đây, cụm từ "camera AI" xuất hiện ngày càng nhiều trong các mẫu camera mới, từ camera gia đình giá rẻ đến hệ thống giám sát chuyên nghiệp. Vậy camera AI thực chất là gì, khác gì camera thông thường và có đáng để đầu tư?</p>

<h2>Camera AI là gì?</h2>
<p>Camera AI là camera được tích hợp <strong>trí tuệ nhân tạo</strong> – cụ thể là các thuật toán học sâu (deep learning) – để phân tích nội dung hình ảnh. Thay vì chỉ ghi lại những gì nhìn thấy, camera AI có khả năng "hiểu" trong khung hình đang có <strong>người</strong>, <strong>xe</strong>, <strong>vật nuôi</strong> hay chỉ là chuyển động của lá cây, bóng nắng.</p>
<p>Việc phân tích có thể diễn ra ngay trên camera (AI tại biên – edge AI), trên đầu ghi hỗ trợ AI, hoặc trên máy chủ đám mây của nhà sản xuất.</p>

<h2>Camera AI khác gì camera thông thường?</h2>
<p>Camera thông thường phát hiện chuyển động bằng cách so sánh sự thay đổi điểm ảnh giữa các khung hình. Cách làm này đơn giản nhưng dễ bị đánh lừa bởi:</p>
<ul>
  <li>Lá cây, rèm cửa lay động khi có gió.</li>
  <li>Mưa, côn trùng bay sát ống kính vào ban đêm.</li>
  <li>Ánh đèn xe chiếu qua, mây che nắng làm thay đổi độ sáng đột ngột.</li>
</ul>
<p>Kết quả là điện thoại nhận hàng chục thông báo mỗi ngày, khiến người dùng tắt luôn cảnh báo – và bỏ lỡ sự việc thực sự. Camera AI giải quyết vấn đề này bằng cách <strong>chỉ cảnh báo khi đúng đối tượng cần quan tâm</strong>, giảm đáng kể cảnh báo giả.</p>
{fig}

<h2>Những tính năng AI phổ biến hiện nay</h2>
<h3>1. Phát hiện người và phương tiện (SMD)</h3>
<p>Đây là tính năng cơ bản nhất và có mặt trên hầu hết camera AI. Bạn có thể chọn chỉ nhận cảnh báo khi có người, khi có xe, hoặc cả hai.</p>
<h3>2. Hàng rào ảo và phát hiện xâm nhập vùng</h3>
<p>Bạn vẽ một đường hoặc một vùng trên khung hình. Khi có người vượt qua đường kẻ hoặc đi vào vùng cấm (ví dụ: bờ tường, khu vực kho), camera sẽ lập tức báo động.</p>
<h3>3. Tự động bám theo đối tượng</h3>
<p>Trên các dòng camera quay quét (PTZ), AI giúp camera tự xoay và phóng to theo người đang di chuyển, đảm bảo không để mất dấu.</p>
<h3>4. Nhận diện khuôn mặt</h3>
<p>Camera lưu danh sách khuôn mặt quen thuộc và nhận biết người lạ. Tính năng này thường dùng trong văn phòng, nhà xưởng, kết hợp với hệ thống chấm công hoặc kiểm soát ra vào.</p>
<h3>5. Nhận diện biển số xe</h3>
<p>Ứng dụng phổ biến tại bãi giữ xe, cổng khu dân cư, nhà máy để ghi nhận và tra cứu xe ra vào.</p>
<h3>6. Răn đe chủ động</h3>
<p>Khi phát hiện xâm nhập, camera tự bật đèn trắng nhấp nháy và phát còi hoặc lời cảnh báo bằng giọng nói. Đây là cách ngăn chặn sự việc ngay từ đầu thay vì chỉ ghi lại.</p>
<h3>7. Tìm kiếm thông minh</h3>
<p>Thay vì tua hàng giờ video, bạn chỉ cần lọc "người" hoặc "xe" trong khoảng thời gian cần tìm, hệ thống sẽ liệt kê ngay các đoạn liên quan.</p>

<h2>Ứng dụng thực tế của camera AI</h2>
<ul>
  <li><strong>Gia đình:</strong> cảnh báo người lạ vào sân ban đêm, phát hiện tiếng trẻ khóc, theo dõi vật nuôi.</li>
  <li><strong>Cửa hàng:</strong> đếm lượt khách ra vào, phát hiện người lảng vảng trước cửa ngoài giờ bán hàng.</li>
  <li><strong>Nhà xưởng, kho bãi:</strong> bảo vệ hàng rào, giám sát khu vực nguy hiểm, quản lý xe ra vào.</li>
  <li><strong>Văn phòng:</strong> chấm công bằng khuôn mặt, kiểm soát người ra vào khu vực hạn chế.</li>
</ul>

<h2>Những điều cần lưu ý khi chọn camera AI</h2>
<ul>
  <li><strong>AI trên camera hay trên đầu ghi?</strong> Nếu dùng hệ thống có đầu ghi, cần đảm bảo đầu ghi hỗ trợ các tính năng AI của camera.</li>
  <li><strong>Độ chính xác phụ thuộc vào lắp đặt:</strong> camera cần đủ sáng, góc nhìn phù hợp và đối tượng không quá nhỏ trong khung hình.</li>
  <li><strong>Một số tính năng cần trả phí đám mây</strong> với các dòng camera wifi gia đình – nên hỏi rõ trước khi mua.</li>
  <li><strong>Bảo mật dữ liệu:</strong> đổi mật khẩu mặc định, cập nhật firmware thường xuyên, đặc biệt với hệ thống có nhận diện khuôn mặt.</li>
</ul>

<h2>Có nên đầu tư camera AI?</h2>
<p>Với mức giá ngày càng dễ tiếp cận, camera AI gần như đã trở thành tiêu chuẩn mới. Bạn sẽ nhận ít thông báo rác hơn, tìm lại sự việc nhanh hơn và có thêm khả năng ngăn chặn chủ động. Nếu đang lên kế hoạch lắp mới hoặc nâng cấp hệ thống, camera có ít nhất tính năng <strong>phát hiện người – phương tiện</strong> là lựa chọn rất đáng cân nhắc.</p>
""".replace("{fig}", fig(IMG_BULLET, "Camera thân trụ thế hệ mới thường tích hợp sẵn tính năng phát hiện người và phương tiện")),
    },
    # ------------------------------------------------------------------
    {
        "slug": "kinh-nghiem-chon-camera-cho-gia-dinh",
        "cat": "tu-van-lua-chon",
        "date": "08.11.2026",
        "title": "Kinh nghiệm chọn mua camera giám sát cho gia đình",
        "cover_src": IMG_INDOOR,
        "summary": "Độ phân giải, góc nhìn, hồng ngoại, lưu trữ, ứng dụng… Đây là những tiêu chí quan trọng bạn nên xem xét trước khi mua camera cho ngôi nhà của mình.",
        "body": f"""
<p>Thị trường camera giám sát hiện nay có hàng trăm mẫu mã với mức giá từ vài trăm nghìn đến vài triệu đồng mỗi chiếc. Nhiều thông số kỹ thuật khiến người mua dễ bối rối, dẫn đến mua thừa tính năng không cần thiết hoặc mua thiếu khiến camera không phát huy tác dụng. Dưới đây là kinh nghiệm chọn camera được đúc kết từ thực tế lắp đặt.</p>

<h2>1. Xác định rõ nhu cầu trước khi mua</h2>
<p>Hãy bắt đầu bằng câu hỏi: <strong>bạn lắp camera để làm gì?</strong></p>
<ul>
  <li><strong>Trông trẻ, chăm người già, theo dõi vật nuôi:</strong> ưu tiên camera trong nhà xoay 360 độ, có đàm thoại hai chiều, phát hiện tiếng khóc.</li>
  <li><strong>Chống trộm, giám sát cổng và sân:</strong> cần camera ngoài trời chống nước, hồng ngoại xa, tốt nhất có đèn và còi cảnh báo.</li>
  <li><strong>Giám sát cửa hàng, kho:</strong> cần hệ thống nhiều camera kèm đầu ghi, lưu trữ dài ngày.</li>
</ul>
{fig(IMG_INDOOR, "Camera trong nhà xoay 360 độ phù hợp để trông trẻ, chăm sóc người lớn tuổi")}

<h2>2. Camera wifi hay camera có dây?</h2>
<table>
  <thead><tr><th>Tiêu chí</th><th>Camera wifi</th><th>Hệ thống camera có dây + đầu ghi</th></tr></thead>
  <tbody>
    <tr><td>Lắp đặt</td><td>Nhanh, có thể tự lắp</td><td>Cần đi dây, nên nhờ kỹ thuật viên</td></tr>
    <tr><td>Số lượng phù hợp</td><td>1 – 4 camera</td><td>4 camera trở lên</td></tr>
    <tr><td>Độ ổn định</td><td>Phụ thuộc sóng wifi</td><td>Rất ổn định</td></tr>
    <tr><td>Lưu trữ</td><td>Thẻ nhớ / đám mây</td><td>Ổ cứng trong đầu ghi</td></tr>
    <tr><td>Chi phí ban đầu</td><td>Thấp</td><td>Cao hơn</td></tr>
  </tbody>
</table>
<p>Với căn hộ chung cư hoặc nhà nhỏ cần 1–2 camera, camera wifi là lựa chọn tiện lợi. Với nhà phố, biệt thự, cửa hàng cần nhiều điểm giám sát, nên chọn hệ thống có dây để đảm bảo ổn định lâu dài.</p>

<h2>3. Độ phân giải: bao nhiêu là đủ?</h2>
<ul>
  <li><strong>2MP (1080p):</strong> đáp ứng nhu cầu cơ bản trong nhà, khoảng cách quan sát gần.</li>
  <li><strong>3MP – 4MP (2K):</strong> mức được khuyên dùng hiện nay, nhận diện khuôn mặt, chi tiết tốt hơn rõ rệt khi phóng to.</li>
  <li><strong>5MP – 8MP (4K):</strong> phù hợp khu vực rộng như sân lớn, bãi xe, cần phóng to để xem biển số.</li>
</ul>
<p>Lưu ý: độ phân giải càng cao thì dung lượng lưu trữ càng lớn. Nếu dùng thẻ nhớ, hãy chọn thẻ có dung lượng tương xứng.</p>

<h2>4. Khả năng quan sát ban đêm</h2>
<p>Đây là tiêu chí rất quan trọng vì phần lớn sự cố xảy ra vào ban đêm.</p>
<ul>
  <li><strong>Hồng ngoại (IR):</strong> cho hình đen trắng, tầm xa từ 10 m đến 50 m tùy dòng.</li>
  <li><strong>Full Color / Smart Dual Light:</strong> có đèn trắng trợ sáng, cho hình màu ban đêm – dễ nhận biết màu áo, màu xe hơn.</li>
  <li><strong>Starlight:</strong> cảm biến nhạy sáng, cho hình màu ngay cả khi ánh sáng yếu mà không cần bật đèn.</li>
</ul>

<h2>5. Góc nhìn và ống kính</h2>
<p>Ống kính có tiêu cự nhỏ (2.8 mm) cho góc nhìn rộng, phù hợp phòng khách, sân nhỏ. Ống kính tiêu cự lớn hơn (4 mm, 6 mm) có góc hẹp hơn nhưng nhìn xa và rõ hơn, phù hợp với cổng, lối đi dài. Camera quay quét (PTZ) hoặc camera xoay 360 độ giải quyết được cả hai nhu cầu.</p>

<h2>6. Hình thức lưu trữ</h2>
<ul>
  <li><strong>Thẻ nhớ microSD:</strong> đơn giản, tiết kiệm, nhưng có nguy cơ mất dữ liệu nếu camera bị lấy cắp. Nên dùng thẻ chuyên dụng cho camera (High Endurance).</li>
  <li><strong>Đầu ghi + ổ cứng:</strong> quản lý tập trung, lưu được 2–4 tuần hoặc lâu hơn tùy dung lượng.</li>
  <li><strong>Lưu trữ đám mây:</strong> an toàn kể cả khi thiết bị bị phá hỏng, thường phải trả phí theo tháng/năm.</li>
</ul>

<h2>7. Ứng dụng và tính năng thông minh</h2>
<p>Một chiếc camera tốt cần đi kèm ứng dụng điện thoại ổn định, dễ dùng, hỗ trợ tiếng Việt. Các tính năng nên có: phát hiện người (giảm cảnh báo giả), đàm thoại hai chiều, chia sẻ quyền xem cho người thân, xem lại theo dòng thời gian.</p>

<h2>8. Thương hiệu, bảo hành và dịch vụ</h2>
<p>Nên chọn sản phẩm chính hãng từ các thương hiệu uy tín như Dahua, Imou, KBVision, Ezviz, TP-Link Tapo… Hãy hỏi kỹ về thời gian bảo hành, chính sách đổi trả và việc hỗ trợ cài đặt, sửa lỗi sau khi mua – điều này quan trọng không kém bản thân sản phẩm.</p>

<h2>Gợi ý cấu hình theo nhu cầu</h2>
<ul>
  <li><strong>Căn hộ chung cư:</strong> 1–2 camera wifi trong nhà 3MP, xoay 360 độ, thẻ nhớ 64–128 GB.</li>
  <li><strong>Nhà phố:</strong> bộ 4 camera có dây 2–4MP kèm đầu ghi 4 kênh và ổ cứng 1 TB.</li>
  <li><strong>Nhà vườn, nhà xưởng:</strong> camera ngoài trời có màu ban đêm, kết hợp camera 4G hoặc camera năng lượng mặt trời cho khu vực không có điện, không có mạng.</li>
</ul>

<div class="article-tip"><strong>Mẹo:</strong> Đừng chỉ so sánh giá camera. Hãy tính tổng chi phí gồm phụ kiện (dây, nguồn, thẻ nhớ/ổ cứng), công lắp đặt và phí đám mây (nếu có) để có lựa chọn thực sự tiết kiệm.</div>
""",
    },
    # ------------------------------------------------------------------
    {
        "slug": "camera-ip-va-camera-analog-nen-chon-loai-nao",
        "cat": "tin-cong-nghe",
        "date": "08.11.2026",
        "title": "Camera IP và camera Analog: nên chọn loại nào?",
        "cover_src": IMG_SOLAR_4G,
        "summary": "So sánh chi tiết camera IP và camera Analog (HDCVI/AHD/TVI) về chất lượng hình ảnh, chi phí, khả năng mở rộng để chọn hệ thống phù hợp với nhu cầu và ngân sách.",
        "body": f"""
<p>Khi lắp đặt hệ thống camera giám sát, câu hỏi được hỏi nhiều nhất là: <strong>nên dùng camera IP hay camera Analog?</strong> Cả hai công nghệ đều đang được sử dụng rộng rãi và mỗi loại có thế mạnh riêng. Bài viết này sẽ giúp bạn hiểu rõ sự khác biệt để có lựa chọn đúng.</p>

<h2>Camera Analog là gì?</h2>
<p>Camera Analog truyền tín hiệu hình ảnh dạng tương tự qua <strong>cáp đồng trục</strong> về đầu ghi (DVR/XVR). Đầu ghi sẽ chuyển đổi tín hiệu thành dữ liệu số để lưu trữ và xem từ xa.</p>
<p>Các công nghệ Analog HD phổ biến hiện nay gồm <strong>HDCVI</strong> (Dahua phát triển), <strong>AHD</strong> và <strong>HDTVI</strong>. Nhờ các công nghệ này, camera Analog đã đạt độ phân giải từ 2MP đến 5MP, thậm chí 8MP – khác xa so với camera Analog đời cũ.</p>
<h3>Ưu điểm của camera Analog</h3>
<ul>
  <li><strong>Giá thành thấp:</strong> cả camera và đầu ghi đều rẻ hơn đáng kể so với hệ thống IP cùng số kênh.</li>
  <li><strong>Lắp đặt đơn giản:</strong> không cần cấu hình địa chỉ IP, cắm là chạy.</li>
  <li><strong>Truyền tín hiệu xa:</strong> cáp đồng trục có thể kéo tới vài trăm mét mà vẫn giữ chất lượng.</li>
  <li><strong>Ít phụ thuộc vào mạng:</strong> hệ thống vẫn ghi hình bình thường khi mất internet.</li>
</ul>
<h3>Nhược điểm của camera Analog</h3>
<ul>
  <li>Độ phân giải tối đa thấp hơn camera IP.</li>
  <li>Tính năng thông minh (AI) hạn chế hơn.</li>
  <li>Thường cần đi riêng dây nguồn và dây tín hiệu.</li>
</ul>
{fig(IMG_HDCVI, "Camera Analog HDCVI – lựa chọn kinh tế cho gia đình và cửa hàng")}

<h2>Camera IP là gì?</h2>
<p>Camera IP (Internet Protocol) là camera kỹ thuật số, xử lý và nén hình ảnh ngay trên camera rồi truyền về đầu ghi (NVR) qua <strong>mạng LAN</strong> hoặc wifi. Phần lớn camera IP hỗ trợ <strong>PoE</strong> – cấp nguồn và truyền dữ liệu trên cùng một sợi cáp mạng.</p>
<h3>Ưu điểm của camera IP</h3>
<ul>
  <li><strong>Hình ảnh sắc nét:</strong> độ phân giải phổ biến từ 2MP đến 8MP (4K), chi tiết tốt khi phóng to.</li>
  <li><strong>Nhiều tính năng thông minh:</strong> phát hiện người – phương tiện, hàng rào ảo, nhận diện khuôn mặt, đếm người…</li>
  <li><strong>Dễ mở rộng:</strong> thêm camera chỉ cần kết nối vào hệ thống mạng sẵn có.</li>
  <li><strong>Gọn dây với PoE:</strong> một sợi cáp mạng cho cả nguồn và tín hiệu.</li>
  <li><strong>Âm thanh, đàm thoại:</strong> nhiều mẫu tích hợp sẵn micro, loa.</li>
</ul>
<h3>Nhược điểm của camera IP</h3>
<ul>
  <li>Chi phí đầu tư ban đầu cao hơn (camera, đầu ghi, switch PoE).</li>
  <li>Cần hạ tầng mạng tốt và kỹ thuật viên có kinh nghiệm cấu hình.</li>
  <li>Cáp mạng có giới hạn khoảng 100 m mỗi đoạn, xa hơn cần thêm thiết bị trung chuyển.</li>
</ul>
{fig(IMG_SOLAR_4G, "Camera IP thế hệ mới có thể dùng 4G và năng lượng mặt trời cho khu vực không có điện lưới")}

<h2>Bảng so sánh tổng quan</h2>
<table>
  <thead><tr><th>Tiêu chí</th><th>Camera Analog</th><th>Camera IP</th></tr></thead>
  <tbody>
    <tr><td>Chi phí đầu tư</td><td>Thấp</td><td>Trung bình – cao</td></tr>
    <tr><td>Độ phân giải phổ biến</td><td>2MP – 5MP</td><td>2MP – 8MP (4K)</td></tr>
    <tr><td>Tính năng AI</td><td>Cơ bản</td><td>Đầy đủ, đa dạng</td></tr>
    <tr><td>Dây dẫn</td><td>Cáp đồng trục + dây nguồn</td><td>Cáp mạng (PoE)</td></tr>
    <tr><td>Khoảng cách truyền</td><td>Xa (vài trăm mét)</td><td>~100 m mỗi đoạn cáp</td></tr>
    <tr><td>Khả năng mở rộng</td><td>Giới hạn theo số kênh đầu ghi</td><td>Linh hoạt</td></tr>
    <tr><td>Âm thanh</td><td>Một số mẫu</td><td>Phổ biến</td></tr>
    <tr><td>Phù hợp</td><td>Gia đình, cửa hàng nhỏ</td><td>Văn phòng, nhà xưởng, dự án</td></tr>
  </tbody>
</table>

<h2>Có thể kết hợp cả hai?</h2>
<p>Có. Nhiều đầu ghi đời mới (XVR) hỗ trợ <strong>lai (hybrid)</strong>: vừa nhận camera Analog vừa nhận thêm một số camera IP. Đây là giải pháp hay khi bạn muốn tận dụng hệ thống Analog sẵn có và nâng cấp dần một vài vị trí quan trọng lên camera IP.</p>

<h2>Vậy nên chọn loại nào?</h2>
<h3>Chọn camera Analog nếu:</h3>
<ul>
  <li>Ngân sách hạn chế, cần lắp nhiều camera với chi phí thấp.</li>
  <li>Nhu cầu chủ yếu là ghi hình, xem lại khi cần.</li>
  <li>Nhà đã có sẵn hệ thống dây đồng trục cũ.</li>
</ul>
<h3>Chọn camera IP nếu:</h3>
<ul>
  <li>Cần hình ảnh chất lượng cao, nhận diện khuôn mặt, biển số.</li>
  <li>Muốn dùng các tính năng AI để giảm cảnh báo giả, tìm kiếm thông minh.</li>
  <li>Hệ thống lớn, có kế hoạch mở rộng trong tương lai.</li>
  <li>Công trình xây mới, có thể đi dây mạng ngay từ đầu.</li>
</ul>

<h2>Kết luận</h2>
<p>Không có loại camera nào "tốt nhất" cho mọi trường hợp. Camera Analog vẫn là lựa chọn kinh tế, bền bỉ cho gia đình và cửa hàng nhỏ. Camera IP là khoản đầu tư xứng đáng cho những ai cần chất lượng hình ảnh cao, tính năng thông minh và khả năng mở rộng lâu dài. Hãy cân nhắc nhu cầu thực tế, ngân sách và hạ tầng sẵn có – hoặc liên hệ với chúng tôi để được khảo sát và tư vấn miễn phí.</p>
""",
    },
    # ------------------------------------------------------------------
    {
        "slug": "huong-dan-xem-lai-camera-tren-dien-thoai",
        "cat": "huong-dan",
        "date": "08.11.2026",
        "title": "Hướng dẫn xem lại camera trên điện thoại nhanh chóng",
        "cover_src": IMG_HDCVI,
        "summary": "Các bước xem lại, tìm kiếm và lưu video đã ghi trên điện thoại, áp dụng cho hầu hết ứng dụng camera phổ biến, kèm cách xử lý khi không xem lại được.",
        "body": """
<p>Xem lại video (playback) là một trong những tính năng được dùng nhiều nhất của hệ thống camera: kiểm tra ai đã đến nhà, tìm lại món đồ bị thất lạc, xác minh sự việc khi có tranh chấp… Tuy nhiên, không ít người dùng chỉ biết xem trực tiếp mà chưa quen thao tác xem lại.</p>
<p>Hầu hết ứng dụng camera phổ biến như <strong>DMSS</strong>, <strong>Imou Life</strong>, <strong>KBView</strong>, <strong>Ezviz</strong>, <strong>Tapo</strong>… đều có giao diện xem lại tương tự nhau. Bài viết sẽ hướng dẫn theo các bước chung để bạn áp dụng được cho hầu hết thiết bị.</p>

<h2>Video được lưu ở đâu?</h2>
<p>Trước khi xem lại, bạn cần biết video của mình đang được lưu ở đâu:</p>
<ul>
  <li><strong>Thẻ nhớ trong camera:</strong> phổ biến với camera wifi gia đình.</li>
  <li><strong>Ổ cứng trong đầu ghi:</strong> với hệ thống nhiều camera có dây.</li>
  <li><strong>Đám mây (cloud):</strong> nếu bạn đăng ký gói lưu trữ của nhà sản xuất.</li>
</ul>
<p>Nếu camera không có thẻ nhớ, không kết nối đầu ghi và không có gói đám mây thì camera <strong>chỉ xem trực tiếp được, không có dữ liệu để xem lại</strong>.</p>

<h2>Các bước xem lại camera trên điện thoại</h2>
<h3>Bước 1: Mở ứng dụng và chọn thiết bị</h3>
<p>Đăng nhập ứng dụng bằng tài khoản đã thêm camera. Trong danh sách thiết bị, chọn camera hoặc đầu ghi bạn muốn xem. Hãy đảm bảo điện thoại có kết nối internet ổn định (wifi hoặc 4G).</p>
<h3>Bước 2: Vào chế độ xem lại</h3>
<p>Tìm biểu tượng <strong>Xem lại</strong>, <strong>Playback</strong> hoặc biểu tượng đồng hồ/lịch. Với đầu ghi nhiều kênh, bạn sẽ được yêu cầu chọn kênh camera cần xem (có thể chọn xem nhiều kênh cùng lúc).</p>
<h3>Bước 3: Chọn ngày cần xem</h3>
<p>Nhấn vào biểu tượng lịch và chọn ngày. Những ngày có dữ liệu ghi hình thường được đánh dấu bằng chấm màu hoặc in đậm.</p>
<h3>Bước 4: Kéo thanh thời gian đến giờ cần xem</h3>
<p>Thanh thời gian (timeline) hiển thị các đoạn có ghi hình. Thông thường:</p>
<ul>
  <li><strong>Màu xanh:</strong> ghi hình liên tục.</li>
  <li><strong>Màu vàng/đỏ:</strong> đoạn có chuyển động hoặc có sự kiện cảnh báo.</li>
</ul>
<p>Dùng hai ngón tay để phóng to/thu nhỏ thanh thời gian, giúp chọn chính xác đến từng phút.</p>
<h3>Bước 5: Tua nhanh và xem chi tiết</h3>
<p>Dùng nút tua nhanh (x2, x4, x8…) để rà soát nhanh. Khi thấy chi tiết cần chú ý, chuyển về tốc độ bình thường và dùng thao tác phóng to hình ảnh để xem rõ.</p>
<h3>Bước 6: Lưu lại hình ảnh, video</h3>
<ul>
  <li>Nhấn <strong>Chụp ảnh</strong> để lưu khung hình quan trọng.</li>
  <li>Nhấn <strong>Ghi hình</strong> trong lúc phát lại để lưu đoạn video về điện thoại.</li>
  <li>Một số ứng dụng cho phép <strong>tải xuống</strong> trực tiếp đoạn video từ thẻ nhớ/đầu ghi.</li>
</ul>
<p>File thường được lưu trong mục "Album", "Tệp cục bộ" của ứng dụng, sau đó bạn có thể xuất ra thư viện ảnh của điện thoại.</p>

<h2>Tìm kiếm nhanh theo sự kiện</h2>
<p>Thay vì tua cả ngày, hãy dùng tính năng <strong>danh sách sự kiện / tin nhắn cảnh báo</strong>. Mỗi khi camera phát hiện chuyển động hoặc phát hiện người, ứng dụng sẽ tạo một mục kèm ảnh chụp và thời gian. Nhấn vào mục đó để xem ngay đoạn video tương ứng. Với camera AI, bạn còn có thể lọc chỉ hiển thị sự kiện có <strong>người</strong> hoặc <strong>xe</strong>.</p>

<h2>Không xem lại được – nguyên nhân và cách khắc phục</h2>
<h3>Thẻ nhớ hoặc ổ cứng gặp lỗi</h3>
<p>Vào phần <strong>Cài đặt thiết bị → Lưu trữ</strong> để kiểm tra trạng thái. Nếu báo "bất thường", "chưa định dạng" hoặc không nhận, hãy thử định dạng lại (lưu ý: thao tác này xóa toàn bộ dữ liệu cũ). Nếu vẫn lỗi, cần thay thẻ nhớ/ổ cứng mới.</p>
<h3>Chưa bật lịch ghi hình</h3>
<p>Một số thiết bị mặc định chỉ ghi khi có chuyển động, hoặc lịch ghi hình bị tắt. Hãy kiểm tra và bật chế độ <strong>ghi liên tục</strong> nếu muốn có dữ liệu 24/7.</p>
<h3>Sai ngày giờ trên thiết bị</h3>
<p>Nếu đầu ghi bị mất điện lâu, đồng hồ có thể bị lệch khiến bạn tìm sai thời điểm. Hãy đồng bộ thời gian và chọn đúng múi giờ <strong>GMT+7</strong>.</p>
<h3>Dữ liệu đã bị ghi đè</h3>
<p>Khi bộ nhớ đầy, thiết bị sẽ tự động ghi đè lên dữ liệu cũ nhất. Nếu cần lưu trữ lâu hơn, hãy nâng cấp dung lượng thẻ nhớ/ổ cứng hoặc giảm chất lượng ghi hình.</p>
<h3>Mạng yếu, video giật lag</h3>
<p>Chuyển sang chế độ xem chất lượng thấp (SD) khi xem lại qua 4G, hoặc thử lại khi kết nối wifi tốt hơn.</p>

<div class="article-tip"><strong>Mẹo:</strong> Khi phát hiện sự việc quan trọng, hãy lưu video về điện thoại ngay lập tức. Dữ liệu trên thẻ nhớ/ổ cứng sẽ bị ghi đè sau vài ngày đến vài tuần, tùy dung lượng.</div>

<p>Nếu đã thử các cách trên mà vẫn chưa xem lại được, hãy liên hệ kỹ thuật viên để được kiểm tra trực tiếp thiết bị.</p>
""",
    },
    # ------------------------------------------------------------------
    {
        "slug": "camera-wifi-dung-pin-co-tot-khong",
        "cat": "tu-van-lua-chon",
        "date": "08.11.2026",
        "title": "Camera wifi dùng pin có tốt không? Ưu nhược điểm cần biết",
        "cover_src": IMG_BATTERY,
        "summary": "Camera dùng pin không cần đi dây, lắp đặt linh hoạt và vẫn hoạt động khi mất điện. Tuy nhiên đây không phải giải pháp phù hợp cho mọi trường hợp.",
        "body": f"""
<p>Camera wifi dùng pin ngày càng được nhiều gia đình lựa chọn nhờ ưu điểm "lắp đâu cũng được", không cần khoan đục đi dây. Nhưng liệu camera dùng pin có thực sự tốt, pin dùng được bao lâu và có nên thay thế hoàn toàn camera cắm điện? Bài viết dưới đây sẽ giúp bạn có câu trả lời.</p>

<h2>Camera dùng pin hoạt động như thế nào?</h2>
<p>Khác với camera thông thường ghi hình liên tục, camera dùng pin phần lớn thời gian ở trạng thái <strong>ngủ</strong> để tiết kiệm năng lượng. Cảm biến chuyển động hồng ngoại thụ động (<strong>PIR</strong>) – loại cảm biến nhận biết thân nhiệt – luôn hoạt động với mức tiêu thụ rất thấp. Khi phát hiện người hoặc vật thể có nhiệt độ di chuyển, camera sẽ "thức dậy" trong tích tắc, ghi hình và gửi thông báo về điện thoại.</p>
{fig(IMG_BATTERY, "Camera wifi dùng pin có thể lắp đặt ở bất kỳ đâu mà không cần đi dây điện")}

<h2>Ưu điểm của camera dùng pin</h2>
<h3>Lắp đặt cực kỳ đơn giản</h3>
<p>Không cần kéo dây nguồn, không cần thợ – bạn có thể tự lắp trong vài phút bằng chân đế bắt vít hoặc đế nam châm. Đây là lợi thế lớn với nhà đã hoàn thiện, nhà thuê hoặc những vị trí khó đi dây.</p>
<h3>Linh hoạt di chuyển</h3>
<p>Dễ dàng tháo ra lắp sang vị trí khác khi cần: mang theo khi đi du lịch, chuyển nhà, hay lắp tạm cho công trình đang thi công.</p>
<h3>Hoạt động khi mất điện</h3>
<p>Camera vẫn ghi hình nhờ pin tích hợp. Nếu router wifi có bộ lưu điện, hệ thống vẫn gửi cảnh báo bình thường – đây là điểm cộng lớn vì kẻ gian đôi khi cố tình ngắt điện.</p>
<h3>Thẩm mỹ cao</h3>
<p>Không có dây nhợ lằng nhằng, phù hợp với mặt tiền nhà, sân vườn, cổng có thiết kế đẹp.</p>
<h3>Có thể kết hợp tấm pin mặt trời</h3>
<p>Nhiều mẫu hỗ trợ tấm pin năng lượng mặt trời mini, giúp camera gần như không phải sạc thủ công nếu lắp ở nơi có nắng.</p>

<h2>Nhược điểm cần biết</h2>
<h3>Không ghi hình liên tục 24/7</h3>
<p>Để tiết kiệm pin, camera chỉ ghi các đoạn ngắn khi có chuyển động. Nếu bạn cần xem lại toàn bộ diễn biến trong ngày, camera dùng pin không đáp ứng được.</p>
<h3>Có độ trễ khi khởi động</h3>
<p>Từ lúc phát hiện đến lúc bắt đầu ghi mất khoảng nửa giây đến một giây. Đối tượng di chuyển nhanh có thể chỉ được ghi lại một phần.</p>
<h3>Cần sạc pin định kỳ</h3>
<p>Thời lượng pin phụ thuộc vào số lần kích hoạt mỗi ngày, thời gian xem trực tiếp, nhiệt độ môi trường và cường độ sóng wifi. Thực tế thường từ vài tuần đến vài tháng mỗi lần sạc.</p>
<h3>Phụ thuộc vào sóng wifi</h3>
<p>Camera đặt xa router, sóng yếu sẽ tốn pin hơn và có thể mất kết nối. Một số dòng dùng trạm gốc (base station) riêng để khắc phục vấn đề này.</p>
<h3>Giá thành cao hơn camera cắm điện cùng độ phân giải</h3>
<p>Do tích hợp pin dung lượng lớn và các công nghệ tiết kiệm năng lượng.</p>

<h2>Mẹo kéo dài thời lượng pin</h2>
<ul>
  <li>Đặt camera trong vùng phủ sóng wifi tốt.</li>
  <li>Thu hẹp vùng phát hiện, tránh hướng ra đường có nhiều xe cộ qua lại.</li>
  <li>Giảm độ nhạy chuyển động nếu bị kích hoạt quá nhiều.</li>
  <li>Hạn chế xem trực tiếp lâu – đây là chế độ tiêu tốn pin nhất.</li>
  <li>Rút ngắn thời lượng mỗi đoạn ghi hình (ví dụ 15–20 giây).</li>
  <li>Lắp thêm tấm pin mặt trời nếu vị trí có nắng.</li>
</ul>

<h2>Khi nào nên chọn camera dùng pin?</h2>
<ul>
  <li>Cổng, sân vườn, nhà kho nhỏ không tiện đi dây điện.</li>
  <li>Nhà thuê, căn hộ không được phép khoan đục nhiều.</li>
  <li>Nhà vườn, trang trại, công trình cần giám sát tạm thời.</li>
  <li>Làm camera bổ sung cho các vị trí phụ trong hệ thống camera có dây sẵn có.</li>
</ul>

<h2>Khi nào không nên chọn?</h2>
<ul>
  <li>Khu vực cần <strong>ghi hình liên tục</strong> như quầy thu ngân, kho hàng giá trị.</li>
  <li>Nơi có lưu lượng người qua lại rất lớn (pin sẽ hết rất nhanh).</li>
  <li>Vị trí không có sóng wifi ổn định – khi đó nên cân nhắc camera 4G.</li>
</ul>

<h2>Kết luận</h2>
<p>Camera wifi dùng pin là giải pháp tiện lợi và hiệu quả cho nhiều tình huống, đặc biệt ở những nơi khó đi dây. Tuy nhiên, nó phát huy tốt nhất khi được dùng <strong>bổ sung</strong> cho hệ thống camera cắm điện, thay vì thay thế hoàn toàn. Hãy xác định rõ vị trí và nhu cầu để chọn đúng loại camera cho ngôi nhà của bạn.</p>
""",
    },
    # ------------------------------------------------------------------
    {
        "slug": "huong-dan-cai-dat-camera-imou-tren-dien-thoai",
        "cat": "huong-dan",
        "date": "08.11.2026",
        "title": "Hướng dẫn cài đặt camera IMOU trên điện thoại",
        "cover_src": P + "250-1019-camera-trong-nha-ranger-mini-3mp-ipc-k2mp-5h1we.jpg",
        "summary": "Hướng dẫn chi tiết từng bước cài đặt camera IMOU bằng ứng dụng Imou Life: thêm thiết bị, kết nối wifi, thiết lập thẻ nhớ, cảnh báo và chia sẻ quyền xem cho người thân.",
        "body": """
<p>Camera IMOU được nhiều gia đình tin dùng nhờ giá thành hợp lý, hình ảnh rõ nét và ứng dụng <strong>Imou Life</strong> thân thiện, hỗ trợ tiếng Việt. Chỉ với chiếc điện thoại, bạn hoàn toàn có thể tự cài đặt camera trong khoảng 10 phút. Dưới đây là hướng dẫn chi tiết từng bước.</p>

<h2>Chuẩn bị trước khi cài đặt</h2>
<ul>
  <li><strong>Điện thoại</strong> đã cài ứng dụng <strong>Imou Life</strong> (tải miễn phí trên App Store hoặc Google Play).</li>
  <li><strong>Mạng wifi băng tần 2.4 GHz</strong> và mật khẩu wifi. Phần lớn camera IMOU gia đình không hỗ trợ wifi 5 GHz.</li>
  <li><strong>Thẻ nhớ microSD</strong> (khuyến nghị 64–128 GB, loại chuyên dụng cho camera) nếu muốn lưu video.</li>
  <li>Camera đã cắm nguồn, đặt gần router wifi trong lúc cài đặt.</li>
</ul>
<div class="article-tip"><strong>Lưu ý:</strong> Lắp thẻ nhớ khi camera đã <strong>tắt nguồn</strong> để tránh lỗi thẻ. Với các mẫu camera xoay, khe thẻ nhớ thường nằm phía dưới ống kính – xoay nhẹ ống kính lên trên để thấy khe cắm.</div>

<h2>Bước 1: Tạo tài khoản Imou Life</h2>
<p>Mở ứng dụng, chọn <strong>Đăng ký</strong> và dùng email hoặc số điện thoại để tạo tài khoản. Nhập mã xác minh được gửi về, đặt mật khẩu và đăng nhập. Hãy chọn khu vực là <strong>Việt Nam</strong> để kết nối máy chủ ổn định nhất.</p>

<h2>Bước 2: Thêm thiết bị bằng mã QR</h2>
<ol>
  <li>Tại màn hình chính, nhấn dấu <strong>"+"</strong> ở góc trên bên phải.</li>
  <li>Chọn <strong>Quét mã QR</strong>.</li>
  <li>Quét mã QR dán trên thân, đáy camera hoặc trên vỏ hộp.</li>
</ol>
<p>Nếu không quét được, bạn có thể chọn nhập thủ công số serial (SN) in bên dưới mã QR.</p>

<h2>Bước 3: Kết nối camera với wifi</h2>
<ol>
  <li>Chờ đèn trạng thái trên camera <strong>nhấp nháy xanh</strong> (sẵn sàng kết nối), rồi xác nhận trên ứng dụng.</li>
  <li>Chọn mạng wifi nhà bạn và nhập chính xác mật khẩu.</li>
  <li>Đặt điện thoại gần camera. Ứng dụng có thể phát âm thanh hoặc hiển thị mã QR để camera nhận thông tin wifi.</li>
  <li>Chờ khoảng 1–2 phút. Khi đèn camera chuyển <strong>xanh sáng đứng</strong> và ứng dụng báo thành công là hoàn tất.</li>
</ol>

<h2>Bước 4: Đặt tên và bảo mật thiết bị</h2>
<p>Đặt tên dễ nhớ theo vị trí lắp như "Phòng khách", "Cổng trước". Ứng dụng sẽ yêu cầu tạo <strong>mật khẩu thiết bị</strong> – đây là lớp bảo mật để mã hóa video, hãy đặt mật khẩu mạnh và ghi nhớ cẩn thận.</p>

<h2>Bước 5: Khởi tạo thẻ nhớ</h2>
<p>Vào <strong>Cài đặt thiết bị → Bộ nhớ</strong>, chọn <strong>Định dạng</strong> (Format) thẻ nhớ. Sau khi định dạng, trạng thái hiển thị "Bình thường" là camera đã sẵn sàng ghi hình.</p>

<h2>Bước 6: Thiết lập cảnh báo thông minh</h2>
<ul>
  <li><strong>Phát hiện chuyển động:</strong> bật và điều chỉnh độ nhạy phù hợp.</li>
  <li><strong>Phát hiện con người:</strong> nên bật để giảm thông báo do lá cây, bóng nắng.</li>
  <li><strong>Vùng phát hiện:</strong> chỉ khoanh vùng khu vực cần quan tâm, bỏ qua đường phố, cây cối.</li>
  <li><strong>Lịch cảnh báo:</strong> ví dụ chỉ nhận thông báo ban đêm hoặc khi cả nhà đi vắng.</li>
  <li><strong>Còi, đèn báo động</strong> (với mẫu có hỗ trợ): kích hoạt để răn đe khi phát hiện xâm nhập.</li>
</ul>
<p>Đừng quên cho phép ứng dụng Imou Life <strong>gửi thông báo</strong> trong phần cài đặt của điện thoại.</p>

<h2>Bước 7: Chia sẻ quyền xem cho người thân</h2>
<p>Vào <strong>Cài đặt thiết bị → Chia sẻ</strong>, nhập tài khoản Imou Life của người thân. Bạn có thể giới hạn quyền như chỉ xem trực tiếp, xem lại hoặc nhận cảnh báo. Không nên chia sẻ trực tiếp tài khoản và mật khẩu chính của mình.</p>

<h2>Các tính năng hữu ích nên biết</h2>
<ul>
  <li><strong>Đàm thoại hai chiều:</strong> nói chuyện với người ở nhà qua loa camera.</li>
  <li><strong>Theo dõi chuyển động:</strong> camera xoay tự động bám theo người di chuyển.</li>
  <li><strong>Chế độ riêng tư:</strong> tạm tắt camera khi cả nhà ở nhà.</li>
  <li><strong>Lật hình:</strong> dùng khi lắp camera úp ngược trên trần.</li>
</ul>

<h2>Xử lý lỗi thường gặp</h2>
<h3>Kết nối wifi thất bại</h3>
<ul>
  <li>Kiểm tra đúng mạng 2.4 GHz và mật khẩu (phân biệt chữ hoa, chữ thường).</li>
  <li>Tên wifi nên không chứa ký tự đặc biệt hoặc dấu tiếng Việt.</li>
  <li>Đặt camera gần router hơn trong lúc cài đặt.</li>
</ul>
<h3>Camera đã được thêm vào tài khoản khác</h3>
<p>Người đang sở hữu cần xóa camera khỏi tài khoản của họ trước, sau đó bạn mới thêm được.</p>
<h3>Muốn cài đặt lại từ đầu</h3>
<p>Nhấn giữ nút <strong>Reset</strong> trên camera khoảng 10 giây cho đến khi đèn thay đổi, chờ camera khởi động lại rồi thực hiện lại từ Bước 2.</p>

<p>Chúc bạn cài đặt thành công! Nếu gặp khó khăn, đừng ngần ngại liên hệ hotline để kỹ thuật viên hỗ trợ trực tiếp.</p>
""",
    },
]
