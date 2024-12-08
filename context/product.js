
        let editMode = false;
        let editingProduct = null;

        function addProduct() {
            const name = document.getElementById('productName').value;
            const price = document.getElementById('productPrice').value;
            const quantity = document.getElementById('productQuantity').value;
            const imageFile = document.getElementById('productImage').files[0];
            const styleclothes = document.getElementById('options').value;

            if (!name || !price || !quantity || (!imageFile && !editMode)) {
                alert('Vui lòng nhập đầy đủ thông tin sản phẩm');
                return;
            }

            if (editMode) {
                // Editing product
                const reader = new FileReader();
                reader.onload = function(event) {
                    editingProduct.querySelector('.name').textContent = name;
                    editingProduct.querySelector('.price').textContent = `${price} VND`;
                    editingProduct.querySelector('.quantity').textContent = quantity;
                    editingProduct.querySelector('.style').textContent = styleclothes;
                    if (imageFile) {
                        editingProduct.querySelector('img').src = event.target.result;
                    }
                    resetForm();
                };

                if (imageFile) {
                    reader.readAsDataURL(imageFile);
                } else {
                    resetForm();
                }
            } else {
                // Adding a new product
                const reader = new FileReader();
                reader.onload = function(event) {
                    const tbody = document.getElementById('productList').querySelector('tbody');
                    const row = document.createElement('tr');

                    row.innerHTML = `
                        <td><img src="${event.target.result}" class="product-image" alt="Ảnh sản phẩm"></td>
                        <td class="name" >${name}</td>
                        <td class="price">${price} USD</td>
                        <td class="quantity">${quantity}</td>
                        <td class="style">${styleclothes}</td>
                        <td><button onclick="editProduct(this)">Edit</button></td>
                        <td><button onclick="removeProduct(this)">Remove</button></td>
                    `;

                    tbody.appendChild(row);
                    resetForm();
                };

                reader.readAsDataURL(imageFile);
            }
        }

        function editProduct(button) {
            const row = button.parentElement.parentElement;
            editingProduct = row;

            document.getElementById('productName').value = row.querySelector('.name').textContent;
            document.getElementById('productPrice').value = row.querySelector('.price').textContent.replace(' USD', '');
            document.getElementById('productQuantity').value = row.querySelector('.quantity').textContent;
            document.getElementById('options').value = row.querySelector('.style').textContent;

            editMode = true;
            document.getElementById('submitProductBtn').textContent = 'Update';
            document.getElementById('cancelEditBtn').style.display = 'inline-block';
            document.getElementById('removeimg').style.display = 'inline-block';
        }

        function cancelEdit() {
            resetForm();
        }

        function removeProduct(button) {
            const confirmation = confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?");
            if (confirmation) {
                const row = button.parentElement.parentElement;
                row.parentElement.removeChild(row);
            }
        }

        function resetForm() {
            document.getElementById('productName').value = '';
            document.getElementById('productPrice').value = '';
            document.getElementById('productQuantity').value = '';
            document.getElementById('productImage').value = '';
            document.getElementById('options').value = '';
            document.getElementById('submitProductBtn').textContent = 'add';
            document.getElementById('cancelEditBtn').style.display = 'none';
            editMode = false;
            editingProduct = null;
        }

 function removeimg() {
    const images = document.querySelectorAll('.product-image');
    images.forEach(image => {
    image.remove();
});

        }
        
        