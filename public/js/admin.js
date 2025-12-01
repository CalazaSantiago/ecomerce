// Variables globales
let productoEnEdicion = null;
const token = localStorage.getItem('token');
const adminToken = localStorage.getItem('adminToken');

console.log('=== ADMIN.JS LOADED ===');
console.log('Token disponible:', !!token);
console.log('Admin Token disponible:', !!adminToken);

// Esperar a que el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializar);
} else {
    inicializar();
}

async function inicializar() {
    console.log('Inicializando admin panel...');
    
    // Verificar autenticación
    if (!token) {
        console.warn('No hay token, redirigiendo a login');
        window.location.href = '/login.html';
        return;
    }

    // Verificar token de admin
    if (!adminToken) {
        console.warn('No hay token de admin');
        alert('Token de administrador no encontrado. Por favor, inicia sesión nuevamente.');
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        window.location.href = '/login.html';
        return;
    }

    // Verificar que es admin
    const esAdmin = await verificarAdmin();
    if (!esAdmin) {
        console.warn('Usuario no es admin, redirigiendo');
        alert('No tienes permisos para acceder a esta página');
        window.location.href = '/index.html';
        return;
    }

    console.log('Usuario es admin, cargando panel...');
    
    // Cargar productos
    await cargarProductos();
    
    // Configurar eventos
    configurarEventos();
    
    console.log('Panel de admin inicializado correctamente');
}

