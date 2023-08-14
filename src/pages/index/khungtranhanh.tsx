import { DisplayPrice } from "components/display/price";
import { ProductPicker } from "components/product/picker";
import { ProductSlideSkeleton } from "components/skeletons";
import { Section } from "components/section";
import React, { Suspense } from "react";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { quickPicksState } from "state";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Text } from "zmp-ui";
import { FinalPrice } from "components/display/final-price";

export const QuickPickContent: FC = () => {
  const quickPicks = useRecoilValue(quickPicksState);

  return (
    <Section title="KHUNG ẢNH - BẰNG KHEN 💌" padding="title-only">
      <Swiper slidesPerView={1.25} spaceBetween={16} className="px-4">
        {quickPicks.map((product) => (
          <SwiperSlide key={product.id}>
             <ProductPicker product={product}>
              {({ open }) => (
                <div onClick={open} className="space-y-3">
                  <Box
                    className="relative aspect-video rounded-lg bg-cover bg-center bg-skeleton"
                    style={{ backgroundImage: `url(${product.image})` }}
                  >
                    {product.sale && (
                      <Text
                        size="xxxxSmall"
                        className="absolute right-2 top-2 uppercase bg-green text-white h-4 px-[6px] rounded-full"
                      >
                        Giảm{" "}
                        {product.sale.type === "percent" ? (
                          `${product.sale.percent * 100}%`
                        ) : (
                          <DisplayPrice>{product.sale.amount}</DisplayPrice>
                        )}
                      </Text>
                    )}
                  </Box>
                  <Box className="space-y-1">
                    <Text size="small">{product.name}</Text>
                    <Text size="xxSmall" className="line-through text-gray">
                      <DisplayPrice>{product.price}</DisplayPrice>
                    </Text>
                    <Text size="large" className="font-medium text-primary">
                      <FinalPrice>{product}</FinalPrice>
                    </Text>
                  </Box>
                </div>
              )}
            </ProductPicker>
          </SwiperSlide>
        ))}
      </Swiper>
      </Section>
  );
};

export const QuickPickFallback: FC = () => {
  const quickPicks = [...new Array(3)];

  return (
    <Section title="KHUNG ẢNH - BẰNG KHEN 💌" padding="title-only">
      <Swiper slidesPerView={1.25} spaceBetween={16} className="px-4">
        {quickPicks.map((_, i) => (
          <SwiperSlide key={i}>
            <ProductSlideSkeleton />
          </SwiperSlide>
        ))}
      </Swiper>
      </Section>
  );
};

export const QuickPicks: FC = () => {
  return (
    <Suspense fallback={<QuickPickFallback />}>
      <QuickPickContent />
    </Suspense>
  );
};
