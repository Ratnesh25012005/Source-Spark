import { useEffect, useState } from 'react';

function AnimatedCounter({ end, suffix = '' }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let current = 0;
    const steps = 50;
    const increment = Math.max(1, Math.ceil(end / steps));
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setValue(end);
        clearInterval(timer);
      } else {
        setValue(current);
      }
    }, 26);

    return () => clearInterval(timer);
  }, [end]);

  return <span>{value.toLocaleString()}{suffix}</span>;
}

export default AnimatedCounter;
