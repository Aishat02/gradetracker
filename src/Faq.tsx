import React from "react";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
  isOpen?: boolean;
};

const faqData: FaqItem[] = [
  {
    id: "collapseOne",
    question: "How accurate is the grade calculation?",
    answer:
      "GradeTracker provides highly accurate calculations based on the course information and grades you input.",
    isOpen: true,
  },
  {
    id: "collapseTwo",
    question: "Can I track multiple courses?",
    answer: "Yes, you can track multiple courses simultaneously.",
  },
  {
    id: "collapseThree",
    question: "Is my data secure?",
    answer:
      "Your academic data is kept secure and private. We use industry-standard encryption to protect your information.",
  },
  {
    id: "collapseFour",
    question: "What if my course has a unique grading scheme?",
    answer:
      "Our tool supports custom grading schemes and weighting systems to accommodate different course structures.",
  },
  {
    id: "collapseFive",
    question: "Can I export my grade data?",
    answer: "Yes, you can export your grade data in various formats.",
  },
  {
    id: "collapseSix",
    question: "Is there a mobile app available?",
    answer:
      "Currently, GradeTrack is available as a web application. A mobile app is in development.",
  },
  {
    id: "collapseSeven",
    question: "How do I update my grades?",
    answer:
      "You can easily update your grades by logging into your account and editing the relevant course assignments or exams.",
  },
  {
    id: "collapseEight",
    question: "Can I use GradeTrack for past courses?",
    answer:
      "Yes, you can input data for completed courses to maintain a complete academic record and track your overall progress.",
  },
  {
    id: "collapseNine",
    question: "Is there a limit to the number of courses I can track?",
    answer:
      "Users with an account have unlimited course tracking capabilities.",
  },
];

const Faq: React.FC = () => {
  return (
    <section className="pt-4" id="faq">
      <h2 className="fw-bolder">Frequently Asked Questions</h2>
      <div className="accordion pt-2" id="faqAccordion">
        {faqData.map(({ id, question, answer, isOpen }, index) => (
          <div className="accordion-item mb-3" key={id}>
            <h2 className="accordion-header" id={`heading-${id}`}>
              <button
                className={`accordion-button fw-bold ${!isOpen ? "collapsed" : ""}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#${id}`}
                aria-expanded={isOpen ? "true" : "false"}
                aria-controls={id}
              >
                {question}
              </button>
            </h2>
            <div
              id={id}
              className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}
              aria-labelledby={`heading-${id}`}
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">{answer}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faq;
