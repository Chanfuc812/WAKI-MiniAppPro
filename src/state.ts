import { atom, selector, selectorFamily } from "recoil";
import { getLocation, getPhoneNumber, getUserInfo } from "zmp-sdk";
import sondauIcon from "static/category-sondau.svg";
import khacIcon from "static/category-khac.svg";
import phongnguIcon from "static/category-phongngu.svg";
import vanphongIcon from "static/category-vanphong.svg";
import phongkhachIcon from "static/category-phongkhach.svg";
import tonghopIcon from "static/category-tonghop.svg";
import phongthuyIcon from "static/category-phongthuy.svg";
import thuphapIcon from "static/category-thuphap.svg";
import logo from "static/logo.png";
import { Category, CategoryId } from "types/category";
import { Product, Variant } from "types/product";
import { Cart } from "types/cart";
import { Notification } from "types/notification";
import { calculateDistance } from "utils/location";
import { Store } from "types/delivery";
import { calcFinalPrice, getDummyImage } from "utils/product";
import { wait } from "utils/async";

export const userState = selector({
  key: "user",
  get: () => getUserInfo({}).then((res) => res.userInfo),
});

export const categoriesState = selector<Category[]>({
  key: "categories",
  get: () => [
    { id: "vphong", name: "Văn Phòng", icon: vanphongIcon },
    { id: "pkhach", name: "Phòng Khách", icon: phongkhachIcon },
    { id: "pngu", name: "Phòng Ngủ", icon: phongnguIcon },
    { id: "pthuy", name: "Phong Thủy", icon: sondauIcon },
    { id: "sdau", name: "Sơn Dầu", icon: phongthuyIcon },
    { id: "tphap", name: "Thư Pháp", icon: thuphapIcon},
    { id: "khac", name: "Cửa Hàng", icon: khacIcon },
    { id: "ctranh", name: "Combo Tranh", icon: tonghopIcon },
  ],
});

const description = `There is a set of mock banners available <u>here</u> in three colours and in a range of standard banner sizes`;

