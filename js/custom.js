document.addEventListener('DOMContentLoaded', function() {
  const certificates = [
    { name: "JavaScript Essentials 1", image: '{{ .Params.certificate_js1_image | default "" }}' },
    { name: "JavaScript Essentials 2", image: '{{ .Params.certificate_js2_image | default "" }}' },
    { name: "Networking Basics", image: '{{ .Params.certificate_net_image | default "" }}' }
  ];

  certificates.forEach(cert => {
    const certLink = document.querySelector(`a[href="#"]:contains("${cert.name}")`);
    if (certLink) {
      if (cert.image) {
        certLink.href = 'javascript:void(0);';
        certLink.addEventListener('click', function(e) {
          e.preventDefault();
          const modal = document.createElement('div');
          modal.className = 'modal';
          modal.innerHTML = `<img src="${cert.image}" alt="${cert.name} Certificate" class="modal-image">`;
          document.body.appendChild(modal);
          modal.addEventListener('click', function() {
            document.body.removeChild(modal);
          });
        });
      } else {
        certLink.style.display = 'none'; // Ẩn liên kết nếu không có chứng chỉ
      }
    }
  });

  // Polyfill for :contains (không hỗ trợ mặc định trong tất cả trình duyệt)
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || 
                              Element.prototype.webkitMatchesSelector;
  }

  if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
      let el = this;
      while (el && el.nodeType === 1) {
        if (el.matches(s)) return el;
        el = el.parentElement || el.parentNode;
      }
      return null;
    };
  }
});