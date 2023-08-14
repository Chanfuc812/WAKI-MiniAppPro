import { atom, selector, selectorFamily } from "recoil";
import { getLocation, getUserInfo } from "zmp-sdk";
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
import api from "zmp-sdk";


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

const description = `Hãy chọn cho bức tranh của bạn một  <u>kích thước</u> và <u>chất liệu</u> phù hợp, chúng tôi sẵn lòng giúp đỡ bạn hoàn thiện nó một cách hoàn hảo nhất🌹`;

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
        name: "Tranh vintage treo tường “Saloon”",
        price: 180000,
        image: getDummyImage("product-square-9.jpg"),
        description,
        categoryId: ["chang","pkhach","pngu"],
        variants,
      },
      {
        id: 10,
        name: "Tranh thư pháp treo tường “Mẫu 1”",
        price: 180000,
        image: getDummyImage("product-square-10.jpg"),
        description,
        categoryId: ["tphap"],
        variants,
      },
      {
        id: 11,
        name: "Tranh thư pháp treo tường “Mẫu 2”",
        price: 180000,
        image: getDummyImage("product-square-11.jpg"),
        description,
        categoryId: ["tphap"],
        variants,
      },
      {
        id: 12,
        name: "Tranh thư pháp treo tường “Mẫu 3”",
        price: 180000,
        image: getDummyImage("product-square-12.jpg"),
        description,
        categoryId: ["tphap"],
        variants,
      },
      {
        id: 13,
        name: "Tranh thư pháp treo tường “Mẫu 4”",
        price: 180000,
        image: getDummyImage("product-square-13.jpg"),
        description,
        categoryId: ["tphap"],
        variants,
      },
      {
        id: 14,
        name: "Tranh thư pháp treo tường “Mẫu 5”",
        price: 180000,
        image: getDummyImage("product-square-14.jpg"),
        description,
        categoryId: ["tphap"],
        variants,
      },
      {
        id: 15,
        name: "Tranh thư pháp treo tường “Mẫu 6”",
        price: 180000,
        image: getDummyImage("product-square-15.jpg"),
        description,
        categoryId: ["tphap"],
        variants,
      },
      {
        id: 16,
        name: "Tranh thư pháp treo tường “Mẫu 7”",
        price: 180000,
        image: getDummyImage("product-square-16.jpg"),
        description,
        categoryId: ["tphap"],
        variants,
      },
      {
        id: 17,
        name: "Tranh thư pháp treo tường “Mẫu 8”",
        price: 180000,
        image: getDummyImage("product-square-17.jpg"),
        description,
        categoryId: ["tphap"],
        variants,
      },
      {
        id: 18,
        name: "Tranh thư pháp treo tường “Mẫu 9”",
        price: 180000,
        image: getDummyImage("product-square-18.jpg"),
        description,
        categoryId: ["tphap"],
        variants,
      },
      {
        id: 19,
        name: "Tranh thư pháp treo tường “Mẫu 10”",
        price: 180000,
        image: getDummyImage("product-square-19.jpg"),
        description,
        categoryId: ["tphap"],
        variants,
      },
      {
        id: 20,
        name: "Tranh thư pháp treo tường “Mẫu 11”",
        price: 180000,
        image: getDummyImage("product-square-20.jpg"),
        description,
        categoryId: ["tphap"],
        variants,
      },
      {
        id: 21,
        name: "Tranh thư pháp treo tường “Mẫu 12”",
        price: 180000,
        image: getDummyImage("product-square-21.jpg"),
        description,
        categoryId: ["tphap"],
        variants,
      },
      {
        id: 22,
        name: "Tranh thư pháp treo tường “Mẫu 13”",
        price: 180000,
        image: getDummyImage("product-square-22.jpg"),
        description,
        categoryId: ["tphap"],
        variants,
      },
      {
        id: 23,
        name: "Tranh thư pháp treo tường “Mẫu 14”",
        price: 180000,
        image: getDummyImage("product-square-23.jpg"),
        description,
        categoryId: ["tphap"],
        variants,
      },
      {
        id: 24,
        name: "Tranh thư pháp treo tường “Mẫu 15”",
        price: 180000,
        image: getDummyImage("product-square-24.jpg"),
        description,
        categoryId: ["tphap"],
        variants,
      },
      {
        id: 25,
        name: "Tranh thư pháp treo tường “Mẫu 16”",
        price: 180000,
        image: getDummyImage("product-square-25.jpg"),
        description,
        categoryId: ["tphap"],
        variants,
      },
      {
        id: 26,
        name: "Tranh thư pháp treo tường “Mẫu 17”",
        price: 180000,
        image: getDummyImage("product-square-26.jpg"),
        description,
        categoryId: ["tphap"],
        variants,
      },
      {
        id: 27,
        name: "Tranh thư pháp treo tường “Mẫu 18”",
        price: 180000,
        image: getDummyImage("product-square-27.jpg"),
        description,
        categoryId: ["tphap"],
        variants,
      },
      {
        id: 28,
        name: "Tranh thư pháp treo tường “Mẫu 19”",
        price: 180000,
        image: getDummyImage("product-square-28.jpg"),
        description,
        categoryId: ["tphap"],
        variants,
      },
      {
        id: 29,
        name: "Tranh thư pháp treo tường “Mẫu 20”",
        price: 180000,
        image: getDummyImage("product-square-29.jpg"),
        description,
        categoryId: ["tphap"],
        variants,
      },
      {
        id: 30,
        name: "Tranh thư pháp treo tường “Mẫu 21”",
        price: 180000,
        image: getDummyImage("product-square-30.jpg"),
        description,
        categoryId: ["tphap"],
        variants,
      },
      {
        id: 31,
        name: "Tranh thư pháp treo tường “Mẫu 22”",
        price: 180000,
        image: getDummyImage("product-square-31.jpg"),
        description,
        categoryId: ["tphap"],
        variants,
      },
      {
        id: 32,
        name: "Tranh thư pháp treo tường “Mẫu 23”",
        price: 180000,
        image: getDummyImage("product-square-32.jpg"),
        description,
        categoryId: ["tphap"],
        variants,
      },
      {
        id: 97,
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
        type: "bestSeller",
      },
      {
        id: 98,
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
        type: "recommend", 
      },
      {
        id: 99,
        name: "Bộ 3 tranh sự nổi bật của những chiếc tàu nhỏ",
        price: 469000,
        image: getDummyImage("product-rect-3.jpg"),
        description,
        categoryId: ["pkhach","pngu","ctranh","khac"],
        variants,
        type: "new", 
        sale: {
          type: "fixed",
          amount: 19000,
        },
      },
      
    ];
  },
});