export const productsState = selector<Product[]>({
  key: "products",
  get: async () => {
    await wait(2000);
    const variants: Variant[] = [
      {
        key: "size",
        label: "Kích cỡ:",
        type: "single",
        default: "m",
        options: [
          {
            key: "s",
            label: "30x30cm",
            priceChange: {
              type: "percent",
              percent: 0,
            },
          },
          {
            key: "m",
            label: "40x40cm",
            priceChange: {
              type: "percent",
              percent: 0.334,
            },
          },
          {
            key: "l",
            label: "50x50cm",
            priceChange: {
              type: "percent",
              percent: 0.667,
            },
          },
          {
            key: "xl",
            label: "60x60cm",
            priceChange: {
              type: "percent",
              percent: 1.084,
            },
          },
        ],
      },
      {
        key: "Condition",
        label: "Chất liệu:",
        type: "single",
        default: "t1",
        options: [
          {
            key: "t1",
            label: "Canvas",
          },
          {
            key: "t2",
            label: "Canvas + viền",
            priceChange: {
              type: "percent",
              percent: 0.50,
            },
          },
          {
            key: "t3",
            label: "Gỗ Laminate",
            priceChange: {
              type: "percent",
              percent: 0.835,
            },
          },
        ],
      },
    ];
    return [
      {
        id: 1,
        name: "Tranh sơn dầu Hoa lá mùa thu",
        price: 120000,
        image: getDummyImage("product-square-1.jpg"),
        description,
        categoryId: ["pthuy","sdau"],
        variants,
      },
      {
        id: 2,
        name: "Bộ 3 tranh thể hình nữ tập Gym",
        price: 590000,
        image: getDummyImage("product-square-2.jpg"),
        description,
        categoryId: ["chang","ctranh"],
        variants,
      },
      {
        id: 3,
        name: "Bộ 3 tranh trang trí tiệm xăm độc đáo",
        price: 540000,
        image: getDummyImage("product-square-3.jpg"),
        description,
        categoryId: ["chang","ctranh"],
        variants,
      },
      {
        id: 4,
        name: "Tranh núi rừng hùng vĩ thực tế",
        price: 150000,
        image: getDummyImage("product-square-4.jpg"),
        description,
        categoryId: ["vphong", "pkhach","pngu","khac"],
        variants,
      },
      {
        id: 5,
        name: "Tranh nai có chiếc sừng hoa",
        price: 220000,
        image: getDummyImage("product-square-5.jpg"),
        description,
        categoryId: ["vphong", "pkhach","pngu","khac"],
        variants,
      },
      {
        id: 6,
        name: "Tranh hiện đại “thiếu nữ bán khỏa thân”",
        price: 180000,
        image: getDummyImage("product-square-6.jpg"),
        description,
        categoryId: ["chang","pkhach","pngu"],
        variants,
      },
      {
        id: 7,
        name: "Tranh Marvel - Civil War",
        price: 180000,
        image: getDummyImage("product-square-7.jpg"),
        description,
        categoryId: ["chang","pkhach","pngu"],
        variants,
      },
      {
        id: 8,
        name: "Tranh Phúc Lộc Thọ",
        price: 850000,
        image: getDummyImage("product-square-8.jpg"),
        description,
        categoryId: ["chang","pkhach","tphap","pthuy","ctranh"],
        variants,
      },
      {
        id: 9,
        name: "Bộ 3 tranh tạo động lực “Đi đúng giờ, làm đúng việc, hoàn thành đúng hẹn”",
        image: getDummyImage("product-rect-1.jpg"),
        price: 570000,
        sale: {
          type: "fixed",
          amount: 30000,
        },
        description,
        categoryId: ["coffee", "milktea", "drinks"],
        variants,
      },
      {
        id: 10,
        name: "Bộ 3 tranh chữ slogan “Too much chocolate is never ”",
        image: getDummyImage("product-rect-2.jpg"),
        price: 535000,
        sale: {
          type: "fixed",
          amount: 25000,
        },
        description,
        categoryId: ["vphong", "pkhach","pngu","ctranh","khac"],
        variants,
      },
      {
        id: 11,
        name: "Bộ 3 tranh sự nổi bật của những chiếc tàu nhỏ",
        price: 469000,
        image: getDummyImage("product-rect-3.jpg"),
        description,
        categoryId: ["pkhach","pngu","ctranh","khac"],
        variants,
        sale: {
          type: "fixed",
          amount: 19000,
        },
      },
    ];
  },
});

export const recommendProductsState = selector<Product[]>({
  key: "recommendProducts",
  get: ({ get }) => {
    const products = get(productsState);
    return products.filter((p) => p.sale);
  },
});

export const selectedCategoryIdState = atom({
  key: "selectedCategoryId",
  default: "coffee",
});

export const productsByCategoryState = selectorFamily<Product[], CategoryId>({
  key: "productsByCategory",
  get:
    (categoryId) =>
    ({ get }) => {
      const allProducts = get(productsState);
      return allProducts.filter((product) =>
        product.categoryId.includes(categoryId)
      );
    },
});

export const cartState = atom<Cart>({
  key: "cart",
  default: [],
});

export const totalQuantityState = selector({
  key: "totalQuantity",
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.reduce((total, item) => total + item.quantity, 0);
  },
});

export const totalPriceState = selector({
  key: "totalPrice",
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.reduce(
      (total, item) =>
        total + item.quantity * calcFinalPrice(item.product, item.options),
      0
    );
  },
});

export const notificationsState = atom<Notification[]>({
  key: "notifications",
  default: [
    {
      id: 1,
      image: logo,
      title: "Chào bạn mới",
      content:
        "Cảm ơn đã sử dụng ZaUI Coffee, bạn có thể dùng ứng dụng này để tiết kiệm thời gian xây dựng",
    },
    {
      id: 2,
      image: logo,
      title: "Giảm 50% lần đầu mua hàng",
      content: "Nhập WELCOME để được giảm 50% giá trị đơn hàng đầu tiên order",
    },
  ],
});

