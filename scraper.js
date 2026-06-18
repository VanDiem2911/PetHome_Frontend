import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';

const BRANDS = [
  'Royal Canin', 'Whiskas', 'Pedigree', 'Me-O', 'Hill\'s', 'Purina', 'Bio-Groom', 
  'Kong', 'PetHome', 'Cature', 'Ciao', 'Catsrang', 'Nutrience', 'Orijen', 
  'Acana', 'Taste of the Wild', 'Minino', 'Zenith', 'ANF', 'Nekko', 'Inaba', 
  'SmartFeed', 'PetCarry', 'PetFashion', 'VetCare'
];

function getBrand(name) {
  const lowerName = name.toLowerCase();
  for (const brand of BRANDS) {
    if (lowerName.includes(brand.toLowerCase())) {
      return brand;
    }
  }
  const firstWord = name.split(' ')[0];
  if (firstWord && firstWord.length > 2 && firstWord !== 'Combo' && firstWord !== 'Thức' && firstWord !== 'Hạt' && firstWord !== 'Pate') {
    return firstWord;
  }
  return 'Pet' + '\'s Home';
}

function getEmoji(name, category) {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('hạt') || lowerName.includes('thức ăn') || lowerName.includes('pate') || lowerName.includes('tuna') || lowerName.includes('salmon') || lowerName.includes('cá') || lowerName.includes('thịt')) {
    if (category === 'Mèo') return '🐟';
    return '🍖';
  }
  if (lowerName.includes('đồ chơi') || lowerName.includes('xương') || lowerName.includes('bóng') || lowerName.includes('chuông') || lowerName.includes('cần câu')) {
    if (category === 'Mèo') return '🪶';
    return '🦴';
  }
  if (lowerName.includes('vòng cổ') || lowerName.includes('dây dắt') || lowerName.includes('quần') || lowerName.includes('áo') || lowerName.includes('nơ') || lowerName.includes('yếm')) {
    return '🎀';
  }
  if (lowerName.includes('chuồng') || lowerName.includes('nhà') || lowerName.includes('balo') || lowerName.includes('túi')) {
    return '🎒';
  }
  if (lowerName.includes('cát') || lowerName.includes('vệ sinh') || lowerName.includes('dầu gội') || lowerName.includes('tắm') || lowerName.includes('lược') || lowerName.includes('kìm')) {
    return '🛁';
  }
  if (lowerName.includes('sữa') || lowerName.includes('bình')) {
    return '🥛';
  }
  if (category === 'Chó') return '🐶';
  if (category === 'Mèo') return '🐱';
  return '🎁';
}

async function fetchPage(url, cacheFilename) {
  try {
    console.log(`Đang tải trang từ: ${url}...`);
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      timeout: 10000
    });
    fs.writeFileSync(cacheFilename, data, 'utf-8');
    return data;
  } catch (error) {
    console.warn(`Không thể tải trang ${url}. Sử dụng file cache ${cacheFilename} cục bộ...`);
    if (fs.existsSync(cacheFilename)) {
      return fs.readFileSync(cacheFilename, 'utf-8');
    }
    throw new Error(`Không tải được trang và không có cache cục bộ cho ${cacheFilename}`);
  }
}

