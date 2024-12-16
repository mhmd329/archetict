(function ($) {
  $.fn.tilt = function (options) {
    const settings = $.extend(
      {
        maxTilt: 20,
        perspective: 300,
        easing: "cubic-bezier(.03,.98,.52,.99)",
        speed: 400,
        scale: 1,
        reset: true,
      },
      options
    );

    const getValues = function (elem, event) {
      const width = elem.outerWidth();
      const height = elem.outerHeight();
      const left = elem.offset().left;
      const top = elem.offset().top;
      const percentageX = (event.pageX - left) / width;
      const percentageY = (event.pageY - top) / height;
      const tiltX = (
        settings.maxTilt / 2 - percentageX * settings.maxTilt
      ).toFixed(2);
      const tiltY = (
        percentageY * settings.maxTilt - settings.maxTilt / 2
      ).toFixed(2);
      return { tiltX, tiltY };
    };

    const applyTilt = function (elem, values) {
      elem.css(
        "transform",
        `perspective(${settings.perspective}px) rotateX(${values.tiltY}deg) rotateY(${values.tiltX}deg) scale(${settings.scale})`
      );
    };

    const resetTilt = function (elem) {
      elem.css(
        "transform",
        `perspective(${settings.perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`
      );
    };

    return this.each(function () {
      const $this = $(this);

      $this.css("transition", `transform ${settings.speed}ms ${settings.easing}`);

      $this.on("mousemove", function (event) {
        const values = getValues($this, event);
        applyTilt($this, values);
      });

      if (settings.reset) {
        $this.on("mouseleave", function () {
          resetTilt($this);
        });
      }
    });
  };

  // تطبيق تلقائي
  $("[data-tilt]").tilt();
})(jQuery);
