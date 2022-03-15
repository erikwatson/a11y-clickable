import './style.css';

const thingsToLinkify = Array.from(
  document.querySelectorAll('[data-a11y-clickable]')
);

const extractedLinks = thingsToLinkify.map((container) => {
  const aTag = container.querySelector('a[data-a11y-target]');
  const otherATags = Array.from(container.querySelectorAll('a')).filter(
    (x) => !x.hasAttribute('data-a11y-target')
  );

  return {
    container,
    link: aTag.href,
    aTag,
    otherATags,
  };
});

extractedLinks.forEach(({ container, link, aTag, otherATags }) => {
  const prevBorderColor = container.style.borderColor;
  const prevLinkColor = container.style.borderColor;

  const removeHighlights = () => {
    container.style.borderColor = prevBorderColor;
    aTag.style.color = prevLinkColor;
  };

  const applyHighlights = () => {
    container.style.borderColor = 'orange';
    aTag.style.color = 'orange';
  };

  container.style.cursor = 'pointer';

  container.addEventListener('click', (evt) => {
    window.open(link, '_blank');
  });

  aTag.addEventListener('click', (evt) => evt.preventDefault());

  otherATags.forEach((x) => {
    x.addEventListener('click', (evt) => {
      evt.stopPropagation();
    });

    x.addEventListener('mouseenter', (evt) => {
      removeHighlights();
    });

    x.addEventListener('mouseleave', (evt) => {
      applyHighlights();
    });
  });

  container.addEventListener('mouseenter', (evt) => {
    applyHighlights();
  });

  container.addEventListener('mouseleave', (evt) => {
    removeHighlights();
  });
});
