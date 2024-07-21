document.addEventListener('DOMContentLoaded', function () {
    fetch('https://localhost:7144/api/Users')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const userList = document.getElementById('userList');
            if (data.length > 0) {
                const table = document.createElement('table');
                table.className = 'table table-striped table-bordered';

                const thead = document.createElement('thead');
                const headerRow = document.createElement('tr');

                const headers = ['Nombre', 'Correo Electrónico', 'Rol ID', 'Acciones'];
                headers.forEach(headerText => {
                    const th = document.createElement('th');
                    th.scope = 'col';
                    th.textContent = headerText;
                    headerRow.appendChild(th);
                });

                thead.appendChild(headerRow);
                table.appendChild(thead);

                const tbody = document.createElement('tbody');
                data.forEach(user => {
                    const row = document.createElement('tr');

                    const nameCell = document.createElement('td');
                    nameCell.textContent = user.nombre;
                    row.appendChild(nameCell);

                    const emailCell = document.createElement('td');
                    emailCell.textContent = user.correoElectronico;
                    row.appendChild(emailCell);

                    const roleCell = document.createElement('td');
                    roleCell.textContent = user.rolID;
                    row.appendChild(roleCell);

                    const actionsCell = document.createElement('td');

                    const editButton = document.createElement('button');
                    editButton.className = 'btn btn-primary btn-sm';
                    editButton.textContent = 'Editar';
                    editButton.onclick = () => editUser(user.id);
                    actionsCell.appendChild(editButton);

                    const deleteButton = document.createElement('button');
                    deleteButton.className = 'btn btn-danger btn-sm';
                    deleteButton.textContent = 'Eliminar';
                    deleteButton.onclick = () => deleteUser(user.id);
                    actionsCell.appendChild(deleteButton);

                    row.appendChild(actionsCell);
                    tbody.appendChild(row);
                });

                table.appendChild(tbody);
                userList.appendChild(table);
            } else {
                userList.innerHTML = '<p>No users found.</p>';
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            document.getElementById('userList').innerHTML = '<p>Error fetching users.</p>';
        });
});

function editUser(id) {
    // Lógica para editar un usuario (puede incluir redirigir a una página de edición o mostrar un modal)
    console.log('Editar usuario con ID:', id);
}

function deleteUser(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
        fetch(`https://localhost:7144/api/Users/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Eliminar la fila de la tabla después de la eliminación
                const row = document.querySelector(`tr[data-user-id="${id}"]`);
                if (row) {
                    row.remove();
                }
                alert('Usuario eliminado correctamente.');
            })
            .catch(error => {
                console.error('There was a problem with the delete operation:', error);
                alert('Error eliminando el usuario.');
            });
    }
}