// Sử dụng selector riêng cho từng loại banner
export const recommendProductsState = selector<Product[]>({
  key: "recommendProducts",
  get: ({ get }) => {
    const products = get(productsState);
    return products.filter((p) => p.type === "recommend" && p.sale );
  },
});

export const bestSellerProductsState = selector<Product[]>({
  key: "bestSellerProducts",
  get: ({ get }) => {
    const products = get(productsState);
    return products.filter((p) => p.type === "bestSeller" && p.sale);
  },
});

export const newProductsState  = selector<Product[]>({
  key: "newProducts",
  get: ({ get }) => {
    const products = get(productsState);
    return products.filter((p) => p.type === "new" && p.sale);
  },
});

export const quickPicksState  = selector<Product[]>({
  key: "quickPicks",
  get: ({ get }) => {
    const products = get(productsState);
    return products.filter((p) => p.type === "quick" && p.sale);
  },
});

export const selectedCategoryIdState = atom({
  key: "selectedCategoryId",
  default: "vphong",
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
      title: "Chào bạn mới!",
      content:
        "Cảm ơn đã sử dụng WAKI MiniApp, bạn có thể dùng ứng dụng này để chọn được những bức tranh và khung tranh phù hợp với mong muốn của bạn một cách nhanh chóng nhất.",
      linkTo: "https://waki.vn",
    },
    {
      id: 2,
      image: logo,
      title: "Giảm đến 30% cho lần đầu mua hàng qua MiniApp WAKI",
      content: "Nhập 'WAKI' để được giảm ngẫu nhiên từ 5-30% giá trị đơn hàng đầu tiên bạn order.",
      linkTo: "https://waki.vn",
    },
    {
      id: 3,
      image: logo,
      title: "Website chính thức của chúng tôi🔗 ",
      content: "Tham khảo nhiều sản phẩm hơn trên Website chính thức waki.vn🔗",
      linkTo: "https://waki.vn",
    },
    {
      id: 4,
      image: logo,
      title: "Hotline tổng đài tư vấn 24/7📞  ",
      content: "Tổng đài: (028) 73 088 089 - Hotline: 0909.439.071 ",
      linkTo: "https://waki.vn",
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

const getUserLocationByToken = async (token) => {
  // gọi API Server của bạn để truy xuất thông tin từ token và user access token
};
api.getLocation({
  success: async (data) => {
    // xử lý khi gọi api thành công
    let { token, latitude, longitude } = data;
    // xử lý cho trường hợp sử dụng phiên bản Zalo mới
    if (token) {
      const response = await getUserLocationByToken(token);
      latitude = response.latitude;
      longitude = response.longitude;
    }
  },
  fail: (error) => {
    // xử lý khi gọi api thất bại
    console.log(error);
  },
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
        console.warn("Giả lập vị trí mặc định: xưởng tranh Waki");
        return {
          latitude: "10.811632172873495",
          longitude: "106.69536324395551",
        };
      }
    }
    return false;
  },
});

const getPhoneNumberByToken = async (token) => {
  // gọi API Server của bạn để truy xuất thông tin từ token và user access token
};

export const phoneState = selector<string | boolean>({
  key: "phone",
  get: async ({ get }) => {
    const requested = get(requestPhoneTriesState);
    if (requested) {
      const { token, number } = await new Promise((resolve) => {
        api.getPhoneNumber({
          success: (data) => resolve(data),
          fail: (error) => {
            console.log(error);
            resolve({ token: null, number: null });
          },
        });
      });

      if (token) {
        const phoneNumber = await getPhoneNumberByToken(token);
        if (phoneNumber) {
          return phoneNumber;
        }
        console.warn("Giả lập số điện thoại mặc định: 0926547935");
        return "0926547935";
      }

      if (number) {
        return number;
      }

      return false;
    }
    return false;
    
  },
});