async function scrapeAndSave() {
  let dogHtml = '';
  let catHtml = '';
  let dealsHtml = '';

  try {
    dogHtml = await fetchPage('https://www.petshome.vn/collections/cho', 'dog.html');
    catHtml = await fetchPage('https://www.petshome.vn/collections/meo', 'cat.html');
    dealsHtml = await fetchPage('https://www.petshome.vn/collections/san-pham-khuyen-mai', 'deals.html');
  } catch (err) {
    console.error('Lỗi khi cào dữ liệu:', err.message);
    return;
  }

  const productList = [];
  const productMap = new Map();

  function parseHtmlProducts(html, pageCategory, isDealsPage) {
    const $ = cheerio.load(html);

    $('.product-item').each((index, element) => {
      // 1. Tên sản phẩm
      const name = $(element).find('.right-block .product-name').text().trim() ||
                   $(element).find('.product-name').text().trim();
      if (!name) return;

      // 2. Đường dẫn liên kết sản phẩm
      const link = $(element).find('a.product-name').attr('href') || 
                   $(element).find('a').attr('href') || '';

      // 3. Giá sản phẩm
      const priceText = $(element).find('.price-new').text().trim();
      if (priceText === 'Liên hệ' || !priceText) return;

      const price = parseInt(priceText.replace(/\D/g, '')) || 0;
      if (price === 0) return;

      // 4. Giá cũ sản phẩm
      const oldPriceText = $(element).find('.price-old').text().trim();
      const oldPrice = oldPriceText ? (parseInt(oldPriceText.replace(/\D/g, '')) || null) : null;

      // 5. Link ảnh
      const imgEl = $(element).find('img.first-img');
      let imageUrl = imgEl.attr('data-lazyload') || imgEl.attr('src') || '';
      if (imageUrl.startsWith('//')) {
        imageUrl = 'https:' + imageUrl;
      }

      // Kiểm tra xem sản phẩm đã tồn tại chưa
      if (productMap.has(name)) {
        const existingProduct = productMap.get(name);
        if (isDealsPage && !existingProduct.sections.includes('deals')) {
          existingProduct.sections.push('deals');
        }
        return;
      }

      // 6. Tính giảm giá %
      let discount = 0;
      if (oldPrice && oldPrice > price) {
        discount = Math.round((1 - price / oldPrice) * 100);
      }

      // 7. Xác định Category (Chó, Mèo, Phụ kiện)
      let category = pageCategory;
      if (!category) {
        const titleLower = name.toLowerCase();
        const urlLower = link.toLowerCase();
        category = 'Phụ kiện';
        if (titleLower.includes('cho chó') || titleLower.includes('cún') || titleLower.includes('chó') || titleLower.includes('dog') || titleLower.includes('puppy') || titleLower.includes('poodle') || urlLower.includes('cho-cho') || urlLower.includes('cún')) {
          category = 'Chó';
        } else if (titleLower.includes('cho mèo') || titleLower.includes('mèo') || titleLower.includes('cat') || titleLower.includes('kitten') || titleLower.includes('tuna') || titleLower.includes('salmon') || urlLower.includes('cho-meo') || urlLower.includes('meo')) {
          category = 'Mèo';
        } else if (titleLower.includes('cát vệ sinh') || titleLower.includes('đồ chơi') || titleLower.includes('chuồng') || titleLower.includes('balo') || titleLower.includes('phụ kiện') || titleLower.includes('dây dắt') || titleLower.includes('vòng cổ')) {
          category = 'Phụ kiện';
        }
      }

      // 8. Nhãn hàng
      const brand = getBrand(name);

      // 9. Emojis
      const emoji = getEmoji(name, category);

      // 10. Hot
      const hot = discount >= 15 || Math.random() > 0.8;

      // 11. Phân chia sections
      const sections = [];
      if (isDealsPage) {
        sections.push('deals');
      }
      if (discount > 5) {
        sections.push('flashSale');
      }
      
      const currentIdx = productList.length;
      if (currentIdx < 15) {
        sections.push('featured');
      }
      if (currentIdx % 2 === 0 || sections.length === 0) {
        sections.push('bestSeller');
      }

      const rating = Math.floor(Math.random() * 2) + 4;
      const reviews = Math.floor(Math.random() * 180) + 20;

      const product = {
        id: 0,
        name: name,
        brand: brand,
        price: price,
        oldPrice: oldPrice,
        discount: discount,
        hot: hot,
        rating: rating,
        reviews: reviews,
        emoji: emoji,
        imageUrl: imageUrl,
        category: category,
        sections: sections,
        stock: 100
      };

      productList.push(product);
      productMap.set(name, product);
    });
  }

  console.log('Parsing dog products...');
  parseHtmlProducts(dogHtml, 'Chó', false);
  console.log('Parsing cat products...');
  parseHtmlProducts(catHtml, 'Mèo', false);
  console.log('Parsing deals products...');
  parseHtmlProducts(dealsHtml, null, true);

  // Đánh lại số ID tự tăng
  productList.forEach((product, idx) => {
    product.id = idx + 1;
  });

  // Ghi mảng sản phẩm ra file JSON
  fs.writeFileSync('products.json', JSON.stringify(productList, null, 2), 'utf-8');
  console.log(`Cào thành công! Đã lưu ${productList.length} sản phẩm vào file products.json (bao gồm chó, mèo, và khuyến mãi)`);
}

scrapeAndSave();