export const keywordState = atom({
  key: "keyword",
  default: "",
});

export const resultState = selector<Product[]>({
  key: "result",
  get: async ({ get }) => {
    const keyword = get(keywordState);
    if (!keyword.trim()) {
      return [];
    }
    const products = get(productsState);
    await wait(500);
    return products.filter((product) =>
      product.name.trim().toLowerCase().includes(keyword.trim().toLowerCase())
    );
  },
});

export const storesState = atom<Store[]>({
  key: "stores",
  default: [
    {
      id: 1,
      name: "Công ty TNHH Waki",
      address:
        "176C Phan Văn Trị, Phường 12, Quận Bình Thạnh, TP.HCM",
      lat: 10.741639,
      long: 106.714632,
    },
  ],
});

export const nearbyStoresState = selector({
  key: "nearbyStores",
  get: ({ get }) => {
    // Get the current location from the locationState atom
    const location = get(locationState);

    // Get the list of stores from the storesState atom
    const stores = get(storesState);

    // Calculate the distance of each store from the current location
    if (location) {
      const storesWithDistance = stores.map((store) => ({
        ...store,
        distance: calculateDistance(
          location.latitude,
          location.longitude,
          store.lat,
          store.long
        ),
      }));

      // Sort the stores by distance from the current location
      const nearbyStores = storesWithDistance.sort(
        (a, b) => a.distance - b.distance
      );

      return nearbyStores;
    }
    return [];
  },
});

export const selectedStoreIndexState = atom({
  key: "selectedStoreIndex",
  default: 0,
});

export const selectedStoreState = selector({
  key: "selectedStore",
  get: ({ get }) => {
    const index = get(selectedStoreIndexState);
    const stores = get(nearbyStoresState);
    return stores[index];
  },
});

export const selectedDeliveryTimeState = atom({
  key: "selectedDeliveryTime",
  default: +new Date(),
});

export const requestLocationTriesState = atom({
  key: "requestLocationTries",
  default: 0,
});

export const requestPhoneTriesState = atom({
  key: "requestPhoneTries",
  default: 0,
});

export const locationState = selector<
  { latitude: string; longitude: string } | false
>({
  key: "location",
  get: async ({ get }) => {
    const requested = get(requestLocationTriesState);
    if (requested) {
      const { latitude, longitude, token } = await getLocation({
        fail: console.warn,
      });
      if (latitude && longitude) {
        return { latitude, longitude };
      }
      if (token) {
        console.warn(
          "Sử dụng token này để truy xuất vị trí chính xác của người dùng",
          token
        );
        console.warn(
          "Chi tiết tham khảo: ",
          "https://mini.zalo.me/blog/thong-bao-thay-doi-luong-truy-xuat-thong-tin-nguoi-dung-tren-zalo-mini-app"
        );
        console.warn("Giả lập vị trí mặc định: VNG Campus");
        return {
          latitude: "10.7287",
          longitude: "106.7317",
        };
      }
    }
    return false;
  },
});

export const phoneState = selector<string | boolean>({
  key: "phone",
  get: async ({ get }) => {
    const requested = get(requestPhoneTriesState);
    if (requested) {
      const { number, token } = await getPhoneNumber({ fail: console.warn });
      if (number) {
        return number;
      }
      console.warn(
        "Sử dụng token này để truy xuất số điện thoại của người dùng",
        token
      );
      console.warn(
        "Chi tiết tham khảo: ",
        "https://mini.zalo.me/blog/thong-bao-thay-doi-luong-truy-xuat-thong-tin-nguoi-dung-tren-zalo-mini-app"
      );
      console.warn("Giả lập số điện thoại mặc định: 0337076898");
      return "0337076898";
    }
    return false;
  },
});
