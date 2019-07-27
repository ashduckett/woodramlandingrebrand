let animationEnded = false;

function smoothScroll(target, duration) {
    var target = document.querySelector(target);
    var targetPosition = target.getBoundingClientRect().top;
    var startingPosition = window.pageYOffset;
    var distance = targetPosition - startingPosition;
    var startTime = null;

    function animation(currentTime) {
        if (startTime == null) {
            startTime = currentTime;
        }

        var timeElapsed = currentTime - startTime;
        //var run = ease(timeElapsed, startingPosition, distance, duration);
        var run = ease(timeElapsed, startingPosition, targetPosition, duration);
        window.scrollTo(0, run);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) {
            return c / 2 * t * t + b;
        }
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    requestAnimationFrame(animation);
}



if (location.pathname === '/') {
    history.replaceState({
        url: location.origin + '/index.html'}, 'Title', location.pathname);
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function calculateNavOpacity() {

    const scrollPosition = window.scrollY;

    // Next get the client height
    const clientHeight = document.documentElement.clientHeight;

    // Get the % of the first section scrolled past.
    const percent = scrollPosition / clientHeight;

    if (percent <= 1 && document.querySelector('.header__blurred-underlay')) {
        document.querySelector('.header__blurred-underlay').style.opacity = (percent * 2);
    }

    const scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

    if (scrollTop > 0) {
        document.querySelector('nav').classList.add('has-scrolled');
    } else {
        document.querySelector('nav').classList.remove('has-scrolled');
    }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function isScrolledIntoView(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;
  
    while(el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }
  
    return (
      top < (window.pageYOffset + window.innerHeight) &&
      left < (window.pageXOffset + window.innerWidth) &&
      (top + height) > window.pageYOffset &&
      (left + width) > window.pageXOffset
    );
  }


const switchHeaderImage = (index) => {
    // Get hold of the landing header div
    const imageDivs = document.getElementsByClassName('header__unblurred-image');

    let i = 0;

    for (let image of imageDivs) {
        image.style.opacity = 0;
        if (i === index) {
            image.style.opacity = 1;
        }

        i++;
    }
};

function startSpin() {
    const s = document.querySelector('.submit');
    s.innerHTML = '<i class="fas fa-spinner fa-spin">';
}

function fireTextAnimation() {
    // Get hold of everything that is intended to scroll up.
    const animatables = document.querySelectorAll('.animIn');

    animatables.forEach((item) => {
        if (isScrolledIntoView(item) && !item.classList.contains('slideIn')) {
            item.classList.add('slideIn');
        }
    })
}

function fixChatIconPosition() {
    const scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    const topOfFooter = document.querySelector('footer').offsetTop;
    const height = document.documentElement.clientHeight;

    const chatThingy = document.querySelector('.chaport-container');

    if (chatThingy !== null) {
        if (scrollTop + height >= topOfFooter) {
            chatThingy.style.position = 'absolute';
            chatThingy.style.top = topOfFooter + 'px';
            chatThingy.style.left = '100%';
        } else {
            chatThingy.style.position = 'fixed';
            chatThingy.style.top = 'auto';
            chatThingy.style.right = '0px';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Fix for iOS
    window.onresize = function() {
        document.body.height = document.documentElement.clientHeight;
        document.querySelector('.header').style.height = document.documentElement.clientHeight + 'px';
        document.querySelectorAll('.header__unblurred-image').forEach((item) => { item.style.height = document.documentElement.clientHeight + 'px' });
    }
    window.onresize(); // called to initially set the height.

    calculateNavOpacity();

    // Create loading swiper
    const swiper = document.createElement('div');
    swiper.classList.add('swiper');
    
    // Logo
    const logo = document.createElement('div');
    logo.classList.add('loadingLogo');
    logo.style.top = document.documentElement.clientHeight / 2 + 'px';


    // There must be a better way but ajax gave a delay on loading which was quite noticable.
    logo.insertAdjacentHTML('beforeend', 
    
    '<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/2-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"    xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" width="210mm" height="297mm" viewBox="0 0 744.09448819 1052.3622047" id="svg2" version="1.1"  inkscape:version="0.91 r13725" sodipodi:docname="drawing.svg"> <defs id="defs4" /> <sodipodi:namedview id="base" pagecolor="#ffffff" bordercolor="#666666" borderopacity="1.0"     inkscape:pageopacity="0.0" inkscape:pageshadow="2" inkscape:zoom="0.4300349" inkscape:cx="530.55892" inkscape:cy="535.25" inkscape:document-units="px"       inkscape:current-layer="layer1" showgrid="false" inkscape:window-width="1366" inkscape:window-height="705" inkscape:window-x="-8" inkscape:window-y="-8" inkscape:window-maximized="1" /> <metadata id="metadata7"> <rdf:RDF> <cc:Work rdf:about=""> <dc:format>image/svg+xml</dc:format> <dc:type             rdf:resource="http://purl.org/dc/dcmitype/StillImage" /> <dc:title></dc:title> </cc:Work> </rdf:RDF> </metadata> <g inkscape:label="Layer 1"      inkscape:groupmode="layer" id="layer1"> <path style="fill:#000000" d="m 384.27173,727.65394 c -5.74753,-0.49114 -12.55799,-1.96471 -24.57582,-5.3174 -4.46183,-1.24475 -8.64926,-2.3688 -9.30541,-2.4979 -0.65615,-0.12909 -1.78354,-0.40703 -2.50531,-0.61762 -2.23609,-0.65245 -6.17478,-1.49333 -9.6633,-2.06303 -2.91218,-0.47558 -4.18156,-0.54478 -9.90191,-0.53972 l -6.56151,0.006 -5.19252,1.71945 c -22.59505,7.48212 -40.29219,7.68858 -54.55009,0.63639 -1.65509,-0.81864 -3.49241,-1.87807 -4.08295,-2.35431 -0.59053,-0.47623 -2.11418,-1.65742 -3.38588,-2.62487 -7.37725,-5.61223 -15.96952,-9.33602 -25.48474,-11.0448 -3.07698,-0.55258 -4.10639,-0.62349 -9.30541,-0.64103 -4.60518,-0.0155 -6.40268,0.0724 -8.47031,0.41457 -5.5095,0.91169 -11.21653,2.68399 -13.60021,4.22349 -5.99978,3.87491 -15.9211,5.97011 -23.66951,4.99855 -8.43576,-1.05769 -14.02256,-5.17144 -15.70877,-11.56683 -0.23603,-0.89521 -0.3796,-2.45153 -0.38317,-4.1537 l -0.006,-2.72212 0.79014,-0.61828 c 10.36275,-8.109 24.92464,-22.38903 35.05885,-34.38024 6.7292,-7.96226 12.60996,-15.69875 18.59551,-24.46347 2.64412,-3.87181 6.67739,-10.04349 6.67739,-10.21769 0,-0.0451 -1.31529,-0.14669 -2.92286,-0.22586 -6.28732,-0.30954 -10.69299,-2.38646 -12.3859,-5.83895 -0.89434,-1.82389 -0.90648,-4.46987 -0.0321,-7.00053 0.78795,-2.28055 2.34631,-5.07303 3.61845,-6.48401 0.47636,-0.52836 3.81879,-3.7022 7.42762,-7.05295 10.62791,-9.86791 13.26571,-12.68552 18.90951,-20.19851 4.59912,-6.12234 9.01123,-12.98491 13.14903,-20.45195 1.61722,-2.9184 4.9245,-9.35041 4.9245,-9.57715 0,-0.0504 -1.42266,-0.1471 -3.16146,-0.21496 -2.46763,-0.0963 -3.63272,-0.26298 -5.30885,-0.75951 -5.52306,-1.63613 -9.51775,-4.50649 -11.47622,-8.24617 -0.6232,-1.18997 -0.6875,-1.5347 -0.68983,-3.6983 -0.004,-3.44706 0.48453,-4.3227 3.99117,-7.15801 4.77024,-3.85699 12.49896,-11.81567 17.14625,-17.65641 7.30476,-9.18067 14.13785,-20.40113 19.61602,-32.21103 2.65122,-5.71553 2.53119,-5.12957 1.0512,-5.13172 -2.81193,-0.004 -6.27303,-0.87511 -8.87905,-2.23456 -1.98125,-1.03354 -4.35072,-3.45041 -5.43626,-5.54499 -1.03935,-2.00544 -1.84179,-5.12886 -1.83208,-7.13115 l 0.007,-1.4316 2.27667,-2.5053 c 14.16155,-15.58369 28.11821,-35.916 38.42862,-55.98352 l 2.71329,-5.28097 -1.13864,-0.16623 c -1.76712,-0.25798 -4.50864,-1.2491 -5.87787,-2.12498 -1.52418,-0.97501 -2.42416,-2.01343 -3.23236,-3.72956 -0.54119,-1.14918 -0.61608,-1.60889 -0.60253,-3.69831 0.0135,-2.07915 0.11323,-2.64505 0.77555,-4.40039 1.28413,-3.40331 2.9286,-5.92846 7.07895,-10.87002 3.1618,-3.76456 7.54498,-9.24745 16.11784,-20.16172 3.86541,-4.92113 8.74058,-11.04122 10.8337,-13.60021 4.97088,-6.07723 6.99567,-8.75573 9.86373,-13.04823 4.48241,-6.70862 7.75107,-12.48067 12.06775,-21.3102 4.42801,-9.05723 6.53145,-13.91602 13.94465,-32.21103 4.98478,-12.30195 6.56551,-15.93393 9.17376,-21.07825 3.27495,-6.45927 5.87075,-10.13636 8.64927,-12.25213 2.66894,-2.03234 2.87899,-2.08257 8.70891,-2.08257 5.82992,0 6.03997,0.0502 8.70891,2.08257 2.77852,2.11577 5.37432,5.79286 8.64928,12.25213 2.60823,5.14432 4.18896,8.7763 9.17375,21.07825 7.41319,18.29501 9.51664,23.1538 13.94465,32.21103 4.31669,8.82953 7.58534,14.60158 12.06774,21.3102 2.86807,4.2925 4.89285,6.971 9.86373,13.04823 2.09312,2.55899 6.96829,8.67908 10.83371,13.60021 8.57286,10.91427 12.95604,16.39716 16.11783,20.16172 4.15035,4.94156 5.79484,7.46671 7.07896,10.87002 0.6623,1.75534 0.76206,2.32124 0.77554,4.40039 0.0136,2.08942 -0.0613,2.54913 -0.60253,3.69831 -0.80819,1.71613 -1.70817,2.75455 -3.23234,3.72956 -1.36924,0.87588 -4.11075,1.867 -5.8779,2.12498 l -1.13862,0.16623 2.71329,5.28097 c 10.31042,20.06752 24.26707,40.39983 38.42862,55.98352 l 2.27667,2.5053 0.007,1.4316 c 0.01,2.00229 -0.79272,5.12571 -1.83209,7.13115 -1.08554,2.09458 -3.455,4.51145 -5.43624,5.54499 -2.60604,1.35945 -6.06713,2.2305 -8.87906,2.23456 -1.47999,0.002 -1.60003,-0.58381 1.0512,5.13172 5.47817,11.8099 12.31125,23.03036 19.61602,32.21103 4.64729,5.84074 12.376,13.79942 17.14624,17.65641 3.50664,2.83531 3.99488,3.71095 3.99116,7.15801 -0.002,2.1636 -0.0666,2.50833 -0.68982,3.6983 -1.95847,3.73968 -5.95314,6.61004 -11.47621,8.24617 -1.67612,0.49653 -2.84123,0.66321 -5.30886,0.75951 -1.7388,0.0679 -3.16145,0.16459 -3.16145,0.21496 0,0.22674 3.30729,6.65875 4.92449,9.57715 4.13781,7.46704 8.54991,14.32961 13.14905,20.45195 5.64377,7.51299 8.2816,10.3306 18.90949,20.19851 3.60883,3.35075 6.95126,6.52459 7.42763,7.05295 1.27214,1.41098 2.83049,4.20346 3.61844,6.48401 0.87438,2.53066 0.86223,5.17664 -0.0321,7.00053 -1.69292,3.45249 -6.09858,5.52941 -12.38591,5.83895 -1.60757,0.0792 -2.92285,0.18079 -2.92285,0.22586 0,0.1742 4.03327,6.34588 6.67739,10.21769 5.98555,8.76472 11.86631,16.50121 18.5955,24.46347 10.13421,11.99121 24.6961,26.27124 35.05885,34.38024 l 0.79014,0.61828 -0.006,2.72212 c -0.01,4.68806 -1.11379,7.53688 -4.07016,10.5033 -1.46508,1.47004 -2.24206,2.02607 -4.07675,2.91741 -3.53191,1.7159 -7.46451,2.54589 -12.04306,2.54174 -6.9149,-0.006 -14.69105,-2.08842 -19.57147,-5.2404 -2.38369,-1.5395 -8.09072,-3.3118 -13.60021,-4.22349 -2.06764,-0.34213 -3.86514,-0.43012 -8.47031,-0.41456 -5.19903,0.0177 -6.22844,0.0884 -9.30541,0.64102 -9.51523,1.70878 -18.10749,5.43257 -25.48475,11.0448 -1.27169,0.96745 -2.79534,2.14864 -3.38588,2.62487 -0.59053,0.47624 -2.42785,1.53568 -4.08295,2.35431 -14.25789,7.05219 -31.95503,6.84573 -54.55007,-0.63639 l -5.19253,-1.71945 -6.56151,-0.006 c -9.92143,-0.009 -12.36068,0.46055 -35.2539,6.78272 -7.11918,1.96601 -12.48118,3.14892 -17.23815,3.80293 -4.49859,0.61845 -5.41697,0.67015 -7.99311,0.45002 z" id="path4147" inkscape:connector-curvature="0" /></g></svg>')
    
        swiper.appendChild(logo);   
       document.body.appendChild(swiper);
        swiper.classList.add('swiped');

    swiper.addEventListener('animationend', (e) => {
        if (e.animationName === 'swipe') {
            fireTextAnimation();
            animationEnded = true;
        }
        calculateNavOpacity()
    });


    const primaryHeader = document.querySelector('.header__heading-primary');
    primaryHeader.addEventListener('animationend', () => {

        // Grab the three icon bits
        const iconBits = document.querySelectorAll('.iconBanner__container');

        iconBits.forEach((iconBit, index) => {
            iconBit.style.animationDelay = index / 6 + 's';
            iconBit.classList.add('slideIn');
        });
    });



    // Smooth scroll to contact form when enquire button clicked.
    document.querySelector('.nav__enquire').addEventListener('click', () => {
        smoothScroll('.landing__contactForm', 1000);
    });

    document.querySelector('.btn--mobile-enquire').addEventListener('click', () => {
        smoothScroll('.landing__contactForm', 1000);
    });

    // Smooth scroll past header when arrow clicked.
    document.querySelector('.header__arrow').addEventListener('click', () => {
        smoothScroll('.textStrip', 1000);
    });

    document.querySelector('.submit').addEventListener('click', (e) => {
        e.preventDefault();

        const name = document.querySelector('.formFieldName').value.trim();
        const email = document.querySelector('.formFieldEmail').value.trim();
        const contactNumber = document.querySelector('.formFieldContactNo').value.trim();
        const contractType = document.querySelector('.formFieldContractType').value.trim();
        const more = document.querySelector('.formFieldMore').value.trim();
        let errors = false;

        const nameError = document.querySelector('.formFieldName + .error');

        // Front end validation
        if (name.trim() === '') {
            nameError.style.display = 'block';
            errors = true;
        } else {
            nameError.style.display = 'none';
        }

        if (email.trim() === '') {
            errors = true;
            document.querySelector('.formFieldEmail + .error').innerHTML = '* Please enter your email address';
            document.querySelector('.formFieldEmail + .error').style.display = 'block';
        } else {
            // Check if email is valid
            if (!validateEmail(email)) {
                errors = true;
                document.querySelector('.formFieldEmail + .error').innerHTML = '* Please enter a valid email address';
                document.querySelector('.formFieldEmail + .error').style.display = 'block';
            } else {
                document.querySelector('.formFieldEmail + .error').style.display = 'none';
            }
        }

        if (contactNumber.trim() === '') {
            errors = true;
            document.querySelector('.formFieldContactNo + .error').style.display = 'block';
        } else {
            document.querySelector('.formFieldContactNo + .error').style.display = 'none';
        }

        if (contractType.trim() === '') {
            errors = true;
            document.querySelector('.formFieldContractType + .error').style.display = 'block';
        } else {
            document.querySelector('.formFieldContractType + .error').style.display = 'none';
        }

        if (!errors) {
            document.querySelector('.submit').innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            setTimeout(() => {
                const request = new XMLHttpRequest();
                const url = './sendEmail.php';
                
                request.open('POST', url, true);
                request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                
                request.onreadystatechange = function () {
                    if (request.readyState === 4 && request.status === 200) {
                        document.querySelector('.submit').innerHTML = '<span>Thank You!</span>';
                        document.querySelector('.submit').classList.add('dark-green');
                    } else {
                        document.querySelector('.submit').innerHTML = 'Submit';
                        document.querySelector('.submit').classList.remove('dark-green');
                    }
                };
    
                const data = 'name=' + name + '&email=' + email + '&contactNo=' + contactNumber + '&contractType=' + contractType + '&more=' + more;
    
                request.send(data);
            }, 10);

            setTimeout(() => {
                document.querySelector('.submit').innerHTML = 'Submit';
                // Clear out the form
                document.querySelector('.formFieldName').value = '';
                document.querySelector('.formFieldEmail').value = '';
                document.querySelector('.formFieldContactNo').value = '';
                document.querySelector('.formFieldContractType').value = '';
                document.querySelector('.formFieldMore').value = '';
                document.querySelector('.submit').classList.remove('dark-green');
            }, 5000)
        }
    })

    const imageDivs = document.getElementsByClassName('header__unblurred-image');
    // Necessary?
    for (let image of imageDivs) {
        image.classList.add('hidden');
    }

    let currentInterval = 0;
    switchHeaderImage(currentInterval);

    setInterval(() => {
        if (currentInterval < 3) {
            currentInterval++;
        } else {
            currentInterval = 0;
        }
        switchHeaderImage(currentInterval);
    }, 8000)
    
    if (document.querySelector('.hamburger') !== null) {
        document.querySelector('.hamburger').addEventListener('click', function(evt) {
            this.classList.toggle('isActive');

            // Get hold of the mobile menu and set it to be active as well
            document.querySelector('.desktopMenu').classList.toggle('active');
            document.querySelector('.nav').classList.toggle('active');
        });
    }

    document.addEventListener('scroll', () => {
        if (animationEnded) {
            calculateNavOpacity();
            fireTextAnimation();

        }

        fixChatIconPosition();
    });
    
//    if (getCookie('cookieBar') != 'true') {

    if (true) {
        // Inject cookies bar
        const body = document.body;

        const cookiesBar = document.createElement('div');
        cookiesBar.classList.add('cookiesBar');

        const cookiesBarText = document.createElement('p');
        cookiesBarText.classList.add('cookiesBarText');
        cookiesBarText.innerHTML = 'By using our website, you agree to the use of cookies as described in our Cookie Policy.';
        cookiesBar.appendChild(cookiesBarText);

        const closeCookiesBar = document.createElement('a');
        closeCookiesBar.href = '#';
        closeCookiesBar.classList.add('close');

        const closeContainer = document.createElement('div');
        closeContainer.classList.add('closeContainer');

        closeContainer.appendChild(closeCookiesBar);

        cookiesBar.appendChild(closeContainer);

        closeCookiesBar.addEventListener('click', function(evt) {
            evt.preventDefault();
            // cookiesBar.style.display = 'none';
            cookiesBar.classList.add('closed');
            const header = document.querySelector('.header');
            header.style.paddingTop = '0';
            document.cookie = "cookieBar=true; expires=" + new Date(new Date().setFullYear(new Date().getFullYear() + 1)) + ";";
        });
        
        body.insertBefore(cookiesBar, body.firstChild);
    } else {
        const header = document.querySelector('.header');
        
        if (header) {
            header.style.paddingTop = '0';
        }
    }
});