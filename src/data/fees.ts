export const feeSummary = {
  totalFee: 25000,
  paid: 15000,
  pending: 10000,
  dueDate: "2026-10-10",
  categories: [
    { name: "Tuition Fee", amount: 18000 },
    { name: "Admission Fee", amount: 2000 },
    { name: "Exam Fee", amount: 1500 },
    { name: "Transport Fee", amount: 3000 },
    { name: "Library Fee", amount: 500 }
  ]
};

export const feeHistory = [
  {
    id: "RCPT-2026-001",
    date: "2026-04-05",
    amount: 15000,
    status: "paid",
    mode: "Online (UPI)"
  }
];
