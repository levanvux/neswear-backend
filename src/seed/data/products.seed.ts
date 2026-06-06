import { Category } from '../../products/entities/product.entity';
import { Size } from '../../products/entities/product-variant.entity';

export const productsSeed = [
  // ACCESSORY
  {
    name: 'Balo đa năng',
    price: 299000,
    category: Category.ACCESSORY,
    images: ['products/accessory/balo-da-nang.png'],
    variants: [
      { color: 'black', size: Size.M, stock: 15 },
      { color: 'black', size: Size.L, stock: 10 },
    ],
  },

  {
    name: 'Mũ bucket',
    price: 99000,
    category: Category.ACCESSORY,
    images: ['products/accessory/mu-bucket.png'],
    variants: [{ color: 'beige', size: Size.M, stock: 30 }],
  },

  {
    name: 'Mũ beanie',
    price: 79000,
    category: Category.ACCESSORY,
    images: [
      'products/accessory/mu-beanie-den.png',
      'products/accessory/mu-beanie-nau.png',
    ],
    variants: [
      { color: 'black', size: Size.M, stock: 25 },
      { color: 'brown', size: Size.M, stock: 20 },
    ],
  },

  {
    name: 'Mũ lưỡi trai',
    price: 89000,
    category: Category.ACCESSORY,
    images: [
      'products/accessory/mu-luoi-trai-den.png',
      'products/accessory/mu-luoi-trai-xanh-duong.png',
    ],
    variants: [
      { color: 'black', size: Size.M, stock: 20 },
      { color: 'blue', size: Size.M, stock: 20 },
    ],
  },

  {
    name: 'Thắt lưng da',
    price: 129000,
    category: Category.ACCESSORY,
    images: [
      'products/accessory/that-lung-da-den.png',
      'products/accessory/that-lung-da-nau.png',
    ],
    variants: [
      { color: 'black', size: Size.M, stock: 20 },
      { color: 'brown', size: Size.M, stock: 20 },
    ],
  },

  {
    name: 'Thắt lưng đan',
    price: 129000,
    category: Category.ACCESSORY,
    images: [
      'products/accessory/that-lung-dan-den.png',
      'products/accessory/that-lung-dan-nau.png',
    ],
    variants: [
      { color: 'black', size: Size.M, stock: 20 },
      { color: 'brown', size: Size.M, stock: 20 },
    ],
  },

  {
    name: 'Túi đeo chéo',
    price: 199000,
    category: Category.ACCESSORY,
    images: ['products/accessory/tui-deo-cheo.png'],
    variants: [{ color: 'black', size: Size.M, stock: 15 }],
  },

  {
    name: 'Túi bán nguyệt',
    price: 199000,
    category: Category.ACCESSORY,
    images: [
      'products/accessory/tui-ban-nguyet-trang.png',
      'products/accessory/tui-ban-nguyet-xanh-duong.png',
      'products/accessory/tui-ban-nguyet-xanh-la.png',
      'products/accessory/tui-ban-nguyet-xam.png',
    ],
    variants: [
      { color: 'white', size: Size.M, stock: 15 },
      { color: 'blue', size: Size.M, stock: 15 },
      { color: 'green', size: Size.M, stock: 15 },
      { color: 'gray', size: Size.M, stock: 15 },
    ],
  },

  {
    name: 'Túi vải tái chế',
    price: 99000,
    category: Category.ACCESSORY,
    images: ['products/accessory/tui-vai-tai-che.png'],
    variants: [{ color: 'white', size: Size.M, stock: 15 }],
  },

  // JACKET
  {
    name: 'Áo blazer đen',
    price: 499000,
    category: Category.JACKET,
    images: [
      'products/jacket/ao-blazer-den.png',
      'products/jacket/ao-blazer-be.png',
      'products/jacket/ao-blazer-xam.png',
    ],
    variants: [
      { color: 'black', size: Size.M, stock: 10 },
      { color: 'black', size: Size.L, stock: 8 },
      { color: 'beige', size: Size.M, stock: 10 },
      { color: 'beige', size: Size.L, stock: 8 },
      { color: 'gray', size: Size.M, stock: 10 },
      { color: 'gray', size: Size.L, stock: 8 },
    ],
  },

  {
    name: 'Áo canvas',
    price: 459000,
    category: Category.JACKET,
    images: [
      'products/jacket/ao-canvas-navy.png',
      'products/jacket/ao-canvas-kaki.png',
    ],
    variants: [
      { color: 'navy', size: Size.M, stock: 12 },
      { color: 'navy', size: Size.L, stock: 12 },
      { color: 'khaki', size: Size.M, stock: 12 },
      { color: 'khaki', size: Size.L, stock: 12 },
    ],
  },

  {
    name: 'Áo harrington',
    price: 459000,
    category: Category.JACKET,
    images: [
      'products/jacket/ao-harrington-navy.png',
      'products/jacket/ao-harrington-kaki.png',
    ],
    variants: [
      { color: 'navy', size: Size.M, stock: 12 },
      { color: 'navy', size: Size.L, stock: 12 },
      { color: 'khaki', size: Size.M, stock: 12 },
      { color: 'khaki', size: Size.L, stock: 12 },
    ],
  },

  {
    name: 'Áo phao',
    price: 599000,
    category: Category.JACKET,
    images: [
      'products/jacket/ao-phao-be.png',
      'products/jacket/ao-phao-den.png',
    ],
    variants: [
      { color: 'beige', size: Size.M, stock: 8 },
      { color: 'beige', size: Size.L, stock: 6 },
      { color: 'black', size: Size.M, stock: 8 },
      { color: 'black', size: Size.L, stock: 6 },
    ],
  },

  {
    name: 'Áo chống nắng',
    price: 299000,
    category: Category.JACKET,
    images: [
      'products/jacket/ao-chong-nang-xam.png',
      'products/jacket/ao-chong-nang-be.png',
    ],
    variants: [
      { color: 'gray', size: Size.M, stock: 8 },
      { color: 'gray', size: Size.L, stock: 6 },
      { color: 'beige', size: Size.M, stock: 8 },
      { color: 'beige', size: Size.L, stock: 6 },
    ],
  },

  {
    name: 'Áo măng tô',
    price: 599000,
    category: Category.JACKET,
    images: [
      'products/jacket/ao-mang-to-nau-dam.png',
      'products/jacket/ao-mang-to-nau-nhat.png',
    ],
    variants: [
      { color: 'dark brown', size: Size.M, stock: 8 },
      { color: 'dark brown', size: Size.L, stock: 6 },
      { color: 'light brown', size: Size.M, stock: 8 },
      { color: 'light brown', size: Size.L, stock: 6 },
    ],
  },

  {
    name: 'Áo blouson',
    price: 499000,
    category: Category.JACKET,
    images: [
      'products/jacket/ao-blouson-navy.png',
      'products/jacket/ao-blouson-be.png',
    ],
    variants: [
      { color: 'navy', size: Size.M, stock: 8 },
      { color: 'navy', size: Size.L, stock: 6 },
      { color: 'beige', size: Size.M, stock: 8 },
      { color: 'beige', size: Size.L, stock: 6 },
    ],
  },

  // PANTS
  {
    name: 'Quần jean',
    price: 299000,
    category: Category.PANTS,
    images: [
      'products/pants/quan-jean-den.png',
      'products/pants/quan-jean-xanh.png',
    ],
    variants: [
      { color: 'black', size: Size.M, stock: 15 },
      { color: 'black', size: Size.L, stock: 10 },
      { color: 'blue', size: Size.M, stock: 15 },
      { color: 'blue', size: Size.L, stock: 10 },
    ],
  },

  {
    name: 'Quần túi hộp',
    price: 299000,
    category: Category.PANTS,
    images: [
      'products/pants/quan-tui-hop-xam.png',
      'products/pants/quan-tui-hop-den.png',
      'products/pants/quan-tui-hop-be.png',
    ],
    variants: [
      { color: 'gray', size: Size.M, stock: 15 },
      { color: 'gray', size: Size.L, stock: 10 },
      { color: 'black', size: Size.M, stock: 15 },
      { color: 'black', size: Size.L, stock: 10 },
      { color: 'beige', size: Size.M, stock: 15 },
      { color: 'beige', size: Size.L, stock: 10 },
    ],
  },

  {
    name: 'Quần chino',
    price: 259000,
    category: Category.PANTS,
    images: [
      'products/pants/quan-chino-xam.png',
      'products/pants/quan-chino-den.png',
      'products/pants/quan-chino-be.png',
    ],
    variants: [
      { color: 'gray', size: Size.M, stock: 15 },
      { color: 'gray', size: Size.L, stock: 10 },
      { color: 'black', size: Size.M, stock: 15 },
      { color: 'black', size: Size.L, stock: 10 },
      { color: 'beige', size: Size.M, stock: 15 },
      { color: 'beige', size: Size.L, stock: 10 },
    ],
  },

  {
    name: 'Quần shorts',
    price: 199000,
    category: Category.PANTS,
    images: [
      'products/pants/quan-shorts-den.png',
      'products/pants/quan-shorts-be.png',
    ],
    variants: [
      { color: 'black', size: Size.M, stock: 18 },
      { color: 'black', size: Size.L, stock: 18 },
      { color: 'beige', size: Size.M, stock: 18 },
      { color: 'beige', size: Size.L, stock: 18 },
    ],
  },

  {
    name: 'Quần short đen thể thao',
    price: 199000,
    category: Category.PANTS,
    images: [
      'products/pants/quan-shorts-the-thao-den.png',
      'products/pants/quan-shorts-the-thao-navy.png',
      'products/pants/quan-shorts-the-thao-xanh-reu.png',
    ],
    variants: [
      { color: 'black', size: Size.M, stock: 25 },
      { color: 'black', size: Size.L, stock: 20 },
      { color: 'navy', size: Size.M, stock: 25 },
      { color: 'navy', size: Size.L, stock: 20 },
      { color: 'olive green', size: Size.M, stock: 25 },
      { color: 'olive green', size: Size.L, stock: 20 },
    ],
  },

  {
    name: 'Quần dài ống rộng',
    price: 299000,
    category: Category.PANTS,
    images: [
      'products/pants/quan-dai-ong-rong-be.png',
      'products/pants/quan-dai-ong-rong-nau.png',
    ],
    variants: [
      { color: 'beige', size: Size.M, stock: 25 },
      { color: 'beige', size: Size.L, stock: 25 },
      { color: 'brown', size: Size.M, stock: 25 },
      { color: 'brown', size: Size.L, stock: 25 },
    ],
  },

  {
    name: 'Quần jogger',
    price: 249000,
    category: Category.PANTS,
    images: [
      'products/pants/quan-jogger-den.png',
      'products/pants/quan-jogger-xam.png',
      'products/pants/quan-jogger-xanh-reu.png',
    ],
    variants: [
      { color: 'black', size: Size.M, stock: 25 },
      { color: 'gray', size: Size.M, stock: 25 },
      { color: 'olive green', size: Size.M, stock: 25 },
      { color: 'black', size: Size.L, stock: 25 },
      { color: 'gray', size: Size.L, stock: 25 },
      { color: 'olive green', size: Size.L, stock: 25 },
    ],
  },

  {
    name: 'Quần nỉ',
    price: 299000,
    category: Category.PANTS,
    images: [
      'products/pants/quan-ni-xanh-la.png',
      'products/pants/quan-ni-xam.png',
      'products/pants/quan-ni-be.png',
    ],
    variants: [
      { color: 'green', size: Size.M, stock: 25 },
      { color: 'green', size: Size.L, stock: 25 },
      { color: 'gray', size: Size.M, stock: 25 },
      { color: 'gray', size: Size.L, stock: 25 },
      { color: 'beige', size: Size.M, stock: 25 },
      { color: 'beige', size: Size.L, stock: 25 },
    ],
  },

  {
    name: 'Quần tây',
    price: 399000,
    category: Category.PANTS,
    images: [
      'products/pants/quan-tay-be.png',
      'products/pants/quan-tay-den.png',
      'products/pants/quan-tay-xam.png',
    ],
    variants: [
      { color: 'black', size: Size.M, stock: 25 },
      { color: 'beige', size: Size.M, stock: 25 },
      { color: 'gray', size: Size.M, stock: 25 },
      { color: 'black', size: Size.L, stock: 25 },
      { color: 'beige', size: Size.L, stock: 25 },
      { color: 'gray', size: Size.L, stock: 25 },
    ],
  },

  // SHIRT
  {
    name: 'Áo thun dài tay',
    price: 149000,
    category: Category.SHIRT,
    images: [
      'products/shirt/ao-thun-dai-tay-xanh-duong.png',
      'products/shirt/ao-thun-dai-tay-cam.png',
      'products/shirt/ao-thun-dai-tay-xanh-la.png',
    ],
    variants: [
      { color: 'blue', size: Size.S, stock: 30 },
      { color: 'blue', size: Size.M, stock: 30 },
      { color: 'blue', size: Size.L, stock: 30 },
      { color: 'orange', size: Size.S, stock: 30 },
      { color: 'orange', size: Size.M, stock: 30 },
      { color: 'orange', size: Size.L, stock: 30 },
      { color: 'green', size: Size.S, stock: 30 },
      { color: 'green', size: Size.M, stock: 30 },
      { color: 'green', size: Size.L, stock: 30 },
    ],
  },

  {
    name: 'Áo thun',
    price: 99000,
    category: Category.SHIRT,
    images: [
      'products/shirt/ao-thun-trang.png',
      'products/shirt/ao-thun-xanh-la.png',
      'products/shirt/ao-thun-xanh-duong.png',
    ],
    variants: [
      { color: 'white', size: Size.S, stock: 30 },
      { color: 'white', size: Size.M, stock: 30 },
      { color: 'white', size: Size.L, stock: 30 },
      { color: 'white', size: Size.XL, stock: 30 },

      { color: 'green', size: Size.S, stock: 30 },
      { color: 'green', size: Size.M, stock: 30 },
      { color: 'green', size: Size.L, stock: 30 },
      { color: 'green', size: Size.XL, stock: 30 },

      { color: 'blue', size: Size.S, stock: 30 },
      { color: 'blue', size: Size.M, stock: 30 },
      { color: 'blue', size: Size.L, stock: 30 },
      { color: 'blue', size: Size.XL, stock: 30 },
    ],
  },

  {
    name: 'Áo thun tay lở',
    price: 129000,
    category: Category.SHIRT,
    images: [
      'products/shirt/ao-thun-tay-lo-xanh-reu.png',
      'products/shirt/ao-thun-tay-lo-tim.png',
      'products/shirt/ao-thun-tay-lo-cam.png',
      'products/shirt/ao-thun-tay-lo-navy.png',
    ],
    variants: [
      { color: 'olive green', size: Size.S, stock: 10 },
      { color: 'olive green', size: Size.M, stock: 10 },
      { color: 'olive green', size: Size.L, stock: 10 },

      { color: 'purple', size: Size.S, stock: 10 },
      { color: 'purple', size: Size.M, stock: 10 },
      { color: 'purple', size: Size.L, stock: 10 },

      { color: 'orange', size: Size.S, stock: 10 },
      { color: 'orange', size: Size.M, stock: 10 },
      { color: 'orange', size: Size.L, stock: 10 },

      { color: 'navy', size: Size.S, stock: 10 },
      { color: 'navy', size: Size.M, stock: 10 },
      { color: 'navy', size: Size.L, stock: 10 },
    ],
  },

  {
    name: 'Áo thun kẻ sọc',
    price: 129000,
    category: Category.SHIRT,
    images: [
      'products/shirt/ao-thun-ke-soc-vang.png',
      'products/shirt/ao-thun-ke-soc-xanh-la.png',
      'products/shirt/ao-thun-ke-soc-nau-dat.png',
    ],
    variants: [
      { color: 'yellow', size: Size.S, stock: 20 },
      { color: 'yellow', size: Size.M, stock: 20 },
      { color: 'yellow', size: Size.L, stock: 20 },

      { color: 'green', size: Size.S, stock: 20 },
      { color: 'green', size: Size.M, stock: 20 },
      { color: 'green', size: Size.L, stock: 20 },

      { color: 'earth brown', size: Size.S, stock: 20 },
      { color: 'earth brown', size: Size.M, stock: 20 },
      { color: 'earth brown', size: Size.L, stock: 20 },
    ],
  },

  {
    name: 'Áo sơ mi',
    price: 399000,
    category: Category.SHIRT,
    images: [
      'products/shirt/ao-so-mi-trang.png',
      'products/shirt/ao-so-mi-xanh.png',
    ],
    variants: [
      { color: 'white', size: Size.S, stock: 15 },
      { color: 'white', size: Size.M, stock: 15 },
      { color: 'white', size: Size.L, stock: 10 },
      { color: 'blue', size: Size.S, stock: 15 },
      { color: 'blue', size: Size.M, stock: 15 },
      { color: 'blue', size: Size.L, stock: 10 },
    ],
  },

  {
    name: 'Áo hoodie nỉ',
    price: 299000,
    category: Category.SHIRT,
    images: [
      'products/shirt/ao-hoodie-ni-xam-dam.png',
      'products/shirt/ao-hoodie-ni-cam.png',
      'products/shirt/ao-hoodie-ni-xanh-la.png',
    ],
    variants: [
      { color: 'dark gray', size: Size.M, stock: 20 },
      { color: 'dark gray', size: Size.L, stock: 20 },
      { color: 'orange', size: Size.M, stock: 20 },
      { color: 'orange', size: Size.L, stock: 20 },
      { color: 'green', size: Size.M, stock: 20 },
      { color: 'green', size: Size.L, stock: 20 },
    ],
  },

  {
    name: 'Áo hoodie nỉ kéo khóa',
    price: 299000,
    category: Category.SHIRT,
    images: [
      'products/shirt/ao-hoodie-ni-keo-khoa-xanh-navy.png',
      'products/shirt/ao-hoodie-ni-keo-khoa-cam.png',
      'products/shirt/ao-hoodie-ni-keo-khoa-xam.png',
      'products/shirt/ao-hoodie-ni-keo-khoa-xanh-la.png',
    ],
    variants: [
      { color: 'navy', size: Size.M, stock: 20 },
      { color: 'navy', size: Size.L, stock: 20 },
      { color: 'gray', size: Size.M, stock: 20 },
      { color: 'gray', size: Size.L, stock: 20 },
      { color: 'orange', size: Size.M, stock: 20 },
      { color: 'orange', size: Size.L, stock: 20 },
      { color: 'green', size: Size.M, stock: 20 },
      { color: 'green', size: Size.L, stock: 20 },
    ],
  },

  {
    name: 'Áo nỉ',
    price: 199000,
    category: Category.SHIRT,
    images: ['products/shirt/ao-ni-do.png', 'products/shirt/ao-ni-xanh-la.png'],
    variants: [
      { color: 'red', size: Size.S, stock: 20 },
      { color: 'red', size: Size.M, stock: 20 },
      { color: 'red', size: Size.L, stock: 20 },
      { color: 'green', size: Size.S, stock: 20 },
      { color: 'green', size: Size.M, stock: 20 },
      { color: 'green', size: Size.L, stock: 20 },
    ],
  },

  {
    name: 'Áo thun cổ henley',
    price: 149000,
    category: Category.SHIRT,
    images: [
      'products/shirt/ao-thun-co-henley-xam.png',
      'products/shirt/ao-thun-co-henley-cam.png',
      'products/shirt/ao-thun-co-henley-den.png',
    ],
    variants: [
      { color: 'gray', size: Size.S, stock: 20 },
      { color: 'gray', size: Size.M, stock: 20 },
      { color: 'gray', size: Size.L, stock: 20 },
      { color: 'orange', size: Size.S, stock: 20 },
      { color: 'orange', size: Size.M, stock: 20 },
      { color: 'orange', size: Size.L, stock: 20 },
      { color: 'black', size: Size.S, stock: 20 },
      { color: 'black', size: Size.M, stock: 20 },
      { color: 'black', size: Size.L, stock: 20 },
    ],
  },

  {
    name: 'Áo thun không tay',
    price: 99000,
    category: Category.SHIRT,
    images: [
      'products/shirt/ao-thun-khong-tay-xanh-duong.png',
      'products/shirt/ao-thun-khong-tay-cam.png',
      'products/shirt/ao-thun-khong-tay-hong.png',
    ],
    variants: [
      { color: 'blue', size: Size.S, stock: 20 },
      { color: 'blue', size: Size.M, stock: 20 },
      { color: 'blue', size: Size.L, stock: 20 },
      { color: 'orange', size: Size.S, stock: 20 },
      { color: 'orange', size: Size.M, stock: 20 },
      { color: 'orange', size: Size.L, stock: 20 },
      { color: 'pink', size: Size.S, stock: 20 },
      { color: 'pink', size: Size.M, stock: 20 },
      { color: 'pink', size: Size.L, stock: 20 },
    ],
  },

  {
    name: 'Áo ba lỗ',
    price: 89000,
    category: Category.SHIRT,
    images: [
      'products/shirt/ao-ba-lo-hong.png',
      'products/shirt/ao-ba-lo-do.png',
      'products/shirt/ao-ba-lo-den.png',
    ],
    variants: [
      { color: 'pink', size: Size.S, stock: 20 },
      { color: 'pink', size: Size.M, stock: 20 },
      { color: 'pink', size: Size.L, stock: 20 },
      { color: 'red', size: Size.S, stock: 20 },
      { color: 'red', size: Size.M, stock: 20 },
      { color: 'red', size: Size.L, stock: 20 },
      { color: 'black', size: Size.S, stock: 20 },
      { color: 'black', size: Size.M, stock: 20 },
      { color: 'black', size: Size.L, stock: 20 },
    ],
  },

  //UNDERWEAR
  {
    name: 'Quần boxer',
    price: 69000,
    category: Category.UNDERWEAR,
    images: [
      'products/underwear/quan-lot-boxer-den.png',
      'products/underwear/quan-lot-boxer-navy.png',
    ],
    variants: [
      { color: 'black', size: Size.S, stock: 40 },
      { color: 'black', size: Size.M, stock: 40 },
      { color: 'black', size: Size.L, stock: 40 },
      { color: 'navy', size: Size.S, stock: 40 },
      { color: 'navy', size: Size.M, stock: 40 },
      { color: 'navy', size: Size.L, stock: 40 },
    ],
  },

  {
    name: 'Quần lót brief',
    price: 69000,
    category: Category.UNDERWEAR,
    images: [
      'products/underwear/quan-lot-brief-den.png',
      'products/underwear/quan-lot-brief-xam.png',
    ],
    variants: [
      { color: 'black', size: Size.S, stock: 40 },
      { color: 'black', size: Size.M, stock: 40 },
      { color: 'black', size: Size.L, stock: 40 },
      { color: 'gray', size: Size.S, stock: 40 },
      { color: 'gray', size: Size.M, stock: 40 },
      { color: 'gray', size: Size.L, stock: 40 },
    ],
  },

  {
    name: 'Quần trunks',
    price: 69000,
    category: Category.UNDERWEAR,
    images: [
      'products/underwear/quan-lot-trunks-navy.png',
      'products/underwear/quan-lot-trunks-xam.png',
      'products/underwear/quan-lot-trunks-xanh-duong.png',
    ],
    variants: [
      { color: 'navy', size: Size.S, stock: 40 },
      { color: 'navy', size: Size.M, stock: 40 },
      { color: 'navy', size: Size.L, stock: 40 },
      { color: 'gray', size: Size.S, stock: 40 },
      { color: 'gray', size: Size.M, stock: 40 },
      { color: 'gray', size: Size.L, stock: 40 },
      { color: 'blue', size: Size.S, stock: 40 },
      { color: 'blue', size: Size.M, stock: 40 },
      { color: 'blue', size: Size.L, stock: 40 },
    ],
  },

  {
    name: 'Tất cổ ngắn',
    price: 29000,
    category: Category.UNDERWEAR,
    images: [
      'products/underwear/tat-co-ngan-trang.png',
      'products/underwear/tat-co-ngan-navy.png',
      'products/underwear/tat-co-ngan-den.png',
      'products/underwear/tat-co-ngan-xam.png',
    ],
    variants: [
      { color: 'white', size: Size.M, stock: 50 },
      { color: 'white', size: Size.L, stock: 50 },
      { color: 'navy', size: Size.M, stock: 50 },
      { color: 'navy', size: Size.L, stock: 50 },
      { color: 'black', size: Size.M, stock: 50 },
      { color: 'black', size: Size.L, stock: 50 },
      { color: 'gray', size: Size.M, stock: 50 },
      { color: 'gray', size: Size.L, stock: 50 },
    ],
  },

  {
    name: 'Tất basic',
    price: 29000,
    category: Category.UNDERWEAR,
    images: [
      'products/underwear/tat-den.png',
      'products/underwear/tat-do.png',
      'products/underwear/tat-hong.png',
      'products/underwear/tat-trang.png',
    ],
    variants: [
      { color: 'black', size: Size.M, stock: 50 },
      { color: 'black', size: Size.L, stock: 50 },
      { color: 'red', size: Size.M, stock: 50 },
      { color: 'red', size: Size.L, stock: 50 },
      { color: 'pink', size: Size.M, stock: 50 },
      { color: 'pink', size: Size.L, stock: 50 },
      { color: 'white', size: Size.M, stock: 50 },
      { color: 'white', size: Size.L, stock: 50 },
    ],
  },

  {
    name: 'Tất cổ thấp',
    price: 29000,
    category: Category.UNDERWEAR,
    images: [
      'products/underwear/tat-co-thap-den.png',
      'products/underwear/tat-co-thap-xam.png',
    ],
    variants: [
      { color: 'black', size: Size.M, stock: 50 },
      { color: 'black', size: Size.L, stock: 50 },
      { color: 'gray', size: Size.M, stock: 50 },
      { color: 'gray', size: Size.L, stock: 50 },
    ],
  },
];
