var container, style, iframe, toggle, active = false;

// Iframe container
container = document.createElement('div');
container.id = 'ocExtensionContainer';
container.style.zIndex = '99999999';
container.style.width = '400px';
container.style.height = '100%';
container.style.position = 'fixed';
container.style.top = '0';
container.style.right = '-400px';

// Iframe element
iframe = document.createElement('iframe');
iframe.src = "http://dev.overcoat.com:4000";
iframe.setAttribute('width', 400);
iframe.style.width = '400px';
iframe.style.height = '100%';
iframe.style.border = '0';
iframe.style.transitionProperty = 'all';
iframe.style.transitionDuration = '400ms';

// Toggle flap
toggle = document.createElement('div');
toggle.id = 'ocExtensionToggle';
toggle.style.backgroundColor = '#0099e8';
toggle.style.borderRadius = '8px 0px 0px 8px';
toggle.style.top = '2%';
toggle.style.right = '0';
toggle.style.width = '40px';
toggle.style.height = '47px';
toggle.style.position = 'fixed';
toggle.style.transitionProperty = 'all';
toggle.style.transitionDuration = '400ms';

// Attach EventListener
toggle.addEventListener('click', handleClick);

// Append element to document.body
container.appendChild(toggle);
container.appendChild(iframe);

var body = document.getElementsByTagName('body')[0];
body.appendChild(container);

// Slide effects
function handleClick(e){
  if (active) {
    toggle.style.transform = 'translateX(0px)';
    iframe.style.transform = 'translateX(0px)';
  } else {
    toggle.style.transform = 'translateX(-400px)';
    iframe.style.transform = 'translateX(-400px)';
  }

  active = !active;
}