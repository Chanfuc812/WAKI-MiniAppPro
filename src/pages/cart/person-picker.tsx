import { ListItem } from "components/list-item";
import React, { FC } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { phoneState, requestPhoneTriesState, userState } from "state";

export const PersonPicker: FC = () => {
  const user = useRecoilValue(userState);
  const phone = useRecoilValue(phoneState);

  if (!phone) {
    return <RequestPersonPickerPhone />;
  }

  return <ListItem title={`${user.name} - ${phone}`} subtitle="Người nhận" />;
};

export const RequestPersonPickerPhone: FC = () => {
  const retry = useSetRecoilState(requestPhoneTriesState);
  return (
    <ListItem
      onClick={() => retry((r) => r + 1)}
      title="Họ và tên - Số điện thoại"
      subtitle="Thông tin đăng ký Zalo"
    />
  );
};
