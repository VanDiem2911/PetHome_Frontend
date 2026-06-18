// LanguageContext — Pet's Home
import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export const useLanguage = () => useContext(LanguageContext)

const translations = {
  vi: {
    // Navbar
    home: 'Trang chủ',
    shop: 'Cửa hàng',
    services: 'Dịch vụ',
    trackAppointment: 'Theo dõi lịch hẹn',
    contactUs: 'Liên hệ',
    deals: 'Ưu đãi',
    searchPlaceholder: 'Tìm kiếm tin tức...',
    address: '123 Đường Fake, California, Mỹ',
    account: 'Tài khoản',
    wishlist: 'Yêu thích',
    cart: 'Giỏ hàng',

    // Hero
    petStore: 'Dịch vụ thú cưng',
    heroTitle1: 'Thú cưng nhận được',
    heroTitle2: 'Điều tốt nhất',
    heroTitle3: 'từ chúng tôi',
    heroDesc: 'Chúng tôi yêu thương chăm sóc thú cưng của bạn nhiều như bạn vậy. Chúng tôi cung cấp các dịch vụ tắm rửa, vệ sinh và trông giữ chất lượng tốt nhất để thú cưng của bạn luôn khỏe mạnh, sạch sẽ và hạnh phúc.',
    shopNow: 'Đặt lịch ngay',

    // Categories
    browseCategory: 'Danh mục sản phẩm',
    petFood: 'Thức ăn hạt',
    petClothing: 'Phụ kiện quần áo',
    petGrooming: 'Tắm rửa & Vệ sinh',
    petHouses: 'Nhà & Chuồng nuôi',
    shopCategory: 'Xem danh mục',

    // Featured
    featuredProducts: 'Sản phẩm nổi bật',

    // Promo
    smarterWay: 'Mua sắm thông minh cho thú cưng',
    smarterDesc: 'Gợi ý cá nhân hóa, đặt lại đơn hàng nhanh chóng cùng sự tư vấn nhiệt tình của đội ngũ hỗ trợ. Chúng tôi có tất cả những gì bạn cần để chăm sóc thú cưng.',
    learnMore: 'Tìm hiểu thêm',

    // Trust Badges
    fastShipping: 'Giao hàng nhanh',
    onAllOrders: 'Cho mọi đơn hàng',
    safePayment: 'Thanh toán an toàn',
    secureCheckout: 'Thanh toán bảo mật 100%',
    easyReturns: 'Đổi trả dễ dàng',
    returnPolicy: 'Chính sách đổi trả 30 ngày',
    support247: 'Hỗ trợ 24/7',
    dedicatedSupport: 'Đội ngũ tư vấn tận tâm',
    qualityGuarantee: 'Cam kết chất lượng',
    certifiedProducts: 'Sản phẩm thú cưng chính hãng',

    // Best Sellers
    bestSelling: 'Sản phẩm bán chạy nhất',
    viewAll: 'Xem tất cả',
    addToCart: 'Thêm vào giỏ',
    added: '✓ Đã thêm',

    // Shop by Pet
    shopByPet: 'Mua theo thú cưng',

    // Blog
    newsBlog: 'Tin tức & Chia sẻ',
    readMore: 'Đọc thêm',

    // Shop page
    searchProducts: 'Tìm kiếm sản phẩm',
    typeToSearch: 'Nhập từ khóa tìm kiếm...',
    petCategories: 'Danh mục thú cưng',
    allPets: 'Tất cả thú cưng',
    dogs: 'Chó (Dogs)',
    cats: 'Mèo (Cats)',
    accessories: 'Phụ kiện (Accessories)',
    showing: 'Hiển thị',
    productsLabel: 'sản phẩm',
    sortBy: 'Sắp xếp theo',
    defaultSorting: 'Mặc định',
    lowToHigh: 'Giá: Thấp đến Cao',
    highToLow: 'Giá: Cao đến Thấp',
    loadingProducts: 'Đang tải sản phẩm...',
    noProducts: 'Không tìm thấy sản phẩm nào',
    resetFilters: 'Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.',

    // Services page
    premiumServices: 'Dịch vụ chăm sóc thú cưng',
    servicesDesc: 'Chúng tôi cung cấp các giải pháp chăm sóc sức khỏe, làm đẹp và rèn luyện tốt nhất cho người bạn nhỏ của bạn. Đặt lịch hẹn ngay hôm nay!',
    per: 'mỗi',
    bookAppointment: 'Đặt lịch ngay',
    bookService: 'Đăng ký dịch vụ',
    fillGroomingForm: 'Điền thông tin bên dưới để đăng ký lịch hẹn chăm sóc thú cưng.',
    yourName: 'Họ và tên',
    phoneNum: 'Số điện thoại',
    preferredDate: 'Ngày hẹn mong muốn',
    checkInDate: 'Ngày nhận thú cưng',
    checkOutDate: 'Ngày trả thú cưng',
    timeSlot: 'Khung giờ đặt lịch',
    totalStay: 'Tổng thời gian lưu trú:',
    estimatedCost: 'Dự kiến chi phí:',
    selectTimeSlot: '-- Chọn khung giờ --',
    extraNotes: 'Ghi chú thêm (Giống thú cưng, số tuổi, tính cách...)',
    cancel: 'Hủy bỏ',
    confirmBooking: 'Xác nhận đặt lịch',
    bookingConfirmed: 'Đặt lịch thành công!',
    bookingSuccessDesc: 'Lịch hẹn của bạn đã được ghi nhận. Đội ngũ tư vấn sẽ liên hệ lại với bạn qua số điện thoại để xác nhận.',

    // Detailed Services
    serviceGroomingTitle: 'Tắm rửa & Vệ sinh',
    serviceGroomingUnit: 'lượt',
    serviceGroomingDesc: 'Dịch vụ tắm rửa, tỉa lông, cắt móng chuyên nghiệp cho chó và mèo.',
    serviceGroomingBullet1: 'Tắm nhẹ nhàng & sấy khô',
    serviceGroomingBullet2: 'Cắt tỉa lông tạo kiểu',
    serviceGroomingBullet3: 'Vệ sinh tai & mắt',
    serviceGroomingBullet4: 'Cắt & dũa móng',

    serviceVeterinaryTitle: 'Chăm sóc Thú y',
    serviceVeterinaryUnit: 'lần khám',
    serviceVeterinaryDesc: 'Khám sức khỏe định kỳ, tiêm phòng, kiểm tra ký sinh trùng và tư vấn bác sĩ thú y.',
    serviceVeterinaryBullet1: 'Chẩn đoán y khoa chuyên nghiệp',
    serviceVeterinaryBullet2: 'Lịch tiêm phòng đầy đủ',
    serviceVeterinaryBullet3: 'Kê đơn & cung cấp thuốc',
    serviceVeterinaryBullet4: 'Kiểm tra răng miệng định kỳ',

    serviceBoardingTitle: 'Trông giữ Thú cưng',
    serviceBoardingUnit: 'ngày',
    serviceBoardingDesc: 'Phòng lưu trú sạch sẽ, an toàn và điều hòa nhiệt độ cho thú cưng khi bạn vắng nhà.',
    serviceBoardingBullet1: 'Chuồng lồng rộng rãi riêng biệt',
    serviceBoardingBullet2: 'Dinh dưỡng & cho ăn hàng ngày',
    serviceBoardingBullet3: 'Thời gian chơi đùa vận động',
    serviceBoardingBullet4: 'Giám sát trực tuyến 24/7',

    serviceHomeTitle: 'Dịch vụ tại nhà',
    serviceHomeUnit: 'lượt',
    serviceHomeDesc: 'Dịch vụ tắm rửa, vệ sinh, tỉa lông chuyên nghiệp ngay tại ngôi nhà thân yêu của bạn.',
    serviceHomeBullet1: 'Tắm vệ sinh & sấy lông tại chỗ',
    serviceHomeBullet2: 'Tỉa lông tạo kiểu chuyên nghiệp',
    serviceHomeBullet3: 'Cạo lông vệ sinh sạch sẽ',
    serviceHomeBullet4: 'Tiết kiệm thời gian, không cần di chuyển',

    serviceTrainingTitle: 'Huấn luyện Chó',
    serviceTrainingUnit: 'buổi',
    serviceTrainingDesc: 'Khóa học huấn luyện nghe lời cơ bản, xã hội hóa và sửa hành vi xấu.',
    serviceTrainingBullet1: 'Huấn luyện cơ bản (ngồi, nằm, dừng)',
    serviceTrainingBullet2: 'Đi dây xích không kéo',
    serviceTrainingBullet3: 'Xã hội hóa và làm quen bạn mới',
    serviceTrainingBullet4: 'Hướng dẫn cụ thể cho chủ nuôi',

    // Contact page
    contactDesc: 'Bạn có câu hỏi, yêu cầu riêng biệt hoặc cần hỗ trợ về đơn hàng? Hãy gửi thông điệp cho chúng tôi để được giải đáp sớm nhất.',
    phoneTitle: 'Số điện thoại',
    emailTitle: 'Địa chỉ Email',
    locationTitle: 'Hệ thống cửa hàng',
    hoursTitle: 'Giờ mở cửa',
    hoursValue: 'Thứ 2 - Chủ nhật: 8h - 21h',
    hoursSub: 'Ngày lễ: Nghỉ',
    mapPlaceholder: 'Bản đồ vị trí cửa hàng',
    sendMessage: 'Gửi lời nhắn cho chúng tôi',
    subject: 'Tiêu đề',
    messageDetails: 'Nội dung lời nhắn',
    messageDetailsPlaceholder: 'Mô tả chi tiết yêu cầu của bạn...',
    sendMsgBtn: 'Gửi lời nhắn',
    msgSentSuccess: 'Lời nhắn gửi thành công!',
    msgSentDesc: 'Cảm ơn bạn đã liên hệ với chúng tôi. Chúng tôi sẽ phản hồi lại qua email trong vòng 24 giờ làm việc.',

    // Cart page
    shoppingCart: 'Giỏ hàng của bạn',
    cartEmpty: 'Giỏ hàng trống',
    cartEmptyDesc: 'Có vẻ như bạn chưa chọn sản phẩm nào. Hãy khám phá cửa hàng của chúng tôi để lựa chọn đồ tốt nhất cho thú cưng nhé!',
    shopProductsBtn: 'Mua sắm sản phẩm',
    deliveryDetails: 'Thông tin nhận hàng',
    checkoutDesc: 'Vui lòng cung cấp địa chỉ giao nhận để hoàn tất đơn hàng.',
    deliveryAddr: 'Địa chỉ giao hàng',
    backToItems: 'Quay lại giỏ hàng',
    placeOrder: 'Đặt hàng ngay',
    processing: 'Đang xử lý...',
    orderSummary: 'Tóm tắt đơn hàng',
    orderPlacedSuccess: 'Đặt hàng thành công!',
    orderSuccessDesc: 'Cảm ơn bạn. Mã đơn hàng của bạn là',
    orderEmailNotify: 'Thông tin chi tiết đã được gửi về email. Đội ngũ cửa hàng sẽ gọi lại cho bạn sớm nhất.',
    continueShopping: 'Tiếp tục mua sắm',
    shippingCost: 'Phí vận chuyển',
    free: 'Miễn phí',
    total: 'Tổng thanh toán',
    shippingTip1: 'Mua thêm',
    shippingTip2: 'để được miễn phí vận chuyển.',

    // Footer
    company: 'Công ty',
    customerService: 'Hỗ trợ khách hàng',
    footerAbout: 'Chúng tôi luôn yêu thương và chăm sóc thú cưng của bạn như chính bạn vậy. Mang đến những sản phẩm chất lượng tốt nhất.',
    subscribeDesc: 'Đăng ký email để nhận thông tin ưu đãi mới nhất.',
    subscribePlaceholder: 'Địa chỉ email của bạn...',
    subscribeSuccess: '✓ Đăng ký thành công! Cảm ơn bạn.',
  },
  en: {
    // Navbar
    home: 'Home',
    shop: 'Shop',
    services: 'Services',
    trackAppointment: 'Track appointment',
    contactUs: 'Contact Us',
    deals: 'Offers',
    searchPlaceholder: 'Search news...',
    address: '123 Fake Street, California, USA',
    account: 'Account',
    wishlist: 'Wishlist',
    cart: 'Cart',

    // Hero
    petStore: 'Pet care services',
    heroTitle1: 'Your Pets Get',
    heroTitle2: 'The Best',
    heroTitle3: 'From Us',
    heroDesc: 'We care about your pets as much as you do. We provide quality bathing, grooming, and boarding services for your pet to keep them happy, healthy, and clean.',
    shopNow: 'Book Now',

    // Categories
    browseCategory: 'Browse by category',
    petFood: 'Pet Food',
    petClothing: 'Pet Clothing',
    petGrooming: 'Pet Grooming',
    petHouses: 'Pet Houses',
    shopCategory: 'Shop category',

    // Featured
    featuredProducts: 'Featured products',

    // Promo
    smarterWay: 'The smarter way to shop for your pet',
    smarterDesc: "Custom recommendations, fast reordering, and friendly customer support. We've got everything you need to keep your pet happy and healthy.",
    learnMore: 'Learn More',

    // Trust Badges
    fastShipping: 'Fast Shipping',
    onAllOrders: 'On all orders',
    safePayment: 'Safe Payment',
    secureCheckout: '100% secure checkout',
    easyReturns: 'Easy Returns',
    returnPolicy: '30 days return policy',
    support247: '24/7 Support',
    dedicatedSupport: 'Dedicated support',
    qualityGuarantee: 'Quality Guarantee',
    certifiedProducts: 'Certified pet products',

    // Best Sellers
    bestSelling: 'Best selling products',
    viewAll: 'View all',
    addToCart: 'Add to cart',
    added: '✓ Added',

    // Shop by Pet
    shopByPet: 'Shop by pet',

    // Blog
    newsBlog: 'News & Blog',
    readMore: 'Read more',

    // Shop page
    searchProducts: 'Search Products',
    typeToSearch: 'Type to search...',
    petCategories: 'Pet Categories',
    allPets: 'All Pets',
    dogs: 'Dogs (Chó)',
    cats: 'Cats (Mèo)',
    accessories: 'Accessories (Phụ kiện)',
    showing: 'Showing',
    productsLabel: 'products',
    sortBy: 'Sort by',
    defaultSorting: 'Default sorting',
    lowToHigh: 'Price: Low to High',
    highToLow: 'Price: High to Low',
    loadingProducts: 'Loading products...',
    noProducts: 'No products found',
    resetFilters: 'Try resetting your filters or search terms.',

    // Services page
    premiumServices: 'Our Premium Pet Services',
    servicesDesc: 'We offer high-quality care, pampering, and health consultations for your furry companions. Book an appointment today!',
    per: 'per',
    bookAppointment: 'Book Appointment',
    bookService: 'Book Service',
    fillGroomingForm: 'Fill out the form below to register a session for your pet.',
    yourName: 'Your Name',
    phoneNum: 'Phone Number',
    preferredDate: 'Preferred Date',
    checkInDate: 'Check-in Date',
    checkOutDate: 'Check-out Date',
    timeSlot: 'Time Slot',
    totalStay: 'Total duration of stay:',
    estimatedCost: 'Estimated cost:',
    selectTimeSlot: '-- Select time slot --',
    extraNotes: 'Extra Notes (Pet details, Breed, etc.)',
    cancel: 'Cancel',
    confirmBooking: 'Confirm Booking',
    bookingConfirmed: 'Booking Confirmed!',
    bookingSuccessDesc: 'We have received your appointment. We will call you shortly to confirm.',

    // Detailed Services
    serviceGroomingTitle: 'Pet Grooming',
    serviceGroomingUnit: 'session',
    serviceGroomingDesc: 'Professional bathing, styling, nail trimming, and hair trimming for dogs and cats.',
    serviceGroomingBullet1: 'Gentle bathing & blow dry',
    serviceGroomingBullet2: 'Custom coat trimming',
    serviceGroomingBullet3: 'Ear & eye cleaning',
    serviceGroomingBullet4: 'Nail clipping & filing',

    serviceVeterinaryTitle: 'Veterinary Care',
    serviceVeterinaryUnit: 'consultation',
    serviceVeterinaryDesc: 'Regular health checks, vaccinations, parasite control, and professional vet consultations.',
    serviceVeterinaryBullet1: 'Professional vet diagnostic',
    serviceVeterinaryBullet2: 'Vaccination schedules',
    serviceVeterinaryBullet3: 'Prescriptions & medicines',
    serviceVeterinaryBullet4: 'Dental healthcare check',

    serviceBoardingTitle: 'Pet Boarding',
    serviceBoardingUnit: 'day',
    serviceBoardingDesc: 'Safe, clean, and temperature-controlled rooms for your pets while you are away.',
    serviceBoardingBullet1: 'Individual spacious cages',
    serviceBoardingBullet2: 'Daily nutrition & feedings',
    serviceBoardingBullet3: 'Interactive play sessions',
    serviceBoardingBullet4: '24/7 web monitoring support',

    serviceHomeTitle: 'At-home Care',
    serviceHomeUnit: 'session',
    serviceHomeDesc: 'Professional bathing, styling, and hygiene services right at your home.',
    serviceHomeBullet1: 'On-site bathing & blow dry',
    serviceHomeBullet2: 'Professional coat trimming',
    serviceHomeBullet3: 'Sanitary shaving & cleaning',
    serviceHomeBullet4: 'No travel stress for your pets',

    serviceTrainingTitle: 'Dog Training',
    serviceTrainingUnit: 'lesson',
    serviceTrainingDesc: 'Basic obedience training, socializing skills, and behavioral correction lessons.',
    serviceTrainingBullet1: 'Obedience training (sit/stay)',
    serviceTrainingBullet2: 'Leash training skills',
    serviceTrainingBullet3: 'Socialization guidelines',
    serviceTrainingBullet4: 'Owner-handling instructions',

    // Contact page
    contactDesc: 'Have questions, custom inquiries, or need help with your orders? Reach out to us and we will reply as soon as possible.',
    phoneTitle: 'Phone Number',
    emailTitle: 'Email Address',
    locationTitle: 'Store Location',
    hoursTitle: 'Opening Hours',
    hoursValue: 'Mon - Sun: 8am - 9pm',
    hoursSub: 'Holidays: Closed',
    mapPlaceholder: 'Map view placeholder',
    sendMessage: 'Send Us a Message',
    subject: 'Subject',
    messageDetails: 'Message Details',
    messageDetailsPlaceholder: 'Provide detailed description of your query...',
    sendMsgBtn: 'Send Message',
    msgSentSuccess: 'Message Sent Successfully!',
    msgSentDesc: 'Thank you for contacting Pet Shop. We have received your query and will respond back within 24 business hours.',

    // Cart page
    shoppingCart: 'Your Shopping Cart',
    cartEmpty: 'Your Cart is Empty',
    cartEmptyDesc: 'Looks like you have not added anything to your cart yet. Browse our shop to find the best items for your pets!',
    shopProductsBtn: 'Shop Products',
    deliveryDetails: 'Delivery Details',
    checkoutDesc: 'Please provide your delivery information to finalize the checkout.',
    deliveryAddr: 'Delivery Address',
    backToItems: 'Back to Items',
    placeOrder: 'Place Order',
    processing: 'Processing...',
    orderSummary: 'Order Summary',
    orderPlacedSuccess: 'Order Placed Successfully!',
    orderSuccessDesc: 'Thank you. Your order code is',
    orderEmailNotify: 'We have sent a confirmation email. Our team will contact you shortly via phone.',
    continueShopping: 'Continue Shopping',
    shippingCost: 'Shipping cost',
    free: 'Free',
    total: 'Total',
    shippingTip1: 'Add',
    shippingTip2: 'more for free shipping.',

    // Footer
    company: 'Company',
    customerService: 'Customer Service',
    footerAbout: 'We care about your pets as much as you do. We provide quality service and products for your pet.',
    subscribeDesc: 'Subscribe to get latest updates and offers.',
    subscribePlaceholder: 'Your email address...',
    subscribeSuccess: '✓ Subscribed successfully! Thank you.',
  }
}

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('petshop_lang') || 'vi'
  })

  const changeLanguage = (newLang) => {
    setLang(newLang)
    localStorage.setItem('petshop_lang', newLang)
  }

  const t = (key) => {
    return translations[lang]?.[key] || key
  }

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
