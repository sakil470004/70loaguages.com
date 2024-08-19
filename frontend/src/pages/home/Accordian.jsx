const Accordion = () => {
  const faqArray = [
    {
      id: 1,
      question: "What is 70Languages?",
      answer:
        "70Languages is an online platform that connects clients in need of translation services with skilled translators. Whether you need documents translated, interpreted, or localized, 70Languages helps you find the right expert for the job.",
    },
    {
      id: 2,
      question: "How do I post a job on 70Languages?",
      answer:
        "To post a job, sign up as a client, navigate to the 'Post a Job' section, and fill out the required details, such as the language pair, type of service, deadline, and budget. Once submitted, your job will be visible to qualified translators.",
    },
    {
      id: 3,
      question: "How do translators apply for jobs?",
      answer:
        "Translators can browse the job listings, apply for the jobs that match their skills, and communicate directly with the job posters through the platform. Simply click 'Apply' on a job listing, and submit your application with any relevant information.",
    },
    {
      id: 4,
      question: "How are translators rated on the platform?",
      answer:
        "After a job is completed, clients can rate the translator based on their performance. Translators with higher ratings are more likely to get hired for future jobs. The rating system helps maintain quality and trust within the community",
    },
    {
      id: 5,
      question: "What languages are supported on 70Languages?",
      answer:
        "70Languages supports a wide range of languages, covering all major global languages and many regional ones. If you have a specific language requirement, you can specify it when posting your job.",
    },
  ];
  return (
    <div className="py-14">
    <h2 className="text-3xl font-bold text-blue-400 uppercase">
      FAQ
    </h2>
      <div className="mt-6 flex flex-col gap-5 border-l-4 pl-3 border-l-blue-200">
        {faqArray.map((faq) => (
          <div className="collapse collapse-arrow bg-gray-50 shadow-sm border-2 border-blue-100" key={faq.id}>
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
