import React, { FC } from "react";
import { Text } from "zmp-ui";

export const TermsAndPolicies: FC = () => {
  return (
    <Text className="text-gray px-4" size="xxSmall">
      Bằng việc tiến hành thanh toán, bạn đồng ý với{" "}
      <u>
      <strong>
        <a href="https://waki.vn/chinh-sach-bao-mat-thong-tin-quyen-rieng-tu" target="_blank" >
          điều kiện và điều khoản sử dụng
        </a>
        </strong>
      </u>{" "}
      của WAKI MiniApp. Ngoài ra, chúng tôi còn có những{" "}
      <u>
      <strong>
        <a href="https://waki.vn/chinh-sach-bao-hanh" target="_blank" >
         chính sách bảo hành
        </a>
        </strong>
      </u>{" "}riêng cho khách hàng.
    </Text>

  );
};
