import { useMemo, useState } from 'react';
import {
  ArrowRight,
  Coffee,
  Croissant,
  Globe2,
  IceCreamBowl,
  Search,
  Sparkles,
  Utensils,
  X,
} from 'lucide-react';
import LogoBadge from '@/components/LogoBadge';

type Language = 'en' | 'ku' | 'ar';
type CategoryId = 'burger' | 'wrap' | 'fries' | 'hot' | 'iced' | 'frappuccino' | 'refreshers' | 'matcha';

type Localized = Record<Language, string>;

type LogoStyle = 'flag' | 'cup';

type MenuItem = {
  name: Localized;
  description: Localized;
  price: string;
  image: string;
  logo: LogoStyle;
};

type Category = {
  id: CategoryId;
  label: Localized;
  icon: typeof Coffee;
  items: MenuItem[];
};

const copy: Record<Language, Record<string, string>> = {
  en: {
    welcome: 'Welcome to',
    tagline: 'Good coffee. Good food. Good memories.',
    choose: 'Choose your language',
    chooseHint: 'Select a language to explore our menu',
    viewMenu: 'View menu',
    menu: 'Menu',
    all: 'All items',
    search: 'Search the menu',
    noResults: 'No items found',
    noResultsHint: 'Try a different search term.',
    footer: 'Made with care by',
    location: 'Coffee · Food · Memories',
    prices: 'Prices in IQD',
  },
  ku: {
    welcome: 'بەخێربێیت بۆ',
    tagline: 'قاوەی باش. خواردنی خۆش. بیرەوەریی جوان.',
    choose: 'زمانەکەت هەڵبژێرە',
    chooseHint: 'زمانێک هەڵبژێرە بۆ بینینی مێنووەکەمان',
    viewMenu: 'بینینی مێنوو',
    menu: 'مێنوو',
    all: 'هەموو بەرهەمەکان',
    search: 'گەڕان لە مێنوو',
    noResults: 'هیچ بەرهەمێک نەدۆزرایەوە',
    noResultsHint: 'وشەیەکی تری تاقی بکەرەوە.',
    footer: 'دروستکراوە بە خۆشەویستی لەلایەن',
    location: 'قاوە · خواردن · بیرەوەری',
    prices: 'نرخەکان بە دیناری عێراقی',
  },
  ar: {
    welcome: 'أهلاً بك في',
    tagline: 'قهوة جيدة. طعام لذيذ. ذكريات جميلة.',
    choose: 'اختر لغتك',
    chooseHint: 'اختر لغة لاستكشاف قائمتنا',
    viewMenu: 'عرض القائمة',
    menu: 'القائمة',
    all: 'كل المنتجات',
    search: 'ابحث في القائمة',
    noResults: 'لم يتم العثور على منتجات',
    noResultsHint: 'جرّب كلمة بحث مختلفة.',
    footer: 'صُنع بعناية بواسطة',
    location: 'قهوة · طعام · ذكريات',
    prices: 'الأسعار بالدينار العراقي',
  },
};

const languages: { id: Language; label: string; native: string }[] = [
  { id: 'en', label: 'English', native: 'English' },
  { id: 'ku', label: 'کوردی', native: 'کوردی' },
  { id: 'ar', label: 'العربية', native: 'العربية' },
];

const item = (name: Localized, description: Localized, price: string, image: string, logo: LogoStyle): MenuItem => ({ name, description, price, image, logo });

