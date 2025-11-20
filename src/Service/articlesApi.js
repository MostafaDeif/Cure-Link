// Mock articles data
const mockArticles = {
  doctor: [
    {
      id: 1,
      title: "Latest Advances in Cardiology",
      summary: "Exploring recent breakthroughs in cardiovascular medicine and patient care.",
    },
    {
      id: 2,
      title: "Telemedicine Best Practices",
      summary: "Guidelines for effective remote patient consultations.",
    },
    {
      id: 3,
      title: "Managing Chronic Conditions",
      summary: "Strategies for long-term patient management and care coordination.",
    },
  ],
  pharmacist: [
    {
      id: 4,
      title: "New Medications in 2024",
      summary: "Review of recently approved pharmaceutical products and their uses.",
    },
    {
      id: 5,
      title: "Drug Interaction Guidelines",
      summary: "Understanding common drug interactions and how to prevent them.",
    },
    {
      id: 6,
      title: "Pharmacy Inventory Management",
      summary: "Best practices for maintaining optimal stock levels.",
    },
  ],
  client: [
    {
      id: 7,
      title: "How to Choose the Right Medicine",
      summary: "A guide to selecting over-the-counter medications safely.",
    },
    {
      id: 8,
      title: "Understanding Your Prescription",
      summary: "What you need to know about your medications and dosages.",
    },
    {
      id: 9,
      title: "Home Healthcare Tips",
      summary: "Practical advice for managing health at home.",
    },
  ],
};

export const getArticles = async (role) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  
  // Return mock data based on role
  const roleKey = role || "client";
  return mockArticles[roleKey] || mockArticles.client;
};
