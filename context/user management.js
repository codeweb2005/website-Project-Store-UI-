
let editMode = false;
let editingProduct = null;

function addUser() {
    const name = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const status = document.getElementById('status').value;

    if (!name || !email || !password || (!status && !editMode)) {
        alert('Vui lòng nhập đầy đủ thông tin sản phẩm');
        return;
    }


    if (editMode) {
        // Editing product
        editingProduct.querySelector('.name').textContent = name;
        editingProduct.querySelector('.email').textContent = email;
        editingProduct.querySelector('.password').textContent = password;
        editingProduct.querySelector('.status').textContent = status;
        resetForm();
    } else {
        // Adding a new product
        const tbody = document.getElementById('userList').querySelector('tbody');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td class="name">${name}</td>
            <td class="email">${email}</td>
            <td class="password">${password}</td>
            <td class="status">${status}</td>
            <td><button onclick="editProduct(this)">Edit</button></td>
            <td><button onclick="removeProduct(this)">Remove</button></td>
        `;

        tbody.appendChild(row);
        resetForm();
    }
}

function editProduct(button) {
    const row = button.parentElement.parentElement;  // Lấy dòng chứa nút Edit

    // Kiểm tra xem có phải là dòng hợp lệ không
    if (!row) {
        console.error('Không tìm thấy dòng để chỉnh sửa');
        return;
    }

    // Đảm bảo rằng editingProduct được gán chính xác
    editingProduct = row;

    // Cập nhật các giá trị trong form
    document.getElementById('username').value = row.querySelector('.name').textContent;
    document.getElementById('email').value = row.querySelector('.email').textContent;
    document.getElementById('password').value = row.querySelector('.password').textContent;
    document.getElementById('status').value = row.querySelector('.status').textContent;

    // Đặt chế độ chỉnh sửa
    editMode = true;
    document.getElementById('submitProductBtn').textContent = 'Update';
    document.getElementById('cancelEditBtn').style.display = 'inline-block';
}


function cancelEdit() {
    resetForm();
}

function removeProduct(button) {
    const confirmation = confirm("Bạn có chắc chắn muốn xóa người dùng này không?");
    if (confirmation) {
        const row = button.parentElement.parentElement;
        row.parentElement.removeChild(row);
    }
}

function resetForm() {
    document.getElementById('username').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('status').value = '';
    document.getElementById('submitProductBtn').textContent = 'Add';
    document.getElementById('cancelEditBtn').style.display = 'none';
    editMode = false;
    editingProduct = null;
}
