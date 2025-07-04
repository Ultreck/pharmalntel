// src/wdyr.js
import React from 'react';

if (import.meta.env.MODE === 'development') {
  const whyDidYouRender = await import('@welldone-software/why-did-you-render');
  whyDidYouRender.default(React, {
    trackAllPureComponents: true,
  });
}