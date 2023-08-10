// navigation.tsx

import React, { FC } from "react";
import { useVirtualKeyboardVisible } from "hooks";
import { BottomNavigation, Icon } from "zmp-ui";
import chatIcon from "static/iconchat.svg";

export const Navigation: FC = () => {
  const keyboardVisible = useVirtualKeyboardVisible();

  const openZaloChat = () => {
    window.location.href = "zalo://chat?uin=2470790692813683889"; // Thay <id của cửa hàng> bằng ID cửa hàng thực tế của bạn
  };

  if (keyboardVisible) {
    return <></>;
  }

  return (
    <BottomNavigation id="footer" className="z-50" onChange={function (activeKey: string): void {
      throw new Error("Function not implemented.");
    } }>
      {/* Các tabs khác */}
      <BottomNavigation.Item
        key="/message"
        label="Nhắn tin"
        icon={<img src={chatIcon} alt="chatIcon" />}
        onClick={openZaloChat}
      />
    </BottomNavigation>
  );
};
