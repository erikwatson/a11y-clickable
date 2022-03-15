import './style.css';

const thingsToLinkify = Array.from(
  document.getElementsByClassName('a11y-clickable')
);

const extractedLinks = thingsToLinkify.map((container) => {
  const aTag = container.getElementsByTagName('a')[0];
  return {
    container,
    link: aTag.href,
    aTag,
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

  // This stuff is probably taking it too far
  container.addEventListener('mouseenter', (evt) => {
    container.style.borderColor = 'orange';
    aTag.style.color = 'orange';
  });

  container.addEventListener('mouseleave', (evt) => {
    container.style.borderColor = prevBorderColor;
    aTag.style.color = prevLinkColor;
  });
});