// Verificar si el usuario es admin
async function verificarAdmin() {
    try {
        const response = await fetch('/api/usuarios/admin/verify', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const esAdmin = response.ok;
        console.log('Verificación admin:', esAdmin);
        return esAdmin;
    } catch (err) {
        console.error('Error al verificar admin:', err);
        return false;
    }
}

// Cargar productos desde la BD
async function cargarProductos() {
    try {
        console.log('Cargando productos...');
        const response = await fetch('/api/productos');
        
        if (!response.ok) {
            throw new Error('Error al cargar productos: ' + response.statusText);
        }
        
        const productos = await response.json();
        console.log('Productos obtenidos:', productos.length);

        const mainSection = document.querySelector('section.productos');
        if (!mainSection) {
            console.error('Sección de productos no encontrada en el DOM');
            return;
        }

        mainSection.innerHTML = '';

        productos.forEach((producto) => {
            const productoDiv = crearElementoProducto(producto);
            mainSection.appendChild(productoDiv);
        });
        
        console.log('Productos cargados en el DOM');
    } catch (err) {
        console.error('Error al cargar productos:', err);
        alert('Error al cargar productos: ' + err.message);
    }
}

// Crear elemento HTML de producto
function crearElementoProducto(producto) {
    const div = document.createElement('div');
    div.className = 'producto';
    div.dataset.id = producto.id;

    const precioDescuento = (producto.precio * 0.9).toFixed(2);

    div.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <p class="name">${producto.nombre}</p>
        <p class="precio">$${parseFloat(producto.precio).toLocaleString('es-AR')}</p>
        <p class="descuento">$${parseFloat(precioDescuento).toLocaleString('es-AR')} <span>con Transferencia bancaria</span></p>
        <p class="descripcion">${producto.descripcion}</p>
        <button class="btn-editar" data-id="${producto.id}">Editar</button>
        <button class="btn-eliminar" data-id="${producto.id}">Eliminar</button>
    `;

    return div;
}

// Configurar eventos
function configurarEventos() {
    console.log('Configurando eventos...');
    
    // Botón para agregar
    const btnAgregar = document.getElementById('abrir-modal');
    console.log('btnAgregar encontrado:', !!btnAgregar);
    if (btnAgregar) {
        btnAgregar.addEventListener('click', (e) => {
            console.log('>>> CLICK EN ABRIR MODAL AGREGAR <<<');
            e.preventDefault();
            abrirModalAgregar();
        });
    }

    // Cerrar modal de agregar
    const cerrarBtn = document.getElementById('cerrar-modal');
    console.log('cerrarBtn encontrado:', !!cerrarBtn);
    if (cerrarBtn) {
        cerrarBtn.addEventListener('click', (e) => {
            e.preventDefault();
            cerrarModalAgregar();
        });
    }

    // Cerrar modal de editar
    const cerrarBtnEditar = document.getElementById('cerrar-modal-editar');
    console.log('cerrarBtnEditar encontrado:', !!cerrarBtnEditar);
    if (cerrarBtnEditar) {
        cerrarBtnEditar.addEventListener('click', (e) => {
            e.preventDefault();
            cerrarModalEditar();
        });
    }

    // Formulario de agregar
    const formAgregar = document.getElementById('form-destino');
    console.log('formAgregar encontrado:', !!formAgregar);
    if (formAgregar) {
        console.log('Configurando listener para form-destino');
        formAgregar.addEventListener('submit', async (e) => {
            console.log('>>> SUBMIT form-destino <<<');
            e.preventDefault();
            console.log('preventDefault ejecutado');
            await agregarProducto();
        });
    } else {
        console.error('ERROR: form-destino NO encontrado en el DOM');
    }

    // Formulario de editar
    const formEditar = document.getElementById('form-editar');
    console.log('formEditar encontrado:', !!formEditar);
    if (formEditar) {
        console.log('Configurando listener para form-editar');
        formEditar.addEventListener('submit', async (e) => {
            console.log('>>> SUBMIT form-editar <<<');
            e.preventDefault();
            console.log('preventDefault ejecutado');
            await editarProducto();
        });
    } else {
        console.error('ERROR: form-editar NO encontrado en el DOM');
    }

    // Delegación para botones de editar/eliminar
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-editar')) {
            const id = e.target.dataset.id;
            console.log('>>> CLICK EN EDITAR PRODUCTO:', id);
            abrirModalEditar(id);
        }

        if (e.target.classList.contains('btn-eliminar')) {
            const id = e.target.dataset.id;
            console.log('>>> CLICK EN ELIMINAR PRODUCTO:', id);
            eliminarProducto(id);
        }
    });

    // Cerrar modales al hacer click fuera
    window.addEventListener('click', (event) => {
        const modalAgregar = document.getElementById('modal-destino');
        const modalEditar = document.getElementById('modal-editar');

        if (event.target === modalAgregar) {
            cerrarModalAgregar();
        }

        if (event.target === modalEditar) {
            cerrarModalEditar();
        }
    });

    console.log('Eventos configurados');
}

// Abrir modal para agregar
function abrirModalAgregar() {
    console.log('>>> ABRIENDO MODAL DE AGREGAR <<<');
    const modal = document.getElementById('modal-destino');
    const form = document.getElementById('form-destino');
    const titulo = document.getElementById('modal-titulo');

    console.log('Modal encontrado:', !!modal);
    console.log('Form encontrado:', !!form);
    console.log('Titulo encontrado:', !!titulo);

    if (form) {
        form.reset();
        console.log('Formulario limpiado');
    }
    if (titulo) {
        titulo.textContent = 'Agregar un Producto';
        console.log('Titulo actualizado');
    }
    productoEnEdicion = null;

    if (modal) {
        modal.style.display = 'flex';
        modal.style.opacity = '1';
        modal.style.pointerEvents = 'auto';
        modal.classList.add('visible', 'activo');
        console.log('Modal abierto');
    } else {
        console.error('ERROR: modal-destino NO encontrado');
    }
}

// Cerrar modal de agregar
function cerrarModalAgregar() {
    console.log('Cerrando modal de agregar');
    const modal = document.getElementById('modal-destino');
    if (modal) {
        modal.style.display = 'none';
        modal.style.opacity = '0';
        modal.style.pointerEvents = 'none';
        modal.classList.remove('visible', 'activo');
    }
}

// Abrir modal para editar
async function abrirModalEditar(id) {
    try {
        console.log('>>> ABRIENDO MODAL DE EDITAR, ID:', id);
        const response = await fetch(`/api/productos/${id}`);
        
        if (!response.ok) {
            throw new Error('No se pudo cargar el producto');
        }

        const producto = await response.json();
        console.log('Producto cargado:', producto);

        productoEnEdicion = producto.id;

        const inputNombre = document.getElementById('editar-nombre');
        const inputImagen = document.getElementById('editar-imagen');
        const inputPrecio = document.getElementById('editar-precio');
        const inputDescripcion = document.getElementById('editar-descripcion');

        console.log('Inputs encontrados:', {
            nombre: !!inputNombre,
            imagen: !!inputImagen,
            precio: !!inputPrecio,
            descripcion: !!inputDescripcion
        });

        if (inputNombre) inputNombre.value = producto.nombre;
        if (inputImagen) inputImagen.value = producto.imagen;
        if (inputPrecio) inputPrecio.value = producto.precio;
        if (inputDescripcion) inputDescripcion.value = producto.descripcion;

        const modal = document.getElementById('modal-editar');
        console.log('Modal editar encontrado:', !!modal);
        
        if (modal) {
            modal.style.display = 'flex';
            modal.style.opacity = '1';
            modal.style.pointerEvents = 'auto';
            modal.classList.add('visible', 'activo');
            console.log('Modal editar abierto');
        } else {
            console.error('ERROR: modal-editar NO encontrado');
        }
    } catch (err) {
        console.error('Error al cargar producto:', err);
        alert('Error al cargar el producto: ' + err.message);
    }
}

// Cerrar modal de editar
function cerrarModalEditar() {
    console.log('Cerrando modal de editar');
    const modal = document.getElementById('modal-editar');
    if (modal) {
        modal.style.display = 'none';
        modal.style.opacity = '0';
        modal.style.pointerEvents = 'none';
        modal.classList.remove('visible', 'activo');
    }
}

// Agregar producto
async function agregarProducto() {
    try {
        const nombre = document.getElementById('nombre').value.trim();
        const imagen = document.getElementById('imagen').value.trim();
        const precio = document.getElementById('precio').value.trim();
        const descripcion = document.getElementById('descripcion').value.trim();

        console.log('Datos a enviar:', { nombre, imagen, precio, descripcion });

        if (!nombre || !imagen || !precio || !descripcion) {
            alert('Por favor completa todos los campos');
            return;
        }

        console.log('Enviando POST a /api/productos');
        const response = await fetch('/api/productos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'x-admin-token': adminToken
            },
            body: JSON.stringify({
                nombre,
                imagen,
                precio: parseFloat(precio),
                descripcion,
                stock: 1
            })
        });

        console.log('Respuesta del servidor:', response.status);
        const data = await response.json();
        console.log('Datos recibidos:', data);

        if (response.ok) {
            alert('Producto agregado exitosamente');
            cerrarModalAgregar();
            await cargarProductos();
        } else {
            alert('Error: ' + (data.error || 'No se pudo agregar el producto'));
        }
    } catch (err) {
        console.error('Error al agregar producto:', err);
        alert('Error: ' + err.message);
    }
}

// Editar producto
async function editarProducto() {
    try {
        if (!productoEnEdicion) {
            alert('Error: no hay producto seleccionado');
            return;
        }

        const nombre = document.getElementById('editar-nombre').value.trim();
        const imagen = document.getElementById('editar-imagen').value.trim();
        const precio = document.getElementById('editar-precio').value.trim();
        const descripcion = document.getElementById('editar-descripcion').value.trim();

        console.log('Editando producto:', productoEnEdicion);

        if (!nombre || !imagen || !precio || !descripcion) {
            alert('Por favor completa todos los campos');
            return;
        }

        const response = await fetch(`/api/productos/${productoEnEdicion}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'x-admin-token': adminToken
            },
            body: JSON.stringify({
                nombre,
                imagen,
                precio: parseFloat(precio),
                descripcion,
                stock: 1
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Producto actualizado exitosamente');
            cerrarModalEditar();
            await cargarProductos();
        } else {
            alert('Error: ' + (data.error || 'No se pudo actualizar el producto'));
        }
    } catch (err) {
        console.error('Error al editar producto:', err);
        alert('Error: ' + err.message);
    }
}

// Eliminar producto
async function eliminarProducto(id) {
    try {
        if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            return;
        }

        console.log('Eliminando producto:', id);
        const response = await fetch(`/api/productos/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'x-admin-token': adminToken
            }
        });

        const data = await response.json();

        if (response.ok) {
            alert('Producto eliminado exitosamente');
            await cargarProductos();
        } else {
            alert('Error: ' + (data.error || 'No se pudo eliminar el producto'));
        }
    } catch (err) {
        console.error('Error al eliminar producto:', err);
        alert('Error: ' + err.message);
    }
}
