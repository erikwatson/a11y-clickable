import './style.css';

const thingsToLinkify = Array.from(
  document.querySelectorAll('[data-a11y-clickable]')
);

const extractedLinks = thingsToLinkify.map((container) => {
  const aTag = container.querySelector('a[data-a11y-target]');
  const otherATags = Array.from(container.querySelectorAll('a')).filter(
    (x) => !x.hasAttribute('data-a11y-target')
  );

  otherATags.forEach((x) => {
    x.addEventListener('click', (evt) => {
      evt.stopPropagation();
    });
  });

  return {
    container,
    link: aTag.href,
    aTag,
    otherATags,
  };
});

extractedLinks.map(({ container, link, aTag }) => {
  const prevBorderColor = container.style.borderColor;
  const prevLinkColor = container.style.borderColor;

  container.style.cursor = 'pointer';

  container.addEventListener('click', (evt) => {
    console.log(`Navigating to: ${link}`);
    window.open(link, '_blank');
  });

  aTag.addEventListener('click', (evt) => evt.preventDefault());

  // This is probably too much styling, but we could highlight the
  // elements and change the lii9-----9mnks colours here too.
  //
  // We can choose only to change the colour of the active link, similar
  // to the normal browser behavior this way too - quite nice.
  container.addEventListener('mouseenter', (evt) => {
    container.style.borderColor = 'orange';
    aTag.style.color = 'orange';
  });

  container.addEventListener('mouseleave', (evt) => {
    container.style.borderColor = prevBorderColor;
    aTag.style.color = prevLinkColor;
  });
});
