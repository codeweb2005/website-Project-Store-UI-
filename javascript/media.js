function adjustZoom() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    // Tính toán tỷ lệ zoom, bạn có thể điều chỉnh màn hình tối ưu cho 1920x1080 hoặc kích thước khác
    var zoomLevel = Math.min(width / 1920, height / 1080); // Ví dụ với màn hình 1920x1080

    // Áp dụng tỷ lệ zoom cho body
    document.body.style.transform = 'scale(' + zoomLevel + ')';
    document.body.style.transformOrigin = 'top left'; // Đảm bảo zoom từ góc trên bên trái
}

window.addEventListener('resize', adjustZoom);
window.addEventListener('load', adjustZoom); // Đảm bảo zoom ngay khi tải trang
