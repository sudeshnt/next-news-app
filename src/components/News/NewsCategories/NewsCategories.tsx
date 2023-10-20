"use client";

import { NewsCategory } from "@/types";
import { Box } from "@chakra-ui/react";
import { useState } from "react";

export default function NewsCategories() {
  const [active, setActive] = useState(0);

  const categories = [
    { label: NewsCategory.All, value: "" },
    { label: NewsCategory.General },
    { label: NewsCategory.Business },
    { label: NewsCategory.Entertainment },
    { label: NewsCategory.Health },
    { label: NewsCategory.Science },
    { label: NewsCategory.Sports },
    { label: NewsCategory.Technology },
  ];

  return (
    <section className="flex flex-col">
      <Box className="flex flex-row flex-wrap gap-4 py-4">
        {categories.map((tab, index) => (
          <span
            key={index}
            onClick={() => setActive(index)}
            className={`px-4 py-1 rounded-full border-2 cursor-pointer transition-all capitalize  hover:border-primary/40 ${
              active === index
                ? "text-secondary border-secondary/50 bg-slate-100"
                : "text-primary/60 border-primary/60"
            }`}
          >
            {tab.label}
          </span>
        ))}
      </Box>
    </section>
  );
}
