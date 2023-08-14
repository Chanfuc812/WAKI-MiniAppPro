import { FinalPrice } from "components/display/final-price";
import { DisplayPrice } from "components/display/price";
import { ProductPicker } from "components/product/picker";
import { Section } from "components/section";
import { ProductSlideSkeleton } from "components/skeletons";
import React, { Suspense } from "react";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { bestSellerProductsState } from "state"; // Thay vì recommendProductsState
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Text } from "zmp-ui";

export const BestSellerContent: FC = () => {
  const bestSellerProducts = useRecoilValue(bestSellerProductsState); // Thay vì recommendProductsState

  return (
    <Section title="TOP BÁN CHẠY🔝" padding="title-only"> {/* Thay vì "Gợi ý cho bạn" */}
      <Swiper slidesPerView={1.25} spaceBetween={16} className="px-4">
        {bestSellerProducts.map((product) => (
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

export const BestSellerFallback: FC = () => {
  const bestSellerProducts = [...new Array(3)];

  return (
    <Section title="TOP BÁN CHẠY🔝" padding="title-only">
      <Swiper slidesPerView={1.25} spaceBetween={16} className="px-4">
        {bestSellerProducts.map((_, i) => (
          <SwiperSlide key={i}>
            <ProductSlideSkeleton />
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  );
};

export const BestSellerBanner: FC = () => {
  return (
    <Suspense fallback={<BestSellerFallback />}>
      <BestSellerContent />
    </Suspense>
  );
};