const categories: Category[] = [
  {
    id: 'burger',
    label: { en: 'Burgers', ku: 'بەرگەر', ar: 'برجر' },
    icon: Utensils,
    items: [
      item({ en: '96 Loaded Burger', ku: 'بەرگەری لۆدکراوی ٩٦', ar: 'برجر 96 المحمّل' }, { en: 'Beef patty, chilli con carne, cheese, onion, tomato, lettuce with our signature sauce.', ku: 'گۆشتی بەرگر، چیلی کۆن کارنە، پەنیر، پیاز، تەماتە و کاهو لەگەڵ سۆسی تایبەتی.', ar: 'لحم بقري، تشيلي كون كارني، جبنة، بصل، طماطم وخس مع صلصتنا الخاصة.' }, '6,500', 'https://images.pexels.com/photos/3727243/pexels-photo-3727243.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'flag'),
      item({ en: '96 Burger', ku: 'بەرگەری ٩٦', ar: 'برجر 96' }, { en: 'Beef patty, cheese, onion, tomato, lettuce with our signature sauce.', ku: 'گۆشتی بەرگر، پەنیر، پیاز، تەماتە و کاهو لەگەڵ سۆسی تایبەتی.', ar: 'لحم بقري، جبنة، بصل، طماطم وخس مع صلصتنا الخاصة.' }, '6,000', 'https://images.pexels.com/photos/4080534/pexels-photo-4080534.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'flag'),
      item({ en: 'Classic Beef Burger', ku: 'بەرگەری کلاسیکی گۆشت', ar: 'برجر لحم كلاسيكي' }, { en: 'Beef patty, cheese, onion, tomato, lettuce with a classic burger sauce.', ku: 'گۆشتی بەرگر، پەنیر، پیاز، تەماتە و کاهو لەگەڵ سۆسی کلاسیکی بەرگر.', ar: 'لحم بقري، جبنة، بصل، طماطم وخس مع صلصة البرجر الكلاسيكية.' }, '5,500', 'https://images.pexels.com/photos/34491414/pexels-photo-34491414.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'flag'),
      item({ en: '96 Chicken Burger', ku: 'بەرگەری مریشکی ٩٦', ar: 'برجر دجاج 96' }, { en: 'Crispy chicken, cheese, onion, tomato, lettuce with our signature sauce.', ku: 'مریشکی کرسپ، پەنیر، پیاز، تەماتە و کاهو لەگەڵ سۆسی تایبەتی.', ar: 'دجاج مقرمش، جبنة، بصل، طماطم وخس مع صلصتنا الخاصة.' }, '5,000', 'https://images.pexels.com/photos/15476358/pexels-photo-15476358.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'flag'),
      item({ en: 'Burger Combo 1', ku: 'کۆمبۆی بەرگر ١', ar: 'كومبو برجر 1' }, { en: '96 burger, French fries and a fresh soft drink.', ku: 'بەرگەری ٩٦، پەتاتەی سوورکراوە و خواردنەوەی ساردی تازە.', ar: 'برجر 96، بطاطا مقلية ومشروب غازي بارد.' }, '9,000', 'https://images.pexels.com/photos/4328244/pexels-photo-4328244.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'flag'),
      item({ en: 'Burger Combo 2', ku: 'کۆمبۆی بەرگر ٢', ar: 'كومبو برجر 2' }, { en: 'Classic beef burger, French fries and a fresh soft drink.', ku: 'بەرگەری کلاسیکی گۆشت، پەتاتەی سوورکراوە و خواردنەوەی ساردی تازە.', ar: 'برجر لحم كلاسيكي، بطاطا مقلية ومشروب غازي بارد.' }, '8,500', 'https://images.pexels.com/photos/7708641/pexels-photo-7708641.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'flag'),
      item({ en: 'Burger Combo 3', ku: 'کۆمبۆی بەرگر ٣', ar: 'كومبو برجر 3' }, { en: 'Classic chicken burger, French fries and a fresh soft drink.', ku: 'بەرگەری کلاسیکی مریشک، پەتاتەی سوورکراوە و خواردنەوەی ساردی تازە.', ar: 'برجر دجاج كلاسيكي، بطاطا مقلية ومشروب غازي بارد.' }, '8,000', 'https://images.pexels.com/photos/19247570/pexels-photo-19247570.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'flag'),
    ],
  },
  {
    id: 'wrap',
    label: { en: 'Wraps', ku: 'ڕاپ', ar: 'راب' },
    icon: Croissant,
    items: [
      item({ en: '96 Chicken Wrap', ku: 'ڕاپی مریشکی ٩٦', ar: 'راب دجاج 96' }, { en: 'Crispy chicken, cheese, tomato, lettuce with our signature sauce.', ku: 'مریشکی کرسپ، پەنیر، تەماتە و کاهو لەگەڵ سۆسی تایبەتی.', ar: 'دجاج مقرمش، جبنة، طماطم وخس مع صلصتنا الخاصة.' }, '5,000', 'https://images.pexels.com/photos/16014305/pexels-photo-16014305.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'flag'),
      item({ en: 'Chicken Caesar Wrap', ku: 'ڕاپی مریشکی سیزەر', ar: 'راب دجاج سيزر' }, { en: 'Crispy chicken, cheese, tomato, lettuce with our signature Caesar sauce.', ku: 'مریشکی کرسپ، پەنیر، تەماتە و کاهو لەگەڵ سۆسی سیزەری تایبەتی.', ar: 'دجاج مقرمش، جبنة، طماطم وخس مع صلصة السيزر الخاصة.' }, '5,500', 'https://images.pexels.com/photos/12464909/pexels-photo-12464909.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'flag'),
      item({ en: 'Wrap Combo 1', ku: 'کۆمبۆی ڕاپ ١', ar: 'كومبو راب 1' }, { en: '96 chicken wrap, French fries and a fresh soft drink.', ku: 'ڕاپی مریشکی ٩٦، پەتاتەی سوورکراوە و خواردنەوەی ساردی تازە.', ar: 'راب دجاج 96، بطاطا مقلية ومشروب غازي بارد.' }, '6,000', 'https://images.pexels.com/photos/27668696/pexels-photo-27668696.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'flag'),
      item({ en: 'Wrap Combo 2', ku: 'کۆمبۆی ڕاپ ٢', ar: 'كومبو راب 2' }, { en: 'Chicken Caesar wrap, French fries and a fresh soft drink.', ku: 'ڕاپی مریشکی سیزەر، پەتاتەی سوورکراوە و خواردنەوەی ساردی تازە.', ar: 'راب دجاج سيزر، بطاطا مقلية ومشروب غازي بارد.' }, '6,500', 'https://images.pexels.com/photos/15913640/pexels-photo-15913640.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'flag'),
    ],
  },
  {
    id: 'fries',
    label: { en: 'Fries & Loaded Potato', ku: 'پەتاتە', ar: 'البطاطا' },
    icon: Utensils,
    items: [
      item({ en: 'French Fries', ku: 'پەتاتەی سوورکراوە', ar: 'بطاطا مقلية' }, { en: 'Crispy golden fries.', ku: 'پەتاتەی زێڕینی کرسپ.', ar: 'بطاطا ذهبية مقرمشة.' }, '3,500', 'https://images.pexels.com/photos/20535802/pexels-photo-20535802.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'flag'),
      item({ en: 'Potato Wedges', ku: 'پارچە پەتاتە', ar: 'شرائح بطاطا' }, { en: 'Seasoned potato wedges.', ku: 'پارچە پەتاتەی بەهاراتکراو.', ar: 'شرائح بطاطا متبلة.' }, '4,000', 'https://images.pexels.com/photos/20535803/pexels-photo-20535803.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'flag'),
      item({ en: 'Curly Fries', ku: 'پەتاتەی خولەک', ar: 'بطاطا حلزونية' }, { en: 'Crispy curly fries.', ku: 'پەتاتەی خولەکی کرسپ.', ar: 'بطاطا حلزونية مقرمشة.' }, '4,000', 'https://images.pexels.com/photos/29285459/pexels-photo-29285459.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'flag'),
      item({ en: 'Cheese Fries', ku: 'پەتاتە لەگەڵ پەنیر', ar: 'بطاطا بالجبنة' }, { en: 'Fries topped with melted cheese.', ku: 'پەتاتەی سوورکراوە لەگەڵ پەنیر.', ar: 'بطاطا مغطاة بالجبنة الذائبة.' }, '4,000', 'https://images.pexels.com/photos/8254061/pexels-photo-8254061.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'flag'),
      item({ en: 'Cheese Jalapeño', ku: 'پەنیر و جەلەپینۆ', ar: 'جبنة وهالابينو' }, { en: 'Fries, cheese and jalapeño.', ku: 'پەتاتە، پەنیر و جەلەپینۆ.', ar: 'بطاطا، جبنة وهالابينو.' }, '4,500', 'https://images.pexels.com/photos/28525214/pexels-photo-28525214.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'flag'),
      item({ en: 'Chilli Con Carne', ku: 'چیلی کۆن کارنە', ar: 'تشيلي كون كارني' }, { en: 'Loaded fries with chilli con carne.', ku: 'پەتاتەی لۆدکراو لەگەڵ چیلی کۆن کارنە.', ar: 'بطاطا محمّلة مع تشيلي كون كارني.' }, '5,000', 'https://images.pexels.com/photos/28525208/pexels-photo-28525208.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'flag'),
      item({ en: 'Loaded Fries Combo 1', ku: 'کۆمبۆی پەتاتەی لۆدکراو ١', ar: 'كومبو بطاطا محمّلة 1' }, { en: 'Cheese fries and a fresh soft drink.', ku: 'پەتاتەی پەنیر و خواردنەوەی ساردی تازە.', ar: 'بطاطا بالجبنة ومشروب غازي بارد.' }, '6,500', 'https://images.pexels.com/photos/37121076/pexels-photo-37121076.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'flag'),
      item({ en: 'Loaded Fries Combo 2', ku: 'کۆمبۆی پەتاتەی لۆدکراو ٢', ar: 'كومبو بطاطا محمّلة 2' }, { en: 'Cheese jalapeño fries and a fresh soft drink.', ku: 'پەتاتەی پەنیر و جەلەپینۆ لەگەڵ خواردنەوەی سارد.', ar: 'بطاطا بالجبنة والهالابينو ومشروب غازي بارد.' }, '6,500', 'https://images.pexels.com/photos/37121073/pexels-photo-37121073.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'flag'),
      item({ en: 'Loaded Fries Combo 3', ku: 'کۆمبۆی پەتاتەی لۆدکراو ٣', ar: 'كومبو بطاطا محمّلة 3' }, { en: 'Chilli con carne fries and a fresh soft drink.', ku: 'پەتاتەی چیلی کۆن کارنە لەگەڵ خواردنەوەی سارد.', ar: 'بطاطا بتشيلي كون كارني ومشروب غازي بارد.' }, '6,500', 'https://images.pexels.com/photos/20535803/pexels-photo-20535803.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'flag'),
    ],
  },
  {
    id: 'hot', label: { en: 'Hot Beverage', ku: 'خواردنەوەی گەرم', ar: 'مشروبات ساخنة' }, icon: Coffee, items: [
      item({ en: 'Espresso Single', ku: 'ئێسپریسۆ تاک', ar: 'إسبريسو مفرد' }, { en: 'Rich and balanced.', ku: 'قاوەی دەوڵەمەند و هاوسەنگ.', ar: 'قهوة غنية ومتوازنة.' }, '2,000', 'https://images.pexels.com/photos/4913342/pexels-photo-4913342.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'cup'),
      item({ en: 'Espresso Double Cafe', ku: 'ئێسپریسۆ دوو قاوە', ar: 'إسبريسو دبل كافيه' }, { en: 'Double shot espresso.', ku: 'دوو شۆتی ئێسپریسۆ.', ar: 'إسبريسو بجرعتين.' }, '2,000', 'https://images.pexels.com/photos/6747870/pexels-photo-6747870.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'cup'),
      item({ en: 'Latte', ku: 'لاتێ', ar: 'لاتيه' }, { en: 'Espresso with silky steamed milk.', ku: 'ئێسپریسۆ لەگەڵ شیری نەرمکراو.', ar: 'إسبريسو مع حليب مبخر ناعم.' }, '4,000', 'https://images.pexels.com/photos/2128026/pexels-photo-2128026.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'cup'),
      item({ en: 'Cappuccino', ku: 'کاپوچینۆ', ar: 'كابتشينو' }, { en: 'Espresso, steamed milk and foam.', ku: 'ئێسپریسۆ، شیر و فۆمی شیر.', ar: 'إسبريسو وحليب ورغوة.' }, '4,000', 'https://images.pexels.com/photos/31139336/pexels-photo-31139336.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'cup'),
      item({ en: 'Mocha', ku: 'مۆکا', ar: 'موكا' }, { en: 'Chocolate, espresso and milk.', ku: 'شۆکۆلاتە، ئێسپریسۆ و شیر.', ar: 'شوكولاتة وإسبريسو وحليب.' }, '4,500', 'https://images.pexels.com/photos/35549066/pexels-photo-35549066.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'cup'),
      item({ en: 'Spanish Latte', ku: 'لاتێی ئیسپانی', ar: 'لاتيه إسباني' }, { en: 'Espresso with sweet milk.', ku: 'ئێسپریسۆ لەگەڵ شیری شیرین.', ar: 'إسبريسو مع حليب حلو.' }, '4,500', 'https://images.pexels.com/photos/26626464/pexels-photo-26626464.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'cup'),
      item({ en: 'Pistachio Latte Hot', ku: 'لاتێی پستەی گەرم', ar: 'لاتيه فستق ساخن' }, { en: 'Creamy pistachio and espresso.', ku: 'پستەی کرێمی و ئێسپریسۆ.', ar: 'فستق كريمي وإسبريسو.' }, '5,000', 'https://images.pexels.com/photos/27860686/pexels-photo-27860686.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'cup'),
      item({ en: 'Chocolate', ku: 'شۆکۆلاتە', ar: 'شوكولاتة' }, { en: 'Warm, smooth chocolate.', ku: 'شۆکۆلاتەی گەرم و نەرم.', ar: 'شوكولاتة دافئة وناعمة.' }, '4,500', 'https://images.pexels.com/photos/36094445/pexels-photo-36094445.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'cup'),
      item({ en: 'Americano', ku: 'ئەمەریکانۆ', ar: 'أمريكانو' }, { en: 'Espresso and hot water.', ku: 'ئێسپریسۆ و ئاوی گەرم.', ar: 'إسبريسو وماء ساخن.' }, '3,000', 'https://images.pexels.com/photos/17375802/pexels-photo-17375802.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'cup'),
      item({ en: 'Caramel Macchiato', ku: 'کارامێل ماکیاتۆ', ar: 'كراميل ماكياتو' }, { en: 'Espresso, milk and caramel.', ku: 'ئێسپریسۆ، شیر و کارامێل.', ar: 'إسبريسو وحليب وكراميل.' }, '4,500', 'https://images.pexels.com/photos/32590864/pexels-photo-32590864.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'cup'),
      item({ en: 'Pumpkin Spiced Latte', ku: 'لاتێی بەهاراتی کدوو', ar: 'لاتيه اليقطين المتبل' }, { en: 'Seasonal pumpkin spice latte.', ku: 'لاتێی بەهاراتی کدووی وەرزی.', ar: 'لاتيه اليقطين المتبل.' }, '5,000', 'https://images.pexels.com/photos/2128026/pexels-photo-2128026.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'cup'),
      item({ en: 'Toffee Nut Latte', ku: 'لاتێی تۆفی نەت', ar: 'لاتيه توفي نت' }, { en: 'Sweet toffee and nut latte.', ku: 'لاتێی شیرینی تۆفی و نەت.', ar: 'لاتيه حلو بالتوفي والمكسرات.' }, '4,500', 'https://images.pexels.com/photos/35549066/pexels-photo-35549066.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'cup'),
    ],
  },
  {
    id: 'iced', label: { en: 'Iced Beverage', ku: 'خواردنەوەی سارد', ar: 'مشروبات باردة' }, icon: IceCreamBowl, items: [
      item({ en: 'Iced Latte', ku: 'لاتێی سارد', ar: 'لاتيه بارد' }, { en: 'Chilled espresso and milk.', ku: 'ئێسپریسۆ و شیری سارد.', ar: 'إسبريسو وحليب بارد.' }, '4,000', 'https://images.pexels.com/photos/18142624/pexels-photo-18142624.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'cup'),
      item({ en: 'Iced Cappuccino', ku: 'کاپوچینۆی سارد', ar: 'كابتشينو بارد' }, { en: 'Iced espresso with milk foam.', ku: 'ئێسپریسۆی سارد لەگەڵ فۆمی شیر.', ar: 'إسبريسو بارد مع رغوة الحليب.' }, '4,000', 'https://images.pexels.com/photos/32395584/pexels-photo-32395584.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'cup'),
      item({ en: 'Iced Mocha', ku: 'مۆکای سارد', ar: 'موكا بارد' }, { en: 'Chocolate, espresso and ice.', ku: 'شۆکۆلاتە، ئێسپریسۆ و بەستەر.', ar: 'شوكولاتة وإسبريسو وثلج.' }, '4,500', 'https://images.pexels.com/photos/32542054/pexels-photo-32542054.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'cup'),
      item({ en: 'Iced White Mocha', ku: 'مۆکای سپیی سارد', ar: 'موكا بيضاء باردة' }, { en: 'White chocolate and espresso.', ku: 'شۆکۆلاتەی سپی و ئێسپریسۆ.', ar: 'شوكولاتة بيضاء وإسبريسو.' }, '4,500', 'https://images.pexels.com/photos/4869290/pexels-photo-4869290.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'cup'),
      item({ en: 'Iced Spanish Latte', ku: 'لاتێی ئیسپانیی سارد', ar: 'لاتيه إسباني بارد' }, { en: 'Sweet chilled latte.', ku: 'لاتێی سارد و شیرین.', ar: 'لاتيه بارد وحلو.' }, '4,500', 'https://images.pexels.com/photos/35229818/pexels-photo-35229818.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'cup'),
      item({ en: 'Iced Pistachio Latte', ku: 'لاتێی پستەی سارد', ar: 'لاتيه فستق بارد' }, { en: 'Chilled pistachio latte.', ku: 'لاتێی پستەی سارد.', ar: 'لاتيه فستق بارد.' }, '5,000', 'https://images.pexels.com/photos/37464365/pexels-photo-37464365.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'cup'),
      item({ en: 'Iced Chocolate', ku: 'شۆکۆلاتەی سارد', ar: 'شوكولاتة باردة' }, { en: 'Smooth iced chocolate.', ku: 'شۆکۆلاتەی سارد و نەرم.', ar: 'شوكولاتة باردة وناعمة.' }, '4,500', 'https://images.pexels.com/photos/33029966/pexels-photo-33029966.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'cup'),
      item({ en: 'Iced Americano', ku: 'ئەمەریکانۆی سارد', ar: 'أمريكانو بارد' }, { en: 'Espresso, water and ice.', ku: 'ئێسپریسۆ، ئاو و بەستەر.', ar: 'إسبريسو وماء وثلج.' }, '3,000', 'https://images.pexels.com/photos/37604037/pexels-photo-37604037.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'cup'),
      item({ en: 'Iced Caramel Macchiato', ku: 'کارامێل ماکیاتۆی سارد', ar: 'كراميل ماكياتو بارد' }, { en: 'Caramel, milk and espresso.', ku: 'کارامێل، شیر و ئێسپریسۆ.', ar: 'كراميل وحليب وإسبريسو.' }, '4,500', 'https://images.pexels.com/photos/18142624/pexels-photo-18142624.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'cup'),
      item({ en: 'Cold Brew', ku: 'کۆڵد برو', ar: 'كولد برو' }, { en: 'Slow-steeped, smooth coffee.', ku: 'قاوەی بە هێواشی ئامادەکراو.', ar: 'قهوة محضرة بالتخمير البطيء.' }, '4,500', 'https://images.pexels.com/photos/32395584/pexels-photo-32395584.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'cup'),
    ],
  },
  {
    id: 'frappuccino', label: { en: 'Frappuccino', ku: 'فراپوچینۆ', ar: 'فرابتشينو' }, icon: IceCreamBowl, items: [
      item({ en: 'Vanilla Caramel Frappuccino', ku: 'فراپوچینۆی ڤانیلا و کارامێل', ar: 'فرابتشينو فانيلا وكراميل' }, { en: 'Vanilla, caramel, coffee and ice.', ku: 'ڤانیلا، کارامێل، قاوە و بەستەر.', ar: 'فانيلا وكراميل وقهوة وثلج.' }, '5,000', 'https://images.pexels.com/photos/9744980/pexels-photo-9744980.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'cup'),
      item({ en: 'Cookies & Cream Frappuccino', ku: 'فراپوچینۆی کوکیز و کرێم', ar: 'فرابتشينو كوكيز وكريم' }, { en: 'Cookies, cream, coffee and ice.', ku: 'کوکیز، کرێم، قاوە و بەستەر.', ar: 'كوكيز وكريم وقهوة وثلج.' }, '5,000', 'https://images.pexels.com/photos/31569964/pexels-photo-31569964.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'cup'),
      item({ en: 'Pistachio Mocha Frappuccino', ku: 'فراپوچینۆی مۆکا و پستە', ar: 'فرابتشينو موكا وفستق' }, { en: 'Pistachio, chocolate, coffee and ice.', ku: 'پستە، شۆکۆلاتە، قاوە و بەستەر.', ar: 'فستق وشوكولاتة وقهوة وثلج.' }, '5,000', 'https://images.pexels.com/photos/12801415/pexels-photo-12801415.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'cup'),
      item({ en: 'Vanilla Matcha Frappuccino', ku: 'فراپوچینۆی ماتچا و ڤانیلا', ar: 'فرابتشينو ماتشا وفانيلا' }, { en: 'Vanilla, matcha, milk and ice.', ku: 'ڤانیلا، ماتچا، شیر و بەستەر.', ar: 'فانيلا وماتشا وحليب وثلج.' }, '5,000', 'https://images.pexels.com/photos/12801417/pexels-photo-12801417.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'cup'),
    ],
  },
  {
    id: 'refreshers', label: { en: 'Refreshers', ku: 'خواردنەوەی تازەکەر', ar: 'منعشات' }, icon: Sparkles, items: [
      item({ en: 'Mojito Lemon', ku: 'مۆجیتۆی لیمۆ', ar: 'موهيتو ليمون' }, { en: 'Fresh lemon and mint.', ku: 'لیمۆی تازە و نەعنا.', ar: 'ليمون طازج ونعناع.' }, '4,000', 'https://images.pexels.com/photos/33107433/pexels-photo-33107433.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'cup'),
      item({ en: 'Strawberry, Blueberry & Passion Fruit', ku: 'تۆوت فرەنگی، بلوبێری و پاشن فرووت', ar: 'فراولة، توت أزرق وباشن فروت' }, { en: 'A bright fruit refresher.', ku: 'خواردنەوەیەکی میوەیی و تازە.', ar: 'مشروب فواكه منعش.' }, '5,000', 'https://images.pexels.com/photos/18142599/pexels-photo-18142599.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'cup'),
      item({ en: 'Energy Mojito', ku: 'مۆجیتۆی وزەبەخش', ar: 'موهيتو الطاقة' }, { en: 'Energy drink with fresh citrus.', ku: 'خواردنەوەی وزەبەخش لەگەڵ سیتروس.', ar: 'مشروب طاقة مع الحمضيات الطازجة.' }, '5,000', 'https://images.pexels.com/photos/10066734/pexels-photo-10066734.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'cup'),
      item({ en: 'Redbull', ku: 'ڕێدبوڵ', ar: 'ريدبول' }, { en: 'Classic Red Bull refreshment.', ku: 'خواردنەوەی کلاسیکی ڕێدبوڵ.', ar: 'مشروب ريدبول الكلاسيكي.' }, '4,000', 'https://images.pexels.com/photos/11009199/pexels-photo-11009199.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'cup'),
      item({ en: 'Mexican Redbull', ku: 'ڕێدبوڵی مەکسیکی', ar: 'ريدبول مكسيكي' }, { en: 'Red Bull with a citrus twist.', ku: 'ڕێدبوڵ لەگەڵ تامی سیتروس.', ar: 'ريدبول بنكهة حمضيات.' }, '5,000', 'https://images.pexels.com/photos/27347944/pexels-photo-27347944.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'cup'),
      item({ en: 'Iced Tea Peach', ku: 'چا ساردی خۆخ', ar: 'شاي مثلج بالخوخ' }, { en: 'Peach iced tea.', ku: 'چای ساردی خۆخ.', ar: 'شاي مثلج بالخوخ.' }, '3,500', 'https://images.pexels.com/photos/4134388/pexels-photo-4134388.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'cup'),
      item({ en: 'Iced Tea Lemon', ku: 'چا ساردی لیمۆ', ar: 'شاي مثلج بالليمون' }, { en: 'Lemon iced tea.', ku: 'چای ساردی لیمۆ.', ar: 'شاي مثلج بالليمون.' }, '3,500', 'https://images.pexels.com/photos/33107433/pexels-photo-33107433.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'cup'),
      item({ en: 'Iced Tea Strawberry', ku: 'چا ساردی تۆوت فرەنگی', ar: 'شاي مثلج بالفراولة' }, { en: 'Strawberry iced tea.', ku: 'چای ساردی تۆوت فرەنگی.', ar: 'شاي مثلج بالفراولة.' }, '3,500', 'https://images.pexels.com/photos/18142599/pexels-photo-18142599.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'cup'),
      item({ en: 'Fresh Orange', ku: 'پرتەقاڵی تازە', ar: 'برتقال طازج' }, { en: 'Freshly squeezed orange.', ku: 'پرتەقاڵی تازە فشراو.', ar: 'برتقال طازج معصور.' }, '4,000', 'https://images.pexels.com/photos/19885932/pexels-photo-19885932.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'cup'),
      item({ en: 'Fresh Pomegranate', ku: 'هەناری تازە', ar: 'رمان طازج' }, { en: 'Fresh pomegranate juice.', ku: 'شەربەتی هەناری تازە.', ar: 'عصير رمان طازج.' }, '4,000', 'https://images.pexels.com/photos/18142599/pexels-photo-18142599.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'cup'),
    ],
  },
  {
    id: 'matcha', label: { en: 'Matcha & Filtered', ku: 'ماتچا و فلتەر', ar: 'ماتشا و قهوة مقطرة' }, icon: Coffee, items: [
      item({ en: 'Hot Matcha', ku: 'ماتچای گەرم', ar: 'ماتشا ساخن' }, { en: 'Ceremonial matcha, whisked smooth.', ku: 'ماتچای ڕەسەن و نەرمکراو.', ar: 'ماتشا أصلي مخفوق بنعومة.' }, '5,000', 'https://images.pexels.com/photos/911810/pexels-photo-911810.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'cup'),
      item({ en: 'Iced Matcha', ku: 'ماتچای سارد', ar: 'ماتشا بارد' }, { en: 'Chilled matcha with milk.', ku: 'ماتچای سارد لەگەڵ شیر.', ar: 'ماتشا بارد مع الحليب.' }, '5,000', 'https://images.pexels.com/photos/12517410/pexels-photo-12517410.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'cup'),
      item({ en: 'Iced Strawberry Matcha', ku: 'ماتچای ساردی تۆوت فرەنگی', ar: 'ماتشا بارد بالفراولة' }, { en: 'Strawberry, matcha and milk.', ku: 'تۆوت فرەنگی، ماتچا و شیر.', ar: 'فراولة وماتشا وحليب.' }, '5,000', 'https://images.pexels.com/photos/31599066/pexels-photo-31599066.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'cup'),
      item({ en: 'V60', ku: 'V60', ar: 'V60' }, { en: 'Hand-brewed filtered coffee.', ku: 'قاوەی فلتەر بە دەست ئامادەکراو.', ar: 'قهوة مقطرة محضرة يدوياً.' }, '4,000', 'https://images.pexels.com/photos/38737533/pexels-photo-38737533.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'cup'),
      item({ en: 'Chemex', ku: 'کیمێکس', ar: 'كيمكس' }, { en: 'Clean and delicate filter coffee.', ku: 'قاوەی فلتەری پاک و ناسک.', ar: 'قهوة مقطرة نقية ورقيقة.' }, '4,000', 'https://images.pexels.com/photos/17366787/pexels-photo-17366787.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'cup'),
    ],
  },
];

function App() {
  const [language, setLanguage] = useState<Language | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | CategoryId>('all');
  const [search, setSearch] = useState('');
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const currentLanguage: Language = language ?? 'en';
  const text = copy[currentLanguage];
  const isRtl = currentLanguage !== 'en';

  const visibleCategories = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return categories
      .filter((category) => activeCategory === 'all' || category.id === activeCategory)
      .map((category) => ({
        ...category,
        items: category.items.filter((menuItem) => !query || [menuItem.name[currentLanguage], menuItem.description[currentLanguage]].join(' ').toLocaleLowerCase().includes(query)),
      }))
      .filter((category) => category.items.length > 0);
  }, [activeCategory, currentLanguage, search]);

  if (!language) {
    return (
      <main className="language-screen" dir="ltr">
        <div className="language-glow language-glow-one" />
        <div className="language-glow language-glow-two" />
        <div className="language-card">
          <div className="brand-mark"><span>96</span></div>
          <p className="eyebrow">96CAFÉ · BREWING MEMORIES</p>
          <h1>{copy.en.welcome}<br /><em>96café</em></h1>
          <p className="language-tagline">{copy.en.tagline}</p>
          <div className="language-divider"><span /><Coffee size={16} /><span /></div>
          <h2>{copy.en.choose}</h2>
          <p className="language-hint">{copy.en.chooseHint}</p>
          <div className="language-options">
            {languages.map((option) => (
              <button className="language-option" key={option.id} onClick={() => setLanguage(option.id)}>
                <span className="language-option-name">{option.native}</span>
                <span className="language-option-english">{option.label}</span>
                <ArrowRight size={17} />
              </button>
            ))}
          </div>
          <div className="language-bottom"><Globe2 size={15} /> <span>English · کوردی · العربية</span></div>
        </div>
      </main>
    );
  }

  return (
    <div className={`app-shell ${isRtl ? 'rtl' : ''}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <header className="menu-header">
        <div className="header-inner">
          <button className="compact-brand" onClick={() => { setLanguage(null); setActiveCategory('all'); setSearch(''); }} aria-label="Change language"><span>96</span><strong>café</strong></button>
          <div className="header-meta"><span className="status-dot" /> {text.location}</div>
          <button className="change-language" onClick={() => setLanguage(null)}><Globe2 size={16} /><span>{languages.find((option) => option.id === currentLanguage)?.native}</span></button>
        </div>
      </header>

      <main className="menu-main">
        <section className="menu-hero">
          <div className="hero-copy">
            <p className="eyebrow">96CAFÉ · {text.menu.toUpperCase()}</p>
            <h1>{text.menu}<span>.</span></h1>
            <p>{text.tagline}</p>
          </div>
          <div className="hero-stamp"><span>96</span><small>BREWING<br />MEMORIES</small></div>
        </section>

        <div className="menu-controls">
          <nav className="category-nav" aria-label={text.menu}>
            <button className={activeCategory === 'all' ? 'category-button active' : 'category-button'} onClick={() => setActiveCategory('all')}>{text.all}</button>
            {categories.map((category) => {
              const Icon = category.icon;
              return <button className={activeCategory === category.id ? 'category-button active' : 'category-button'} key={category.id} onClick={() => setActiveCategory(category.id)}><Icon size={16} />{category.label[currentLanguage]}</button>;
            })}
          </nav>
          <label className="search-box">
            <Search size={17} />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={text.search} aria-label={text.search} />
            {search && <button className="clear-search" onClick={() => setSearch('')} aria-label="Clear search"><X size={15} /></button>}
          </label>
        </div>

        {visibleCategories.length > 0 ? <div className="menu-grid">
          {visibleCategories.map((category) => {
            const Icon = category.icon;
            return <section className="menu-section" key={category.id}>
              <div className="section-heading"><div className="section-title"><span className="section-icon"><Icon size={20} /></span><h2>{category.label[currentLanguage]}</h2></div><span className="section-ornament" /><span className="section-line" /></div>
              <div className="items-grid">
                {category.items.map((menuItem) => <article className="menu-item" key={menuItem.name.en}><div className="item-image-wrap" onClick={() => setLightbox({ src: menuItem.image, alt: menuItem.name[currentLanguage] })}><img className="item-image" src={menuItem.image} alt={menuItem.name[currentLanguage]} loading="lazy" /><LogoBadge style={menuItem.logo} /></div><div className="item-copy"><h3>{menuItem.name[currentLanguage]}</h3><p>{menuItem.description[currentLanguage]}</p></div><div className="price"><strong>{menuItem.price}</strong><span>IQD</span></div></article>)}
              </div>
            </section>;
          })}
        </div> : <div className="empty-state"><Search size={28} /><h2>{text.noResults}</h2><p>{text.noResultsHint}</p></div>}

        <footer className="menu-footer"><div className="footer-rule" /><div className="footer-brand"><span className="footer-mark">96</span><span>{text.footer} <a href="https://krdgroup.dev" target="_blank" rel="noreferrer">krdgroup</a></span></div><p>© 96café · {text.prices}</p></footer>
      </main>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <img className="lightbox-img" src={lightbox.src} alt={lightbox.alt} />
          <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close"><X size={24} /></button>
        </div>
      )}
    </div>
  );
}

export default App;
