var container, style, iframe, toggle, counter, active = false;

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
iframe.src = "http://ec2-52-8-130-205.us-west-1.compute.amazonaws.com:4000";
//iframe.src = "http://dev.overcoat.com:4000";
iframe.setAttribute('width', 400);
iframe.setAttribute('notifications', 35);
iframe.style.width = '400px';
iframe.style.height = '100%';
iframe.style.border = '0';
iframe.style.transitionProperty = 'all';
iframe.style.transitionDuration = '400ms';

// Toggle flap
toggle = document.createElement('div');
toggle.id = 'ocExtensionToggle';
toggle.style.backgroundColor = '#0099e8';
toggle.style.borderRadius = '30px 0px 0px 30px';
toggle.style.top = '24px';
toggle.style.right = '0';
toggle.style.width = '41px';
toggle.style.height = '41px';
toggle.style.position = 'fixed';
toggle.style.transitionProperty = 'all';
toggle.style.transitionDuration = '400ms';
toggle.style.border = '6px solid #f68000';
toggle.style.borderRight = '0';

counter = document.createElement('span');
counter.style.backgroundColor = '#fff';
counter.style.display = 'inline-block';
counter.style.borderRadius = '8px';
counter.style.padding = '3px 6px';
counter.style.marginTop = '9px';
counter.style.marginLeft = '10px';
counter.style.fontFamily = 'Arial';
counter.style.fontWeight = 'bold';
counter.style.color = '#0099e8';
counter.style.fontSize = '14px';

toggle.appendChild(counter);

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

// Create IE + others compatible event handler
var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

// Listen to message from child window
eventer(messageEvent,function(e) {
  counter.innerHTML = e.data.value;
  counter.innerHTML = 35;
  console.log('parent received message!:  ',e.data.name);
},false);