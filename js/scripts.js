 
(window.lazySizesConfig = window.lazySizesConfig || {}), (lazySizesConfig.loadHidden = !1), MicroModal.init({ openClass: "is-open", disableScroll: !0, disableFocus: !0, awaitOpenAnimation: !0, awaitCloseAnimation: !0, debugMode: !1 });
var navToggle = document.getElementById("navToggle");
navToggle &&
    document.getElementById("navToggle").addEventListener("click", function () {
        document.body.classList.toggle("--nav-active");
    });
var searchToggle = document.getElementById("searchToggle");
searchToggle &&
    document.getElementById("searchToggle").addEventListener("click", function () {
        document.body.classList.toggle("--search-active"), document.getElementById("searchbox").focus();
    });
var filter = document.getElementById("filterContent");
filter &&
    document.getElementById("filterToggle").addEventListener("click", function () {
        document.body.classList.toggle("--filter-active");
    }),
    document.getElementById("darkBackdrop").addEventListener("click", function () {
        document.body.classList.remove("--nav-active", "--search-active", "--filter-active");
    });
var userToggle = document.getElementById("userToggle");
userToggle &&
    userToggle.addEventListener("click", function () {
        document.body.classList.toggle("--user-active");
    }),
    document.body.addEventListener("click", function (e) {
        e.target.classList.contains("search__input") || (document.getElementById("searchAutocomplete").classList.contains("--active") && document.getElementById("searchAutocomplete").classList.remove("--active"));
    });
var inc = document.getElementsByClassName("stepper");
if (inc.length > 0) {
    for (abc = 0; abc < inc.length; abc++) {
        var incI = inc[abc].querySelector("input"),
            id = incI.getAttribute("id"),
            min = incI.getAttribute("min"),
            max = incI.getAttribute("max"),
            step = incI.getAttribute("step");
        document.getElementById(id).previousElementSibling.setAttribute("onclick", "stepperInput('" + id + "', -" + step + ", " + min + ")"),
            document.getElementById(id).nextElementSibling.setAttribute("onclick", "stepperInput('" + id + "', " + step + ", " + max + ")");
    }
    function stepperInput(id, s, m) {
        var event = new Event("change"),
            el = document.getElementById(id);
        s > 0 ? parseInt(el.value) < m && ((el.value = parseInt(el.value) + s), el.dispatchEvent(event)) : parseInt(el.value) > m && ((el.value = parseInt(el.value) + s), el.dispatchEvent(event));
    }
}
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("homecarousel")) {
        const indexCarousel = new Siema({
            selector: "#homecarousel",
            duration: 200,
            easing: "ease-out",
            perPage: 1,
            startIndex: 0,
            draggable: !0,
            multipleDrag: !0,
            threshold: 20,
            duration: 250,
            loop: !0,
            rtl: !1,
            onInit: () => {},
            onChange: () => {},
        });
        setInterval(() => indexCarousel.next(), 7e3), document.querySelector(".prev").addEventListener("click", () => indexCarousel.prev()), document.querySelector(".next").addEventListener("click", () => indexCarousel.next());
    }
}),
    document.addEventListener("DOMContentLoaded", () => {
        if (document.getElementsByClassName("product-detail__carousel").length > 0) {
            let startX,
                startY,
                $imagesContainer = document.getElementById("product-carousel"),
                $lightbox = document.getElementById("lightbox"),
                delta = 6;
            if (
                ($imagesContainer.addEventListener("mousedown", (event) => {
                    (startX = event.pageX), (startY = event.pageY);
                }),
                $imagesContainer.addEventListener("mouseup", (e) => {
                    let diffX = Math.abs(event.pageX - startX),
                        diffY = Math.abs(event.pageY - startY);
                    if (diffX < delta && diffY < delta) {
                        let imageWrapper = e.target.closest(".product-detail__carouselLink");
                        if (imageWrapper) {
                            let image = imageWrapper.querySelector("img"),
                                imagetitle = imageWrapper.querySelector("span");
                            image && (($lightbox.innerHTML = '<div class="close-lightbox"></div>' + image.outerHTML + imagetitle.outerHTML), $lightbox.classList.add("show"));
                        }
                    }
                }),
                $lightbox.addEventListener("click", (e) => {
                    e.target.hasAttribute("src") || $lightbox.classList.remove("show");
                }),
                document.getElementsByClassName("product-detail__thumbs").length > 0)
            ) {
                let thumbCarousel = new Siema({
                    selector: ".product-detail__carousel",
                    duration: 200,
                    easing: "ease-out",
                    perPage: 1,
                    startIndex: 0,
                    draggable: !0,
                    multipleDrag: !0,
                    threshold: 20,
                    loop: !0,
                    rtl: !1,
                    onInit: () => {},
                    onChange: () => {},
                });
                if (
                    (document.querySelector(".prev").addEventListener("click", () => thumbCarousel.prev()),
                    document.querySelector(".next").addEventListener("click", () => thumbCarousel.next()),
                    (Siema.prototype.addPagination = function () {
                        for (let lop = 0; lop < this.innerElements.length; lop++) {
                            document.getElementById("thumb" + lop).addEventListener("click", () => this.goTo(lop));
                        }
                    }),
                    thumbCarousel.addPagination(),
                    document.getElementById("variants"))
                ) {
                    var firstClick = !0;
                    document.querySelector(".variants__list").addEventListener("click", function (e) {
                        var target = e.target;
                        if (target.querySelector("img")) {
                            var imgSrc = target.querySelector("img").dataset.src,
                                name = target.querySelector(".variants__item-text").innerHTML;
                            firstClick ? (firstClick = !1) : thumbCarousel.remove(0);
                            const newElement = document.createElement("div");
                            newElement.classList.add("product-detail__carouselItem"),
                                (newElement.innerHTML = '<div class="product-detail__carouselLink"><img src="' + imgSrc + '" alt="' + name + '" title="' + name + '" loading="lazy"><span>' + name + "</span></div>"),
                                thumbCarousel.prepend(newElement),
                                thumbCarousel.goTo(0);
                        }
                    });
                }
            }
        }
    });
