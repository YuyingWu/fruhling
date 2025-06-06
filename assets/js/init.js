// photo-mosaic in the blog-list header
lightGallery(document.getElementById('photo-mosaic'), {
    plugins: [lgFullscreen, lgThumbnail],
    speed: 500,
    mode: 'lg-fade',
    download: false,
    counter: false,
    allowMediaOverlap: false,
    toggleThumb: true,
    closeOnTap: true,
    closeOnTapOutside: true,
    licenseKey: lightGalleryLicenseKey,
});

// zoom single photos
lightGallery(document.querySelector('.page-container'), {
    selector: '.zoomable',
    plugins: [lgMediumZoom],
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    closeOnTap: true,
    closeOnTapOutside: true,
    licenseKey: lightGalleryLicenseKey,
});

// enable blog post images gallery
lightGallery(document.querySelector('.blog-gallery'), {
    selector: 'img',
    plugins: [lgFullscreen, lgThumbnail],
    speed: 500,
    mode: 'lg-fade',
    download: false,
    counter: true,
    allowMediaOverlap: false,
    toggleThumb: true,
    exThumbImage: 'src',
    closeOnTap: true,
    closeOnTapOutside: true,
    licenseKey: lightGalleryLicenseKey,
});

// enable inline carousels
new Swiper('.swiper', {
    rewind: true, // use rewind instead of loop. Loop creates duplicates for all images and this brakes lightgallery
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
    },
    keyboard: {
        enabled: true,
        onlyInViewport: true,
    },
    autoHeight: true,
});

// add "zoom" cursor for carousels
document.querySelectorAll('.swiper, .grid-item').forEach(function(item) {
    item.classList.add("zoom-in");
});

// Init gallery in a single gallery page
var masonryGalleries = document.querySelectorAll(".masonry-gallery");
masonryGalleries.forEach(function(gallery) {
    imagesLoaded(gallery, function(inst) {
        new Masonry(gallery , {
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer',
            percentPosition: true,
        });
    })
});

// enable galleries in blog post titles
document.querySelectorAll('.title-gallery:not(.post_internal_gallery .title-gallery)').forEach(function(inlineTitleGallery) {
    lightGallery(inlineTitleGallery, {
        plugins: [lgFullscreen, lgThumbnail, lgHash, lgVideo],
        speed: 500,
        mode: 'lg-fade',
        download: false,
        allowMediaOverlap: false,
        toggleThumb: true,
        hash: true,
        videojs: true,
        closeOnTap: true,
        closeOnTapOutside: true,
        videojsOptions: {
            autoplayFirstVideo: false,
            autoplayVideoOnSlide: true,
            gotoNextSlideOnVideoEnd: false,
        },
        licenseKey: lightGalleryLicenseKey,
    });
});

// make visible hidden by default items
document.querySelectorAll('.default-hidden').forEach(function(item) {
    item.classList.remove('default-hidden');
});

document.querySelectorAll('.gallery-list-title').forEach(function (item) {
    item.setAttribute("z-index", "1000");
})

$(document).ready(function() {
    $('spoiler').click(function() {
        $(this).toggleClass('revealed');
    });
});