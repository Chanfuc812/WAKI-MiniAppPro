import React, { FC } from "react";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { getDummyImage } from "utils/product";
import { Box } from "zmp-ui";

export const Banner: FC = () => {
  return (
    <Box className="bg-white" pb={4}>
      <Swiper
         modules={[Pagination]}
         pagination={{
           clickable: true,
         }}
         autoplay={{
           delay: 500, // Thời gian trễ là 15000 ms (15 giây)
         }}
         loop
         cssMode
       >
        {[1, 2, 3, 4, 5]
          .map((i) => getDummyImage(`banner-${i}.jpg`))
          .map((banner, i) => (
            <SwiperSlide key={i} className="px-4">
              <Box
                className="w-full rounded-lg aspect-[2/1] bg-cover bg-center bg-skeleton"
                style={{ backgroundImage: `url(${banner})` }}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  );
};
