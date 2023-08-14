import React, { Suspense } from "react";
import { Box, Page } from "zmp-ui";
import { Inquiry } from "./inquiry";
import { Welcome } from "./welcome";
import { Banner } from "./banner";
import { Categories } from "./categories";
import { Recommend } from "./recommend";
import { ProductList } from "./product-list";
import { Divider } from "components/divider";
import { BestSellerBanner } from "./bestSeller";
import { NewBanner } from "./new";
import { QuickPicks } from "./khungtranhanh";

const HomePage: React.FunctionComponent = () => {
  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Welcome />
      <Box className="flex-1 overflow-auto">
        <Inquiry />
        <Banner />
        <Suspense>
          <Categories />
        </Suspense>
        <Divider />
        <BestSellerBanner />
        <Recommend />
        <NewBanner/>
        <QuickPicks/>
        <Divider />
        <ProductList />
        <Divider />
      </Box>
    </Page>
  );
};

export default HomePage;
