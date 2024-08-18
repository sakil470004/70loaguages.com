const Accordion = () => {
  const faqArray = [
    {
      id: 1,
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship worldwide. Shipping costs will be added at checkout.",
    },
    {
      id: 2,
      question: "What is the delivery time for orders?",
      answer:
        "UK orders are delivered within 3-5 working days. International delivery times may vary.",
    },
    {
      id: 3,
      question: "Can I return my product?",
      answer:
        "Yes, you can return your order within 45 days. Use the returns form provided.",
    },
    {
      id: 4,
      question: "Do you allow exchanges?",
      answer:
        "Unfortunately, we do not offer exchanges. Please return the item for a refund and place a new order.",
    },
    {
      id: 5,
      question: "Can I return items to a physical store?",
      answer:
        "Yes, you can return items to any Pavers store within 45 days of receiving them.",
    },
  ];
  return (
    <div className="py-14">
    <h2 className="text-2xl font-bold text-orange-400 uppercase">
      FAQ
    </h2>
      <div className="mt-6 flex flex-col gap-5 border-l-4 pl-3 border-l-orange-200">
        {faqArray.map((faq) => (
          <div className="collapse collapse-arrow bg-gray-50 shadow-sm border-2 border-orange-100" key={faq.id}>
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              {faq.question}
            </div>
            <div className="collapse-content border-b-2 border-blue-200">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordion;
