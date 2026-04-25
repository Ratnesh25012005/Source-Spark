import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

function FAQAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const isOpen = index === openIndex;
        return (
          <button
            key={item.question}
            type="button"
            className={`faq-item ${isOpen ? 'open' : ''}`}
            onClick={() => setOpenIndex(isOpen ? -1 : index)}
          >
            <span>{item.question}</span>
            <FiChevronDown className={`faq-icon ${isOpen ? 'rotated' : ''}`} />
            {isOpen ? <p>{item.answer}</p> : null}
          </button>
        );
      })}
    </div>
  );
}

export default FAQAccordion;
