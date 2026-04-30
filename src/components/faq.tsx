"use client";

import { useState } from "react";
import { ChevronDown } from "@/components/icons";
import { useLanguage } from "@/lib/i18n";
import { faqItems } from "@/lib/config";

export default function FAQSection() {
  const { t, language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Build JSON-LD for FAQ rich snippets
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => {
      const qKey = `faq.q${item.id}`;
      const aKey = `faq.a${item.id}`;
      return {
        "@type": "Question",
        name: language === "en" ? t(qKey) : item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: language === "en" ? t(aKey) : item.answer,
        },
      };
    }),
  };

  return (
    <section id="faq" className="py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl text-anthracite mb-4">{t("faq.title")}</h2>
          <div className="w-16 h-0.5 bg-gold mx-auto"></div>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const qKey = `faq.q${item.id}`;
            const aKey = `faq.a${item.id}`;
            const question = language === "en" ? t(qKey) : item.question;
            const answer = language === "en" ? t(aKey) : item.answer;
            const isOpen = openIndex === index;

            return (
              <div
                key={item.id}
                className="border border-gold/15 bg-white overflow-hidden transition-all duration-300 hover:border-gold/30"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus:ring-2 focus:ring-gold/30"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                >
                  <span className="font-serif text-lg text-anthracite pr-4">{question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gold flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  id={`faq-answer-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-question-${item.id}`}
                  className={`faq-answer ${isOpen ? "open" : ""}`}
                >
                  <div className="px-6 pb-6 pt-0">
                    <div className="w-10 h-0.5 bg-gold/30 mb-4"></div>
                    <p className="text-gray-600 font-light leading-relaxed">{answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </section>
  );
}
