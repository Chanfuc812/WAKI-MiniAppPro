import { useVirtualKeyboardVisible } from "hooks";
import React, { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { MenuItem } from "types/menu";
import { BottomNavigation, Icon } from "zmp-ui";
import { CartIcon } from "./cart-icon";
import chatIcon from "static/iconchat.svg";
import { openChat } from "zmp-sdk/apis";


const tabs: Record<string, MenuItem> = {
  "/notification": {
    label: "Thông báo",
    icon: <Icon icon="zi-notif" />,
  },
  "/message": {
    label: "Nhắn tin",
    icon: <img src={chatIcon} alt="Chat Icon" />,
  },
  "/": {
    label: "Trang chủ",
    icon: <Icon icon="zi-home" />,
  },
  "/cart": {
    label: "Giỏ hàng",
    icon: <CartIcon />,
    activeIcon: <CartIcon active />,
  },
  "/profile": {
    label: "Cá nhân",
    icon: <Icon icon="zi-user" />,
  },
};


export type TabKeys = keyof typeof tabs;

export const Navigation: FC = () => {
  const [activeTab, setActiveTab] = useState<TabKeys>("/");
  const keyboardVisible = useVirtualKeyboardVisible();
  const navigate = useNavigate();
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        navigate("/");
        setActiveTab("/");
      }
    };
  
    document.addEventListener("visibilitychange", handleVisibilityChange);
  
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handleChatIconClick = () => {
    openChat({
      type: 'oa',
      id: '2470790692813683889', // Thay 'user-id' bằng ID của người dùng cụ thể
      message: 'Xin Chào',
      success: () => {
        console.log('Mở màn hình trò chuyện thành công');
      },
      fail: (err) => {
        console.error('Lỗi khi mở màn hình trò chuyện:', err);
      },
    });
  };

  if (keyboardVisible) {
    return <></>;
  }

  return (
    <BottomNavigation
      id="footer"
      activeKey={activeTab}
      onChange={(key: TabKeys) => setActiveTab(key)}
      className="z-50"
    >
      {Object.keys(tabs).map((path: TabKeys) => (
        <BottomNavigation.Item
        key={path}
        label={tabs[path].label}
        icon={path === "/message" ? (
          <div onClick={handleChatIconClick}>
            {activeTab === path ? tabs[path].activeIcon : tabs[path].icon}
          </div>
        ) : (
          tabs[path].icon
        )}
        activeIcon={tabs[path].activeIcon}
        onClick={() => navigate(path)}
      />
      
      ))}
    </BottomNavigation>
  );
};

