import React, { useEffect, useState, useRef } from "react";

function Animation() {
  const [hasEnded, setHasEnded] = useState(false);
  const observerRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const observerOptions = {
      rootMargin: "0px 500px -100px 500px",
    };

    const hiddenElements = document.querySelectorAll(".hidden");

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.classList.contains("show")) {
            entry.target.classList.add("show");
            setVisibleCount((prevState) => prevState + 1);
          }
        });
      },
      observerOptions
    );

    hiddenElements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const hiddenElements = document.querySelectorAll(".hidden");
    const totalCount = hiddenElements.length;

    if (visibleCount === totalCount) {
      setHasEnded(true);
      observerRef.current.disconnect();
    }
  }, [visibleCount]);

  return <div></div>;
}

export default Animation;
