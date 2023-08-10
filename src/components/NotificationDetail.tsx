import React, { FC } from "react";
import { useParams } from "react-router-dom"; // Import useParams từ react-router-dom
import { useRecoilValue } from "recoil";
import { notificationsState } from "state";
import { Box, Page, Text } from "zmp-ui";

const NotificationDetail: FC = () => {
  const { id } = useParams(); // Lấy ID từ tham số đường dẫn
  const notifications = useRecoilValue(notificationsState);
  const notification = notifications.find(item => item.id === parseInt(id, 10)); // Tìm thông báo theo ID

  if (!notification) {
    // Xử lý trường hợp không tìm thấy thông báo
    return <p>Thông báo không tồn tại.</p>;
  }

  return (
    <Page>
      <Box className="bg-background">
        <Text.Header>{notification.title}</Text.Header>
        <Text size="small" className="text-gray">
          {notification.content}
        </Text>
      </Box>
    </Page>
  );
};



export default NotificationDetail;
