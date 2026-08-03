import type { Review } from "../types";

export const sampleReviews: Review[] = [
  // Chicken Curry Kit (id: 1)
  {
    id: "R001",
    mealId: 1,
    orderId: "QC-2026-045",
    userName: "Tasnim Rahman",
    userLocation: "Gulshan, Dhaka",
    rating: 5,
    comment:
      "অসাধারণ! ঘরে বসে রেস্টুরেন্টের স্বাদ পেলাম। মুরগির তরকারি কিটটি দারুণ ছিল। সব কিছু প্রি-কাট এবং মসলা দেওয়া থাকায় রান্না করা খুব সহজ হয়েছে।",
    date: "2 days ago",
    verified: true,
  },
  {
    id: "R002",
    mealId: 1,
    orderId: "QC-2026-132",
    userName: "Rafi Ahmed",
    userLocation: "Dhanmondi, Dhaka",
    rating: 5,
    comment:
      "Fresh ingredients and authentic taste. The chicken was perfectly marinated. Cooked it in just 20 minutes!",
    date: "1 week ago",
    verified: true,
  },
  {
    id: "R003",
    mealId: 1,
    orderId: "QC-2026-089",
    userName: "Nusrat Jahan",
    userLocation: "Banani, Dhaka",
    rating: 4,
    comment:
      "Very good quality. Taste was excellent but portion could be slightly bigger. Overall highly recommended!",
    date: "3 days ago",
    verified: true,
  },

  // Beef Curry Kit (id: 2)
  {
    id: "R004",
    mealId: 2,
    orderId: "QC-2026-156",
    userName: "Kamal Hossain",
    userLocation: "Motijheel, Dhaka",
    rating: 5,
    comment:
      "গরুর মাংস একদম নরম এবং তরকারি দারুণ হয়েছে! মসলাগুলো perfect ছিল। আবার অর্ডার করবো।",
    date: "1 week ago",
    verified: true,
  },
  {
    id: "R005",
    mealId: 2,
    orderId: "QC-2026-198",
    userName: "Farhana Akter",
    userLocation: "Bashundhara, Dhaka",
    rating: 4,
    comment:
      "Beef was tender and flavorful. Cooking was easy with all ingredients prepped. Great for busy weeknights!",
    date: "5 days ago",
    verified: true,
  },
  {
    id: "R006",
    mealId: 2,
    orderId: "QC-2026-223",
    userName: "Arif Rahman",
    userLocation: "Lalmatia, Dhaka",
    rating: 5,
    comment:
      "Best beef curry kit I've tried! The spice blend is authentic and the quality of meat is excellent.",
    date: "3 days ago",
    verified: true,
  },

  // Chicken Roast Kit (id: 3)
  {
    id: "R007",
    mealId: 3,
    orderId: "QC-2026-267",
    userName: "Sumaiya Islam",
    userLocation: "Mohammadpur, Dhaka",
    rating: 5,
    comment:
      "একদম বিয়ে বাড়ির স্টাইল চিকেন রোস্ট হয়েছে! গেস্টরা অনেক প্রশংসা করেছে। QuickCook ধন্যবাদ!",
    date: "2 days ago",
    verified: true,
  },
  {
    id: "R008",
    mealId: 3,
    orderId: "QC-2026-289",
    userName: "Tanvir Hasan",
    userLocation: "Khilgaon, Dhaka",
    rating: 5,
    comment:
      "Wedding-style roast at home! The yogurt marinade and fried onions made it perfect. Family loved it!",
    date: "4 days ago",
    verified: true,
  },
  {
    id: "R009",
    mealId: 3,
    orderId: "QC-2026-301",
    userName: "Rehana Begum",
    userLocation: "Mirpur DOHS, Dhaka",
    rating: 5,
    comment:
      "Outstanding quality! The roast masala is perfectly balanced. Will definitely order again for special occasions.",
    date: "1 week ago",
    verified: true,
  },

  // Beef Kala Bhuna Kit (id: 4)
  {
    id: "R010",
    mealId: 4,
    orderId: "QC-2026-201",
    userName: "Mahmud Hassan",
    userLocation: "Uttara, Dhaka",
    rating: 5,
    comment:
      "কালা ভুনা একদম চিটাগাং স্টাইল হয়েছে! মসলার ব্যালেন্স পারফেক্ট। পরিবারের সবার খুব পছন্দ হয়েছে।",
    date: "4 days ago",
    verified: true,
  },
  {
    id: "R011",
    mealId: 4,
    orderId: "QC-2026-334",
    userName: "Shahed Alam",
    userLocation: "Chittagong",
    rating: 5,
    comment:
      "Being from Chittagong, I'm very particular about Kala Bhuna. This is authentic! Best kit I've ordered.",
    date: "2 days ago",
    verified: true,
  },
  {
    id: "R012",
    mealId: 4,
    orderId: "QC-2026-356",
    userName: "Nasrin Sultana",
    userLocation: "Baridhara, Dhaka",
    rating: 5,
    comment:
      "Rich, dark, and full of flavor! The beef was so tender. This is now my go-to meal kit!",
    date: "6 days ago",
    verified: true,
  },

  // Rui Fish Curry Kit (id: 5)
  {
    id: "R013",
    mealId: 5,
    orderId: "QC-2026-378",
    userName: "Laboni Das",
    userLocation: "Segunbagicha, Dhaka",
    rating: 5,
    comment:
      "মাছটা একদম fresh ছিল! ঝোল দারুণ হয়েছে। মাছ প্রেমীদের জন্য পারফেক্ট কিট।",
    date: "3 days ago",
    verified: true,
  },
  {
    id: "R014",
    mealId: 5,
    orderId: "QC-2026-392",
    userName: "Rashid Khan",
    userLocation: "Purana Paltan, Dhaka",
    rating: 4,
    comment:
      "Fresh Rui fish and good spices. Traditional Bengali taste. Would love slightly more fish pieces.",
    date: "5 days ago",
    verified: true,
  },
  {
    id: "R015",
    mealId: 5,
    orderId: "QC-2026-401",
    userName: "Ayesha Siddiqua",
    userLocation: "Green Road, Dhaka",
    rating: 5,
    comment:
      "Authentic Bengali fish curry! The mustard oil flavor was perfect. Highly recommended!",
    date: "1 week ago",
    verified: true,
  },

  // Chingri Malai Curry Kit (id: 6)
  {
    id: "R016",
    mealId: 6,
    orderId: "QC-2026-178",
    userName: "Sadia Karim",
    userLocation: "Mirpur, Dhaka",
    rating: 5,
    comment:
      "Chingri Malai Curry was absolutely delicious! Fresh prawns and the coconut milk base was perfect. Worth every taka!",
    date: "5 days ago",
    verified: true,
  },
  {
    id: "R017",
    mealId: 6,
    orderId: "QC-2026-445",
    userName: "Imran Ahmed",
    userLocation: "Banani, Dhaka",
    rating: 5,
    comment:
      "চিংড়ি একদম বড় সাইজের এবং ফ্রেশ! মালাই কারি রেস্টুরেন্ট কোয়ালিটি হয়েছে। Loved it!",
    date: "2 days ago",
    verified: true,
  },
  {
    id: "R018",
    mealId: 6,
    orderId: "QC-2026-467",
    userName: "Jannatul Ferdous",
    userLocation: "Gulshan, Dhaka",
    rating: 5,
    comment:
      "Premium quality prawns! The malai curry was creamy and rich. Perfect for special dinners!",
    date: "4 days ago",
    verified: true,
  },

  // Vegetable Curry Kit (id: 7)
  {
    id: "R019",
    mealId: 7,
    orderId: "QC-2026-489",
    userName: "Mithila Roy",
    userLocation: "Shantinagar, Dhaka",
    rating: 5,
    comment:
      "Vegetables were super fresh! পাঁচফোড়ন এর সুগন্ধ দারুণ ছিল। Healthy এবং tasty!",
    date: "3 days ago",
    verified: true,
  },
  {
    id: "R020",
    mealId: 7,
    orderId: "QC-2026-512",
    userName: "Farhan Mahmud",
    userLocation: "Tejgaon, Dhaka",
    rating: 4,
    comment:
      "Great vegetarian option! Fresh seasonal vegetables and good spice mix. Quick and healthy meal.",
    date: "6 days ago",
    verified: true,
  },
  {
    id: "R021",
    mealId: 7,
    orderId: "QC-2026-534",
    userName: "Sharmin Akter",
    userLocation: "Eskaton, Dhaka",
    rating: 5,
    comment:
      "Love this healthy option! Perfect for meatless days. The panch phoron adds authentic Bengali flavor.",
    date: "1 week ago",
    verified: true,
  },

  // Pasta Kit (id: 9)
  {
    id: "R022",
    mealId: 9,
    orderId: "QC-2026-556",
    userName: "Rafsan Chowdhury",
    userLocation: "Mohakhali, Dhaka",
    rating: 4,
    comment:
      "বাচ্চারা খুব পছন্দ করেছে! Bengali spices এর সাথে pasta একদম unique combination।",
    date: "2 days ago",
    verified: true,
  },
  {
    id: "R023",
    mealId: 9,
    orderId: "QC-2026-578",
    userName: "Nadia Islam",
    userLocation: "Uttara Sector 7, Dhaka",
    rating: 5,
    comment:
      "My kids absolutely love this! Fusion done right. Quick to make and delicious!",
    date: "5 days ago",
    verified: true,
  },
  {
    id: "R024",
    mealId: 9,
    orderId: "QC-2026-601",
    userName: "Tahmid Rahman",
    userLocation: "Bashundhara R/A, Dhaka",
    rating: 4,
    comment:
      "Interesting fusion! The masala sauce with pasta works surprisingly well. Kids friendly option.",
    date: "4 days ago",
    verified: true,
  },

  // Grilled Chicken Healthy Kit (id: 10)
  {
    id: "R025",
    mealId: 10,
    orderId: "QC-2026-623",
    userName: "Fahmida Noor",
    userLocation: "Dhanmondi 27, Dhaka",
    rating: 5,
    comment:
      "Perfect for my diet plan! Low oil, high protein। Chicken breast was tender and herbs were fresh!",
    date: "3 days ago",
    verified: true,
  },
  {
    id: "R026",
    mealId: 10,
    orderId: "QC-2026-645",
    userName: "Azizul Haque",
    userLocation: "Banani DOHS, Dhaka",
    rating: 5,
    comment:
      "Great healthy option! Grilled chicken was perfectly seasoned. The salad mix was fresh and crispy.",
    date: "1 week ago",
    verified: true,
  },
  {
    id: "R027",
    mealId: 10,
    orderId: "QC-2026-667",
    userName: "Sabrina Khan",
    userLocation: "Gulshan 1, Dhaka",
    rating: 4,
    comment:
      "Healthy and tasty! Perfect for fitness conscious people. Would love more protein options like this.",
    date: "5 days ago",
    verified: true,
  },
];

export const getReviewsByMealId = (mealId: number): Review[] => {
  return sampleReviews.filter((review) => review.mealId === mealId);
};
