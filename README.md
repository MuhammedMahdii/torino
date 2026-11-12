# Torino | اپلیکیشن رزرو آنلاین تور

تورینو پلتفرم رزرو آنلاین تورهای داخلی و خارجی است. کاربر می‌تواند تورها را جستجو کند، جزئیات را ببیند، خرید را تکمیل کند و حساب کاربری خودش را مدیریت کند.

این پروژه به‌عنوان فرانت‌اند بوت‌کمپ با **Next.js 14** پیاده‌سازی شده و به API تورینو متصل می‌شود.

## دمو

![صفحه اصلی تورینو](docs/demo-home.png)

> جستجوی تور، لیست تورها، ورود با OTP، رزرو و مدیریت پروفایل — همه با رابط RTL و ریسپانسیو.

## ویژگی‌ها

- ورود و ثبت‌نام با شماره موبایل و کد OTP
- ذخیره توکن احراز هویت در cookie
- جستجوی تور بر اساس مبدا، مقصد و تاریخ
- نمایش لیست تورها با قیمت و جزئیات سفر
- صفحه جزئیات تور و رزرو
- فرم خرید نهایی با اعتبارسنجی (React Hook Form + Zod)
- پروفایل کاربر، ویرایش اطلاعات شخصی و بانکی
- تورهای من و تاریخچه تراکنش‌ها
- طراحی RTL، ریسپانسیو و هماهنگ با UI پروژه
- صفحات درباره ما، خدمات گردشگری، تماس با ما و ۴۰۴

## تکنولوژی‌ها

**فرانت‌اند**

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- TanStack React Query
- Axios
- Zustand
- React Hook Form + Zod
- react-multi-date-picker
- react18-input-otp
- Swiper / react-toastify / react-loader-spinner

**بک‌اند (API جدا)**

- Express.js
- JWT Authentication
- Swagger Documentation

## ساختار پروژه

```
torino/
├── docs/                 # تصاویر دمو برای README
├── public/images/        # لوگو، آیکون‌ها و تصاویر UI
├── src/
│   ├── app/              # صفحات App Router
│   ├── components/       # کامپوننت‌های UI
│   ├── services/         # ارتباط با API
│   ├── store/            # state احراز هویت
│   ├── lib/              # axios، cookie و utils
│   └── types/            # تایپ‌های TypeScript
├── .env.example
└── package.json
```

## پیش‌نیازها

- Node.js 18 یا بالاتر
- در حال اجرا بودن API تورینو روی پورت `6500`

## راه‌اندازی بک‌اند (API)

API در ریپوی جدا / پوشه والد پروژه قرار دارد و باید قبل از فرانت اجرا شود.

```bash
# در پوشه API
npm install
cp .env.example .env
npm start
```

بعد از اجرا:

| سرویس | آدرس |
|--------|------|
| API | `http://localhost:6500` |
| Swagger | `http://localhost:6500/api-docs` |

## راه‌اندازی فرانت‌اند

```bash
git clone https://github.com/MuhammedMahdii/torino.git
cd torino
npm install
cp .env.example .env.local
npm run dev
```

آدرس فرانت:

```
http://localhost:3000
```

### متغیر محیطی

فایل `.env.example`:

```env
NEXT_PUBLIC_API_URL=http://localhost:6500
```

## صفحات اصلی

| مسیر | توضیح |
|------|--------|
| `/` | صفحه اصلی، جستجو و لیست تورها |
| `/tours/[id]` | جزئیات تور و رزرو |
| `/checkout` | خرید نهایی |
| `/profile` | اطلاعات حساب کاربری |
| `/profile/tours` | تورهای من |
| `/profile/transactions` | تراکنش‌ها |
| `/about` `/services` `/contact` | صفحات معرفی |

## اسکریپت‌ها

```bash
npm run dev      # اجرای محیط توسعه
npm run build    # ساخت نسخه production
npm run start    # اجرای نسخه build شده
npm run lint     # بررسی ESLint
```

## نکات مهم

- برای لاگین، رزرو و پروفایل حتماً API روی `6500` روشن باشد.
- اعداد و شماره تلفن در UI به‌صورت ارقام فارسی نمایش داده می‌شوند.
- پروژه کاملاً RTL است و برای موبایل و دسکتاپ بهینه شده.

## توسعه‌دهنده

- GitHub: [MuhammedMahdii](https://github.com/MuhammedMahdii)
