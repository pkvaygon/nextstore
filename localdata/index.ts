import { NavLinkProps } from "@/types";

export const navLinks: NavLinkProps[] = [
    {
        id: 0,
        key: 'home',
        label: 'Home',
        href: '/'
    },
    {
        id: 1,
        key: 'shop',
        label: 'Shop',
        href: '/shop'
    },
    {
        id: 2,
        key: 'faq',
        label: 'FAQ',
        href: '/faq'
    },
    {
        id: 3,
        key: 'checkout',
        label: 'Test Checkout',
        href: '/checkout'
    }
]
export const catalogCards = [
    {
        id: 0,
        label: 'Shoes',
        image: '',
    },
    {
        id: 1,
        label: 'Clothing',
        image: '',
    },
    {
        id: 2,
        label: 'Pants',
        image: '',
    },
    {
        id: 3,
        label: 'Headwear',
        image: '',
    },
]
export const bannerCatalog = [
    {
        id: 0,
        key: "shoes",
        image: "https://sneakerbardetroit.com/wp-content/uploads/2015/08/under-armour-curry-one-black-gold-banner-release-date.jpg",
        label: "Shoes",
        description: "Lorem ipsum dolor sit amet consectetur."
    },
    {
        id: 1,
        key: "accessories",
        image: "https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/airpods.png",
        label: "Accessories",
        description: "Lorem ipsum dolor sit amet consectetur."
    },

]

export const shippingAndReturns = [
"Free shipping &  returns",
    "Free, no-hassle return",
    "Complimentary gift packaging",
"Ships within 24 hours!"
]

export const faqs = [
    {
      title: "Who is ASKAR?",
      content:
        "ASKAR is a design system for building performant, accessible and beautiful web experiences.",
    },
    {
      title: "Lorem Yoyo mzfk?",
      content:
        "The Open Source Discount is available for everyone who is building an open source project. You can apply to the discount by sending an email to support@askar.com",
    },
    {
      title: "What is it?",
      content:
        "Yes, you can use ASKAR for your freelance projects. You can purchase the Freelancer License from our website.",
    },
    {
      title: "What is your refund policy?",
      content: "We do not provide refunds. However, we can help you with any issues you may have.",
    },
    {
      title: "Can I cancel my subscription?",
      content: "Yes, you can cancel and renew your subscription at any time.",
    },
    {
      title: "How do I switch from quarterly to yearly subscription?",
      content:
        "You can switch from quarterly to yearly subscription by canceling your quarterly subscription and purchasing a yearly subscription.",
    },
    {
      title: "Do you have monthly payment plans?",
      content:
        "No, we do not provide monthly payment plans. You can purchase a quarterly or yearly subscription.",
    },
    {
      title: "Do you have discounts for my babies?",
      content:
        "Yes, we provide a 50% discount for students. You can apply to the discount by sending an email to support@askar.com",
    },
    {
      title: "Do you have discounts for startups?",
      content:
        "Yes, we provide a 50% discount for startups. You can apply to the discount by sending an email to support@askar.com",
    },
    {
      title: "How often do you release updates?",
      content: "We release updates every two weeks.",
    },
];
  
export const countries = [
  {name: "United States", code: "US"},
  {name: "Kyrgyzstan", code: "KG"},
]

export const selectSortOption = [
  { key: "newest", value: "newest", label: "Newest" },
  { key: "price_low_to_high", value: "price_low_to_high", label: "Price: Low to High" },
  { key: "price_high_to_low", value: "price_high_to_low", label: "Price: High to Low" },
  { key: "top_rated", value: "top_rated", label: "Top Rated" },
  { key: "most_popular", value: "most_popular", label: "Most Popular" }
]
  