var navitem = document.querySelectorAll(".expandable .nav-link");
for (let loop = 0; loop < navitem.length; loop++)
    document.getElementById("subToggle-" + loop).addEventListener("click", function (e) {
        document.getElementById("sub-" + loop).classList.toggle("--active");
    });
var variants = document.getElementById("variants");
variants &&
    document.querySelector(".variants__list").addEventListener("click", function (e) {
        this.classList.toggle("--active");
        var target = e.target;
        e.currentTarget.querySelector(".--active") && e.currentTarget.querySelector(".--active").classList.remove("--active");
        target.querySelector("input").checked = !0;
        target.classList.add("--active");
        var code = target.dataset.code,
            stock = target.dataset.stock,
            stockstatus = target.dataset.stockstatus,
            priceold = target.dataset.priceold,
            price = target.dataset.price,
            pricevat = target.dataset.pricevat;
        (document.getElementById("product-code").innerHTML = code),
            (document.getElementById("stock").dataset.status = stockstatus),
            (document.getElementById("stock").innerHTML = stock),
            (document.getElementById("price-old").innerHTML = null == priceold ? "" : priceold),
            (document.getElementById("price-main").innerHTML = price),
            (document.getElementById("price-vat").innerHTML = pricevat);
    }),
    document.getElementById("register-form") &&
        (document.getElementById("faToggle").onclick = function () {
            document.getElementById("register-fa-company").toggleAttribute("required"),
                document.getElementById("register-fa-ico").toggleAttribute("required"),
                document.getElementById("register-fa-street").toggleAttribute("required"),
                document.getElementById("register-fa-city").toggleAttribute("required"),
                document.getElementById("register-fa-psc").toggleAttribute("required"),
                document.getElementById("register-fa-state").toggleAttribute("required");
        }),

        



[
    ['showLoginPassword', 'login-password'],
    ['showRegisterPassword', 'heslo'],
    ['showCartRegisterPassword', 'cart-register-password']
].forEach(([toggleId, inputId]) => {
    const toggle = document.getElementById(toggleId);
    const input = document.getElementById(inputId);
    if (toggle && input) {
        toggle.addEventListener('click', () => {
            input.type = input.type === 'password' ? 'text' : 'password';
        });
    }
});



const sortButton = document.querySelector(".products-heading .products-sort");
if (sortButton) {
    sortButton.addEventListener("click", function (e) {
        this.classList.add("--active");
    });
}